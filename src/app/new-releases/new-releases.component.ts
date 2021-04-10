import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases: Object = null;

  private musicSub;

  constructor(private musicService: MusicDataService) {}

  ngOnInit(): void {

    this.musicSub = this.musicService.getNewReleases().subscribe(data => this.releases = data.albums.items);

  }

  ngOnDestroy(): void {
    this.musicSub.unsubscribe();
  }

}
