import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any = null;
  searchQuery: any = null;

  private querySub;
  private resultSub;

  constructor(private route: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {

    this.querySub = this.route.queryParams.subscribe(queries => {

      this.searchQuery = queries.q;
      this.resultSub = this.musicService.searchArtists(this.searchQuery).subscribe(searchData => {
        this.results = searchData.artists.items.filter((value) => { return value.images.length > 0 });
      });

    });

  }

  ngOnDestroy(): void {

    this.resultSub.unsubscribe();
    this.querySub.unsubscribe();

  }

}
