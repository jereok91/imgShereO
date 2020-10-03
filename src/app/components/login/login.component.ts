import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from "../../provider/user.service"
import { User } from "../../interfaces/user";
import * as _ from 'lodash';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public advertenciaMensajeRegistro: string="";
  public AdvertenciarevisarLogin: string ="";
  public model: NgbDateStruct;
  public sw = false; // interruntor para cargando respuesta  caradaor boton 
  public swLogin= false; // interruntor login animacion 


  public loginform = this.fb.group(
    {
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    }
  )

  public registroUser = this.fb.group(
    {
      
      password: ['', [Validators.required,Validators.maxLength(64)] ],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      fullname: ['', [Validators.required,Validators.maxLength(100)]],
      nickname: ['', [Validators.required,Validators.maxLength(20)]],
      birthdate: ['', Validators.required],
      image: ['', Validators.required], 


    }
  )
  


  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private router: Router, private userservice: UserService) {

  }



 



  registrarUsuario() {

    this.sw = true;
    var userForm: User = this.registroUser.value;
    userForm.birthdate = this.registroUser.controls.birthdate.value.year + "/" + this.registroUser.controls.birthdate.value.month + "/" + this.registroUser.controls.birthdate.value.day;
    userForm.applicantcode = this.userservice.applicantcode;
    userForm.image = this.cardImageBase64;



    // Conneción con servicio

    this.userservice.registrar(userForm).subscribe(
      (data) => {

        switch (data.code) {
          case 200:
            // estado Donde
           
            this.sw = false;
            this.registroUser.reset();
            this.removeImage();
           
            this.router.navigate(['/home']);
            this.modalService.dismissAll();
            this.advertenciaMensajeRegistro= "";
            break;

          case 405:
            // Password o Email Invalidado 
            this.advertenciaMensajeRegistro= "Password o Email Invalidado";
            this.sw = false;

            break;
          case 411:
            //E-mail usado
            this.advertenciaMensajeRegistro= "E-mail usado";
            this.sw = false;
            break;

          case 412:
            // Nikname Utilizado 
            this.advertenciaMensajeRegistro= "Nikname usado";
            this.sw = false;
            break;


          default:
            this.sw = false;
            this.advertenciaMensajeRegistro= "Revisar que todos los campos estén diligenciados correctamente";
            break;
        }

   




      }, e => {
        console.log(e);
      }, () => { });
  }

  paginaRegistrar(modal) {


    //this.router.navigateByUrl("create-accont");


        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
        // this.router.navigate(["/home"])
        this.registroUser.controls.image.reset();
        this.removeImage();
      }, (reason) => {
        // this.router.navigate(["/home"])
        this.registroUser.controls.image.reset();
        this.removeImage();
      });
  }



  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'El tamaño máximo permitido es ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Solo se permiten imágenes ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Dimensiones máximas permitidas' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.registroUser.controls.image.reset();
  }




  login(){
    this.swLogin= true;

    this.userservice.login(this.loginform.value)
    .subscribe(
      (data) => {
        if(data.code == 405){
            // Password o Email Invalidado 
            this.AdvertenciarevisarLogin= "Password o Email Invalidado";
            this.swLogin = false;
            
        }
        
        if (data.code == 200) {
          
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('iduser', data.data.iduser);
          localStorage.setItem('image', data.data.image);
          localStorage.setItem('fullname', data.data.fullname);
          localStorage.setItem('nickname', data.data.nickname);
          this.router.navigate(['/home']);
          this.AdvertenciarevisarLogin= "";
          this.swLogin = false;

        } 
       
   
      },
      err => console.log(err)
    )
  }




  ngOnInit(): void {
  }

}
