import { PromationAdsService } from './../../services/promation-ads.service';
import { StoreData } from './../../ViewModel/store-data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, last, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  storeInfo: StoreData;
  isImgShow: boolean = true;
  Subscribtions: Subscription[] = [];
  constructor(private promAdsServer: PromationAdsService) {
    this.storeInfo = new StoreData(
      'animal',
      'https://picsum.photos/seed/picsum/500/300',
      ['cairo', 'alex', 'mansora']
    );
  }
  ngOnDestroy(): void {
    this.Subscribtions.forEach((adsSubscribtion) => {
      adsSubscribtion.unsubscribe();
    });
  }

  ngOnInit(): void {
    // let adsSubscribtion = this.promAdsServer.getSchoduleAds(3).subscribe(
    //   (data)=>{}, // next
    //   (err)=>{},//error
    //   ()=>{},//complete
    // )
    let adsSubscribtion = this.promAdsServer
      .getSchoduleAds(3)
      .pipe(
        filter((ad) => ad.includes('friday')),
        map((ad) => `AD: ${ad}`),
        last(),
      )
      .subscribe({
        next: (data: string) => {
          console.log(data);
        },
        error: (err: string) => {
          console.log(err);
        },
        complete: () => {
          console.log('Ads Finished !');
        },
      });
    this.Subscribtions.push(adsSubscribtion);
  }
  toggleImg() {
    this.isImgShow = !this.isImgShow;
  }
}
