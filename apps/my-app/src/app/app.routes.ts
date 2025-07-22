import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'document-list',
    loadComponent: () =>
      import('@kathrine0/document-list').then((m) => m.DocumentList),
  },
];
