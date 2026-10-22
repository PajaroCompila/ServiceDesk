import { Component, input, output } from '@angular/core';
import { PreviewUser, fullName, initials, normalizeEmail } from '../user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable {
  readonly users = input.required<readonly PreviewUser[]>();
  readonly sharedEmails = input.required<ReadonlySet<string>>();
  readonly view = output<PreviewUser>();
  readonly edit = output<PreviewUser>();
  readonly toggleStatus = output<PreviewUser>();
  protected readonly fullName = fullName;
  protected readonly initials = initials;
  protected shared(user: PreviewUser): boolean {
    return this.sharedEmails().has(normalizeEmail(user.email));
  }
}
