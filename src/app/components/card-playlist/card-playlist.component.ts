import { Component, Input } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist';

@Component({
  selector: 'app-card-playlist',
  templateUrl: './card-playlist.component.html',
  styleUrls: ['./card-playlist.component.css']
})
export class CardPlaylistComponent {

  @Input() playlist: Playlist = new Playlist();

  constructor(){}


  noImage: string = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";

}
