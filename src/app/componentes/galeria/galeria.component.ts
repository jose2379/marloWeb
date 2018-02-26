import { Component, OnInit } from '@angular/core';
import { Obra } from '../../interfaces/obra';
import { ObrasService } from '../../servicios/obras.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  obrasFondo: Obra[];
  obraVista:      number;
  imagen_fondo:   string;
  titulo_fondo:   string;

  constructor(public obraSer: ObrasService) { }

  ngOnInit() {
    this.obraVista = 0;
    this.obraSer.getObras().subscribe(obrasTemp => {
      console.log('obra sub', obrasTemp);
      this.obrasFondo = obrasTemp;
      this.cambiaImagen();
    });
  }
  cambiaImagen(siguiente?: boolean){
    siguiente = siguiente || true;
    this.imagen_fondo = 'url("' + this.obrasFondo[this.obraVista].url_imagen + '")';
    this.titulo_fondo = this.obrasFondo[this.obraVista].titulo;
    setInterval(() => {
      console.log('siguiente?', siguiente, this.obraVista);
      this.obraVista++;
    }, 3000)
    
  }

}
