import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class CommentService extends DataService {
  params: string;

  constructor(http: HttpClient) {
    super('/api/comment', http);
  }

}
