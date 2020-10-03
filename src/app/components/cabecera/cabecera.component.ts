import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/provider/user.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  public isMenuCollapsed = true;
  
  logout() {

    this.userService.logout();

  }

  isloger() : boolean {
    if(this.userService.isLoggedIn())
    {
      return true;
    }
    return false;
  }
}
