import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="welcome-card">
      <mat-card-header>
        <mat-card-title>Welcome to Code That Writes Code!</mat-card-title>
        <mat-card-subtitle>Your AI-powered coding companion</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          This application demonstrates a clean layout using Angular Material
          components. The layout includes a responsive navigation bar, main
          content area, and footer.
        </p>
        <p>
          Built with Angular 20 and Angular Material for a modern, accessible
          user experience.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">
          <mat-icon>rocket_launch</mat-icon>
          Get Started
        </button>
        <button mat-button>
          <mat-icon>info</mat-icon>
          Learn More
        </button>
      </mat-card-actions>
    </mat-card>
    <div style="height: 100px"></div>
  `,
  styles: [``],
})
export class HomeComponent {}
