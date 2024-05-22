import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit {

  @Input() book: Book = new Book();

  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
  }
  ngOnInit(): void {
    this.getPlaylists();
  }

  addBookToPlaylist(bookId: number, playlistId: number) {
    this.playlistService.addBook(bookId, playlistId).subscribe(
      data => {
        alert("Agregado correctamente");
        this.playlistService.nofityPlaylistUpdated();
      },
      err => alert("No se pudo agregar")
    )
  }

  getPlaylists() {
    this.playlistService.getAllPlaylists().subscribe(
      data => this.playlists = data,
      err => console.log(err)
    )
  }

  noImage: string = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";

}
