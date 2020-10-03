import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearPosComponent } from './components/crear-pos/crear-pos.component';
import { CreateAccontComponent } from './components/create-accont/create-accont.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserAutGuard } from './guards/user-aut.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full',

  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login",
    
    }
  },
  {
    path: "updatepf",
    component: CreateAccontComponent,
    canActivate: [UserAutGuard],
    data: {
      title: "Crear Cuenta",
      
    }
  },
  {
    path: "create-post",
    component: CrearPosComponent,
    canActivate: [UserAutGuard],
    data: {
      title: "Crear Post",
      
    }
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [UserAutGuard],
    data: {
      title: "Inicio",
    }
  },
  {
    path:'**',
    redirectTo: "/home",
    pathMatch: 'full',
    data:{
      title: '404 Pagina'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
