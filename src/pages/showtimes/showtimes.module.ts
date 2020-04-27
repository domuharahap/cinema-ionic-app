import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ShowtimesPage } from './showtimes';
import { ShowtimesRoutingModule } from './showtimes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShowtimesRoutingModule
  ],
  declarations: [ShowtimesPage],
})
export class ShowtimesModule {}
