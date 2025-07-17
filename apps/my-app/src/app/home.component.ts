import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';

export interface App {
  name: string;
  subtitle: string;
  description: string;
  route?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatRippleModule, RouterModule],
  template: `
    <div class="home-container">
      @for (app of apps; track app.name) {
        <mat-card matRipple class="app-card" [class.inactive]="!app.route" [routerLink]="app.route">
          <mat-card-header>
            <mat-card-title>{{ app.name }}</mat-card-title>
            <mat-card-subtitle>{{ app.subtitle }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>
              {{ app.description }}
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

    .app-card:not(.inactive) {
      transition: transform 0.2s ease-in-out;
      cursor: pointer;
    }

    .app-card:not(.inactive):hover {
      transform: scale(1.03);
    }

    .app-card.inactive {
      opacity: 0.5;
      pointer-events: none;
    }

  `],
})
export class HomeComponent {
  apps = [
    {
      name: 'Document List',
      subtitle: 'Manage the company documents.',
      description:
        'This application allows you to view and manage documents. You can add, edit, and delete documents as needed. It provides a user-friendly interface for document management.',
      route: '/document-list',
    },
    {
      name: 'Unimplemented Plugin 1',
      subtitle: 'A simple plugin 1 application.',
      description:
        'This is a simple plugin application that demonstrates basic functionality. It can be extended with additional features as needed.',
    },
    {
      name: 'Unimplemented Plugin 2',
      subtitle: 'A simple plugin 2 application.',
      description:
        'This is a simple plugin application that demonstrates basic functionality. It can be extended with additional features as needed.',
    },
  ];
}
