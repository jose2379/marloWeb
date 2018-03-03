import { Component, OnInit } from '@angular/core';
import { Obra } from '../../interfaces/obra';
import { ObrasService } from '../../servicios/obras.service';
import { Subscription } from 'rxjs/Subscription';

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

  subObras:       Subscription;

  constructor(private obraSer: ObrasService) { }

  ngOnInit() {
    this.obrasFondo = [];
    this.obraSer.getObrasFiltro('fondoHome').subscribe(obrasTemp => {
      this.obrasFondo = obrasTemp;
      const longObras = obrasTemp.length;
      if (longObras !== 0) {
        this.obraVista = Math.floor( Math.random() * this.obrasFondo.length);
        this.imagen_fondo = 'url("' + this.obrasFondo[this.obraVista].url_imagen + '")';
        this.titulo_fondo = this.obrasFondo[this.obraVista].titulo;
      }
    });
  }
}
