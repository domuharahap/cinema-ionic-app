import { Component } from '@angular/core';
//import { ConferenceData } from '../../providers/conference-data';
import { CinemaRestService } from '../../providers/cinema.rest.service';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
  styleUrls: ['./movies.scss'],
})
export class MoviesPage {
  movies: any;
  movieList: any;

  constructor(public rest:CinemaRestService) {}

  ionViewWillEnter() {
    this.rest.getMovies().subscribe((data) => {
          this.movies = data;
          this.movieList = data;
      });
  }

  initializeItems() {
    this.movies = this.movieList;
  }
  onInput(evt) {
    //dtrum.enterAction("Search Movie");
    this.initializeItems();
    const searchTitle = evt.srcElement.value;
    if (!searchTitle) {
        return;
    }
    this.movies = this.movies.filter(movie => {
        if (movie.title && searchTitle) {
            if (movie.title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1) {
                return true;
            }
            return false;
        }
    });
  }

}
