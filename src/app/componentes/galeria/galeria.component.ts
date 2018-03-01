import { Component, OnInit } from '@angular/core';
import { Obra } from '../../interfaces/obra';
import { ObrasService } from '../../servicios/obras.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  obras: Obra[];
  obraVista:        number;
  obrasTotales:     number;
  imagen_fondo:     string;
  titulo_fondo:     string;

  constructor(public obraSer: ObrasService) { }

  ngOnInit() {
    this.obraVista = 0;
    this.obraSer.getObras().subscribe(obrasTemp => {
      console.log('entras', obrasTemp);
      
      this.obras = obrasTemp;
      // this.obrasTotales = this.obras.length - 1;
      // console.log('obra sub Galeria', obrasTemp, this.obras);
    });
  }
  verNuevaObra(siguiente: string) {
    // if ( siguiente === 'next' ) {
    //   this.obraVista++;
    //   if ( this.obraVista > this.obrasTotales) this.obraVista = 0;
    // } else {
    //   this.obraVista--;
    //   if ( this.obraVista < 0 ) this.obraVista = this.obrasTotales;
    // }
    // console.log('obraVista', this.obraVista, siguiente);
    // setInterval(() => {
    //   console.log('siguiente?', siguiente, this.obraVista);
    //   this.obraVista++;
    // }, 3000);
  }
}
