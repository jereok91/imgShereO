import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../interfaces/user";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public applicantcode = 425180;

  private urlDba: string = "http://apibitwanv1.tk/public/";
  constructor(private http: HttpClient, private router: Router) {

  }
  registrar(usuario: User) {


    const body = new HttpParams()
      .set('email', usuario.email)
      .set('password', usuario.password)
      .set('applicantcode', usuario.applicantcode.toString())
      .set('nickname', usuario.nickname)
      .set('fullname', usuario.fullname)
      .set('birthdate', usuario.birthdate)
      .set('image', usuario.image)



    var respon = this.http.post<any>(this.urlDba + `users/create?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    return respon;
  }

  login(usuario: User) {

    const body = new HttpParams()
      .set('email', usuario.email)
      .set('password', usuario.password)
      .set('applicantcode', this.applicantcode.toString())




    return this.http.post<any>(this.urlDba + `login?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });


  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('iduser');
    localStorage.removeItem('image');
    localStorage.removeItem('fullname');
    this.router.navigate(['/login']);
  }
  VerUsuarioPorID(iduser) {
   

    const body = new HttpParams()
      .set('token', localStorage.getItem("token"))
      .set('iduser', iduser)
      .set('applicantcode', this.applicantcode.toString())

      return this.http.post<any>(this.urlDba + `users/viewbyid?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });


  }

  getIdUserLoger(){
    return localStorage.getItem("iduser");
  }
  updateUser(usuario: User) {


    const body = new HttpParams()
      .set('iduser', this.getIdUserLoger())
      .set('token', localStorage.getItem("token"))
      .set('applicantcode', usuario.applicantcode.toString())
      .set('nickname', usuario.nickname)
      .set('fullname', usuario.fullname)
      .set('birthdate', usuario.birthdate)
      .set('image', usuario.image)



    var respon = this.http.post<any>(this.urlDba + `users/edit?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    return respon;
  }


  cambiarPass(password){

    const body = new HttpParams()
      .set('token', localStorage.getItem("token"))
      .set('iduser', localStorage.getItem("iduser"))
      .set('password', password)
      .set('applicantcode', this.applicantcode.toString())

      return this.http.post<any>(this.urlDba + `users/changepassword?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

  }

}
