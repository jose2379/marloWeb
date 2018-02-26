import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Obra } from '../interfaces/obra';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ObrasService {

  obrasCollection: AngularFirestoreCollection<Obra>;
  obras: Observable<Obra[]>;
  obrasDoc: AngularFirestoreDocument<Obra>;

  constructor(public afs: AngularFirestore) {
    console.log('contrus');
    this.obrasCollection = this.afs.collection('obras');
    this.obras = this.obrasCollection.snapshotChanges().map(changes => {
      console.log('tenemos cambios', changes);
      return changes.map(ele => {
        const data = ele.payload.doc.data() as Obra;
        data.id = ele.payload.doc.id;
        return data;
      });
    });
  }

  getObras() {
    return this.obras;
  }

  addObra(obra: Obra) {
    this.obrasCollection.add(obra);
  }

  deleteObra(obra: Obra) {
    this.obrasDoc = this.afs.doc(`obras/${obra.id}`);
    this.obrasDoc.delete();
  }

  updateObra(obra: Obra) {
    this.obrasDoc = this.afs.doc(`obras/${obra.id}`);
    this.obrasDoc.update(obra);
  }


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
