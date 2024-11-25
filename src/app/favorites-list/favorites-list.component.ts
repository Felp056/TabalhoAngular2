import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class FavoritesListComponent {
  @Input() favorites: any[] = [];
  @Output() removeFavorite = new EventEmitter<any>();

  onRemove(favorite: any): void {
    this.removeFavorite.emit(favorite);
  }
}
