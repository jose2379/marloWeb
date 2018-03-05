import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ObrasService } from '../../../servicios/obras.service';
import { Obra } from '../../../interfaces/obra';

@Component({
  selector: 'app-detalle-obra',
  templateUrl: './detalle-obra.component.html',
  styleUrls: ['./detalle-obra.component.scss']
})
export class DetalleObraComponent implements OnInit {

  id:     string;
  obra:   Obra;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private obraSer: ObrasService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
        this.id = params['id'];
        // this.obraSer.getObraById(this.id);
        this.obraSer.getObraById(this.id).subscribe(obraTemp => {
          this.obra = obraTemp.payload.data();
          console.log('dentro de obra componente', this.id, this.obra, obraTemp);
        });
        // this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

}
