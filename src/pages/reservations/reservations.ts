import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

import { CinemaRestService } from '../../providers/cinema.rest.service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html',
  styleUrls: ['./reservations.scss'],
  providers: [DatePipe]
})
export class ReservationsPage {
  reservations: any;
  reservationsList: any;
  username: any;

  constructor(
    private rest:CinemaRestService,
    private userData: UserData,
    private datePipe: DatePipe,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    //TODO load reservations
    //dtrum.enterAction("Load reservations", "Load", Number(new Date().toISOString()), "app/tabs/reservations", "Reservations Menu");
      console.log(this.username);
      this.userData.getUsername().then((username) => {
        console.log(username);
        this.username = username;
        this.rest.getReservations(username).subscribe((data) => {
            this.reservations = data;
            this.reservationsList = data;
        });
      });

  }

  showDetails(arg) {
      //dtrum.enterAction("Show Reservations Details", "Click", Number(new Date().toISOString()), "app/tabs/reservations", "Reservations Menu");

      let date = new Date();
      console.log(date);
      console.log(date.getTime());
      console.log(date.getDate());
      console.log(this.datePipe.transform(date, 'yyyy-MM-dd HH:mm a'));
      this.rest.getShowtimeById(arg.showtimeId).subscribe((showtime) => {
          this.rest.getMoviesById(arg.movieId).subscribe((movie) => {
              this.presentAlert(arg.bookingNo, movie.title, arg.tickets.length, this.datePipe.transform(showtime.startTime, 'yyyy-MM-dd'), this.datePipe.transform(showtime.startTime, 'HH:mm a'));
          });
      });
  }

  async presentAlert(bookingNo, movieTitle, noOfTickets, dateStarted, time) {
    const alert = await this.alertController.create({
      header: 'Booking Ref: ' + bookingNo,
      subHeader: '',
      message: 'Movie Title: <strong>' + movieTitle + '</strong> <br><br> No of Tickets: <strong> ' + noOfTickets + ' </strong> <br><br> Date: <strong>' + dateStarted + '</strong> <br><br> Time: <strong> ' + time + '<strong>',
      buttons: ['OK']
    });

    await alert.present();
  }

  initializeItems() {
    this.reservations = this.reservationsList;
  }

  onSearch(evt) {
    this.initializeItems();
    const searchNo = evt.srcElement.value;

    if (!searchNo) {
        return;
    }
    this.reservations = this.reservations.filter(res => {
        if (res.bookingNo && searchNo) {
            if (res.bookingNo.toLowerCase().indexOf(searchNo.toLowerCase()) > -1) {
                return true;
            }
            return false;
        }
    });
  }

}
