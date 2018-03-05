import { Component, OnInit } from '@angular/core';
import { Obra } from '../../interfaces/obra';
import { ObrasService } from '../../servicios/obras.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  obras:            Obra[];
  obrasVistas:      number;
  obrasTotales:     number;
  btnVerMasOn:      boolean;

  constructor(public obraSer: ObrasService) { }

  ngOnInit() {
    this.btnVerMasOn = true;
    this.obrasVistas = 10;
    this.obras = [];
    this.verObras();
  }
  verMas() {
    this.obrasVistas += 10;
    this.verObras();
  }
  verObras() {
    this.obraSer.getObras(this.obrasVistas).subscribe(obrasTemp => {
      this.obras = obrasTemp;
      this.obrasTotales = this.obras.length;
      this.btnVerMasOn = (this.obrasTotales % 10) === 0;
    });
  }
  verDetalle(obra: Obra) {
    console.log('dentro de obra', obra);
  }
  verNuevaObra(siguiente: string) {
  }
}
