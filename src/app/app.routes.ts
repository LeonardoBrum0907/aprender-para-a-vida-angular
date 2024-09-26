import { Routes } from '@angular/router';
import { DonationsComponent } from './pages/donations/donations.component';
import { HomeComponent } from './pages/home/home.component';
import { SoonPageComponent } from './pages/soon-page/soon-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: SoonPageComponent
  },
  {
    path: 'help',
    redirectTo: 'help/donations',
    pathMatch: 'full'
  },
  {
    path: 'help/donations',
    component: DonationsComponent
  },
  {
    path: 'help/volunteers',
    component: SoonPageComponent
  }
];
