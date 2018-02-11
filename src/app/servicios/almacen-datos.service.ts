import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AlmacenDatosService {

  constructor(private http: Http) { }

  getObras() {
    console.log('detro de getOras');
    
  //   this.http.get('https://marlo-es.firebaseio.com/obras.json').map(
  //     (respuesta: Response) => {
  //       console.log('repuseta', respuesta.json());
  //     }
  //   ).subscribe(
  //     (data) => {
  //       console.log('entra paqui');
  //     }
  //  );
  }

}
