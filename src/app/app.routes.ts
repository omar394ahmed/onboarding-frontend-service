import { Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ViewComponent } from './components/view/view.component';

export const routes: Routes = [
    { path: 'create', component: CreateComponent },
    { path: 'view', component: ViewComponent },
   /*  { path: '**', redirectTo: 'view' }  */// Redirect unknown paths to /create
  ];
