import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-batman',
  imports: [],
  templateUrl: './Batman.html',
  styleUrl: './Batman.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Batman {}
