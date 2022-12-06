import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromationAdsService {
  private adsList: string[];
  constructor() {
    this.adsList = [
      'Big Discount',
      'Sale Up To 50%',
      'check white friday offer ',
      // '',
      'spicial white friday up to 70%',
    ];
  }
  getSchoduleAds(intervalSecond: number): Observable<string> {
    return new Observable<string>((observer) => {
      // observer.next();
      // observer.error();
      // observer.complete();
      let counter = 0;
      let adsTimer = setInterval(() => {
        console.log('in interval .....');

        if (counter == this.adsList.length) {
          observer.complete();
        }
        if (this.adsList[counter] == '') {
          observer.error('Erorr: Empty'); // stop observe
        }
        observer.next(this.adsList[counter]);
        counter++;
      }, intervalSecond * 1000);
      return {
        unsubscribe() {
          // will be called :
          // 1: error
          // 2: complete
          // 3:call unsubscribe by my self
          clearInterval(adsTimer);
          console.log("call unsubscribe ..... ");
          
        },
      };
    });
  }
}
