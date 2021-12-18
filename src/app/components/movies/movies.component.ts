import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { ICart } from 'src/app/models/cart.model';
import { IMovie } from 'src/app/models/movie.model';
import { CartService } from 'src/app/services/cart.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  //Instanciamos una variable para accedr a los servicios
  constructor(
    private movieService :MovieService,

    //Inyectamos el servicio de router
    private router : Router,

    private cartService : CartService,
    ) { }

  //Suscripcion
  private subscription : Subscription | undefined;

  //Instanciamos un array para guardar todas las pelis del mock
  allMovie: IMovie[] = [];

  //formulario para buscar pelicula
  lookMovieForm = new FormGroup ({
    movieName : new FormControl('')
  })

  //variable control
  //flag :boolean = false;

  //Variable para buscar una pelicula
  movieName :string = '';

  ngOnInit(): void {
    //Pasamos todos las pelis del mock al array
    this.subscription =  this.movieService.getMovies().subscribe(movie => this.allMovie = movie);
  }

  ngOnDestroy(): void {
    //Nos desuscribimos
    this.subscription?.unsubscribe();
  }

  //Al darle click en la info, vamos a redirigirnos al componente de la informacion
  getInfo(id :number){
    this.router.navigate(['info', id]);
  }

  //Funcion que devuelve el objeto de la pelicula buscada
  lookMovie(){

    this.movieName = this.lookMovieForm.controls['movieName'].value;

    let i = this.allMovie.findIndex(user => user.title == this.movieName);

    if (i != -1){
      console.log(this.allMovie[i]);
    } else {
      console.log('Soon we will have this movie ;) ');
    }

  }

  index? :number = undefined;

  //Función para agregar al carrito.
  addToCart(id :number){

    //Esta función no sé cómo meterla dentro del subscription
    // this.subscription?.add(this.cartService.addMovie(id));

    //Así sí agarra
    this.cartService.addMovie(id);

    // this.router.navigate(['cart', id]);

    // //Nos aseguramos que la peli no este ya agregada
    // if (this.moviesInCart.length != 0) {
    //   this.index = this.moviesInCart.findIndex(movieInto => movieInto.movieId == id);
    // } else this.index = -1;

    // if (this.index == -1) {
    //   //Buscamos la peli en el array de pelis
    //   this.index = this.allMovie.findIndex(movie =>
    //     movie.id == id
    //   );

    //   if (this.index != -1) {
    //     //Llamamos al servicio
    //     this.movieService.addMoviestoCart(this.allMovie[this.index]).subscribe(moviesFromService => {
    //       this.moviesInCart = moviesFromService;
    //     });

    //     //Le imprimimos por consola todas las peliculas que tiene
    //     this.moviesInCart.forEach(movie => console.log(movie));

    //     console.log(this.moviesInCart.length);

    //     //si no se cumple la busqueda
    //   } else console.log('Search Error');

    // } else console.log('You already have rented this movie')
  }
}
