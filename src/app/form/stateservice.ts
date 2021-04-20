import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dropdown } from '../CommonInterfaces';

@Injectable()
export class StateService {
  constructor(private http: HttpClient) {}

  getStates() {
    return this.http
      .get<any>('assets/states.json')
      .toPromise()
      .then((res) => <dropdown[]>res.states)
      .then((data) => {
        return data;
      });
  }
}
