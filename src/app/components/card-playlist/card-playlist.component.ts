import { Component, Input } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistBooks } from 'src/app/models/PlaylistBooks';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-card-playlist',
  templateUrl: './card-playlist.component.html',
  styleUrls: ['./card-playlist.component.css']
})
export class CardPlaylistComponent {

  @Input() playlist: Playlist = new Playlist();

  bookList: PlaylistBooks = new PlaylistBooks();

  constructor(private playlistService: PlaylistService){}

  getById(playlistId: number){
    this.playlistService.getById(playlistId).subscribe(
      data => {
        this.bookList = data;
        console.log(data);
        
      },
      err => console.log(err)
    )
  }

  deletePlaylist(playlistId: number){
    this.playlistService.deletePlaylist(playlistId).subscribe(
      data => {
        alert("Eliminado correctamente");
        this.playlistService.nofityPlaylistUpdated();
      },
      err => alert("Error al eliminar")
    )
  }

  noImage: string = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";

}
