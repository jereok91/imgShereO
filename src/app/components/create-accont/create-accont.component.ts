import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { User } from 'src/app/interfaces/user';
import { UserService } from "../../provider/user.service";

@Component({
  selector: 'app-create-accont',
  templateUrl: './create-accont.component.html',
  styleUrls: ['./create-accont.component.scss']
})
export class CreateAccontComponent implements OnInit {

  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public advertenciaMensajeRegistro: string="";
  public sw: boolean= false;
  public dataUser: any= {};

  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private router: Router, private userService :UserService) { }

  ngOnInit(): void {

    this.datosUser(this.userService.getIdUserLoger().toString());


  }
  public UserForm = this.fb.group(
    {
      
      password: [''],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      fullname: ["", [Validators.required,Validators.maxLength(100)]],
      nickname: ["", [Validators.required,Validators.maxLength(20)]],
      birthdate: ["", Validators.required],
      image: ["", Validators.required], 

      
    }
  )

  datosUser(id){
    
    
    this.userService.VerUsuarioPorID(id).subscribe(
      (data)=>{
        this.dataUser= data.data;
       
        this.UserForm.controls.email.setValue(this.dataUser.email);
        this.UserForm.controls.fullname.setValue( this.dataUser.fullname);
        this.UserForm.controls.nickname.setValue( this.dataUser.nickname);
        this.UserForm.controls.birthdate.setValue(new Date(this.dataUser.birthdate.timestamp));
      },
      (e) => { console.log(e)}
    );

    


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
       
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  public removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.UserForm.controls.image.reset();
  }


  public actualizarUser(){

      this.sw = true;
      var userForm: User = this.UserForm.value;
      userForm.birthdate = this.UserForm.controls.birthdate.value.year + "/" + this.UserForm.controls.birthdate.value.month + "/" + this.UserForm.controls.birthdate.value.day;
      userForm.applicantcode = this.userService.applicantcode;
      userForm.image = this.cardImageBase64;

      console.log(userForm);
    
  
      // Conneción con servicio
  
      this.userService.updateUser(userForm).subscribe(
        (data) => {
          console.log(data);
          switch (data.code) {
            case 200:
              // estado Donde
             
              this.sw = false;
              this.UserForm.reset();
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


}
