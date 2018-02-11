import { NgModule, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';

interface Obra {
  titulo: string;
  tecnica: string;
  fecha: string;
  urlImagen: string;
}
interface Redes {
  titulo: string;
  urlSalida: string;
  icono: string;
  target?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  arrObras: Obra[];
  arrRedes: Redes[];
  obraVista: number;
  background_color: string;

  // items: AngularFireList<any[]>;


  // constructor(private db: AngularFireDatabase) { }

  onClick(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    console.log('target');
  }

  onRedes(link: string, target?: string) {
     console.log('click red', link);
     target = target || '_blank';
     const url = 'http://www.marlo-es.com';
     window.open(link, target);
  }

  ngOnInit() {
    this.arrObras = [
      {
        titulo: '"Grapada"',
        tecnica: 'Grapas sobre cartulina.',
        fecha: 'Noviembre 16.',
        urlImagen: 'galeria%2Fprincipal%2FWhatsApp%20Image%202017-03-28%20at%2010.24.57.jpeg?alt=media&token=09f079e6-7ebe-4905-8c0a-344d76780c7c'
      },
      {
        titulo: '"Mi mente en el reino de las mentes"',
        tecnica: 'Acuarela sobre tablón de madera.',
        fecha: 'Agosto 2013',
        urlImagen: 'galeria%2Fprincipal%2Fseptember13%20319.JPG?alt=media&token=6ebf9e04-f043-4a97-b8b4-0b7745e4934e'
      },
      {
        titulo: '"Ranking Getränke"',
        tecnica: 'Acrílico sobre madera.',
        fecha: 'Diciembre 11.',
        urlImagen: 'galeria%2Fprincipal%2Franking.jpg?alt=media&token=4b72c095-cfc9-4b86-817f-7b802b8df203'
      },
      {
        titulo: '"Was denkst du?"',
        tecnica: 'Acrílico y emociones sobre lienzo.',
        fecha: 'Agosto 17.',
        urlImagen: 'galeria%2Fprincipal%2FIMG_20160805_102040.jpg?alt=media&token=d9e75ee9-4557-4468-a31d-297ad921afbe'
      }
    ];
    this.arrRedes = [
      {
        titulo: 'FaceBook',
        urlSalida: 'https://www.facebook.com/maria.lopez.7758235',
        icono: 'facebook-square'
      },
      {
        titulo: 'Instagram',
        urlSalida: 'https://www.instagram.com/marlotadas/',
        icono: 'instagram'
      },
      // {
      //   titulo: 'Twitter',
      //   urlSalida: 'https://www.facebook.com/maria.lopez.7758235',
      //   icono: 'twitter-square'
      // },
      {
        titulo: 'Gmail',
        urlSalida: 'mailTo:"marialpz81@hotmial.com',
        icono: 'envelope',
        target: '_self'
      }
    ];
    this.obraVista = Math.floor( Math.random() * this.arrObras.length);
    this.background_color = 'url("https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/' + this.arrObras[this.obraVista].urlImagen + '")';
    console.log('obra', this.arrObras[this.obraVista], this.obraVista);
    console.log('lkjdlfkj');

    setTimeout(() => {
      console.log('kjdflksdj');
      }, 3000);
    
    // this.items = this.db.list('/obras');
    // console.log('dentro init', this.items);

    // this.coursesObservable = this.getCourses('/obras');
  }

  // getCourses(listPath): Observable<any[]> {
  //   return this.db.list(listPath).valueChanges();
  // }
}
