import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean> (false);

  constructor(
    private router: Router,
  ) {}

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable(); 
  }

  logout():void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); 
    this.router.navigate(['']);
  }
  
  login(username:string, password:string):void {
    if(this.checkUsernameAndPassword(username, password)) {
      this.loggedIn.next(true); 
      this.router.navigate(['users']);
    }
  }

  checkUsernameAndPassword(username: string, password: string) {
    if (username == 'test' && password == 'test') {
      localStorage.setItem('token', 'secreto');
      alert("Logged SuccessFull");
      return true;
    }
    alert("Login Failed");
    return false;
  }
}