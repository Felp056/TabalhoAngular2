import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component'; // Certifique-se de que o caminho está correto
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MovieDetailsComponent,
        FavoritesListComponent
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should alert if movieTitle is empty', () => {
    spyOn(window, 'alert');
    component.movieTitle = '  ';
    component.fetchMovie();
    expect(window.alert).toHaveBeenCalledWith('Por favor, insira o título de um filme.');
  });

  it('should fetchMovie and set movieData if response is True', waitForAsync(async () => {
    const mockData = { Response: 'True', Title: 'Test Movie' };
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve(mockData)
    }));

    component.movieTitle = 'Test Movie';
    component.fetchMovie();

    await fixture.whenStable();
    expect(component.movieData).toEqual(mockData);
    expect(component.showMovieDetails).toBeTrue();
    expect(component.showingFavorites).toBeFalse();
  }));

  it('should alert and set showMovieDetails to false if movie is not found', waitForAsync(async () => {
    const mockData = { Response: 'False' };
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve(mockData)
    }));
    spyOn(window, 'alert');

    component.movieTitle = 'Nonexistent Movie';
    component.fetchMovie();

    await fixture.whenStable();
    expect(window.alert).toHaveBeenCalledWith('Filme não encontrado.');
    expect(component.showMovieDetails).toBeFalse();
  }));

  it('should handle fetch errors gracefully', waitForAsync(async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject('API error'));
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.movieTitle = 'Test Movie';
    component.fetchMovie();

    await fixture.whenStable();
    expect(console.error).toHaveBeenCalledWith('Erro ao buscar filme:', 'API error');
    expect(window.alert).toHaveBeenCalledWith('Erro ao buscar o filme. Tente novamente mais tarde.');
    expect(component.showMovieDetails).toBeFalse();
  }));
});
