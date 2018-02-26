import { Component, OnInit } from '@angular/core';
import { Obra } from '../../interfaces/obra';
import { ObrasService } from '../../servicios/obras.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {
  obras: Obra[];
  editando: boolean;
  ObraAEditar: Obra;

  constructor(public obraSer: ObrasService) { }

  ngOnInit() {
    this.editando = false;
    // this.obraSer.getObras().subscribe(obrasTemp => {
    //   console.log('obra sub', obrasTemp);
    //   this.obras = obrasTemp;
    // });
  }

  deleteTask(event, task) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.obraSer.deleteObra(task);
    }
    return;
  }

  editTask(event, task) {
    this.editando = !this.editando;
    this.ObraAEditar = task;
  }

  updateTask(task) {
    this.obraSer.updateObra(task);
    this.ObraAEditar = null;
    this.editando = false;
  }

}
