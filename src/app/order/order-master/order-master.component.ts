import { StaticServiceService } from "./../../services/static-service.service";
import { ProductListComponent } from './../product-list/product-list.component';
import { CardVM } from './../../Models/card-vm';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Icategory } from 'src/app/Models/icategory';
import { identifierName } from '@angular/compiler';
import { findIndex } from 'rxjs';

@Component({
  selector: 'order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss'],
})
export class OrderMasterComponent implements OnInit, AfterViewInit {
  selectedCatId: number = 0;
  count: any;
  reciveOrderTotalPrice: number = 0;
  catlist: Icategory[];
  @ViewChild('item') itemInput!: ElementRef;
  @ViewChild(ProductListComponent) productListInParent!: ProductListComponent;
  constructor(private staticSer:StaticServiceService) {
    this.catlist = [
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Tap' },
      { id: 3, name: 'Note' },
    ];
  }
  ngAfterViewInit(): void {
    // this.itemInput.nativeElement.value = 'magdy srag';
    this.itemInput.nativeElement.style.border = '2px solid red';
    this.itemInput.nativeElement.min = 5;
    // console.log(this.productListInParent.proList);
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
      ? (selectedItem.prdQuantity = 0)
      : selectedItem.prdQuantity;
    let found;
    found = this.productSelected.find((e) => e.prdName == selectedItem.prdName);
    console.log(found); //undefined if not fount as
    //                  find return value if exist
    selectedItem.prdPrice = selectedItem.prdPrice * selectedItem.prdQuantity;
    if (!found) {
      if (selectedItem.prdQuantity != 0) {
        this.productSelected.push(selectedItem);
        this.buyProduct = this.productSelected.length;
      }
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
    let priceOfItem;
    for (let i = 0; i < this.productSelected.length; i++) {
      if (+item != 0) {
        if (this.productSelected[i].prdName == name) {
          priceOfItem =
            this.productSelected[i].prdPrice /
            this.productSelected[i].prdQuantity;
          this.productSelected[i].prdQuantity = +item;
          this.productSelected[i].prdPrice =
            this.productSelected[i].prdQuantity * priceOfItem;
        }
      } else {
        priceOfItem =
          this.productSelected[i].prdPrice /
          this.productSelected[i].prdQuantity;
        this.productSelected[i].prdQuantity = 1;
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
    // let newTaple = Array.from(this.productSelected)
    // console.log(productName);

    // let newTaple:CardVM[] = this.productSelected.filter((prduct) => {
    //   prduct.prdName == productName;
    // });

    // this.productSelected = newTaple;
    this.calcPrice();
  }
  calcPrice() {
    this.total = 0;
    this.productSelected.forEach((product) => {
      this.total += product.prdPrice;
    });
  }
  onBoughtUpdatQuantity() {
    this.staticSer.onBoughtUpdatQu(this.productSelected);
  //   this.productSelected.forEach((p) => {
  //     this.productListInParent.changeQuantityFromParent(p.prdName , p.prdQuantity)
  //     // p.prdQuantity = 0;
  //   });
  }
}
