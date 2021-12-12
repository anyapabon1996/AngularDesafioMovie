import { Injectable } from '@angular/core';
// VSC ME PUSO LA LINEA 3, Q POR ALGUNA RAZÓN ROMPIÓ TODO MI CÓDIGO!!!!!
// import { moveCursor } from 'readline';
import { Observable, of } from 'rxjs';
import { ICart } from '../models/cart.model';
import { IMovie } from '../models/movie.model';
import { moviesMock } from './movies.mock'


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //Inicializamos un carrito de peliculas
  rentalMovie :ICart[] = [];

  //Iniciamos una variable vacia de carrto
  cartMovie :ICart = {
    movieId: 0,
    title: ''
  }

  //Esto nos devuelve todas las pelis de stock
  getMovies(): Observable<IMovie[]>{
    return of(moviesMock);
  }

  //Esto agrega una peli al carrito del usuario
  addMoviestoCart(movie :IMovie): Observable<ICart[]>{

    this.cartMovie.movieId = movie.id;
    this.cartMovie.title = movie.title;

    this.rentalMovie.push(this.cartMovie);

    return of(this.rentalMovie);
  }

  constructor() { }
}


