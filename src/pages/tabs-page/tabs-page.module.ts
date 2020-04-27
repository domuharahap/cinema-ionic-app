import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MoviesModule } from '../movies/movies.module';
import { ReservationsModule } from '../reservations/reservations.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MoviesModule,
    ReservationsModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
