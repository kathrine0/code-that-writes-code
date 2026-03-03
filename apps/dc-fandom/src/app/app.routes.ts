import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'green-lantern',
    loadComponent: () =>
      import('@kathrine0/green-lantern').then((m) => m.GreenLantern),
  },
  {
    path: 'wonder-woman',
    loadComponent: () =>
      import('@kathrine0/wonder-woman').then((m) => m.WonderWoman),
  },
  {
    path: 'batman',
    loadComponent: () => import('@kathrine0/batman').then((m) => m.Batman),
  },
  {
    path: 'aquaman',
    loadComponent: () => import('@kathrine0/aquaman').then((m) => m.Aquaman),
  },
  {
    path: 'superman',
    loadComponent: () => import('@kathrine0/superman').then((m) => m.Superman),
  },
];
