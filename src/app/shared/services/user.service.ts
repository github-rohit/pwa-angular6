import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class UserService extends DataService {

  constructor(http: HttpClient) {
    super('/api/author', http);
  }

}
