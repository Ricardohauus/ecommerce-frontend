import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { ProductModalServer,ServerResponse } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, private router:Router) { }

  products: ProductModalServer[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prod: ServerResponse[]) => {
     this.products= prod.products;

    });
  }

  selectProduct(id:Number){
    this.router.navigate(['/product',id]).then();
  }

}
