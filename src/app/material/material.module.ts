import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Este lo voy a usar para los botones del cart
import {MatButtonModule} from '@angular/material/button';

//Vamos a usar elementos de carrito
import {MatCardModule} from '@angular/material/card';

//Vamos a usar iconos
import { MatIconModule } from "@angular/material/icon";

//Vamos a usar inputs en los formularios
import {MatInputModule} from '@angular/material/input';

// import {MatFormFieldModule} from '@angular/material/form-field';







//Este es mi módulo de AngularMterial
@NgModule({
  declarations: [
  ],
  //Lo importa desde la libreria
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    // MatFormFieldModule,
    MatIconModule,

  ],
  //Los voy a exportar a otros modulos de mi proyecto a app.module.ts
  exports:[
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    // MatFormFieldModule,
    MatIconModule,
  ]
})
export class MaterialModule { }


