import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Array<any> = [];

  private favoritesSub;

  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {

    this.favoritesSub = this.musicService.getFavorites().subscribe(_favorites => { this.favorites = _favorites.tracks; });

  }

  ngOnDestroy(): void { this.favoritesSub.unsubscribe(); }

  removeFromFavorites(id): void {

    this.favoritesSub = this.musicService.removeFromFavorites(id).subscribe(_favorites => this.favorites = _favorites.tracks);

  }

}
