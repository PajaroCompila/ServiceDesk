import { Component, input } from '@angular/core';

@Component({
  selector: 'app-users-summary',
  templateUrl: './users-summary.html',
  styleUrl: './users-summary.scss',
})
export class UsersSummary {
  readonly total = input(0);
  readonly active = input(0);
  readonly shared = input(0);
}
