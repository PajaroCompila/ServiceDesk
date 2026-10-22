import { Injectable, signal } from '@angular/core';

/** Presentation state only. It deliberately resets when the page reloads. */
@Injectable({ providedIn: 'root' })
export class ThemeState {
  readonly dark = signal(false);

  toggle(): void {
    this.dark.update((value) => !value);
  }
}
