import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@app/modules/auth/auth.service';
import { Observable, take , map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLogged.pipe(
      take(1),
      map( (isLogged: boolean) => !isLogged) 
    ); 
  }

}
