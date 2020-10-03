import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from "../provider/user.service";


@Injectable({
  providedIn: 'root'
})
export class UserAutGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  
  canActivate() {


    if (this.userService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
    
}
  

