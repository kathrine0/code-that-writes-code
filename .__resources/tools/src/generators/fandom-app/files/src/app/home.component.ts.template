import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import items from '../items.json';
import { Item } from './item-interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="home-container">
      @for (item of items; track item.name) {
      <mat-card
        class="card"
        [class.inactive]="!item.route"
        [routerLink]="item.route"
      >
        <mat-card-content>
          <img mat-card-image [src]="item.image ?? 'unknown.jpg'" [alt]="item.name" class="card-image" />
        </mat-card-content>
        <mat-card-actions>
          <button matButton>
            <mat-icon>rocket_launch</mat-icon>
            Enter the Universe
          </button>
          <button matButton>
            <mat-icon>star</mat-icon>
            Star
          </button>
        </mat-card-actions>
      </mat-card>
      } @empty {
      <mat-card>
        <mat-card-content>
          <p>No applications available.</p>
        </mat-card-content>
      </mat-card>
      }
    </div>
  `,
  styles: [
    `
      .home-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
      }

      .card:not(.inactive) {
        transition: transform 0.2s ease-in-out;
        cursor: pointer;
      }

      .card:not(.inactive):hover {
        transform: scale(1.03);
      }

      .card.inactive {
        opacity: 0.5;
        pointer-events: none;
      }

      .card-image {
        width: 100%;
        height: 430px;
        object-fit: cover;
        object-position: top;
      }
    `,
  ],
})
export class HomeComponent {
  items: Item[] = items;
}
