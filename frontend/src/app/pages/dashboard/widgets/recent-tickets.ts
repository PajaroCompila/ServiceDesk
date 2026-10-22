import { Component } from '@angular/core';
import { recentTickets } from '../dashboard.data';

@Component({
  selector: 'app-recent-tickets',
  template: `
    <section class="tickets-card" aria-labelledby="tickets-heading">
      <header>
        <div>
          <h2 id="tickets-heading">Tickets recientes</h2>
          <p>Las últimas solicitudes de tu equipo</p>
        </div>
        <span class="ticket-count">5 tickets</span>
      </header>
      <p class="scroll-hint">
        <i class="pi pi-arrows-h" aria-hidden="true"></i>Deslizá para ver todos los detalles
      </p>
      <div class="table-scroll" role="region" aria-labelledby="tickets-heading" tabindex="0">
        <table>
          <thead>
            <tr>
              <th scope="col">Ticket</th>
              <th scope="col">Solicitante</th>
              <th scope="col">Prioridad</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            @for (ticket of tickets; track ticket.id) {
              <tr>
                <td>
                  <div class="ticket-info">
                    <span class="ticket-icon"
                      ><i [class]="'pi ' + ticket.icon" aria-hidden="true"></i
                    ></span>
                    <div>
                      <span class="ticket-id"
                        >{{ ticket.id }}<span>· {{ ticket.category }}</span></span
                      ><strong>{{ ticket.subject }}</strong>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="requester">
                    <span class="avatar" [attr.data-tone]="ticket.avatar">{{
                      ticket.initials
                    }}</span
                    ><span>{{ ticket.name }}</span>
                  </div>
                </td>
                <td>
                  <span class="priority" [attr.data-priority]="ticket.priorityTone"
                    ><i></i>{{ ticket.priority }}</span
                  >
                </td>
                <td>
                  <span class="status" [attr.data-status]="ticket.statusTone">{{
                    ticket.status
                  }}</span
                  ><span class="updated">{{ ticket.updated }}</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <footer>
        <i class="pi pi-clock" aria-hidden="true"></i>Un resumen de los últimos movimientos de la
        mesa de ayuda.
      </footer>
    </section>
  `,
  styles: `
    .scroll-hint {
      display: none;
    }
    @media (max-width: 1200px) {
      .scroll-hint {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0;
        padding: 0 18px 12px;
        color: var(--muted);
        font-size: 10px;
      }
    }
    :host {
      display: block;
      height: 100%;
    }
    .tickets-card {
      overflow: hidden;
      height: 100%;
      border: 1px solid var(--border);
      border-radius: 20px;
      background: var(--surface);
      box-shadow: var(--shadow);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 23px 24px 20px;
    }
    h2 {
      margin: 0;
      color: var(--text);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.2px;
    }
    header p {
      margin: 6px 0 0;
      color: var(--muted);
      font-size: 11px;
    }
    .ticket-count {
      flex-shrink: 0;
      padding: 5px 9px;
      border-radius: 6px;
      background: var(--surface-subtle);
      color: var(--text-secondary);
      font-size: 10px;
    }
    .table-scroll {
      overflow-x: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--border) transparent;
    }
    .table-scroll:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: -3px;
    }
    table {
      width: 100%;
      min-width: 620px;
      border-collapse: collapse;
      text-align: left;
    }
    th {
      padding: 11px 10px;
      background: var(--surface-subtle);
      color: var(--muted);
      font-size: 10px;
      font-weight: 400;
    }
    td {
      height: 64px;
      padding: 11px 10px;
      border-bottom: 1px solid var(--border);
    }
    th:first-child,
    td:first-child {
      padding-left: 24px;
    }
    th:last-child,
    td:last-child {
      padding-right: 24px;
    }
    tbody tr:last-child td {
      border-bottom: 0;
    }
    .ticket-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ticket-icon {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: 31px;
      height: 34px;
      border-radius: 8px;
      color: var(--text-secondary);
      background: var(--surface-subtle);
      font-size: 13px;
    }
    .ticket-info > div {
      display: grid;
      gap: 4px;
    }
    .ticket-id {
      color: var(--accent);
      font-size: 10px;
    }
    .ticket-id > span {
      margin-left: 5px;
      color: var(--muted);
      font-size: 9px;
    }
    .ticket-info strong {
      white-space: nowrap;
      color: var(--text);
      font-size: 11px;
      font-weight: 400;
    }
    .requester {
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      color: var(--text-secondary);
      font-size: 10px;
    }
    .avatar {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      color: var(--accent);
      background: var(--accent-soft);
      font-size: 9px;
    }
    [data-tone='violet'] {
      color: var(--violet);
      background: var(--violet-soft);
    }
    [data-tone='green'] {
      color: var(--positive);
      background: var(--positive-soft);
    }
    [data-tone='orange'] {
      color: var(--warning);
      background: var(--warning-soft);
    }
    .priority {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--text-secondary);
      font-size: 10px;
    }
    .priority i {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--positive);
    }
    [data-priority='high'] i {
      background: var(--danger);
    }
    [data-priority='medium'] i {
      background: var(--warning);
    }
    .status {
      display: inline-block;
      padding: 4px 7px;
      border-radius: 5px;
      white-space: nowrap;
      font-size: 9px;
      color: var(--accent);
      background: var(--accent-soft);
    }
    [data-status='progress'] {
      color: var(--warning);
      background: var(--warning-soft);
    }
    [data-status='resolved'] {
      color: var(--positive);
      background: var(--positive-soft);
    }
    .updated {
      display: block;
      margin-top: 5px;
      color: var(--muted);
      font-size: 9px;
    }
    footer {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 15px 24px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 10px;
    }
    footer i {
      font-size: 12px;
    }
    @media (max-width: 480px) {
      header {
        padding-inline: 18px;
      }
      footer {
        padding-inline: 18px;
        line-height: 1.8;
      }
    }
  `,
})
export class RecentTickets {
  protected readonly tickets = recentTickets;
}
