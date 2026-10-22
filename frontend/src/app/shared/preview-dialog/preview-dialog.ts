import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-preview-dialog',
  template: `
    <dialog
      #dialog
      aria-labelledby="preview-dialog-title"
      (cancel)="cancel($event)"
      (click)="backdrop($event)"
    >
      <header>
        <div>
          <span class="eyebrow">DIRECTORIO DE PERSONAS</span>
          <h2 id="preview-dialog-title">{{ title() }}</h2>
          <p>{{ subtitle() }}</p>
        </div>
        <button
          type="button"
          class="close-button"
          (click)="dismiss.emit()"
          aria-label="Cerrar ventana"
        >
          <i class="pi pi-times" aria-hidden="true"></i>
        </button>
      </header>
      <div class="dialog-content"><ng-content /></div>
    </dialog>
  `,
  styles: `
    dialog {
      width: min(850px, calc(100% - 40px));
      max-width: none;
      max-height: 90vh;
      max-height: 90svh;
      margin: auto;
      padding: 0;
      border: 1px solid var(--border);
      border-radius: 22px;
      background: var(--surface);
      color: var(--text);
      box-shadow: 0 24px 100px rgb(4 19 48 / 24%);
      overflow: hidden;
    }
    dialog[open] {
      display: flex;
      flex-direction: column;
    }
    dialog::backdrop {
      background: rgb(12 25 48 / 50%);
      backdrop-filter: blur(3px);
    }
    header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      padding: 24px 30px 22px;
      border-bottom: 1px solid var(--border);
    }
    .eyebrow {
      color: var(--muted);
      font-size: 9px;
      letter-spacing: 1.6px;
      font-weight: 600;
    }
    h2 {
      margin: 5px 0 4px;
      font-size: 23px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 12px;
    }
    .close-button {
      flex-shrink: 0;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: var(--surface-subtle);
      color: var(--text-secondary);
      cursor: pointer;
    }
    .close-button:focus-visible {
      outline: 3px solid var(--accent);
      outline-offset: 2px;
    }
    .dialog-content {
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    @media (max-width: 600px) {
      dialog {
        width: calc(100% - 20px);
        max-height: calc(100svh - 20px);
        border-radius: 16px;
      }
      header {
        padding: 20px;
      }
      h2 {
        font-size: 21px;
      }
    }
  `,
})
export class PreviewDialog implements AfterViewInit, OnDestroy {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly dismiss = output<void>();
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly document = inject(DOCUMENT);
  private readonly previousFocus = this.document.activeElement as HTMLElement | null;
  private readonly previousOverflow = this.document.body.style.overflow;

  ngAfterViewInit(): void {
    this.document.body.style.overflow = 'hidden';
    this.dialog().nativeElement.showModal();
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = this.previousOverflow;
    this.dialog().nativeElement.close();
    if (this.previousFocus?.isConnected) this.previousFocus.focus();
  }

  protected cancel(event: Event): void {
    event.preventDefault();
    this.dismiss.emit();
  }
  protected backdrop(event: MouseEvent): void {
    const dialog = this.dialog().nativeElement;
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      this.dismiss.emit();
  }
}
