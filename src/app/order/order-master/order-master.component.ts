import { CardVM } from './../../Models/card-vm';
import { Component, OnInit } from '@angular/core';
import { Icategory } from 'src/app/Models/icategory';
import { identifierName } from '@angular/compiler';
import { findIndex } from 'rxjs';

@Component({
  selector: 'order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss'],
})
export class OrderMasterComponent implements OnInit {
  selectedCatId: number = 0;
  count: any;
  reciveOrderTotalPrice: number = 0;
  catlist: Icategory[];
  constructor() {
    this.catlist = [
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Tap' },
      { id: 3, name: 'Note' },
    ];
  }
  ngOnInit(): void {}
  //// $event => totalPrice
  onTotalPriceChange(totalPrice: number) {
    this.reciveOrderTotalPrice = totalPrice;
  }
  buyProduct = 0;
  // found: boolean = true;
  priceItem: number = 0;
  updatedProductQuantity: any;
  productSelected: CardVM[] = [];
  onItemBought(selectedItem: CardVM) {
    console.log(selectedItem);
    
    selectedItem.prdQuantity <= 0
      ? (selectedItem.prdQuantity = 1)
      : selectedItem.prdQuantity;
    let state = false;
    function compare(
      productSelectedTaple: CardVM[],
      selected: CardVM
    ): boolean {
      for (let i = 0; i < productSelectedTaple.length; i++) {
        if (productSelectedTaple[i].prdName == selected.prdName) {
          state = true;
          break;
        } else {
          state = false;
        }
      }
      return state;
    }
    selectedItem.prdPrice = selectedItem.prdPrice * selectedItem.prdQuantity;
    state = compare(this.productSelected, selectedItem);
    if (!state) {
      this.productSelected.push(selectedItem);
      this.buyProduct = this.productSelected.length;
    } else {
      for (let i = 0; i < this.productSelected.length; i++) {
        if (this.productSelected[i].prdName == selectedItem.prdName) {
          this.productSelected[i].prdQuantity = selectedItem.prdQuantity;
          this.productSelected[i].prdPrice = selectedItem.prdPrice;
        }
      }
    }
    this.calcPrice();
  }
  total: number = 0;
  itemPrice(item: string, name: string) {
    for (let i = 0; i < this.productSelected.length; i++) {
      if (this.productSelected[i].prdName == name) {
        let priceOfItem =
          this.productSelected[i].prdPrice /
          this.productSelected[i].prdQuantity;
        console.log();

        console.log('****');

        this.productSelected[i].prdQuantity = +item;
        this.productSelected[i].prdPrice =
          this.productSelected[i].prdQuantity * priceOfItem;
      }
    }
    this.calcPrice();
  }
  removeProduct(productName: string) {
    for (let i = 0; i < this.productSelected.length; i++) {
      if (this.productSelected[i].prdName == productName) {
        this.productSelected.splice(i, 1);
      }
    }
    this.calcPrice();
  }
  calcPrice() {
    this.total = 0;
    this.productSelected.forEach((product) => {
      this.total += product.prdPrice;
    });
  }
}
