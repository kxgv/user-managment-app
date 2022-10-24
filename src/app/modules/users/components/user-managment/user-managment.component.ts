import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/auth.service';
import { UserDto } from '@app/shared/models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss']
})
export class UserManagmentComponent implements OnInit {

  private isValidEmail = /\S+@\S+\.\S+/;
  private isValidWebSite = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  apiURL = environment.FAKE_API;

  user: any = null;

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    website: ['', [Validators.required, Validators.pattern(this.isValidWebSite)]],
  });

  userDetails: any = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private readonly http: HttpClient,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRouter.snapshot.params['id']);
    this.userService.getUser(this.activatedRouter.snapshot.params['id']).subscribe(
      (data) => {
        this.user = data; 
      },
   );
  }

  onLogout(): void {
    this.authService.logout();
  }

  onBack(): void {
    this.router.navigate(['users']);
  }

  onSave(name: string): Observable<UserDto> {
    const body = { name: name }
    alert("User saved!")
    this.router.navigate(['users']);
    return this.http.post<UserDto>(this.apiURL, body);
  }

  getErrorMessage(field: string): string {
    let message = '';

    if (this.userForm.get(field)?.errors?.['required']) {
      message = `Can't be empty`;
    } else if (this.userForm.get(field)?.hasError('pattern')) {
      message = 'Is not valid';
    }
    return message;
  }

  isValidField(field: string): boolean {
    return (
      (this.userForm.get(field)?.touched === true || this.userForm.get(field)?.dirty === false) && !this.userForm.get(field)?.valid
    );
  }
}
