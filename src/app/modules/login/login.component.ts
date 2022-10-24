import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['',
      [Validators.required]],
    password: ['',
      [Validators.required]],
  });

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    let username: string = this.loginForm.value.username!;
    let password: string = this.loginForm.value.password!;
    this.authService.login(username, password)
  }

  getErrorMessage(field: string): string {
    let message = '';

    if(this.loginForm.get(field)?.errors?.['required']) {
      message = `Can't be empty`;
    }
    return message; 
  }

  isValidField(field: string): boolean {
    return (
      (this.loginForm.get(field)?.touched === true  || this.loginForm.get(field)?.dirty === false) && !this.loginForm.get(field)?.valid
    );
  }
}
