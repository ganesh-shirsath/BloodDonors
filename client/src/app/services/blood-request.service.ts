import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from "rxjs/Observable";
import { BloodRequest } from '../model/blood-requests';

@Injectable()
export class BloodRequestService {
  authToken: any;

  constructor(
    private http: Http
  ) {}

  registerBloodrequest(bloodReq) {
    let header = new Headers();
    this.authToken = localStorage.getItem('id_token');
    header.append("Content-Type","application/json");
    header.append("x-access-token",this.authToken);
    return this.http.post('api/blood/blood-request',bloodReq, {headers: header})
      .map(res => res.json());
  }

  getBloodRequests() {
    let header = new Headers();
    this.authToken = localStorage.getItem('id_token');
    header.append("Content-Type","application/json");
    header.append("x-access-token",this.authToken);
    return this.http.get('api/blood/blood-requests', {headers: header})
      .map(res => res.json());
  }

  addCommentToBloodRequest(commentObj) {
    let header = new Headers();
    this.authToken = localStorage.getItem('id_token');
    header.append("Content-Type","application/json");
    header.append("x-access-token",this.authToken);


    return this.http.post('api/blood/comment/add',commentObj, {headers: header})
      .map(res => res.json());
  }
}
