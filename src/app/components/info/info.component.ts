import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    private movieService : MovieService,
    private activatedRoute : ActivatedRoute,
  ) { }

  //Consultar esto de asercion definitiva, que es como un importan de CSS !
  //¿es buena practica?
  movie!: IMovie;

  ngOnInit(): void {

    //Buscamos la pelicual especifica que quiere ver el usuario
    this.movieService.getMovieById(parseInt(this.activatedRoute.snapshot.params['id'])).subscribe(
      movies => {
        if (movies != undefined) this.movie = movies;
        else alert('Error during process');
      })
  }

}
