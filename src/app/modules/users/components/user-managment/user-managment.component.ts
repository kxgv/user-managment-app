import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/auth.service';
import { UserDto } from '@app/shared/models/user';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss']
})
export class UserManagmentComponent implements OnInit {

  private isValidEmail = /\S+@\S+\.\S+/;
  private isValidWebSite = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  user: UserDto = {
    id: 0,
    name: '',
    username: '',
    email: '',
    website: ''
  }

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    website: ['', [Validators.required, Validators.pattern(this.isValidWebSite)]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private userService: UsersService,
  ) { }

  public edit: boolean = false; 

  ngOnInit(): void {

    const params = this.activatedRouter.snapshot.params; 

    if(params['id']) {
      this.userService.getUser(params['id']).subscribe(
        res => {
          this.user = res; 
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  onBack(): void {
    this.router.navigate(['users']);
  }

  onSave() {
    this.userService.saveUser(this.user).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    ); 
    alert('User saved!');
    this.router.navigate(['users']);
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );
    alert('User saved!');
    this.router.navigate(['users']);
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
