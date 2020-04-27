import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BookingsPage } from './bookings';
import { BookingsPageRoutingModule } from './bookings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BookingsPageRoutingModule
  ],
  declarations: [BookingsPage],
})
export class BookingsModule {}
