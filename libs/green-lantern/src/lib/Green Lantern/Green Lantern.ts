import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-green-lantern',
  imports: [CommonModule],
  templateUrl: './Green Lantern.html',
  styleUrl: './Green Lantern.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreenLantern {}
