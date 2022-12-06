import { Iproduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticServiceService } from 'src/app/services/static-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  currentId: number = 0;
  // prd: Iproduct = <Iproduct>{};
  listOfId: number[] = [];
  prd!: Iproduct | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productServ: StaticServiceService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.currentId = Number(this.activatedRoute.snapshot.paramMap.get('pid'));
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(paramMap.get('pid'));
      this.prd = this.productServ.getProductById(this.currentId);
    });
    console.log(this.currentId);
    this.listOfId = this.productServ.getArrOfId();
    console.log(this.listOfId);
  }
  goback() {
    this.location.back();
  }
  previous() {
    let currentIndex = this.listOfId.findIndex((el) => el == this.currentId);
    let prevPrdIndex;
    if (currentIndex > 0) {
      prevPrdIndex = this.listOfId[currentIndex - 1];
      this.router.navigate(['/products', prevPrdIndex]);
    }
  }
  next() {
    let currentIndex = this.listOfId.findIndex((el) => el == this.currentId);
    let nextPrdIndex;
    if (currentIndex < this.listOfId.length) {
      nextPrdIndex = this.listOfId[currentIndex + 1];
      this.router.navigate(['/products', nextPrdIndex]);
    }
  }
}
