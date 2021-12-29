import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

    //Inyectamos el servicio de CartService
    private cartService : CartService,
  ) { }

  //Suscripcion
  private subscription : Subscription | undefined;

  //Instanciamos un array para guardar todas las pelis del mock
  allMovie: IMovie[] = [];

  //Instanciamos una peli vacía
  updateOneMovie: IMovie | undefined = {
    id: 0,
    title: '',
    premiere: 0,
    image: '',
    qualification: 0,
    description: '',
    type: ''
  };

  //Variable auxiliar de carro
  movieCart: ICart = {
    id : 0,
    image : '',
    title : ''
  };

  //Formulario d ectualizacion de pelicula
  updateMovieForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl(''),
    premiere: new FormControl(''),
    image: new FormControl(''),
    qualification: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
  });

  //Metodo para actualizar mi BB.DD
  updateMovie() {

    this.movieService.getMovieById(this.updateMovieForm.controls['id'].value).subscribe(data => {
      console.log(data);

      this.updateOneMovie = data;

      if (this.updateOneMovie != undefined) {

        this.updateOneMovie.id = this.updateMovieForm.controls['id'].value;

        if (this.updateMovieForm.controls['description'].value != '') {
          this.updateOneMovie.description = this.updateMovieForm.controls['description'].value;
        }

        if (this.updateMovieForm.controls['type'].value != '') {
          this.updateOneMovie.type = this.updateMovieForm.controls['type'].value;
        }

        if (this.updateMovieForm.controls['image'].value != '') {
          this.updateOneMovie.image = this.updateMovieForm.controls['image'].value;
        }

        if (this.updateMovieForm.controls['premiere'].value) {
          this.updateOneMovie.premiere = this.updateMovieForm.controls['premiere'].value;
        }

        if (this.updateMovieForm.controls['title'].value != ''){
          this.updateOneMovie.title = this.updateMovieForm.controls['title'].value;
        }

        if (this.updateMovieForm.controls['qualification'].value) {
          this.updateOneMovie.qualification = this.updateMovieForm.controls['qualification'].value;
        }

        //LLama al servicio para realizar el método PUT
        this.movieService.putUpdateMovie(this.updateOneMovie).subscribe(data => {
          console.log(data,'Succsess update');
          ;
        })

      }

    })

  }

  //Formulario para crear pelicula
  createMovieForm = new FormGroup({
    // id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    premiere: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    qualification: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });


  //Metodo para crear pelicula
  createMovie() {
    this.movieService.postMovie({ id: 0,
      title: this.createMovieForm.controls['title'].value,
      image: this.createMovieForm.controls['image'].value,
      qualification: this.createMovieForm.controls['qualification'].value,
      description: this.createMovieForm.controls['description'].value,
      type: this.createMovieForm.controls['type'].value,
      premiere: this.createMovieForm.controls['premiere'].value,
    }).subscribe(data => {
      console.log(`${data} has been add to our databases`)
    });
  }

  //formulario para buscar pelicula
  lookMovieForm = new FormGroup ({
    movieName : new FormControl('')
  })

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

  //Función para agregar al carrito.
  addToCart(id :number){

    //Esta función no sé cómo meterla dentro del subscription
    // this.subscription?.add(this.cartService.addMovie(id));
    //Así sí agarra
    this.movieService.getMovieById(id).subscribe(data => {

      if (data != undefined){

        this.movieCart.image = data.image;
        this.movieCart.title = data.title;

        this.cartService.addMovie(this.movieCart).subscribe(dataCart => {
          console.log(dataCart);
        });
      }

    });



  }

  //Metodo DELETE
  //Cómo tendrías que hacer para renderizar todo?
  deleteMovie(id: Number) {
    // this.subscription?.add(
      this.movieService.deleteMovieById(id).subscribe(remove => {
        console.log("Successfull delete", remove);
    });
    //);

  }
}
