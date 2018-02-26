import { Component, ViewEncapsulation } from '@angular/core';

import { Redes } from './interfaces/redes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  arrRedes: Redes[];

  constructor(){
    this.arrRedes = [
      {
        titulo: 'FaceBook',
        urlSalida: 'https://www.facebook.com/marlotadas',
        icono: 'facebook-square'
      },
      {
        titulo: 'Instagram',
        urlSalida: 'https://www.instagram.com/marlotadas/',
        icono: 'instagram'
      },
      {
        titulo: 'Gmail',
        urlSalida: 'mailTo:"marialpz81@hotmail.com',
        icono: 'envelope',
        target: '_self'
      }
    ];
  }

  onRedes(link: string, target?: string) {
    target = target || '_blank';
    window.open(link, target);
  }
}