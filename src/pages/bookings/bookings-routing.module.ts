import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingsPage } from './bookings';
const routes: Routes = [
  {
    path: '',
    component: BookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsPageRoutingModule {}
