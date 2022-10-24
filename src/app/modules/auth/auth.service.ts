import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService(); 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean> (false);

  constructor(private router: Router) {
    //this.checkToken;
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable(); 
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    userToken ? this.logout(): this.loggedIn.next(true);
  }

  logout():void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); 
    this.router.navigate(['']);
  }
  
  login(username:string, password:string):void {
    if(this.checkUsernameAndPassword(username, password)) {
      this.saveToken('secreto');
      this.loggedIn.next(true); 
      this.router.navigate(['users']);
    }
  }

  checkUsernameAndPassword(username: string, password: string) {
    if (username == 'test' && password == 'test') {
      this.saveToken('token');
      alert("Logged SuccessFull");
      return true;
    }
    alert("Login Failed");
    return false;
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

}