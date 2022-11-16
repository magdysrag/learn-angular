import { StoreData } from './../../ViewModel/store-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  storeInfo: StoreData;
  isImgShow:boolean=true;
  constructor() {
    this.storeInfo = new StoreData(
      'animal',
      'https://picsum.photos/seed/picsum/500/300',
      ['cairo', 'alex','mansora']
    );
  }

  ngOnInit(): void {}
  toggleImg() {
    this.isImgShow = ! this.isImgShow;
  }
}
