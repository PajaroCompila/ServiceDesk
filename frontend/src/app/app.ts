import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeState } from './shared/theme-state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '[class.dark-theme]': 'theme.dark()' },
})
export class App {
  protected readonly theme = inject(ThemeState);
}
