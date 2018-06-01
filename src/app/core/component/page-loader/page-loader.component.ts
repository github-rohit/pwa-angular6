import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../shared/services/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {
  @Input('show') show = false;

  constructor(http: HttpClient ) { }

  ngOnInit() {
    DataService.pendingReq.subscribe((count) => {
      if (count === 0) {
        // this.show = false;
      } else {
        // this.show = true;
      }
    });
  }
}
