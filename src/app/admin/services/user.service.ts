import { HttpClient } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends DataService {

  constructor(http: HttpClient) {
    super('/api/author', http);
  }

}
