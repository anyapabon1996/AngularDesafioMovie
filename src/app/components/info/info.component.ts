import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  constructor(
    private movieService : MovieService,
    private activatedRoute : ActivatedRoute,
  ) { }

  private subscription : Subscription | undefined;

  //Consultar esto de asercion definitiva, que es como un importan de CSS !
  //¿es buena practica?
  movie!: IMovie;

  ngOnInit(): void {

    //Buscamos la pelicual especifica que quiere ver el usuario
    this.subscription = this.movieService.getMovieById(parseInt(this.activatedRoute.snapshot.params['id'])).subscribe(
      movies => {
        if (movies != undefined) this.movie = movies;
        else alert('Error during process');
      })
  }

  ngOnDestroy(): void {
    //Nos desuscribimos al salir del componente
      this.subscription?.unsubscribe();
  }

}
