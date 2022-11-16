import { CardVM } from './../../Models/card-vm';
import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
// import { Icategory } from './../../Models/icategory';
import { Iproduct } from './../../Models/iproduct';
import { Component, Input, OnInit } from '@angular/core';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnChanges {
  proList: Iproduct[];
  proListOfCat: Iproduct[] = [];
  @Input() sentCatId: number = 0;
  @Output() totalPriceChange: EventEmitter<number>;
  @Output() itemBought: EventEmitter<CardVM>;
  totalPrice: number = 0;
  constructor() {
    this.totalPriceChange = new EventEmitter<number>();
    this.itemBought = new EventEmitter<CardVM>();
    this.proList = [
      {
        id: 100,
        name: 'lenovoThinked laptop',
        price: 10,
        quantity: 1,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 1,
      },
      {
        id: 200,
        name: 'apple macBook laptop',
        price: 25,
        quantity: 0,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 1,
      },
      {
        id: 300,
        name: 'lenovo tap 2',
        price: 30,
        quantity: 2,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 2,
      },
      {
        id: 400,
        name: 'apple tap',
        price: 2,
        quantity: 0,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 2,
      },
      {
        id: 500,
        name: 'samsung Note 10',
        price: 50,
        quantity: 3,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 3,
      },
      {
        id: 600,
        name: 'samsung Note 100',
        price: 5,
        quantity: 5,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 3,
      },
    ];
    this.proListOfCat = this.proList;
  }
  ngOnChanges(): void {
    this.filterProByCat();
  }

  ngOnInit(): void {}
  buy(itemPrice: number, QuantatyItem: any, prdName: string, prdImg:string) {
    let count: number = +QuantatyItem;
    let price: number = itemPrice;
    let produtListBought: CardVM = {
      prdName: prdName,
      prdPrice: itemPrice,
      prdItemPrice: price,
      prdQuantity: count,
      img: prdImg,

    };
    this.totalPrice += count * price;
    //
    //excute your event to puplisher it
    //on click on Buy total price change in this evnt
    // total price computing send event (emit with price  )
    //
    this.totalPriceChange.emit(this.totalPrice);
    this.itemBought.emit(produtListBought);
  }
  // changeCat() {
  //   this.selectedCatId = 2;
  // }
  // getCat(event: any) {
  //   this.selectedCatId = event.target.value;
  // }
  // getCattemplate(x: any) {
  //   this.selectedCatId = +x;
  // }
  trackByfun(index: number, prd: Iproduct) {
    return prd.id;
  }
  private filterProByCat() {
    this.sentCatId == 0
      ? (this.proListOfCat = this.proList)
      : (this.proListOfCat = this.proList.filter(
          (pro) => pro.categoryId == this.sentCatId
        ));
  }
}
