import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppShell } from '../../shared/app-shell/app-shell';
import { PreviewDialog } from '../../shared/preview-dialog/preview-dialog';
import { UserForm } from './user-form/user-form';
import { UserTable } from './user-table/user-table';
import { UserDetail } from './user-detail/user-detail';
import { UsersSummary } from './widgets/users-summary';
import { UsersEmpty } from './widgets/users-empty';
import {
  PreviewUser,
  UserDraft,
  fullName,
  normalizeEmail,
  userRoles,
  userStatuses,
} from './user.model';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    AppShell,
    PreviewDialog,
    UserForm,
    UserTable,
    UserDetail,
    UsersSummary,
    UsersEmpty,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  protected readonly users = signal<PreviewUser[]>([]);
  protected readonly search = signal('');
  protected readonly statusFilter = signal('');
  protected readonly roleFilter = signal('');
  protected readonly dialog = signal<'create' | 'edit' | 'detail' | null>(null);
  protected readonly selectedId = signal<number | null>(null);
  protected readonly selectedUser = computed(
    () => this.users().find((user) => user.id === this.selectedId()) ?? null,
  );
  protected readonly message = signal('');
  protected readonly roles = userRoles;
  protected readonly statuses = userStatuses;
  protected readonly activeCount = computed(
    () => this.users().filter((user) => user.status === 'Activo').length,
  );
  protected readonly sharedEmails = computed(() => {
    const counts = new Map<string, number>();
    for (const user of this.users()) {
      const email = normalizeEmail(user.email);
      counts.set(email, (counts.get(email) ?? 0) + 1);
    }
    return new Set([...counts].filter(([, count]) => count > 1).map(([email]) => email));
  });
  protected readonly filteredUsers = computed(() => {
    const normalize = (value: string) =>
      value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    const query = normalize(this.search().trim());
    return this.users().filter(
      (user) =>
        (!this.statusFilter() || user.status === this.statusFilter()) &&
        (!this.roleFilter() || user.role === this.roleFilter()) &&
        (!query ||
          normalize(
            `${fullName(user)} ${user.username} ${user.email} ${user.branch} ${user.department}`,
          ).includes(query)),
    );
  });
  private nextId = 1;

  protected create(): void {
    this.selectedId.set(null);
    this.dialog.set('create');
  }
  protected view(user: PreviewUser): void {
    this.selectedId.set(user.id);
    this.dialog.set('detail');
  }
  protected edit(user: PreviewUser): void {
    this.selectedId.set(user.id);
    this.dialog.set('edit');
  }
  protected closeDialog(): void {
    this.dialog.set(null);
    this.selectedId.set(null);
  }

  protected save(draft: UserDraft): void {
    const editingId = this.dialog() === 'edit' ? this.selectedId() : null;
    if (editingId !== null) {
      this.users.update((users) =>
        users.map((user) => (user.id === editingId ? { ...draft, id: user.id } : user)),
      );
      this.message.set('Usuario actualizado en la vista previa');
    } else {
      this.users.update((users) => [...users, { ...draft, id: this.nextId++ }]);
      this.message.set('Usuario agregado a la vista previa');
    }
    this.clearFilters();
    this.closeDialog();
  }

  protected toggleStatus(user: PreviewUser): void {
    this.users.update((users) =>
      users.map((item) =>
        item.id === user.id
          ? { ...item, status: item.status === 'Activo' ? 'Inactivo' : 'Activo' }
          : item,
      ),
    );
    this.message.set('Estado actualizado en la vista previa');
  }

  protected clearFilters(): void {
    this.search.set('');
    this.statusFilter.set('');
    this.roleFilter.set('');
  }
}
