import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

interface NavSection {
  name: string;
  id: string;
  icon: string;
}

@Component({
  selector: 'lib-lib-wonder-woman',
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './WonderWoman.html',
  styleUrl: './WonderWoman.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WonderWoman {
  activeSection = signal<string>('overview');

  navSections: NavSection[] = [
    { name: 'Overview', id: 'overview', icon: 'home' },
    { name: 'History', id: 'history', icon: 'history' },
    { name: 'Powers & Abilities', id: 'powers', icon: 'flash_on' },
    { name: 'Corps Members', id: 'members', icon: 'group' },
    { name: 'The Guardians', id: 'guardians', icon: 'shield' },
    { name: 'Enemies', id: 'enemies', icon: 'dangerous' },
  ];
}
