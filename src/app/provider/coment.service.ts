import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from "@angular/common/http";
import{ Coment } from "../interfaces/coment";
import{UserService} from "../provider/user.service";
import { Router } from '@angular/router';
import { from } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ComentService {
  public applicantcode;

  private urlDba: string = "http://apibitwanv1.tk/public/";
  constructor(private http: HttpClient, private router: Router, userService:UserService) {
    this.applicantcode= userService.applicantcode;
  }


  public CrearComent(coment: Coment){

    const body = new HttpParams()
    .set('token', localStorage.getItem("token"))
    .set('idpost', coment.idpost.toString())
    .set('iduser', coment.iduser.toString())
    .set('description', coment.description.toString())
    .set('applicantcode', this.applicantcode.toString())

    return this.http.post<any>(this.urlDba + `comments/create?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

  }

  listarComentariosPorIdPost(idpost: string){

    const body = new HttpParams()
    .set('token', localStorage.getItem("token"))
    .set('idpost', idpost.toString())
    .set('applicantcode', this.applicantcode.toString())
 


    return this.http.post<any>(this.urlDba + `comments/viewbypost?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

  }


}
