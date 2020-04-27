import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';

import { CinemaRestService } from '../../providers/cinema.rest.service';
import { Booking } from '../../interfaces/booking';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-book-tickets',
  templateUrl: 'book-tickets.html',
  styleUrls: ['./book-tickets.scss'],
})

export class BookTicketsPage {
  movie: any;
  showtime: any;
  today: Date;
  noOfTickets: number;
  totalPrice: number;
  booking: any = {};
  username: string;

  constructor(
    private rest:CinemaRestService,
    private route: ActivatedRoute,
    private inAppBrowser: InAppBrowser,
    private userData: UserData,
    private alertController: AlertController,
    private router: Router
  ) {
      this.today = new Date();
      this.noOfTickets = 1;
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    console.log("data provider");
    const showtimeId = this.route.snapshot.paramMap.get('id');
    const movieId = this.route.snapshot.paramMap.get('movieid');

    //getshowtime by parameters
    this.rest.getShowtimeById(showtimeId).subscribe((data: any[]) => {
      console.log(data);
      this.showtime = data;
      this.totalPrice = this.showtime.price;
    });

    //call movie id Details
    this.rest.getMoviesById(movieId).subscribe((data: any[]) => {
      console.log(data);
      this.movie = data;
    });

    this.getUsername();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  decrement(){
    console.log("backward clicked");
    if(this.noOfTickets > 1)
      this.noOfTickets = this.noOfTickets - 1;
      this.totalPrice = this.showtime.price*this.noOfTickets;
  }

  increment(){
    console.log("forward click");
    this.noOfTickets = this.noOfTickets + 1;
    this.totalPrice = this.showtime.price*this.noOfTickets;
  }

  async presentConfirm(): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Movie Title: <strong>'+this.movie.title+'</strong><br><br> Seats:  <strong>'+this.noOfTickets+' </strong>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: 'Confirm',
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }

  async BookingConfirmed(bookingRef): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Success!',
        message: 'Booking Ref:  <strong> '+ bookingRef+'</strong><br><br> Thank you. You successfully created your booking.</strong>',
        buttons: [{
            text: 'OK',
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }

  presentAlert() {
    this.presentConfirm().then(res => {
      if(res === 'ok') {

        //var startTime = Number(new Date().toISOString());
        //var dtAction = dtrum.enterAction("Cofirm Booking", "Click", startTime, "", "");
        console.log(this.movie);

        this.booking.movieId = this.movie.id;
        this.booking.showtimeId=this.showtime.id;
        this.booking.username=this.username;
        console.log(this.booking);
        this.rest.addBookings(this.booking, this.noOfTickets).subscribe((result) => {
            console.log(result);

            this.BookingConfirmed(result.bookingNo).then(res => {
              if(res === 'ok') {
                this.router.navigateByUrl('/app/tabs/movies');
              }
            });
        });

        //dtrum.leaveAction(dtAction, Number(new Date().toISOString()), startTime);
      }
    });
  }

  openExternalUrl(url) {
      this.inAppBrowser.create(url, '_blank');
  }

}
