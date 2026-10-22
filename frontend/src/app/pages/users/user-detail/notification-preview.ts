import { Component, input } from '@angular/core';

@Component({
  selector: 'app-notification-preview',
  template: `
    <section aria-labelledby="notification-preview-title">
      <header>
        <i class="pi pi-envelope" aria-hidden="true"></i>
        <h3 id="notification-preview-title">Ejemplo de notificación</h3>
        <span>Vista previa</span>
      </header>
      <div class="email-meta">
        <p><span>De</span><strong>soporte@almacenpajaroazul.com</strong></p>
        <p>
          <span>Para</span><strong>{{ email() }}</strong>
        </p>
        <p><span>Asunto</span><strong>ServiceDesk — Actualización del ticket #0001</strong></p>
      </div>
      <div class="email-body">
        <span class="product">ServiceDesk <small>ALMACÉN PÁJARO AZUL</small></span>
        <h4>Hay novedades en su solicitud</h4>
        <p>El equipo de soporte ha actualizado la información de su ticket.</p>
        <div class="ticket-preview">
          <span>#0001</span><strong>Revisión de equipo de trabajo</strong>
          <dl>
            <div>
              <dt>Estado</dt>
              <dd><span class="ticket-status">En progreso</span></dd>
            </div>
            <div>
              <dt>Técnico asignado</dt>
              <dd>Técnico de ejemplo</dd>
            </div>
          </dl>
        </div>
        <p>
          <strong>Resumen de la modificación</strong><br />Se inició la revisión del equipo para
          identificar el origen del inconveniente.
        </p>
        <button type="button" disabled title="Ejemplo visual sin enlace funcional">
          Ver ticket<i class="pi pi-arrow-up-right" aria-hidden="true"></i></button
        ><small class="preview-note">Ejemplo visual. Este correo no se envía.</small>
      </div>
    </section>
  `,
  styles: `
    section {
      overflow: hidden;
      margin-top: 25px;
      border: 1px solid var(--border);
      border-radius: 14px;
    }
    header {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 16px 19px;
      background: var(--surface-subtle);
    }
    header > i {
      color: var(--accent);
    }
    h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }
    header > span {
      margin-left: auto;
      color: var(--muted);
      font-size: 9px;
    }
    .email-meta {
      padding: 13px 19px;
      border-block: 1px solid var(--border);
    }
    .email-meta p {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin: 6px 0;
      font-size: 11px;
    }
    .email-meta p > span {
      flex: 0 0 42px;
      color: var(--muted);
    }
    .email-meta strong {
      min-width: 0;
      color: var(--text-secondary);
      font-weight: 400;
      overflow-wrap: anywhere;
    }
    .email-body {
      padding: 24px;
    }
    .product {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      color: var(--accent);
      font-size: 17px;
      font-weight: 600;
    }
    .product small {
      color: var(--muted);
      font-size: 8px;
      letter-spacing: 1.1px;
    }
    h4 {
      margin: 24px 0 7px;
      font-size: 16px;
      font-weight: 600;
    }
    .email-body p {
      margin: 7px 0 17px;
      color: var(--text-secondary);
      font-size: 11px;
      line-height: 1.9;
    }
    .email-body p strong {
      color: var(--text);
      font-weight: 600;
    }
    .ticket-preview {
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: var(--surface-subtle);
    }
    .ticket-preview > span {
      display: block;
      margin-bottom: 5px;
      color: var(--accent);
      font-size: 10px;
    }
    .ticket-preview > strong {
      font-size: 12px;
      font-weight: 600;
    }
    dl {
      display: flex;
      gap: 35px;
      margin: 14px 0 0;
    }
    dt {
      margin-bottom: 6px;
      color: var(--muted);
      font-size: 9px;
    }
    dd {
      margin: 0;
      color: var(--text-secondary);
      font-size: 10px;
    }
    .ticket-status {
      padding: 4px 6px;
      border-radius: 5px;
      background: var(--warning-soft);
      color: var(--warning);
    }
    button {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 11px 20px;
      border: 0;
      border-radius: 8px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 11px;
    }
    .preview-note {
      display: block;
      margin-top: 12px;
      color: var(--muted);
      font-size: 9px;
    }
    @media (max-width: 600px) {
      .email-body {
        padding: 19px;
      }
      header {
        flex-wrap: wrap;
      }
      dl {
        flex-wrap: wrap;
        gap: 16px;
      }
    }
  `,
})
export class NotificationPreview {
  readonly email = input.required<string>();
}
