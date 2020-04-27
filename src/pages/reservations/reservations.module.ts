import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReservationsPage } from './reservations';
import { ReservationsRoutingModule } from './reservations-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReservationsRoutingModule
  ],
  declarations: [ReservationsPage],
})
export class ReservationsModule {}
