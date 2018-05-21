import { Component, ViewEncapsulation } from '@angular/core';

import { Redes } from './interfaces/redes';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  arrRedes:     Redes[];
  btnGaleryOn:  boolean;
  btnHomeOn:    boolean;
  btnCloseOn:   boolean;

  constructor(private router: Router) {
    router.events.subscribe((val: NavigationStart) => {
      if (val.url !== undefined) {
        console.log('val.rul', val.id, val.url.split('/').length);
        this.btnCloseOn = val.url.split('/').length >= 3;
        if (!this.btnCloseOn) {
          this.btnGaleryOn = val.url !== '/gallery';
          this.btnHomeOn = (val.url !== '/home' && val.url !== '/');
        } else {
          this.btnGaleryOn = false;
          this.btnHomeOn = true;
        }
      }
    });
    this.arrRedes = [
      {
        titulo: 'FaceBook',
        urlSalida: 'https://www.facebook.com/sensorialismo',
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
