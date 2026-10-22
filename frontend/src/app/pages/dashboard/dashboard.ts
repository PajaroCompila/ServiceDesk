import { Component } from '@angular/core';
import { AppShell } from '../../shared/app-shell/app-shell';
import { DashboardStats } from './widgets/dashboard-stats';
import { DashboardCharts } from './widgets/dashboard-charts';
import { RecentTickets } from './widgets/recent-tickets';
import { ActivityFeed } from './widgets/activity-feed';

@Component({
  selector: 'app-dashboard',
  imports: [AppShell, DashboardStats, DashboardCharts, RecentTickets, ActivityFeed],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
