import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { RegisterComponent } from './components/register/register.component';

//Aqui van todas las rutas
const routes: Routes = [

  //Info de la peliculas
  {
    path: 'info/:id',
    component: InfoComponent
  },

  //Peliculas
  {
    path: 'movies',
    component: MoviesComponent
  },

  //Pase para el login
  {
    path: 'myAccount',
    component: LoginComponent
  },

  //Registro
  {
    path: 'register',
    component: RegisterComponent
  },

  //Redireccionar a movies
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  //Pase para mi carrito
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
