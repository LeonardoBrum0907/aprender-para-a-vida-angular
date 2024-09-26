import { Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { DonationsComponent } from './pages/donations/donations.component';
import { HomeComponent } from './pages/home/home.component';
import { VolunteersComponent } from './pages/volunteers/volunteers.component';

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
    component: ContactComponent

  },
  {
    path: 'donations',
    component: DonationsComponent

  },
  {
    path: 'volunteers',
    component: VolunteersComponent

  }
];
