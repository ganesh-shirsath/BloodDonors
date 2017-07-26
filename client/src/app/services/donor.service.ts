import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DonorService {
  authToken: any;
  donor: any;

  constructor(private http: Http) {}

  registerDonor(donor) {
    let header = new Headers();
    this.authToken = localStorage.getItem('id_token');
    header.append('Content-Type','application/json');
    header.append('x-access-token',this.authToken);
    return this.http.post('api/donors/register',donor, {headers:header})
      .map(res => res.json())
  }

  searchDonors(query) {
    let header = new Headers();
    this.authToken = localStorage.getItem('id_token');
    header.append('Content-Type','application/json');
    header.append('x-access-token',this.authToken);
    return this.http.post('api/donors/search?donorSkip='+query.skipValue'&donorLimit='+query.limitValue, {headers:header})
      .map(res => res.json())
  }
}
