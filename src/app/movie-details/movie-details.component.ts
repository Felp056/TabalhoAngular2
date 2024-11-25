import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class MovieDetailsComponent {
  @Input() movie: any; // Dados do filme recebidos
  @Output() likeMovie = new EventEmitter<any>(); // Emissor para notificar o AppComponent

  onLike(): void {
    this.likeMovie.emit(this.movie); // Emite o evento com os dados do filme
  }
}
