import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[LightBox]',
})
export class LightBoxDirective implements OnChanges {
  @Input('LightBox') highlightColor: string = 'yellow'
  @Input()defaultColor:string="darkblue"
  constructor(private eleRef: ElementRef) {
    // el.nativeElement.style.border = ' 2px solid red';
    // this.eleRef.nativeElement.style = `border: 2px solid ${this.defaultColor}`;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.eleRef.nativeElement.style = `border: 2px solid ${this.defaultColor}`;    

  }
  @HostListener('mouseover') onMouseOver() {
    this.eleRef.nativeElement.style = `border: 2px solid ${this.highlightColor}`;
  }
  @HostListener('mouseout') onMouseOut() {
    this.eleRef.nativeElement.style = `border: 2px solid ${this.defaultColor}`;

  }
}
