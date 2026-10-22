import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { PreviewUser, UserDraft, normalizeEmail, userRoles, userStatuses } from '../user.model';
import { NotificationFields } from './notification-fields';

const requiredText: ValidatorFn = (control) =>
  typeof control.value === 'string' && control.value.trim() ? null : { required: true };
const confirmations: ValidatorFn = (form) => {
  const value = form.value;
  const errors: Record<string, boolean> = {};
  if (value.confirmEmail && normalizeEmail(value.email) !== normalizeEmail(value.confirmEmail))
    errors['emailMismatch'] = true;
  if (value.confirmPassword && value.password !== value.confirmPassword)
    errors['passwordMismatch'] = true;
  return Object.keys(errors).length ? errors : null;
};

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, NotificationFields],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit, OnDestroy {
  readonly initial = input<PreviewUser | null>(null);
  readonly users = input.required<readonly PreviewUser[]>();
  readonly saved = output<UserDraft>();
  readonly cancelled = output<void>();
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly roles = userRoles;
  protected readonly statuses = userStatuses;
  protected readonly submitted = signal(false);
  protected readonly form = this.fb.group(
    {
      firstName: ['', requiredText],
      lastName: ['', requiredText],
      username: ['', requiredText],
      employeeNumber: '',
      phone: '',
      branch: ['', requiredText],
      department: ['', requiredText],
      position: ['', requiredText],
      role: this.fb.control<UserDraft['role']>('Técnico', Validators.required),
      status: this.fb.control<UserDraft['status']>('Activo', Validators.required),
      password: '',
      confirmPassword: '',
      email: ['', [requiredText, Validators.email]],
      confirmEmail: ['', [requiredText, Validators.email]],
      notifications: this.fb.group({
        enabled: false,
        created: false,
        modified: false,
        assigned: false,
        resolved: false,
        commented: false,
      }),
    },
    { validators: confirmations },
  );
  private readonly values = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });
  protected readonly generatedName = computed(() =>
    `${this.values().firstName?.trim() ?? ''} ${this.values().lastName?.trim() ?? ''}`.trim(),
  );
  protected readonly sharedEmail = computed(() => {
    const email = normalizeEmail(this.values().email ?? '');
    return (
      !!email &&
      this.users().some(
        (user) => user.id !== this.initial()?.id && normalizeEmail(user.email) === email,
      )
    );
  });

  ngOnInit(): void {
    const initial = this.initial();
    if (initial) this.form.patchValue({ ...initial, confirmEmail: initial.email });
    else {
      this.form.controls.password.setValidators(requiredText);
      this.form.controls.confirmPassword.setValidators(requiredText);
      this.form.controls.password.updateValueAndValidity();
      this.form.controls.confirmPassword.updateValueAndValidity();
    }
  }

  protected invalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control?.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.element.nativeElement
        .querySelector<HTMLElement>('input.ng-invalid, select.ng-invalid')
        ?.focus();
      return;
    }
    const value = this.form.getRawValue();
    // Only the explicitly listed preview fields leave this component. Passwords never do.
    const draft: UserDraft = {
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      username: value.username.trim(),
      employeeNumber: value.employeeNumber.trim(),
      phone: value.phone.trim(),
      branch: value.branch.trim(),
      department: value.department.trim(),
      position: value.position.trim(),
      role: value.role,
      status: value.status,
      email: value.email.trim(),
      notifications: { ...value.notifications },
    };
    this.form.reset();
    this.saved.emit(draft);
  }

  ngOnDestroy(): void {
    this.form.reset();
  }
}
