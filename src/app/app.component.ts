import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'ImgShare';




  constructor(private router: Router,  
    private activatedRoute: ActivatedRoute,  
    private titleService: Title)
  {
    
  }
  public page404 =true;
  public pidepagina=true;
  
  ngOnInit()
  {
    this.router.events.pipe(  
      filter(event => event instanceof NavigationEnd),  
    ).subscribe(() => {   
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe( (data) => { 

       

        // Logica para eviatar que se observe el pie de pagina cuando se tega un error 404 o contacts y tras paginas pntuales 
        this.page404 =  this.revisarPage404(data.title) ;

        //Envio de title al navegador 
        this.titleService.setTitle(data.title)});  
    });
    
    // transiscion de inicio app
    

  }
  getChild(activatedRoute: ActivatedRoute) {  
    if (activatedRoute.firstChild) {  
      return this.getChild(activatedRoute.firstChild);  
    } else {  
      return activatedRoute;  
    }  
  
  }

   revisarPage404(title: String ): boolean{
    // this.page404=false ; 
    // setTimeout(()=>{console.log("Homa MUndo despues de  3 segndos ")
        
    //     },3000); 


    if (title == "404 Pagina"|| title == "Contactenos" ) {
     
      return true
    }else{
  
      return false
    }
     
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  
}
