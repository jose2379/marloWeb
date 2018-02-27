import { Component, OnInit } from '@angular/core';
import { Obra } from '../../interfaces/obra';
import { ObrasService } from '../../servicios/obras.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  obrasFondo:     Obra[];
  obraVista:      number;
  imagen_fondo:   string;
  titulo_fondo:   string;

  constructor(private obraSer: ObrasService) { }

  ngOnInit() {
    this.obraSer.getObrasFiltradas('fondoHome', true).subscribe(obrasTemp => {
      this.obrasFondo = obrasTemp;
      console.log('obra sub', obrasTemp, this.obrasFondo.length);
      if (this.obrasFondo.length !== 0) {
        this.obraVista = Math.floor( Math.random() * this.obrasFondo.length);
        // console.log('fondos', this.obrasFondo, this.obraVista, this.obrasFondo[this.obraVista].url_imagen);
        this.imagen_fondo = 'url("' + this.obrasFondo[this.obraVista].url_imagen + '")';
        this.titulo_fondo = this.obrasFondo[this.obraVista].titulo;
      } else {
        // this.obraSer.guardarTodas(); // DESCOMENTAR PARA PASAR LAS OBRAS A PRODUCCIÓN!!!!
      }
    });
  }
}
