import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open the login page from the home route', async () => {
    const harness = await RouterTestingHarness.create('/');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Login');
    expect(harness.routeNativeElement?.querySelector('input[name="username"]')).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('input[type="password"]')).toBeTruthy();
  });

  it('should navigate from login with empty fields and return using logout', async () => {
    const harness = await RouterTestingHarness.create('/login');
    const form = harness.routeNativeElement?.querySelector('form') as HTMLFormElement;
    expect(form.querySelectorAll('[required]')).toHaveLength(0);
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/dashboard');
    const logout = harness.routeNativeElement?.querySelector('.logout') as HTMLAnchorElement;
    logout.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/login');
  });

  it('should allow opening dashboard directly and navigate to the users preview', async () => {
    const harness = await RouterTestingHarness.create('/dashboard');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Dashboard');
    const options = harness.routeNativeElement?.querySelectorAll('nav button') ?? [];
    expect(options).toHaveLength(3);
    for (const option of options) {
      expect((option as HTMLButtonElement).disabled).toBe(true);
    }
    (
      harness.routeNativeElement?.querySelector('nav a[href="/usuarios"]') as HTMLAnchorElement
    ).click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/usuarios');
    expect(
      harness.routeNativeElement?.querySelector('nav a[aria-current="page"]')?.getAttribute('href'),
    ).toBe('/usuarios');
  });

  it('should toggle the theme and keep it while navigating between screens', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/login');
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    (host.querySelector('app-theme-toggle button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(host.classList.contains('dark-theme')).toBe(true);
    await router.navigateByUrl('/dashboard');
    await fixture.whenStable();
    expect(host.classList.contains('dark-theme')).toBe(true);
    expect(host.querySelector('app-theme-toggle button')?.getAttribute('aria-label')).toBe(
      'Cambiar a modo claro',
    );
    (host.querySelector('app-theme-toggle button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(host.classList.contains('dark-theme')).toBe(false);
  });
});
