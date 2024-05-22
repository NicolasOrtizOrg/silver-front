import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { CardPlaylistComponent } from './components/card-playlist/card-playlist.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListPlaylistsComponent } from './components/list-playlists/list-playlists.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookComponent,
    ListBooksComponent,
    CardBookComponent,
    CardPlaylistComponent,
    ListPlaylistsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
