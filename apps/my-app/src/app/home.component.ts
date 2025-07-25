import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import plugins from './../plugins.json';
import { Plugin } from './plugin-interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="home-container">
      @for (plugin of plugins; track plugin.name) {
        <mat-card class="card" [class.inactive]="!plugin.route" [routerLink]="plugin.route">
          <mat-card-header>
            <mat-card-title>{{ plugin.name }}</mat-card-title>
            <mat-card-subtitle>{{ plugin.subtitle }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>
              {{ plugin.description }}
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button matButton>
              <mat-icon>rocket_launch</mat-icon>
              Get Started
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
  styles: [`
    .home-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
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

  `],
})
export class HomeComponent {
  plugins: Plugin[] = plugins;
}
