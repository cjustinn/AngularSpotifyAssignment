import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: Object = [];
  artist: any = {};

  private albumsSub;
  private artistSub;
  private paramsSub;

  constructor(private route: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {

    this.paramsSub = this.route.params.subscribe(paramData => {
      
      this.albumsSub = this.musicService.getAlbumByArtistId(paramData.id).subscribe(albumData => {

        // I got the idea behind this filter from: https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
        const seen = new Set();
        const _albums = albumData.items.filter(album => {
          const duplicate = seen.has(album.name);
          if (!duplicate) { seen.add(album.name); }

          return !duplicate;
        });

        this.albums = _albums;

      });
      this.artistSub = this.musicService.getArtistById(paramData.id).subscribe(artistData => this.artist = artistData);

    });

  }

  ngOnDestroy(): void {
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

}
