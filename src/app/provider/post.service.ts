import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Post } from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public applicantcode = 425180;
  private urlDba: string = "http://apibitwanv1.tk/public/";

  constructor(private http: HttpClient) {

  }

  CrearPost(post: Post){

    const body = new HttpParams()
    .set('token', post.token)
    .set('image', post.image.toString())
    .set('iduser', post.iduser.toString())
    .set('description', post.description.toString())
    .set('applicantcode', post.applicantcode.toString())

    return this.http.post<any>(this.urlDba + `posts/create?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  EliminarPost(rq){
    const body = new HttpParams()
    .set('token', localStorage.getItem("token"))
    .set('idpost', rq.idpost.toString())
    .set('applicantcode', this.applicantcode.toString())

    return this.http.post<any>(this.urlDba + `posts/delete?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

  }

  ActualizarPost(post: Post){

      const body = new HttpParams()
      .set('token', localStorage.getItem("token"))
      .set('likes', post.likes.toString())
      .set('idpost', post.idpost.toString())
      .set('description', post.description.toString())
      .set('applicantcode', this.applicantcode.toString())

  
      return this.http.post<any>(this.urlDba + `posts/edit?applicantcode=${this.applicantcode}`, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
    
  }

  listarPostPorId(rq){

    const body = new HttpParams()
    .set('token', rq.token)
    .set('iduser', rq.iduser.toString())
    .set('applicantcode', rq.applicantcode.toString())

    return this.http.post<any>(this.urlDba + `posts/viewbyiduser?applicantcode=${this.applicantcode}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

}
