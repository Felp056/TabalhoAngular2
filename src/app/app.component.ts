import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {FavoritesListComponent} from './favorites-list/favorites-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MovieDetailsComponent,
    FavoritesListComponent,
  ],
})
export class AppComponent {
  movieTitle: string = '';
  movieData: any = null;
  showMovieDetails: boolean = false;
  favorites: any[] = []; // Lista de favoritos
  showingFavorites: boolean = false; // Controla a exibição da lista de favoritos

  fetchMovie(): void {
    if (!this.movieTitle.trim()) {
      alert('Por favor, insira o título de um filme.');
      return;
    }

    const apiUrl = `https://www.omdbapi.com/?t=${this.movieTitle}&apikey=4ba8198b&plot=full`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === 'True') {
          this.movieData = data;
          this.showMovieDetails = true;
          this.showingFavorites = false;
        } else {
          alert('Filme não encontrado.');
          this.showMovieDetails = false;
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar filme:', error);
        alert('Erro ao buscar o filme. Tente novamente mais tarde.');
        this.showMovieDetails = false;
      });
  }

  addToFavorites(movie: any): void {
    if (!this.favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      this.favorites.push({
        title: movie.Title,
        genre: movie.Genre,
        plot: movie.Plot,
      });
      alert('Filme adicionado aos favoritos!');
    } else {
      alert('Filme já está na lista de favoritos.');
    }
  }

  removeFavorite(movie: any): void {
    this.favorites = this.favorites.filter(fav => fav !== movie);
  }

  toggleFavorites(): void {
    this.showingFavorites = !this.showingFavorites;
    this.showMovieDetails = !this.showingFavorites;
  }
}
