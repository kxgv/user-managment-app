import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  apiURL = environment.FAKE_API;

  public getUsers() {
    return this.http.get(this.apiURL);
  }

  public getUser(id: number) {
    return this.http.get(this.apiURL + `/${id}`);
  }

}