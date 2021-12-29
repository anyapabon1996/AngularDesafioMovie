import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
// import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


// /** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{

  //Control sobre el formulario de registro
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    bornYear: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    // emailFormControl : new FormControl('', [Validators.required, Validators.email]),
    // matcher : new MyErrorStateMatcher(), --> Preguntar, no lo estoy sabiendo implementar
  });

  //Variables control
  flag :boolean = false;

  user :IUser = {
    id: undefined,
    name:  '',
    lastName: '',
    bornYear: undefined,
    email: '',
    password: '',
  }

  //Instanciamos una variable de tipo UserService
  constructor(private userService: UserService) { }

  //Suscripcion
  private subscription : Subscription | undefined;

  //Array con todos los usuarios.
  allUsers :IUser[] = [];

  ngOnInit(): void {
    //Le pasamos todos los datos que tenemos en la BB.DD para continuar
    //METODO GET
    this.subscription = this.userService.getUsers().subscribe(user => {
      this.allUsers = user;
    });

  }

  ngOnDestroy(): void {
      //Nos desuscribimos
      this.subscription?.unsubscribe();
  }

  //Funcion al registrar un usuario
  registerUser(){

    this.user.name = this.userForm.controls['name'].value;
    this.user.lastName =  this.userForm.controls['lastName'].value;
    this.user.bornYear = this.userForm.controls['bornYear'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.password = this.userForm.controls['password'].value;

    //LAUTARO, AQUI HAY UN ERROR. NO SÉ POR QUÉ, PERO RECORRE EL ARRAY 2 VECES EN EL SEGUNDO INTENTO DE INGRESAR UN USUARIO
    // console.log(this.allUsers.length);
    this.flag = false;

    if (this.allUsers) {
      this.flag = this.allUsers.findIndex((user: any) => user.email === this.user.email) >= 0;
    }

    //Si el usuarui ya existe, le tiramos error
    if (this.flag){

      alert('ERROR ¡This user already exists!');

    } else {

      //Agregamos el nuevo usuario
      this.allUsers.push(this.user);

      //Data es el objeto nuevo creado tomado del formulario
      //el id se incrementa automaticamente
      this.userService.postUser(this.user).subscribe( data => {
        console.log('created new user');
      })

      //reseteamos el formulario
      this.userForm.controls['name'].reset();
      this.userForm.controls['lastName'].reset();
      this.userForm.controls['bornYear'].reset();
      this.userForm.controls['email'].reset();
      this.userForm.controls['password'].reset();

    }
  }

}
