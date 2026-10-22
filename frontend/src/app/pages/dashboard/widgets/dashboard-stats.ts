import { Component } from '@angular/core';
import { summaryCards } from '../dashboard.data';

@Component({
  selector: 'app-dashboard-stats',
  template: `
    <section class="stats-grid" aria-label="Resumen de tickets de la semana">
      @for (stat of stats; track stat.label) {
        <article class="stat-card" [attr.data-tone]="stat.tone">
          <div class="stat-top">
            <h2>{{ stat.label }}</h2>
            <span class="stat-icon"><i [class]="'pi ' + stat.icon" aria-hidden="true"></i></span>
          </div>
          <div class="stat-main">
            <strong>{{ stat.value }}</strong
            ><svg viewBox="0 0 88 38" aria-hidden="true">
              <polyline [attr.points]="stat.spark" />
            </svg>
          </div>
          <div class="stat-footer">
            <span class="change" [class.neutral]="stat.trend === 'none'">
              @if (stat.trend !== 'none') {
                <i
                  [class]="stat.trend === 'up' ? 'pi pi-arrow-up-right' : 'pi pi-arrow-down-right'"
                  aria-hidden="true"
                ></i>
              }
              {{ stat.change }}</span
            ><span>{{ stat.detail }}</span>
          </div>
        </article>
      }
    </section>
  `,
  styles: `
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
    }
    .stat-card {
      --tone: var(--accent);
      --tone-bg: var(--accent-soft);
      padding: 19px 20px 18px;
      border: 1px solid var(--border);
      border-radius: 18px;
      background: var(--surface);
      box-shadow: var(--shadow);
    }
    [data-tone='orange'] {
      --tone: var(--warning);
      --tone-bg: var(--warning-soft);
    }
    [data-tone='violet'] {
      --tone: var(--violet);
      --tone-bg: var(--violet-soft);
    }
    [data-tone='green'] {
      --tone: var(--positive);
      --tone-bg: var(--positive-soft);
    }
    .stat-top,
    .stat-main,
    .stat-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    h2 {
      margin: 0;
      color: var(--text-secondary);
      font-size: 12px;
      font-weight: 400;
    }
    .stat-icon {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: var(--tone-bg);
      color: var(--tone);
      font-size: 15px;
    }
    .stat-main {
      margin: 7px 0 12px;
    }
    strong {
      font-size: 31px;
      font-weight: 600;
      letter-spacing: -1px;
      line-height: 1.3;
    }
    svg {
      width: 80px;
      height: 35px;
      overflow: visible;
    }
    polyline {
      fill: none;
      stroke: var(--tone);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .stat-footer {
      justify-content: flex-start;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: 10px;
      gap: 6px;
    }
    .change {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 3px 5px;
      border-radius: 5px;
      color: var(--positive);
      background: var(--positive-soft);
      font-size: 10px;
      font-weight: 600;
    }
    .change i {
      font-size: 9px;
    }
    .change.neutral {
      color: var(--violet);
      background: var(--violet-soft);
    }
    @media (min-width: 1025px) and (max-width: 1200px) {
      .stat-card {
        padding: 16px 14px;
      }
      svg {
        width: 60px;
      }
      h2 {
        font-size: 11px;
      }
    }
    @media (max-width: 700px) {
      .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
    }
    @media (max-width: 400px) {
      .stat-card {
        padding: 14px 12px;
      }
      .stat-icon {
        width: 26px;
        height: 26px;
        font-size: 12px;
      }
      h2 {
        font-size: 11px;
      }
      svg {
        width: 52px;
      }
      strong {
        font-size: 27px;
      }
      .stat-footer {
        gap: 4px;
      }
    }
  `,
})
export class DashboardStats {
  protected readonly stats = summaryCards;
}
