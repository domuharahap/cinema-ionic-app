import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: () => import('../movies/movies.module').then(m => m.MoviesModule)
          },
          {
            path: ':id/showtimes',
            loadChildren: () => import('../bookings/bookings.module').then(m => m.BookingsModule)
          },
          {
            path: ':movieid/showtimes/:id',
            loadChildren: () => import('../book-tickets/book-tickets.module').then(m => m.BookTicketsModule)
          }
        ]
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            loadChildren: () => import('../reservations/reservations.module').then(m => m.ReservationsModule)
          }
        ]
      },
      {
        path: 'showtimes',
        children: [
          {
            path: '',
            loadChildren: () => import('../showtimes/showtimes.module').then(m => m.ShowtimesModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/movies',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
