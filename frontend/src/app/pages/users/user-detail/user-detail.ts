import { Component, computed, input, output } from '@angular/core';
import { PreviewUser, fullName, initials, normalizeEmail, notificationEvents } from '../user.model';
import { NotificationPreview } from './notification-preview';

@Component({
  selector: 'app-user-detail',
  imports: [NotificationPreview],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  readonly user = input.required<PreviewUser>();
  readonly users = input.required<readonly PreviewUser[]>();
  readonly edit = output<void>();
  protected readonly associatedUsers = computed(() =>
    this.users().filter((user) => normalizeEmail(user.email) === normalizeEmail(this.user().email)),
  );
  protected readonly fullName = fullName;
  protected readonly initials = initials;
  protected readonly events = notificationEvents;
}
