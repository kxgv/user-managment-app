import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '@app/shared/models/user';
import { Observable } from 'rxjs';
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
    return this.http.get<UserDto>(this.apiURL + `/${id}`);
  }

  public saveUser(user: UserDto) {
    return this.http.post(`${this.apiURL}/users`, user);
  }

  public updateUser(id: string|number, updateUser: UserDto) {
    return this.http.put(`${this.apiURL}/users/${id}`, updateUser);
  }
  
}