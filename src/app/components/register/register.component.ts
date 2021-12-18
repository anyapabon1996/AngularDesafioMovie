import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //Variables control
  flag :boolean = false;


  user :IUser = {
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
    this.subscription = this.userService.getUsers().subscribe(user => {this.allUsers = user});
  }

  ngOnDestroy(): void {
      //Nos desuscribimos
      this.subscription?.unsubscribe();
  }

  //Funcion al registrar un usuario
  registerUser(){
    if (localStorage['localUser'] != null) {
      this.allUsers = JSON.parse(localStorage['localUser']);
    }

    this.user.name = this.userForm.controls['name'].value;
    this.user.lastName =  this.userForm.controls['lastName'].value;
    this.user.bornYear = this.userForm.controls['bornYear'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.password = this.userForm.controls['password'].value;

    //LAUTARO, AQUI HAY UN ERROR. NO SÉ POR QUÉ, PERO RECORRE EL ARRAY 2 VECES EN EL SEGUNDO INTENTO DE INGRESAR UN USUARIO
    console.log(this.allUsers.length);
    this.allUsers.forEach(emailCheck => {

      if (emailCheck.email === this.user.email) this.flag = true;

    });

    //Si el usuarui ya existe, le tiramos error
    if (this.flag){

      alert('ERROR ¡Este usuario ya esta registrado!');

    } else {

      //Agregamos el nuevo usuario
      this.allUsers.push(this.user);

      //Lo pasamos al local
      localStorage['localUser'] = JSON.stringify(this.allUsers);

      //reseteamos el formulario
      this.userForm.controls['name'].reset();
      this.userForm.controls['lastName'].reset();
      this.userForm.controls['bornYear'].reset();
      this.userForm.controls['email'].reset();
      this.userForm.controls['password'].reset();

    }
  }

}
