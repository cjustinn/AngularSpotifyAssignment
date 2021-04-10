import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any = {};

  private paramsSub;
  private albumSub;
  private addFavSub;

  constructor(private route: ActivatedRoute, private musicService: MusicDataService, private snackBar: MatSnackBar) { }

  addToFavorites(trackId): void {
    this.addFavSub = this.musicService.addToFavorites(trackId).subscribe((data) => {
      this.snackBar.open("Adding to favorites...", "Done", { duration: 1500 });
    },
    (err) => {
      this.snackBar.open("Unable to add song to favorites list.", "Done", { duration: 1500 });
    });
  }

  ngOnInit(): void {
    
    this.paramsSub = this.route.params.subscribe(paramData => {
      this.albumSub = this.musicService.getAlbumById(paramData.id).subscribe(albumData => this.album = albumData);
    })

  }

  ngOnDestroy(): void {
    this.albumSub.unsubscribe();
    this.paramsSub.unsubscribe();
    this.addFavSub.unsubscribe();
  }

}
