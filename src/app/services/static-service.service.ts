import { Iproduct } from './../Models/iproduct';
import { Injectable } from '@angular/core';
import { CardVM } from '../Models/card-vm';

@Injectable({
  providedIn: 'root',
})
export class StaticServiceService {
  prodList: Iproduct[];
  productSelected: CardVM[] = [];
  constructor() {
    this.prodList = [
      {
        id: 1,
        name: 'lenovoThinked laptop',
        price: 10,
        quantity: 1,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 1,
      },
      {
        id: 2,
        name: 'apple macBook laptop',
        price: 25,
        quantity: 0,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 1,
      },
      {
        id: 3,
        name: 'lenovo tap 2',
        price: 30,
        quantity: 2,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 2,
      },
      {
        id: 4,
        name: 'apple tap',
        price: 2,
        quantity: 0,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 2,
      },
      {
        id: 5,
        name: 'samsung Note 10',
        price: 50,
        quantity: 3,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 3,
      },
      {
        id: 6,
        name: 'samsung Note 100',
        price: 5,
        quantity: 5,
        imgURL: 'https://fakeimg.pl/150/',
        categoryId: 3,
      },
    ];
  }
  getAllProduct(): Iproduct[] {
    return this.prodList;
  }
  getProductByCatId(cId: number): Iproduct[] {
    if (cId == 0) {
      return this.prodList;
    } else {
      return this.prodList.filter((prd) => prd.categoryId == cId);
    }
  }
  getProductById(id: number): Iproduct | null {
    let catIdProduct = this.prodList.find((p) => p.id == id);
    return catIdProduct ? catIdProduct : null;
  }
  onBoughtUpdatQu(list: CardVM[]) {
    list.forEach((p) => {
      this.changeAvailableQuantity(p.prdName, p.prdQuantity);
      // p.prdQuantity = 0;
    });
  }
  changeAvailableQuantity(pName: string, pQuantity: number) {
    this.prodList.filter((p) => {
      if (p.name == pName && p.quantity >= pQuantity) {
        p.quantity -= pQuantity;
      }
    });
  }
  getArrOfId(): number[] {
    let arrPrdOfId = this.prodList.map((e) => e.id);
    return arrPrdOfId;
  }
}
