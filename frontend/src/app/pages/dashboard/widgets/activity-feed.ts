import { Component } from '@angular/core';
import { recentActivity } from '../dashboard.data';

@Component({
  selector: 'app-activity-feed',
  template: `
    <section class="activity-card" aria-labelledby="activity-heading">
      <header>
        <div>
          <h2 id="activity-heading">Actividad reciente</h2>
          <p>Cada paso cuenta</p>
        </div>
        <span class="today">Hoy</span>
      </header>
      <ol>
        @for (activity of activities; track activity.detail) {
          <li>
            <span class="activity-icon" [attr.data-tone]="activity.tone"
              ><i [class]="'pi ' + activity.icon" aria-hidden="true"></i
            ></span>
            <div>
              <h3>{{ activity.title }}</h3>
              <p>{{ activity.detail }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </li>
        }
      </ol>
      <div class="activity-footer">
        <i class="pi pi-heart" aria-hidden="true"></i
        ><span>Detrás de cada ticket, un equipo que cuenta contigo.</span>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .activity-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 23px 24px 18px;
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
    }
    h2 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.2px;
    }
    header p {
      margin: 6px 0 0;
      color: var(--muted);
      font-size: 11px;
    }
    .today {
      padding: 4px 8px;
      border-radius: 6px;
      background: var(--surface-subtle);
      color: var(--muted);
      font-size: 10px;
    }
    ol {
      display: grid;
      gap: 0;
      margin: 24px 0 18px;
      padding: 0;
      list-style: none;
    }
    li {
      position: relative;
      display: flex;
      gap: 12px;
      min-height: 75px;
    }
    li:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 15px;
      top: 36px;
      bottom: 5px;
      border-left: 1px dashed var(--border);
    }
    .activity-icon {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 12px;
    }
    [data-tone='violet'] {
      color: var(--violet);
      background: var(--violet-soft);
    }
    [data-tone='green'] {
      color: var(--positive);
      background: var(--positive-soft);
    }
    h3 {
      margin: 1px 0 4px;
      font-size: 11px;
      font-weight: 600;
      line-height: 1.7;
    }
    li p {
      margin: 0 0 4px;
      color: var(--text-secondary);
      font-size: 10px;
    }
    .activity-time {
      color: var(--muted);
      font-size: 9px;
    }
    .activity-footer {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-top: auto;
      padding: 12px 11px;
      border-radius: 10px;
      background: var(--surface-subtle);
      color: var(--text-secondary);
      font-size: 10px;
      line-height: 1.7;
    }
    .activity-footer i {
      color: var(--accent);
      font-size: 14px;
    }
    @media (max-width: 480px) {
      .activity-card {
        padding-inline: 18px;
      }
    }
  `,
})
export class ActivityFeed {
  protected readonly activities = recentActivity;
}
