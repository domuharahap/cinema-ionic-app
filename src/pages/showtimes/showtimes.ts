import { Component } from '@angular/core';
import { CinemaRestService } from '../../providers/cinema.rest.service';

@Component({
  selector: 'page-showtimes',
  templateUrl: 'showtimes.html',
  styleUrls: ['./showtimes.scss'],
})

export class ShowtimesPage {
  today: any;
  movie: any;
  showtimes: any;
  movies: any;
  moviesSelection: any = [];

  constructor(private rest:CinemaRestService) {
    this.today = new Date();

    //moviesSelection: any = [];
  }

  customActionSheetOptions: any = {
      header: 'Movie Titles'
  };

  ionViewWillEnter() {
    this.movie= null;
    this.showtimes= null;
    this.movies= null;

    this.today = new Date().toString();
    this.rest.getMovies().subscribe((data: any[]) => {
      this.moviesSelection = data;
    });
  }

  updateMovieShowtimes($arg) {
    console.log($arg.detail.value);
    this.today = $arg.detail.value;
  }
  selectMovie($arg){
    this.movie = $arg.detail.value;
  }

  searchForm() {
    //TODO add search actions search form
    //var startTime = Number(new Date().toISOString());
    //var dtAction = dtrum.enterAction("Search Showtimes", "Click", startTime, "", "");

    console.log("call form")
    console.log(this.today);
    console.log(this.movie);

    //call movie id Details
    this.rest.SearchShowtimesByMoviesByIdAndDate(this.movie, this.today).subscribe((data: any[]) => {
      console.log(data);
      this.showtimes = data;
    });

    this.rest.getMoviesById(this.movie).subscribe((data: any[]) => {
      console.log(data);
      this.movies = data;
    });

    //dtrum.leaveAction(dtAction, Number(new Date().toISOString()), startTime);
  }

}
