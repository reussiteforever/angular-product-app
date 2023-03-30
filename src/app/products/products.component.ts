import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! : Array<any>;
  errorMessage! : string;

  constructor(private productservice: ProductService) {  }

  ngOnInit(): void {
    this.productservice.getAllProducts().subscribe({
      next: (data)=>{
        this.products = data;
      },
      error: (err) =>{
        this.errorMessage = err;
      }
    });
  }

  handleDeleteProduct(p:any){
    let index = this.products.indexOf(p);
    this.products.splice(index,1);
  }

}
