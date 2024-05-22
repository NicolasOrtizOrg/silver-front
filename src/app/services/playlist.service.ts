import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../environment';
import { Observable } from 'rxjs';
import { Playlist } from '../models/Playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private URL: string = Environments.URL_BASE + "/playlists";
  private headers: HttpHeaders = new HttpHeaders().set("userId", "1");
  
  constructor(private http: HttpClient) { }

  
  getAllPlaylists(): Observable<any> {
    return this.http.get<Playlist[]>(this.URL, { headers: this.headers });
  }

}
