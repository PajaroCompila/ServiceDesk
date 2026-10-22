import { Component } from '@angular/core';
import { categories, ticketTrend } from '../dashboard.data';

// Convert the local example values into SVG coordinates, without a chart dependency.
const chartPoint = (value: number, index: number) => ({ x: 45 + index * 94, y: 200 - value * 3 });
const curve = (values: readonly number[]) =>
  values
    .map((value, index) => {
      const point = chartPoint(value, index);
      if (index === 0) return `M ${point.x} ${point.y}`;
      const previous = chartPoint(values[index - 1], index - 1);
      const middle = (previous.x + point.x) / 2;
      return `C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
    })
    .join(' ');

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.html',
  styleUrl: './dashboard-charts.scss',
})
export class DashboardCharts {
  protected readonly trend = ticketTrend;
  protected readonly categories = categories;
  protected readonly receivedCurve = curve(ticketTrend.received);
  protected readonly resolvedCurve = curve(ticketTrend.resolved);
  protected readonly gridLines = [60, 40, 20, 0];
  protected readonly point = chartPoint;
  protected readonly trendDescription = ticketTrend.days
    .map(
      (day, index) =>
        `${day}: ${ticketTrend.received[index]} recibidos y ${ticketTrend.resolved[index]} resueltos`,
    )
    .join('. ');
}
