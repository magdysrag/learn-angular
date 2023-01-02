import { Icategory } from './../../Models/icategory';
import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Iproduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  product!: Iproduct;
  catlist!: Icategory[];
  newPrd: Iproduct = {} as Iproduct;
  constructor(private productServe: ProductsService, private router: Router) {
    this.product = {
      id: 22,
      name: 'phonelaptop',
      quantity: 3,
      categoryId: 1,
      price: 200,
      imgURL: '',
    };
    this.catlist = [
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Tap' },
      { id: 3, name: 'Note' },
    ];
  }

  addProduct() {
    let observer = {
      next: (p: Iproduct) => console.log(p),
      error: (err: Error) => {
        console.error(err);
      },
    };
    this.productServe.addProduct(this.newPrd).subscribe(observer);
    this.router.navigate(['/products']);
  }
  ngOnInit(): void {}
}
