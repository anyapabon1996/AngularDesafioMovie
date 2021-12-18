import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICart } from '../models/cart.model';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private movieService : MovieService
  ) { }

  //Este será nuestro repositorio de carrito
  moviesInCart :ICart[] = [];

  //Iniciamos una variable vacia de carrto
  cartMovie :ICart = {
    movieId: 0,
    title: '',
    image: ''
  }

  //Devolvemos todos los elementos que tenemos agregado
  getFromCar(): Observable<ICart[] | undefined>{
    if(localStorage['cart'] != null) return of(JSON.parse(localStorage['cart']));
    else return of(undefined);
  }

  //Metodo para agregar al carrito
  addMovie(id : Number): Observable<ICart[]> {

    //Si hay algo de productos guardados, los recibimos del local Storage
    if (localStorage['cart'] != null) {
      this.moviesInCart = JSON.parse(localStorage['cart']);
    }

    //Definimos una variable controlador
    let i = 0;
    //Vemos si ya hay una peli en el carrito.
    if (this.moviesInCart.length != 0) {
       i = this.moviesInCart.findIndex(index => index.movieId == id);
    } else i = -1;

    //Si no tenia esa peli, la agregamos
    if (i == -1){
      this.movieService.getMovieById(id).subscribe(m => {

        if (m != undefined) {

          this.cartMovie.movieId = m.id;
          this.cartMovie.title = m.title;
          this.cartMovie.image = m.image;

          this.moviesInCart.push(this.cartMovie);

          //Lo pasamos al local
          localStorage['cart'] = JSON.stringify(this.moviesInCart);

          console.log('Se ha agregado con exito la pelicula ' + this.cartMovie.title);
        }
        else
          alert('Error during process');
      });

    //Si ya la tenia, entonces le decimos que no
    } else alert("You already have this movie");

      return of(this.moviesInCart);
  }

  //Metodo para eliminar del carrito
  deleteMovie(id : Number): Observable<ICart[]>{
    //Pasamos todos los objetos del carrito
    if (localStorage['cart'] != null) this.moviesInCart = JSON.parse(localStorage['cart']);

    let index = this.moviesInCart.findIndex(m => m.movieId == id);

    if (index != -1){
      //Eliminamos la peli seleccionada
      this.moviesInCart.splice(index, 1);

      //Pasamos al local la lista actualizada
      localStorage['cart'] = JSON.stringify(this.moviesInCart);

    } else alert ("this movie doesn't exist in your car");

    return of(this.moviesInCart);
  }

  //Funcion para limpiar todo el carrito
  clerCar():Observable<ICart[]>{

    //Elimina todo del carrito
    localStorage.removeItem('cart');

    this.moviesInCart = [];

    return of(this.moviesInCart);
  }
}
