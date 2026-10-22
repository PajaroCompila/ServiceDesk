import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-users-empty',
  template: `
    <div class="empty-state" [class.filtered]="filtered()">
      @if (filtered()) {
        <i class="pi pi-search" aria-hidden="true"></i>
        <h3>No encontramos coincidencias</h3>
        <p>Pruebe con otro nombre, correo o filtro.</p>
        <button type="button" (click)="action.emit()">Limpiar filtros</button>
      } @else {
        <div class="empty-icon">
          <i class="pi pi-users" aria-hidden="true"></i
          ><span><i class="pi pi-plus" aria-hidden="true"></i></span>
        </div>
        <span class="empty-eyebrow">UN BUEN EQUIPO COMIENZA AQUÍ</span>
        <h3>Todavía no hay usuarios registrados</h3>
        <p>Cree el primer usuario para comenzar a organizar el acceso a ServiceDesk.</p>
        <button type="button" (click)="action.emit()">
          <i class="pi pi-plus" aria-hidden="true"></i>Crear primer usuario
        </button>
      }
    </div>
  `,
  styleUrl: './users-empty.scss',
})
export class UsersEmpty {
  readonly filtered = input(false);
  readonly action = output<void>();
}
