import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../environment';
import { Observable, Subject } from 'rxjs';
import { Playlist } from '../models/Playlist';
import { CreatePlaylist } from '../models/CreatePlaylist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private URL: string = Environments.URL_BASE + "/playlists";

  private playlistUpdated = new Subject<void>();

  constructor(private http: HttpClient) { }

  // -----------------------------------------

  getAllPlaylists(): Observable<any> {
    return this.http.get<Playlist[]>(this.URL);
  }

  getById(playlistId: number): Observable<any> {
    return this.http.get<Playlist>(`${this.URL}/${playlistId}`);
  }

  addBook(bookId: number, playlistId: number): Observable<any> {
    return this.http.post(`${this.URL}/add-book`, null, {
      params: {
        bookId, 
        playlistId
      }
    })
  }

  createPlaylist(playlist: CreatePlaylist): Observable<any> {
    return this.http.post(this.URL, playlist)
  }

  deletePlaylist(playlistId: number): Observable<any> {
    return this.http.delete(`${this.URL}/${playlistId}`)
  }

  // -----------------------------------------

  // Notificar cambios en la playlist
  nofityPlaylistUpdated() {
    this.playlistUpdated.next();
  }

  // Suscribirse para escuchar los cambis en la playlist
  getPlaylistUpdatedListener(): Observable<void> {
    return this.playlistUpdated.asObservable();
  }

}
