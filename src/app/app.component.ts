import { AppService } from './app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<h1> Hello  World {{title}}</h1>',
  styleUrls: ['./app.component.scss'],
  // styles: ['h1 {color:red}']
})
export class AppComponent {
  clases = [
    'bg-info',
    'text-light',
    'text-center',
    'fs-2',
    'fw-bold',
    'text-uppercase',
  ];
  dataBase;
  para =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut illum praesentium perspiciatis aliquid illo,reprehenderit eos architecto. Sed, vero possimus!';
  constructor(service: AppService) {
    this.dataBase = service.getAll();
  }
  title = 'first-appAngular';
  sayHello(): string {
    return `Hello World ${this.title} From SayHello`;
  }
  nameval = 'magdy srag';
  name: any = this.nameval;
  emptyForm() {
    this.name = '';
  }
  msg(inp: any) {
    // this.name = inp;
  }
  isfavorit = false;
}
