import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, private router:Router) { }

  products: any[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((p: { count: Number, products: any[] }) => {
      this.products = p.products;
    });
  }

  selectProduct(id:Number){
    this.router.navigate(['/product',id]).then();
  }

}
