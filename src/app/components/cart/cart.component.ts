import { Component, OnInit } from '@angular/core';
import { NumericLiteral } from 'typescript';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //metodo que elimina del carrito
  deleteMovie(id :NumericLiteral) {

  }

  //Metodo que borra todo del carrito
  clearCart(){

  }

}
