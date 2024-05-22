import { Component, Input } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-card-playlist',
  templateUrl: './card-playlist.component.html',
  styleUrls: ['./card-playlist.component.css']
})
export class CardPlaylistComponent {

  @Input() playlist: Playlist = new Playlist();

  constructor(private playlistService: PlaylistService){}

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
