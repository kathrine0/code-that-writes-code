import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'green-lantern',
    loadComponent: () =>
      import('@kathrine0/green-lantern').then((m) => m.GreenLantern),
  },
];
