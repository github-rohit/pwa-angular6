import {throwError as observableThrowError,  Observable } from 'rxjs';
import { UnauthorizedError } from './../errors/unauthorized-error';
import { HttpClient } from '@angular/common/http';
import { AppError } from './../errors/app-error';
import { NotFoundError } from './../errors/not-found-error';
import { BadInput } from './../errors/bad-input';
import { map, catchError } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';

export class DataService {
  static pendingReqCount = 0;
  static pendingReq: EventEmitter<number> = new EventEmitter();

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(map((response: any) => response), catchError(this.handleError));
  }

  getByQuery(query: string) {
    return this.http.get(this.url + '?'  + query)
    .pipe(map((response: any) => response), catchError(this.handleError));
  }

  getById(id: string) {
    return this.http.get(this.url + '/' + id)
    .pipe(map((response: any) => response), catchError(this.handleError));
  }

  getByIdWithAuth(id: string, resource) {
    return this.http.post(this.url + '/' + id, resource)
    .pipe(map((response: any) => response), catchError(this.handleError));
  }

  create(resource) {
    return this.http.post(this.url, resource)
    .pipe(map((response: any) => response.json()), catchError(this.handleError));
  }

  update(id, resource) {
    return this.http.patch(this.url + '/' + id , resource)
    .pipe(map((response: any) => response), catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
    .pipe(map((response: any) => response), catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return observableThrowError(new BadInput(error));
    }

    if (error.status === 401) {
      return observableThrowError(new UnauthorizedError(error));
    }

    if (error.status === 404) {
      return observableThrowError(new NotFoundError());
    }

    return observableThrowError(new AppError(error));
  }

}
