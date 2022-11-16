import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[InputTest]'
})
export class InputTestDirective {

  constructor(private eleRef: ElementRef) { }
  @HostListener('focus') onFocus() {
   
  }
  @HostListener('blur') onPlure() {
    let val:string = this.eleRef.nativeElement.value;
    this.eleRef.nativeElement.value = val.toUpperCase();
  }
}
