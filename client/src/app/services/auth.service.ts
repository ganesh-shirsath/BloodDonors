import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let header = new Headers();
    this.lodaeToken();
    header.append('Content-Type','application/json');
    header.append('x-access-token',this.authToken);
    return this.http.post('api/users/register',user, {headers: header})
      .map(res => res.json());
  }

    authenticateUser(user) {
    let header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('api/users/authenticate',user, {headers: header})
      .map(res => res.json());
  }

  /*getUserProfile() {
    let header = new Headers();
    var user = localStorage.getItem('user');
    var d = /"/gi
    user = user.replace("{", "").replace("}", "").replace(d, "")
    var properties = user.split(',');
    var objUser = {};
    properties.forEach(function(property) {
      var tup = property.split(':');
      objUser[tup[0]] = tup[1];
    });

    console.log("user type ---->"+typeof objUser)
    console.log("user  ---->"+ objUser)
    console.log("user is  ---->",objUser['id'])
    header.append('Content-Type','application/json');
    this.lodaeToken();
    header.append('x-access-token',this.authToken);
    header.append('userId', objUser['id']);
    return this.http.get('http://localhost:3000/users/profile', {headers: header})
      .map(res => res.json());
  }*/

  lodaeToken()  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    console.log("Logged in.....",tokenNotExpired());
    return tokenNotExpired('id_token');
  }

  storeUserDate(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('loginUser',user);
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
