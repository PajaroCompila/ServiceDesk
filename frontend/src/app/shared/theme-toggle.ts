import { Component, inject } from '@angular/core';
import { ThemeState } from './theme-state';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      type="button"
      class="theme-toggle"
      (click)="theme.toggle()"
      [attr.aria-label]="theme.dark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      [attr.title]="theme.dark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      [attr.aria-pressed]="theme.dark()"
    >
      <i [class]="theme.dark() ? 'pi pi-sun' : 'pi pi-moon'" aria-hidden="true"></i>
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
    }
    .theme-toggle {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text-secondary);
      background: var(--surface);
      cursor: pointer;
      transition: background 150ms ease;
    }
    .theme-toggle:hover {
      background: var(--surface-hover);
    }
    .theme-toggle:focus-visible {
      outline: 3px solid var(--accent);
      outline-offset: 3px;
    }
    i {
      font-size: 17px;
    }
    @media (prefers-reduced-motion: reduce) {
      .theme-toggle {
        transition: none;
      }
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeState);
}
