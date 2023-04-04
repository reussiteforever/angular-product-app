import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  errorMessage!: string;
  searchFormGroup!: FormGroup; 
  // les propriétés de la navigation
  currentPage: number=0;
  size: number=5;
  totalPages: number=0;

  currentAction: string="all";

  constructor(private productservice: ProductService, private fb: FormBuilder, public authService : AuthenticationService) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control(null)
    });
    this.handleGetPageProducts();
  }

  handleGetAllProducts() {
    this.productservice.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleGetPageProducts() {
    this.productservice.getPageProducts(this.currentPage, this.size).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleDeleteProduct(p: Product) {
    let conf = confirm("Etes vous sûre ?");
    if(!conf) return ;
    this.productservice.deleteProduct(p.id).subscribe({
      next: (data) => {
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      }
    });
  }

  handleSetPromotion(p: Product) {
    let promo = p.promotion;
    this.productservice.setPromotion(p.id).subscribe(
      {
        next: (data) => {
          p.promotion = !promo;
        },
        error: (err) => this.errorMessage = err
      }
    );
  }

  handleSearchProducts(){
    this.currentAction = "search";
    this.currentPage = 0;
    let keyword = this.searchFormGroup.value.keyword;
    this.productservice.searchProduct(keyword, this.currentPage, this.size).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      }
    });
  }

  goToPage(i: number){
    this.currentPage =i;
    this.currentAction==="all" ? this.handleGetPageProducts() : this.handleSearchProducts();
  }

}
