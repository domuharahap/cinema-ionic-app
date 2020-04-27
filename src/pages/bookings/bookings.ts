import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CinemaRestService } from '../../providers/cinema.rest.service';

@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
  styleUrls: ['./bookings.scss'],
})
export class BookingsPage {
  movie: any;
  showtimes: any;
  today: Date;

  constructor(
    private rest:CinemaRestService,
    private route: ActivatedRoute,
    private inAppBrowser: InAppBrowser) {
      this.today = new Date();
  }

  ionViewWillEnter() {
      console.log("ionViewWillEnter");
      console.log("data provider");
      const moviesId = this.route.snapshot.paramMap.get('id');
      console.log(moviesId);
      //call movie id Details
      this.rest.getMoviesById(moviesId).subscribe((data) => {
          console.log(data);
          this.movie = data;
      });
      console.log("get showtims by movie Id");
      //call movie id Details
      this.rest.getShowtimesByMovieIdAndDate(moviesId, this.today).subscribe((data) => {
          console.log(data);
          this.showtimes = data;
      });

  }
  clickedBackward() {
      console.log("backward clicked");
      this.today = new Date(this.today.setDate(this.today.getDate() - 1));
      this.rest.getShowtimesByMovieIdAndDate(this.movie.id, this.today).subscribe((data) => {
          console.log(data);
          this.showtimes = data;
      });
  }
  clickedForward() {
    console.log("forward click");
    this.today.setHours(0, 0, 0);
    this.today = new Date(this.today.setDate(this.today.getDate() + 1));
    this.rest.getShowtimesByMovieIdAndDate(this.movie.id, this.today).subscribe((data) => {
        console.log(data);
        this.showtimes = data;
    });
  }

  openExternalUrl(url) {
      this.inAppBrowser.create(url, '_blank');
  }

}
