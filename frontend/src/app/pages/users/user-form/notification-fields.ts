import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { notificationEvents } from '../user.model';

@Component({
  selector: 'app-notification-fields',
  imports: [ReactiveFormsModule],
  templateUrl: './notification-fields.html',
  styleUrl: './notification-fields.scss',
})
export class NotificationFields {
  readonly form = input.required<FormGroup>();
  readonly submitted = input(false);
  readonly shared = input(false);
  protected readonly events = notificationEvents;
  protected invalid(name: string): boolean {
    const control = this.form().get(name);
    return !!control?.invalid && (control.touched || this.submitted());
  }
}
