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
    this.obras = [];
    this.obraSer.getObras().subscribe(obrasTemp => {
      this.obras = obrasTemp;
    });
  }
  verNuevaObra(siguiente: string) {
  }
}
