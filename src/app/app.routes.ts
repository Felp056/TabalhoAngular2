import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'moviedetails', component: MovieDetailsComponent },
];
