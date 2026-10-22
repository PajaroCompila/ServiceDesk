import { Component, ElementRef, HostListener, input, signal, viewChild } from '@angular/core';
import { ThemeToggle } from '../theme-toggle';
import { DashboardSidebar } from '../../pages/dashboard/layout/dashboard-sidebar';

@Component({
  selector: 'app-shell',
  imports: [ThemeToggle, DashboardSidebar],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {
  readonly section = input('Dashboard');
  readonly path = input('/dashboard');
  protected readonly sidebarOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  @HostListener('document:keydown.escape')
  protected closeSidebar(): void {
    if (this.sidebarOpen()) {
      this.sidebarOpen.set(false);
      this.menuButton()?.nativeElement.focus();
    }
  }
}
