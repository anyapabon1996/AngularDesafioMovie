import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  //Instanciamos un objeto de tipo register
  constructor(private userService: UserService) { }

  //Variable para comparar
  // users: IUser = {
  //   name: '',
  //   lastName: '',
  //   bornYear: undefined,
  //   email: '',
  //   password: ''
  // };

  //Suscripcion
  private subscription : Subscription | undefined;

  allUsers: IUser[] = [];

  ngOnInit(): void {

    //Le pasamos todos los datos que tenemos en la "API"
   this.subscription = this.userService.getUsers().subscribe(user => this.allUsers = user);

  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  //Formulario del frontEnd
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  sendForm(){

    console.log('hola');

    let i =  this.allUsers.findIndex(email => email.email == this.loginForm.controls['email'].value);

    if (i != -1){

      if (this.allUsers[i].password == this.loginForm.controls['password'].value) console.log('bien');

      else alert("Password doesn't match");

    } else {

      alert("Wrong email");

    }

  }



}
