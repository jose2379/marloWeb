import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

interface Obra {
  description: string;
  courseListIcon: string;
  iconUrl: string;
  longDescription: string;
  url: string;
}

@Injectable()
export class ObrasService {

  arrObras: Obra[] = [];

  constructor() { }

  // getObras(): Observable<any[]> {
  //   // return this.db.list('/obras').valueChanges();
  //   // let httpRequest: HttpRequest = new HttpRequest('get', 'https://marlo-es.firebaseio.com/obras');
  //   return this.http.get<Obra[]>('https://marlo-es.firebaseio.com/obras')
  //                   .map(data: Response) => {
  //                     return data
  //                   }
  //                   .subscribe(
  //                     res => {
  //                       console.log('respuesta', res);
  //                     }
  //                   );
  //   )
  // }

}
