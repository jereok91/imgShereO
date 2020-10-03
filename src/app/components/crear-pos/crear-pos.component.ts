import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from "../../provider/post.service"
import { Post } from "../../interfaces/post";
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-pos',
  templateUrl: './crear-pos.component.html',
  styleUrls: ['./crear-pos.component.scss']
})
export class CrearPosComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private postService: PostService, private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  public uoploadPost = this.fb.group(
    {
      description: ['', [Validators.maxLength(300)]],
      image: [''],
     

    }
  )

  public imageError: string = null;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public sw: boolean = false;  // Manejo animacion de caraga 
  public mensajeRevision: string;


  CrearPost(content) {
    this.sw = true
      if((this.uoploadPost.controls.description.value == null || this.uoploadPost.controls.description.value == "")  && (this.uoploadPost.controls.image.value == null|| this.uoploadPost.controls.image.value == "")){
        this.mensajeRevision= "Por favor diligencia uno de los dos campos "
        this.sw = false

        
      } else{

        this.mensajeRevision = " ";
        var post: Post = this.uoploadPost.value;
        if (this.cardImageBase64) {
          post.image = this.cardImageBase64;
        } else {
          post.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABNgAAABeCAMAAADGzlmYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUI2OEExRjUwMzQ5MTFFQkE2NzNBQjI0MDdCQTY1QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUI2OEExRjYwMzQ5MTFFQkE2NzNBQjI0MDdCQTY1QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQjY4QTFGMzAzNDkxMUVCQTY3M0FCMjQwN0JBNjVBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQjY4QTFGNDAzNDkxMUVCQTY3M0FCMjQwN0JBNjVBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoxgnF8AAAMAUExURSS19JPd9KqUk42OkOb1/kzB9aHh9MBzF+rs9f35+v/+/jGw8qjN7//GrEy98+Pm80G789zj8n6+723U+udrIP/ezgCn8K+Xd1W18b99W5rf8/Pz+PPw927e/7qlpwar8b7X8E2z8XPN9f/s4peKdwCi82rR9/7Os7lqEr1tCfm4ibl5MGjO9+Pq9rfr/nLW+QCm8oTa9syhcf/8/C+z8yCw8//m2V638cqEO+r8/+iQa1Ofzf/x7NGnjP/Sus/e8eWzq2XR+pPG7z2282DL9v/18YnV9CWu8aVUCnDT98rc8nK78PDc3MZ1GnvZ99vKzg2z9Wnb/ojC7//49vHv9gCl81vK967B1ACq8fzm3kSw8ACt9X3b+NmxhnfX+KHL8H7Y9vz4+l3G9f/39XnX93HX+cByEnbY+/laAFXC9HjY92a58Pj2+f/j1svy//+xfnfX97rV8lPG9u/LtPzk2blmAPzKq2TH9ZOxxf/axr1jACGs8fz19/jk5Pj5/GLJ9f/WwVu/9jgtNMttALTS8Pnd08m4t6JPCFrI9sja8ACt//PWzIHd9+Pt+hao64jb9Ynf9/PSvMPX8P/+/Z3I73rV+fmJT8J1GG3L9JtEAMRxBl7N+Xfb+VfF9XvZ9vGZUY7i/9yzh5vW/HjP9P/p3gCg9PP+///v56mggo/Z89Lj9cCierVkA3TF9r5yFqJOALK6xfv7/Qaz/nnU9mrV9//7+WXP+vZiCXzR9fbs7wCm/75xEtXg8bLU87FkAf/7+4DT9ctsAMJxCsiBNQCo8up6PPTk2nvb94HY9fv////z7+bo8gCv/23g/3za9xSu8gCh9ACl8v39/n7c+HbW+GTM9lXE9cnk/9TBwTaWw/XQxsXg+evw+b11J7ZyPwC+/wC1///9/derfLPb/zC59LpoALdnCm657ufDuo/c+qLV/+XBofrEoDml3h+p65a1rfvx8ffz9+29mvjs6AC1///BrM7q/5TJ+Tu/9a7P8H/b9rnd9pg+AH/I/wCq/////xPdDa0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAALvklEQVR42uzdf1xT9R7HcaZujo3G2BjipMbAjbxOD1zOxIokGDAntYxf7Q4cAwbmAWpoV8N51Xpg4Y0uBpTmrzJRpG6WJfZDb+vSihTdwDFu3dQe61J2r926dOte8Hbv7hmCkvTj/tPtbI/308fDx3b24J/PH6/H97tzdk6ID+DHwSsvxxDgpxGCEcCPpLNGgiEAwgZBFrYFCBsgbBA0RWvP8vHorWje6FbUe6IdIwGEDQJe2+qsy695bavxVRsgbBD4eO3xvuT41dd8mpDly6s5wcNEAGGDICgbLy9h0YnO0PiEOh4PXQOEDYJC3saaFv/XbFl1OIEACBsEiQV1Y+u01I0nMA1A2CAoFmyS+LFX3jYs2QBhg0DX0l4nycqSnPBlJXz6qcTra6+jV22SLAwGEDYIXLzUmra8LEmqr+3JJ5/8Wbk/bFk1bbjiAxA2COglW7KX1ylZ4ItPyGtPyPLW1Ph49BHMBRA2CPRlW1udf6lWXmfPWoSTB4CwQXAor0tNrfPFSzrbNmKxBggbBIkFkhN01WqyRq/2QNsAYYPA34nGt+dJJDXl8ZI2SXJNKsIGCBsEwXItoZwXf8+ilr/fszrLF78a13oAwgYBz5t6gufr/OTm29+9eRPPl5yKsAHCBoG/Ex39meitU6+bct3f6G0oDxd7AMIGQeLVKVOmPmjHHABhgyBSPvWBB97FGABhg6DakL764O2hGAMgbBBcZSvtxIUegLABACBsAAAIG/y/JM/izosZ/YYNm1FA2CAY8LgjuSnR0SmisHD72KHQ/HnzZiVjNICwAZPb9T2frRuJVg+Xbdu2gb3UmMH1H8mvF9Ghq8pNq8bkAGEDRnqk/pnv+zj/fNGKbKlUypJKOzwh0UuS7ZujXcMb4raVDbpEPRgfIGzAQPPoPeaxSbtK/9NDh555ZsjLjV6qlEqbmhrpf6ykwkHjyIhhOInD4dCteyXEeAwDBIQNmLZa+xc3pXXdq3Lu6UkfhcbmyOWisPOkeEuS2Ul4MpX6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";
        }
  
        post.applicantcode = this.postService.applicantcode;
        post.iduser = parseInt(localStorage.getItem("iduser"));
        post.token = localStorage.getItem("token");
  
  
  
        this.postService.CrearPost(post).subscribe((data) => {
  
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
            this.router.navigate(["/home"])
          }, (reason) => {
            this.router.navigate(["/home"])
          });
  
  
          this.sw = false
  
        },
          e => {
            console.log(e);
            this.sw = false
          },
          () => { });
      }


    

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
    this.uoploadPost.controls.image.reset();
  }



}
