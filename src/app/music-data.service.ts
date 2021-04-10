import { HttpClient } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse> {

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }

  getAlbumByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }

  addToFavorites(id): Observable<[String]> {
    return this.http.put<[String]>(environment.userAPIBase + `/favorites/${id}`, null);
  }
  
  removeFromFavorites(id): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favorites/${id}`).pipe(mergeMap(FavoritesArray => {
      if (FavoritesArray.length > 0) {

        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${FavoritesArray.join()}`, { headers: { "Authorization": `Bearer ${token}`} });
        }));

      } else {

        return new Observable(o => o.next({ tracks: [] }));

      }
    }));
  }
  
  getFavorites(): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favorites/`).pipe(mergeMap(FavoritesArray => {
      if (FavoritesArray.length > 0) {

        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${FavoritesArray.join()}`, { headers: { "Authorization": `Bearer ${token}`} });
        }));

      } else {

        return new Observable(o => o.next({ tracks: [] }));

      }
    }));
  }

}