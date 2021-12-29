import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// VSC ME PUSO LA LINEA 3, Q POR ALGUNA RAZÓN ROMPIÓ TODO MI CÓDIGO!!!!!
// import { moveCursor } from 'readline';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICart } from '../models/cart.model';
import { IMovie } from '../models/movie.model';
// import { moviesMock } from './movies.mock'


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private httpClient : HttpClient,
  ) { }

  //Inicializamos la url de la API
  private url = environment.userRestAPI + 'movie';

  //Manejo de Errores
  private handleError(error: HttpErrorResponse){

    //Error del Front
    if (error.error instanceof ErrorEvent){
      console.warn("Error de front", error.error.message);

    //Error del back
    } else {
      console.warn(`Error del Backend: ${error.status}, cuerpo del error:
      ${error.message}`)
    }

    return throwError('Error de comunicación HTTP');

  }

  //Inicializamos un carrito de peliculas
  rentalMovie :ICart[] = [];
  uniqueMovie : IMovie | undefined;

  //Esto nos devuelve todas las pelis de stock
  //METODO GET
  getMovies(): Observable<IMovie[]>{
    return this.httpClient.get<IMovie[]>(this.url);
  }

  //Este método elimina una peli de la API de PELIS
  //DELETE
  deleteMovieById(id: Number | undefined) {

    return this.httpClient.delete<IMovie>(`${this.url}/${id}`);
  }

  //Busca la pelicula por id
  //GET
  getMovieById(id : Number): Observable<IMovie | undefined> {

    return this.httpClient.get<IMovie>(`${this.url}/${id}`).
    //Esto acá es para cuando se busca una peli que no existe en nuestro sistema
    pipe(catchError(this.handleError));

  }


  //Metodo para actualizar una movie
  //METODO PUT
  putUpdateMovie(movie: IMovie) {
    return this.httpClient.put<IMovie>(this.url + '/' + movie.id, movie);
  }

  //Si no funciona, le quitamos el observable
  postMovie(movie: IMovie): Observable<IMovie> {
    return this.httpClient.post<IMovie>(this.url, movie);
  }

}
