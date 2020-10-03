import { Component, OnInit } from '@angular/core';
import { PostService } from "../../provider/post.service";
import { UserService } from "../../provider/user.service";
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { ComentService } from "../../provider/coment.service";
import { Coment } from "../../interfaces/coment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public swDelete: boolean = false;
  public swUpdate: boolean = false;
  public swPasw: boolean = false;
  public publicaciones: any = [];
  public dataUser: any = null;
  public dataCoemntIdPost: any;
  bootnok = false; // vailidar actividad del boton confirmar cambiar contraseña

  constructor(private fb: FormBuilder, private postService: PostService, private userService: UserService, private modalService: NgbModal, private comentService: ComentService) { }


  public actualizarForm = this.fb.group(
    {
      description: ['', [Validators.maxLength(300), Validators.required]],
    }
  )

  public comentForm = this.fb.group(
    {
      description: ['', [Validators.maxLength(200), Validators.required]],
    }
  )
  public passForm = this.fb.group(
    {
      password: ['', [Validators.maxLength(64), Validators.required]],
    }
  )


  ngOnInit(): void {

    this.loadDtaUser(this.userService.getIdUserLoger())
    this.swUpdate = true
    this.listPOst();




  }

  loadDtaUser(id) {
    this.userService.VerUsuarioPorID(id).subscribe(
      (data) => {
        this.dataUser = data.data;
      },
      (e) => { console.log(e) }
    );


  }

  abrirModalEditarPost(post: Post, content) {

    // stear el control con los datos del post 
    this.actualizarForm.controls.description.setValue(post.description);

    //abrir modal 
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      if (result == "Modificar") {
        post.description = this.actualizarForm.controls.description.value;
        this.ActualizarPost(post)
      }
      this.actualizarForm.reset();
    }, (reason) => {
      this.actualizarForm.reset();
    });
  }

  abrirModalComentarPost(post: Post, modalComentario) {

    var coment: any = {

      description: this.comentForm.controls.description.value,
      idpost: parseInt(post.idpost),
      iduser: post.iduser,

    }


    //abrir modal 
    this.modalService.open(modalComentario, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      if (result == "Comentar") {

        coment.description = this.comentForm.controls.description.value
        this.Crearcomentario(coment);

      }
      this.comentForm.reset();
    }, (reason) => {
      this.comentForm.reset();
    });

  }

  logout() {

    this.userService.logout();

  }

  public listPOst() {
    this.swUpdate = true;
    var rq = {
      iduser: localStorage.getItem("iduser"),
      applicantcode: this.postService.applicantcode,
      token: localStorage.getItem("token"),
    }

    this.postService.listarPostPorId(rq).subscribe((Data) => {
      this.publicaciones = Data.data;
      // Validacion para listar de manera correcta los post 
      // if(this.publicaciones.length >3 && this.publicaciones.length > this.sum){
      //   this.sum += 1;
      // }
      console.log(Data)
      this.addItems();
      this.swUpdate = false;

    }, (e) => {
      console.log(e);
      this.swUpdate = false;
    });



  }




  public EliminarPost(post) {
    this.swDelete = true;

    this.postService.EliminarPost(post).subscribe(
      (data) => {

        this.swDelete = false;
        this.sum -= 1;

      },

      (e) => {

        console.log(e)
        this.swDelete = false
      }
    );
    this.publicaciones = [];
    
    this.listPOst();
    this.listPOst();
    this.listPOst();
    this.listPOst();
    this.listPOst();
    this.listPOst();


  
    

  }

  private ActualizarPost(post: Post) {

    this.postService.ActualizarPost(post).subscribe(
      (data) => { },
      (error) => { console.log(error) }
    );

  }




  private Crearcomentario(coment: Coment) {

    this.comentService.CrearComent(coment).subscribe(
      (data) => {

      },
      (e) => {
        console.log(e);
      }
    );

  }

  private EliminarComentario() {

  }

  public listarComentarios(id): any {

    this.comentService.listarComentariosPorIdPost(id).subscribe(
      (data) => {
        console.log(data);
        this.dataCoemntIdPost = data.data;
      },
      (e) => {
        console.log(e)
      }
    );


  }
  cambiarPassOpenModal(modal) {
    this.bootnok = true;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      if (result == "Modificar") {
        // post.description = this.actualizarForm.controls.description.value;
        // this.ActualizarPost(post)
      }
      this.passForm.reset();
    }, (reason) => {
      this.passForm.reset();
    });


  }



  cambiarPass() {
    this.swPasw = true;

    this.userService.cambiarPass(this.passForm.controls.password.value).subscribe(
      (data) => {
        this.swPasw = false;
        this.bootnok = false; // vailidar actividad del boton confirmar cambiar contraseña
        console.log(data)
      },
      (e) => { console.log(e) }
    );

  }

  array = [];
  sum = 3;
  throttle = 300;
  scrollDistance = 4;
  scrollUpDistance = 2;






  addItems() {
    this.array = [];
    if (this.publicaciones.length <= 3) {
      this.sum = this.publicaciones.length;
    }
    for (let i = 0; i < this.sum; ++i) {
      this.array.push(this.publicaciones[i]);
    }
    console.log(this.array)

  }



  onScrollDown() {
    const start = this.sum;
    if (this.sum < this.publicaciones.length) {
      this.sum += 1;
      this.addItems();
    }
  }


}
