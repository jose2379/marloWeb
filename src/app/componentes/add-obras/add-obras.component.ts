import { Component, OnInit } from '@angular/core';
import { Obra } from '../../interfaces/obra';
import { ObrasService } from '../../servicios/obras.service';

@Component({
  selector: 'app-add-obras',
  templateUrl: './add-obras.component.html',
  styleUrls: ['./add-obras.component.scss']
})
export class AddObrasComponent implements OnInit {
  task: Obra = {
    titulo: '',
    dimension: ''
   };
  constructor(private obraSer: ObrasService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submit', this.task.titulo, this.task.dimension);
    if (this.task.titulo !== '' && this.task.dimension !== '') {
      this.obraSer.addObra(this.task);
      this.task.titulo = '';
      this.task.dimension = '';
    } else {
      // this.obraSer.guardarTodas();
    }
  }

}
