import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    //Inyectamos el servicio de carrito
    private cartService : CartService,

  ) { }

  //Inyectamos la suscripcion. IMPORTANTE, NO VA EN EL CONTRUCTOR
  private subscriptions?: Subscription | undefined;

  //Usamos un carro vacio para todos los productos en el carro
  allMoviesInCar? : ICart[] = [];

  ngOnInit(): void {
    //Le pasamos todas las pelis que tenemos guardadas, con la suscripcion
    //Metodo get
    this.subscriptions = this.cartService.getFromCar().subscribe(movie => this.allMoviesInCar = movie);
  }

  // Esto se va a ejecutar cuando yo me vaya de esta ruta
  ngOnDestroy(): void {
    //Me desuscribo
    this.subscriptions?.unsubscribe();

    console.log('Se ejecuta al salir del componente de cart')
  }

  ngAfterViewInit(): void {
      console.log('Se ejecuta despues de haber cargado la vista del componente')
  }

  //Elimina un objeto particular
  deleteMovie(id : Number){
    this.cartService.deleteMovie(id).subscribe(remove => {
      console.log(remove + ' has been removed');
    })
  }

  //Elimnamos todo del carrito
//   removeAll() {
//     this.subscriptions?.add(this.cartService.clerCar().subscribe(m => this.allMoviesInCar = m));
//   }
// }
}
