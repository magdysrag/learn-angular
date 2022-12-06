import { StaticServiceService } from './../../services/static-service.service';
import { CardVM } from './../../Models/card-vm';
import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
// import { Icategory } from './../../Models/icategory';
import { Iproduct } from './../../Models/iproduct';
import { Component, Input, OnInit } from '@angular/core';
import { outputAst, TypeofExpr } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnChanges {
  // proList: Iproduct[];
  proListOfCat: Iproduct[] = [];
  @Input() sentCatId: number = 0;
  @Output() totalPriceChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemBought: EventEmitter<CardVM>;
  totalPrice: number = 0;
  constructor(private staticSer: StaticServiceService, private router: Router) {
    // this.totalPriceChange = new EventEmitter<number>();
    this.itemBought = new EventEmitter<CardVM>();
  }

  ngOnChanges(): void {
    this.proListOfCat = this.staticSer.getProductByCatId(this.sentCatId);
    // this.filterProByCat();
  }
  isAvailable: boolean = false;
  ngOnInit(): void {
    this.proListOfCat = this.staticSer.getAllProduct();
  }
  buy(
    itemPrice: number,
    QuantatyItem: any,
    prdName: string,
    prdImg: string,
    avalible: number,
    event: any
  ) {
    let count: number = +QuantatyItem <= avalible ? +QuantatyItem : avalible;
    let price: number = itemPrice;
    let produtListBought: CardVM = {
      prdName: prdName,
      prdPrice: itemPrice,
      prdQuantity: count,
      img: prdImg,
      avalibleCuantity: avalible,
    };
    console.log(event.target.required);
    this.totalPrice += count * price;
    //excute your event to puplisher it
    //on click on Buy total price change in this evnt
    // total price computing send event (emit with price  )
    // هو ده المكان اللى هنفذ فيه الحدث بتاعى
    // علشان لما بضعط على الزر الشراء هيحسب السعر
    this.totalPriceChange.emit(this.totalPrice); // name of event totalPriceChange execute it and send with
    // event this.totalPrice when I execute this event on any element will  execute function with available total price
    this.itemBought.emit(produtListBought); // this is output event ececute
  }
  trackByfun(index: number, prd: Iproduct) {
    return prd.id;
  }
  // private filterProByCat() {
  //   this.sentCatId == 0
  //     ? (this.proListOfCat = this.proList) // true
  //     : (this.proListOfCat = this.proList.filter(
  //         (pro) => pro.categoryId == this.sentCatId
  //       )); //false
  //   console.log(this.proListOfCat);
  // }
  openDetails(prdId: number) {
    this.router.navigate(['/product', prdId]);
    console.log('###########');
  }
}
