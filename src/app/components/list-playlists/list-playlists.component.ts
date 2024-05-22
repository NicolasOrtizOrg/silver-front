import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-list-playlists',
  templateUrl: './list-playlists.component.html',
  styleUrls: ['./list-playlists.component.css']
})
export class ListPlaylistsComponent implements OnInit, OnDestroy {

  playlists: Playlist[] = [];

  private playlistSubscription: Subscription;

  ngOnInit(): void {
    this.getAllPlaylists();
    this.subscribeToPlaylist();
  }

  ngOnDestroy() {
    this.playlistSubscription.unsubscribe();
  }

  constructor(private playlistService: PlaylistService) {

  }

  getAllPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe(
      data => this.playlists = data,
      err => console.log(err)
    )
  }

  createPlaylist(form: NgForm) {
    const newPlaylist = form.value;
    this.playlistService.createPlaylist(newPlaylist).subscribe(
      data => {
        alert("Creado correctamente");
        this.getAllPlaylists();
      },
      err => alert("NO SE PUDO CREAR")
    )
  }

  // Se suscribe al Observable para escuchar los cambios en la lista de playlists
  subscribeToPlaylist(){
    this.playlistSubscription = this.playlistService.getPlaylistUpdatedListener()
      .subscribe(() => this.getAllPlaylists())
  }

}
