import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from './users.service';
import { UserDto } from '@app/shared/models/user';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() user: UserDto = new UserDto();

  userList: any = null;
  filterText: string = ''; 

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void { 
    this.getUsers();
  }

  onLogout(): void {
    this.authService.logout(); 
  }

  getUsers() {
    this.userList = this.userService.getUsers().subscribe({
      next: (res) => {
        this.userList = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDelete(user: UserDto) {
    if (confirm('Do you want to delete this user?')) {
      setTimeout(() => {
        this.userList = this.userList.filter((x: { id: number; }) => x.id != user.id);
      }, 2000);
      setTimeout(() => {
        alert('User successfully deleted')
      }, 2000);

    } else {
      console.log('Nothing happen');
    }
  }
}