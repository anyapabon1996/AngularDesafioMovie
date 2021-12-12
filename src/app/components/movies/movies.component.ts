import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICart } from 'src/app/models/cart.model';
import { IMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  //Instanciamos una variable para accedr a los servicios
  constructor(private movieService :MovieService) { }

  //Instanciamos un array para guardar todas las pelis del mock
  allMovie: IMovie[] = [];

  moviesInCart :ICart[] = [];

  //formulario para buscar pelicula
  lookMovieForm = new FormGroup ({
    movieName : new FormControl('')
  })

  //variable control
  flag :boolean = false;

  movieName :string = '';

  ngOnInit(): void {
    //Pasamos todos las pelis del mock al array
    this.movieService.getMovies().subscribe(movie => this.allMovie = movie);
  }

  //imrpimimos la info
  getInfo(id :number){

    console.log(this.allMovie[id].description);

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
    //Nos aseguramos que la peli no este ya agregada
    if (this.moviesInCart.length != 0) {
      this.index = this.moviesInCart.findIndex(movieInto => movieInto.movieId == id);
    } else this.index = -1;

    if (this.index == -1) {
      //Buscamos la peli en el array de pelis
      this.index = this.allMovie.findIndex(movie =>
        movie.id == id
      );

      if (this.index != -1) {
        //Llamamos al servicio
        this.movieService.addMoviestoCart(this.allMovie[this.index]).subscribe(moviesFromService => {
          this.moviesInCart = moviesFromService;
        });

        //Le imprimimos por consola todas las peliculas que tiene
        this.moviesInCart.forEach(movie => console.log(movie));

        console.log(this.moviesInCart.length);

        //si no se cumple la busqueda
      } else console.log('Search Error');

    } else console.log('You already have rented this movie')

  }
}
