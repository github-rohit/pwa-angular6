import { Post } from './../../models/post';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input('post') post: Post;
  @Input('isOwner') isOwner;
  @Input('displayName') displayName;

  constructor(private sanitization: DomSanitizer) { }

  getImageUrl(url) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${url})`);
  }

}
