import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-list-playlists',
  templateUrl: './list-playlists.component.html',
  styleUrls: ['./list-playlists.component.css']
})
export class ListPlaylistsComponent implements OnInit{

  playlists: Playlist[] = [];

  ngOnInit(): void {
    this.getAllPlaylists();
  }

  constructor(private playlistService: PlaylistService){

  }

  getAllPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe(
      data => {
        this.playlists = data;
        console.log(data.content);
        
      },
      err => console.log(err)
    )
  }

}
