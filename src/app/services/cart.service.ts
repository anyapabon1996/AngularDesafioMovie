import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICart } from '../models/cart.model';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    //Inyectamops el servicio de movie
    private movieService : MovieService,

    //Inyectamos el http client
    private httpClient: HttpClient,
  ) { }

  private url = environment.userRestAPI + 'cart';

  //Este será nuestro repositorio de carrito
  moviesInCart :ICart[] = [];

  //Iniciamos una variable vacia de carrto
  cartMovie :ICart | undefined= {
    id: -1,
    title: '',
    image: ''
  }

  //Devolvemos todos los elementos que tenemos agregado
  getFromCar(): Observable<ICart[]>{
    // if(localStorage['cart'] != null) return of(JSON.parse(localStorage['cart']));
    // else return of(undefined);

    return this.httpClient.get<ICart[]>(this.url);

  }

  flag: boolean = false;

  //Metodo para agregar al carrito
  addMovie(cartMovie: ICart): Observable<ICart> {

    return this.httpClient.post<ICart>(this.url, cartMovie);
  }

  //Metodo para eliminar del carrito
  deleteMovie(id : Number): Observable<ICart>{

    return this.httpClient.delete<ICart>(`${this.url}/${id}`);
  }

  //Funcion para limpiar todo el carrito
  // clerCar():Observable<ICart[]>{

  //   // //Elimina todo del carrito
  //   // localStorage.removeItem('cart');

  //   // this.moviesInCart = [];

  //   console.log('llega');



  // }
}
