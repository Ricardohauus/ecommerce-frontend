import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { environment } from '../../environments/environment';
import { CartModelPublic, CartModelServer } from '../models/cart';
import { BehaviorSubject } from 'rxjs';
import { ProductModelServer } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverUrl = environment.SERVER_URL;

  // Data variable to store the cart information on the client's local storage

  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      inCart: 0,
      id: 0
    }]
  }

  // Data variable to store cart information on the server
  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  }

  // OBSERVABLES FOR THE COMPONENTS TO SUBSCRIBE
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    // GET INFORMATION FROM LOCAL STORAGE (IF ANY)
    let info = JSON.parse(localStorage.getItem('cart'));

    // CHECK IF THE INFO VARIABLE IS NULL OR HAS SOME DATA IN IT

    if (info !== null && info !== undefined && info.prodData[0].inCart !== 0) {
      // LOCAL STORAGE IS NO EMPTY AND HAS SOME INFORMATION
      this.cartDataClient = info;
      // LOOP THROUGH EACH ENTRY AND PUT IT IN THE CARDATASERVER OBJECT
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProduct: ProductModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.inCart;
            this.cartDataServer.data[0].product = actualProduct;
            // TODO Create calculateTotal function and replace it here
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
          } else {
            // CartDataServer ALREADY HAS SOME ENTRY IN IT
            this.cartDataServer.data.push({
              numInCart: p.inCart,
              product: actualProduct
            });
            // TODO Create calculateTotal function and replace it here
            this.cartDataClient.total = this.cartDataServer.total
            localStorage.setItem('cart',JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({...this.cartDataServer})
        });
      });
    }


  }


}
