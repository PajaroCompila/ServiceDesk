import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeToggle } from '../../shared/theme-toggle';

@Component({
  selector: 'app-login',
  imports: [ThemeToggle],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    void this.router.navigateByUrl('/dashboard');
  }
}
