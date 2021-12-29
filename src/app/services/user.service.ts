import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';
// import { usersMock } from './user.mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Aqui conectamos con enviromnts, que tiene nuestra variable de ambiente que conecta con la API
  private url = environment.userRestAPI + 'users';

  constructor(
    private httpClient: HttpClient,
  ) { }

    //Este metodo me devuelve todos los usuarios registrados. GET
    getUsers(): Observable<IUser[]>{

      return this.httpClient.get<IUser[]>(this.url);
      //Ya no vamos a usar el mock, porque vamos directamente con la API
      // return of(usersMock);
    }

    //Este metodo me agrega un nuevo usuario en mi API
    //METODO POST
    postUser(user: IUser){
      return this.httpClient.post<IUser>(this.url, user);
    }

    //Este método váldia que el mail del usuario no esté registrado en nuestra BB.DD
    //El desarrollo pertenece al backend
    //Es solo con motibo de lógica de front su presencia.
    validateUserRegister(email: string): Observable<boolean> {
      return this.httpClient.post<boolean>(this.url, email);
    }

    //Valida que los datos sean correctos para permitir un logIn
    validateUserLogin(email: string, password: string): Observable<boolean> {
      return this.httpClient.post<boolean>(this.url, {
        email, password
      });
    }
}
