import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Obra } from '../interfaces/obra';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { FirebaseApp } from 'angularfire2';

@Injectable()
export class ObrasService {

  obrasCollection: AngularFirestoreCollection<Obra>;
  obras: Observable<Obra[]>;
  obrasDoc: AngularFirestoreDocument<Obra>;
  obrasMostradas: Obra[];

  fondoHome$: BehaviorSubject<string|null>;

  constructor(public afs: AngularFirestore) {
    console.log('contrus');
    this.obrasCollection = this.afs.collection('obras');
  }

  getFromFirebase(){
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
    if(!this.obras) this.getFromFirebase(); 
    return this.obras;
  }
  getObrasFiltradas(filtro: string, valor: any): Observable<Obra[]> {

    const query = this.obrasCollection.ref.where(filtro, '==', valor);
    const filtroObras = new AngularFirestoreCollection<Obra>(this.obrasCollection.ref, query);
    // filtroObras.valueChanges().subscribe(value => {
    //     console.log('value', value);
    //     const obrasFiltradas: Obra[] = [];
    //     return value.map(ele => {
    //       obrasFiltradas.push(ele);
    //       console.log('ele', ele);
    //       // return obrasFiltradas;
    //       // const data = ele.payload.doc.data() as Obra;
    //       // data.id = ele.payload.doc.id;
    //       // return data;
    //     });
    //   }
    // );
    this.obras = filtroObras.valueChanges();
    console.log('obrasCollection fsdf', this.obras);
    return this.obras;
    
    
    // this.obras = this.obrasCollection.snapshotChanges().filter()
    // .list('/books', {
    //     query: {
    //         orderByChild: 'title',
    //         equalTo: 'My book #1',
    //     }
    // });
}

  addObra(obra: Obra) {
    console.log('addObra');
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

  guardarTodas () {
    const stringObj = JSON.stringify(this.obrasOld);
    const parsePObj = JSON.parse(stringObj);
    const cuentaObras = 0;
    const cuentaImagenes = 0;
    const cuentaImagenesObra = 0;
    for(var prop in this.obrasOld) {
      // console.log('OBRAS => prop', prop, 'ele', this.obrasOld[prop]);
      let datosImagen = this.imagesOld[this.obrasOld[prop].key_imagen];
      if(datosImagen !== undefined){
        let obraCompleta: Obra = {}; // = this.obrasOld[prop];
        obraCompleta.dimension = this.obrasOld[prop].dimension;
        obraCompleta.tecnica = this.obrasOld[prop].tecnica;
        obraCompleta.titulo = this.obrasOld[prop].titulo;
        obraCompleta.fondoHome = false;
        if(obraCompleta.titulo === '"Grapada"' || obraCompleta.titulo === '"Mi mente en el reino de las mentes"' || obraCompleta.titulo === 'Ranking Getränke' || obraCompleta.titulo === '"Was denkst du?"'){
          obraCompleta.fondoHome = true;
          console.log('Obra a Guardar', obraCompleta.titulo, obraCompleta.fondoHome);
        }
        obraCompleta.fechaString = this.obrasOld[prop].fecha;
        obraCompleta.url_imagen = datosImagen.url;
        obraCompleta.venta = {};
        obraCompleta.venta.mostrarPrecio = false;
        this.addObra(obraCompleta);
      }
    }
    for(var prop in this.imagesOld) {
      console.log('imagesOld => prop', prop, 'ele', this.imagesOld[prop]);
    }
  }

  obrasOld = {
    "-Kd-ld_lF9eicQuLBaKh" : {
      "dimension" : "50 x 30",
      "fecha" : "dic. 2011",
      "key_imagen" : "-KcWVxVzgdc_yC6oBB3W",
      "tecnica" : "Acrílico sobre madera",
      "titulo" : "Ranking Getränke"
    },
    "-Kd-ld_q2tnoTFz73iov" : {
      "dimension" : "30 x 40",
      "fecha" : "dic. 2016",
      "key_imagen" : "-KcWVxW5SnnFtM-IRuBn",
      "tecnica" : "Acrílico sobre madera",
      "titulo" : "Flaméncula"
    },
    "-Kd-ld_t2MSOzQwI3sJR" : {
      "dimension" : "54 x 106",
      "fecha" : "dic. 2013",
      "key_imagen" : "-KcWVxW9nWqWqa9zeYDK",
      "tecnica" : "Gresite, acrílico y barniz sobre trozo de madera de mueble",
      "titulo" : "Er Pueblo"
    },
    "-Kd-ld_wnCakSfqyiJc3" : {
      "dimension" : "60 x 40",
      "fecha" : "jun. 2016",
      "key_imagen" : "-KcWVxWDRODFZH07RPHG",
      "tecnica" : "Huevos consumidos cascado por el hambre de la vida  y acrílico sobre lienzo",
      "titulo" : "La vida frita!"
    },
    "-Kd-lda-eicZwC2NfJ8E" : {
      "dimension" : "30 x 40",
      "fecha" : "jun 2016",
      "key_imagen" : "-KcWVxWOwDULjOojQzKt",
      "tecnica" : "Acrílico sobre lienzo",
      "titulo" : "Los lunares de mi arma"
    },
    "-Kd-lda1MiD9fkAZF90m" : {
      "dimension" : "220 x 122",
      "fecha" : "abr. 2016",
      "key_imagen" : "-KcWVxWTn9eDpsQXcKHd",
      "tecnica" : "1192 cápsulas nexpresso, acrílico, espejo roto, alhambre, harina, chapa de hierro y silicona líquida sobre tabla de aglomerado.",
      "titulo" : "Cafe en el mar con Mr. Cat"
    },
    "-Kd-lda4UK_Bi036Mnlp" : {
      "dimension" : "20 x 20",
      "fecha" : "jun. 2016",
      "key_imagen" : "-KcWVxWZlOIxksPhsoxH",
      "tecnica" : "Rotuladores sobre cartón",
      "titulo" : "Puz z z le"
    },
    "-Kd-lda6hev65TB4HC_z" : {
      "dimension" : "15 x 10",
      "fecha" : "jun. 2016",
      "key_imagen" : "-KcWVxWdSQuO8UMwSfKy",
      "tecnica" : "Rotuladores sobre lienzo",
      "titulo" : "Night"
    },
    "-Kd-lda86nEWvVUkBBxQ" : {
      "dimension" : "50 x 50",
      "fecha" : "nov. 2013",
      "key_imagen" : "-KcWVxWgZJs4TNU7VqIN",
      "tecnica" : "Medicamentos caducados, espray y acrílico sobre lienzo",
      "titulo" : "Ibuprofeno del desenfreno"
    },
    "-Kd-ldaBOoU4Gizz1_No" : {
      "dimension" : "50 x 70",
      "fecha" : "nov. 2013",
      "key_imagen" : "-KcWVxWk4Dv8v_o0qLd9",
      "tecnica" : "Acrílico y rotulador sobre lienzo",
      "titulo" : "Beautiful monster"
    },
    "-Kd-ldaFf3jR0sypnVRG" : {
      "dimension" : "30 x 50",
      "fecha" : "feb. 2014",
      "key_imagen" : "-KcWVxWo0kHutVISLPJP",
      "tecnica" : "Acrílico sobre madera",
      "titulo" : "Distorsiona la mano"
    },
    "-Kd-ldaIxt0O7xBpYket" : {
      "dimension" : "50 x 40",
      "fecha" : "ago. 2013",
      "key_imagen" : "-KcWVxWrvl6uf0Jl2vOg",
      "tecnica" : "Espray, acrílico y acuarela sobre cartón duro",
      "titulo" : "Noche que anochece luna"
    },
    "-Kd-ldaK-ZYx5rJEJbA-" : {
      "dimension" : "86 x 160",
      "fecha" : "ene. 2014",
      "key_imagen" : "-KcWVxWx7o3-K3a5BQ6h",
      "tecnica" : "Acrílico, espray y rotulador sobre madera",
      "titulo" : "Keep your eggs in their minds"
    },
    "-Kd-ldaPEjAHh3Au52__" : {
      "dimension" : "138 x 39",
      "fecha" : "abr. 2014",
      "key_imagen" : "-KcWVxX0q0R-JR0df7gu",
      "tecnica" : "Acrílico, chapa, cristales, un par de ostras y gancho de hierro sobre mesa de cocina abandonada",
      "titulo" : "67.5 en couple"
    },
    "-Kd-ldaVAt_DaTm-VBXK" : {
      "dimension" : "30 x 20",
      "fecha" : "Enero 1998",
      "key_imagen" : "-KcWVxX5_KCwX9aTjHdK",
      "tecnica" : "tBolígrafos, rotuladores, lápices de colores sobre papel",
      "titulo" : "Confessions 1 / 3"
    },
    "-Kd-ldaYMDVDTyLZFEfu" : {
      "dimension" : "30 x 20",
      "fecha" : "Enero 1998",
      "key_imagen" : "-KcWVxXCNl9d9u-dp42M",
      "tecnica" : "tBolígrafos, rotuladores, lápices de colores sobre papel",
      "titulo" : "Confessions 2 / 3"
    },
    "-Kd-ldaaxO9Qu3djSE0F" : {
      "dimension" : "30 x 20",
      "fecha" : "1998",
      "key_imagen" : "-KcWVxXHuY8ke0zBqvEq",
      "tecnica" : "tBolígrafos, rotuladores, lápices de colores sobre papel",
      "titulo" : "Confessions 3 / 3"
    },
    "-Kd-ldad2M3PffXR1xTT" : {
      "dimension" : "50 x 38",
      "fecha" : "jul 2015",
      "key_imagen" : "-KcWVxXMcj3rU-B0yTfs",
      "tecnica" : "Acrílico sobre madera",
      "titulo" : "El gallo Gigi"
    },
    "-Kd-ldafZPt038F2dHjP" : {
      "dimension" : "30 x 20",
      "fecha" : "2000",
      "key_imagen" : "-KcWVxXQXeOYkUy3l6uk",
      "tecnica" : "Cartulinas de colores sobre papel",
      "titulo" : "Pedazos 2000"
    },
    "-Kd-ldai9vGqn4iwuLVn" : {
      "dimension" : "32 x 41 x 29",
      "fecha" : "dic. 2014",
      "key_imagen" : "-KcWVxXVHfrTBTWBxbZ9",
      "tecnica" : "Hierro moldeado a cuadros con botella de cristal",
      "titulo" : "Botechenta "
    },
    "-Kf2hAR_PMdVfCNx2s30" : {
      "dimension" : "40x50cm",
      "fecha" : "Febrero 2015",
      "key_imagen" : "-KfaOXOO3miNI3q_02sV",
      "tecnica" : "Papel higiénico mojado en agua turbia y secado al sol salado con acrílico sobre lienzo",
      "titulo" : "Cagada limpia"
    },
    "-KfaKzSrNE7T3Ond8xH4" : {
      "dimension" : "40x40cm",
      "fecha" : "Marzo 2017",
      "key_imagen" : "-KfaKhGQDYVnDpmEqJK6",
      "tecnica" : "Acrilico sobre lienzo",
      "titulo" : "\"Luna roja\""
    },
    "-KfaLPYZFFgwCLYRCB9B" : {
      "dimension" : "50x70cm",
      "fecha" : "Noviembre 16",
      "key_imagen" : "-Kf2c-7l31MRzlda2iN6",
      "tecnica" : "Acrílico sobre lienzo",
      "titulo" : "\"Espetillo\""
    },
    "-KfaLlCoHLbRy95bX35b" : {
      "dimension" : "60x60cm",
      "fecha" : "Julio 17",
      "key_imagen" : "-KfaLafqsDjaDAuILwSc",
      "tecnica" : "Acrílico sobre lienzo",
      "titulo" : "\"Ton miroir\""
    },
    "-KfaMR47_IQVsGELvntB" : {
      "dimension" : "130x80cm",
      "fecha" : "Agosto 17",
      "key_imagen" : "-KfaMFo3Zdn_uaU4HeRB",
      "tecnica" : "Acrílico y emociones sobre lienzo",
      "titulo" : "\"Was denkst du?\""
    },
    "-KfaMxLk4TowRWVd8RFO" : {
      "dimension" : "60x40cm",
      "fecha" : "Enero 2017",
      "key_imagen" : "-KfaMdPt-aDmzY2b1Pdm",
      "tecnica" : "Cable de fibra óptica sobrante del técnico de telefonía y acrílico sobre tabla de madera.",
      "titulo" : "\"200 minutos\""
    },
    "-KfaOEIRcOv3O0lWdIQQ" : {
      "dimension" : "70x45cm",
      "fecha" : "Enero 17",
      "key_imagen" : "-KfaO2TPym_2t0Tc1c7L",
      "tecnica" : "Acrílico sobre retal de aglomerado",
      "titulo" : "\"???\""
    },
    "-KfaP6qS1H2LPka9soBP" : {
      "dimension" : "20x30cm",
      "fecha" : "Noviembre 16",
      "key_imagen" : "-KgJ0WdUkmkD6I17Vp9Q",
      "tecnica" : "Grapas sobre cartulina",
      "titulo" : "\"Grapada\""
    },
    "-KfaRQQ18kvp-8CKG0a9" : {
      "dimension" : "20x15cm",
      "fecha" : "Febrero 2017",
      "key_imagen" : "-KfaROMI3yJthAk5raN5",
      "tecnica" : "Rotulador futbolístico sobre lienzo",
      "titulo" : "\" No me gusta la mentira\""
    },
    "-KgJ3tbJsgEbSHYGB9N3" : {
      "dimension" : "119x110cm",
      "fecha" : "Febrero 2014",
      "key_imagen" : "-Kfhr22UIwcoA687VI-i",
      "tecnica" : "Acrílico sobre conglomerado",
      "titulo" : "\"Die Farben verfolgen mich!\""
    },
    "-KgJ4AmSMGIoYbiemfDP" : {
      "dimension" : "100x43cm",
      "fecha" : "Noviembre 2014",
      "key_imagen" : "-Kfhp_Sj-Kw-q1v_IPnZ",
      "tecnica" : "Imprimación sobre hierro recortado",
      "titulo" : "Casradial"
    },
    "-KgJ4VxBwMVCaXFUsPS0" : {
      "dimension" : "77x74cm",
      "fecha" : "Febrero 2015",
      "key_imagen" : "-KfhqvZuLwQe2rOlosoh",
      "tecnica" : "Espejo, alhambre, clavos,pintura y acrílico sobre palet de madera condenada.",
      "titulo" : "\"La couchédu soleil cassé!\""
    },
    "-KgJ4ltNziMnfTbfwWzr" : {
      "dimension" : "40x26cm",
      "fecha" : "Diciembre 2015",
      "key_imagen" : "-KfhrDBD8WhgqRbQ2Z-r",
      "tecnica" : "Chapa de hierro moldeada con mis manos",
      "titulo" : "\"Mieme\""
    },
    "-KgJ5WwSkMiTgRJzQkj-" : {
      "dimension" : "40x20cm",
      "fecha" : "Febrero 2017",
      "key_imagen" : "-Kfhq5ogkLQcATDzN700",
      "tecnica" : "Carboncillo sobre lámina A-3",
      "titulo" : "\"Testa di cazzo\""
    },
    "-KgJ5s3ux5V0dvmHL7N0" : {
      "dimension" : "28x25cm",
      "fecha" : "Diciembre 2014",
      "key_imagen" : "-KfhrIWysKCMsEGDDbhf",
      "tecnica" : "Chapa fina moldeada a golpes de martillo dobles.",
      "titulo" : "\"Zaparreando\""
    },
    "-KgJ66rOHdpIhyqQgM8x" : {
      "dimension" : "80x60cm",
      "fecha" : "Noviembre 2014",
      "key_imagen" : "-KfhrPDhGkqD9kRc1Rec",
      "tecnica" : "Acrílico sobre lienzo desgarrado a rayas.",
      "titulo" : "\"What´s up purple?\""
    },
    "-KgJ6LLFnUK8TyHq0Jb5" : {
      "dimension" : "80x40cm",
      "fecha" : "Febrero 2017",
      "key_imagen" : "-KfhqHglGfzWtJCuGp2A",
      "tecnica" : "Acrílico derramado a trazos sobre papel.",
      "titulo" : "No tittle"
    },
    "-KgJ6wJXL9pUu76J_Cly" : {
      "dimension" : "50x70cm",
      "fecha" : "Diciembre 2013",
      "key_imagen" : "-KfhrWfybfHppwORTUPx",
      "tecnica" : "Acrílico sobre lienzo",
      "titulo" : "\"Weihnachten\""
    },
    "-KgJ7BYmHx4bOorr275O" : {
      "dimension" : "40x20cm",
      "fecha" : "Agosto 2013",
      "key_imagen" : "-KfhrhSUAyuMl5Abgye3",
      "tecnica" : "Acrílico sobre papel",
      "titulo" : "\"Uovo marcio\""
    },
    "-KgJ7eTkKyuBq4n8EwNg" : {
      "dimension" : "30x29cm",
      "fecha" : "Enero 2016",
      "key_imagen" : "-KfhrxqO2EBNLhebjTYy",
      "tecnica" : "Tres trocitos de hierro sobre una chapa, pasa que pasa el tiempo, se oxidan y dejan su huella clavada sobre su sombra.",
      "titulo" : "\"Timing\""
    },
    "-KgJ7rY44ha1UARx_mWb" : {
      "dimension" : "50x40cm",
      "fecha" : "Septiembre 2013",
      "key_imagen" : "-Kfhs3sKNxdtOHqr8wKK",
      "tecnica" : "Acrílico sobre tabla de madera.",
      "titulo" : "\"Exit\""
    },
    "-KgJ87MZeScxeq4l_UnC" : {
      "dimension" : "20x15cm",
      "fecha" : "Julio 2014",
      "key_imagen" : "-KfhsZXnTZQ-2VODcxmj",
      "tecnica" : "Rotulador y lapiz 2B sobre lienzo.",
      "titulo" : "\"Fishing my own peper\""
    },
    "-KgJ8dpX-j-NGlRRIkmB" : {
      "dimension" : "18x36cm",
      "fecha" : "Febrero 2015",
      "key_imagen" : "-Kfht1udNVUsouLyWLQZ",
      "tecnica" : "Espray soble hierro soldado.",
      "titulo" : "\"Gabbia azurra\""
    },
    "-KgJ8tHNhoGDprvSDuKP" : {
      "dimension" : "50x40cm",
      "fecha" : "Mayo 2014",
      "key_imagen" : "-Kfht8krrunTP1sJzD4C",
      "tecnica" : "Acrílico y rotulador sobre lienzo.",
      "titulo" : "\"Ibiza means..\""
    },
    "-KgJ9SJlYVaGW_mvnwV3" : {
      "dimension" : "40x20cm",
      "fecha" : "Febrero 2016",
      "key_imagen" : "-KfhpjVdB-tYdVS2snpv",
      "tecnica" : "Carboncillo sobre papel.",
      "titulo" : "\"Shot it\""
    },
    "-KgJ9kgSRvk9XrnSyl3J" : {
      "dimension" : "20x20cm",
      "fecha" : "Septiembre 2013",
      "key_imagen" : "-Kfht_Deo8O0UckJOM_P",
      "tecnica" : "Cápsulas de nespresso, rotulador y acrílico sobre lienzo.",
      "titulo" : "\"Juego de niños\""
    },
    "-KgJ9zuvFTesqb06ITf2" : {
      "dimension" : "50x70cm",
      "fecha" : "Diciembre 2015",
      "key_imagen" : "-KfhuDUzRh8x2iXxjqJV",
      "tecnica" : "Acrílico y rotulador sobre lienzo.",
      "titulo" : "\"Lovers hate\""
    },
    "-KgJBjHRlBnYRN5pr5wl" : {
      "dimension" : "70x50cm",
      "fecha" : "Agosto 2013",
      "key_imagen" : "-KfhuWtEXJcjnqZlwRWC",
      "tecnica" : "Acuarela sobre tablón de madera.",
      "titulo" : "\"Mi mente en el reino de las mentes\""
    },
    "-KgJCDN08sOvbg8JpEEK" : {
      "dimension" : "40x40cm",
      "fecha" : "Noviembre 2014",
      "key_imagen" : "-KfhuegyXCQP7MCz4uKQ",
      "tecnica" : "Inyecciones de exeparina y acrílico sobre lienzo.",
      "titulo" : "\"Mrs. Exeparina, la Jodida\""
    },
    "-KgJCoBoVM90nTJ3DyBP" : {
      "dimension" : "45x15cm",
      "fecha" : "Marzo 2016",
      "key_imagen" : "-Kfhv03uOj54j7kUkDg1",
      "tecnica" : "Casa del tabarro sobre un tornillo y acrílico en tabla de madera.",
      "titulo" : "\"Tabardillos kingdom\""
    },
    "-KgJD8-rDJpSjWV7cSEB" : {
      "dimension" : "50x50cm",
      "fecha" : "Enero 2014",
      "key_imagen" : "-KfhvGxKb5JZPsdh_pOj",
      "tecnica" : "Lata de cerveza y acrílico sobre lienzo.",
      "titulo" : "\"Pause\""
    },
    "-KgJDNHmSBBy4uvYuClM" : {
      "dimension" : "70x40cm",
      "fecha" : "Diciembre 2015",
      "key_imagen" : "-KfhvLnGTmcSzr2zN0zF",
      "tecnica" : "Fieltro, rotulador y acrílico sobre lienzo.",
      "titulo" : "\"Pompa\""
    },
    "-KgJD_N2MFVOWzu68F3j" : {
      "dimension" : "50x30cm",
      "fecha" : "Febrero 2014",
      "key_imagen" : "-KfhvWc2e5aprNXRTXNt",
      "tecnica" : "Papel higiénico y acrílico sobre lienzo.",
      "titulo" : "\"Sunday morning\""
    },
    "-KgJDrODSdMCYiepGxNC" : {
      "dimension" : "50x70cm",
      "fecha" : "Diciembre 2014",
      "key_imagen" : "-Kfhvl3d5E0iscCHDR-F",
      "tecnica" : "Pegamento y un retal remanente de periódico del siglo pasado con acrílico sobre lienzo.",
      "titulo" : "\"Siglo XX\""
    },
    "-KgJEhzAb3QAUXygdRTy" : {
      "dimension" : "Diciembre 2014",
      "fecha" : "32x21cm",
      "key_imagen" : "-KfhvwHbIgDimqd-QH5Q",
      "tecnica" : "Pintura sobre hierro soldado.",
      "titulo" : "\"Spoir\""
    },
    "-KgJExNND7qkZpd62_GN" : {
      "dimension" : "40x20cm",
      "fecha" : "Agosto 2013",
      "key_imagen" : "-Kfhwmf2jzJyO1Ezl8qn",
      "tecnica" : "Acuarela y rotulador sobre papel.",
      "titulo" : "\"Spain without borders\""
    },
    "-KgJHWAL0E9v29poaE4e" : {
      "dimension" : "25x25cm",
      "fecha" : "Septiembre 2013",
      "key_imagen" : "-KfhpNXHptKXjYUao4Up",
      "tecnica" : "Acrílico y mil recuerdos de mi Gema Real marcados con rotulador sobre acrílico.",
      "titulo" : "\"À très bientôt ma pôte...\""
    },
    "-KgJKkNuKaeINBKwwzKP" : {
      "dimension" : "24x10cm",
      "fecha" : "Diciembre 2014",
      "key_imagen" : "-KgJIEVjfZZj5G_RZmQU",
      "tecnica" : "Hierro y chapa soldado con acrílico",
      "titulo" : "\"Albero di natale\""
    },
    "-KgJKyZ8A0JsG0AN-krF" : {
      "dimension" : "50x70cm",
      "fecha" : "Enero 2014",
      "key_imagen" : "-KgJIOxUG1BeWE8LiuhX",
      "tecnica" : "Acrílico sobre lienzo.",
      "titulo" : "\"Aspettiamoci\""
    },
    "-KgJLfxpyf2L6hhEl33Q" : {
      "dimension" : "Formato digital A-4",
      "fecha" : "Enero 2015",
      "key_imagen" : "-KgJJP9tWY99Zf4zwlkv",
      "tecnica" : "Collage digital de varias obras by titi.",
      "titulo" : "\"Collage omondo\""
    }
  };
  imagesOld = {
    "-KcWVxVzgdc_yC6oBB3W" : {
      "key_obra" : "-KcRZuERg6P8SKpVwrR5",
      "nombre" : "ranking.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Franking.jpg?alt=media&token=4b72c095-cfc9-4b86-817f-7b802b8df203"
    },
    "-KcWVxW5SnnFtM-IRuBn" : {
      "key_obra" : "-KcRZuE_qTrszw-4AMOL",
      "nombre" : "flamencula.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fflamencula.jpg?alt=media&token=1bcd5d66-c612-4e45-9b40-7c00064229ab"
    },
    "-KcWVxW9nWqWqa9zeYDK" : {
      "key_obra" : "-KcRZuEgNl8Df3bygRsX",
      "nombre" : "pueblo.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fpueblo.jpg?alt=media&token=0199b582-c1a1-492b-bd02-6aca276f34c1"
    },
    "-KcWVxWDRODFZH07RPHG" : {
      "key_obra" : "-KcRZuEl7etcvr6w_-fv",
      "nombre" : "vida.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fvida.jpg?alt=media&token=1e3161c1-c9ca-4f6f-9bc8-aea933d57af5"
    },
    "-KcWVxWOwDULjOojQzKt" : {
      "key_obra" : "-KcRZuEtH3zTARf9byIX",
      "nombre" : "lunares.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Flunares.jpg?alt=media&token=ac4bb881-cde2-4a8a-a49e-71c994df2a08"
    },
    "-KcWVxWTn9eDpsQXcKHd" : {
      "key_obra" : "-KcRZuEzBqJwH8Bl3siY",
      "nombre" : "cafe.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fcafe.jpg?alt=media&token=3afdb3e4-38d9-4da6-b375-5596413df51a"
    },
    "-KcWVxWZlOIxksPhsoxH" : {
      "key_obra" : "-KcRZuF35SXFISAwQlpR",
      "nombre" : "puzzle.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fpuzzle.jpg?alt=media&token=be4742c8-6235-49a2-b0ae-60516e484b95"
    },
    "-KcWVxWdSQuO8UMwSfKy" : {
      "key_obra" : "-KcRZuFA_UDGNyV-JLf6",
      "nombre" : "night.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fnight.jpg?alt=media&token=0fee2eec-ae29-4a33-b108-eb2d65296e56"
    },
    "-KcWVxWgZJs4TNU7VqIN" : {
      "key_obra" : "-KcRZuFGAgflNC-3cZdt",
      "nombre" : "ibuprofeno.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fibuprofeno.jpg?alt=media&token=e1223fe3-1be8-436b-823c-0b197bb900fb"
    },
    "-KcWVxWk4Dv8v_o0qLd9" : {
      "key_obra" : "-KcRZuFRImOhEpuKEwci",
      "nombre" : "beautiful.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fbeautiful.jpg?alt=media&token=ac827967-7c0d-4c93-932f-8cb3480b2913"
    },
    "-KcWVxWo0kHutVISLPJP" : {
      "key_obra" : "-KcRZuFWz9EJjWd6dJRh",
      "nombre" : "distorsiona.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fdistorsiona.jpg?alt=media&token=3654bfc0-a72b-428a-a57a-0d0d08f2f8e5"
    },
    "-KcWVxWrvl6uf0Jl2vOg" : {
      "key_obra" : "-KcRZuFbXAGoHPah-27o",
      "nombre" : "noche.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fnoche.jpg?alt=media&token=a25325bf-19b3-4f55-9ede-a5988066cf5c"
    },
    "-KcWVxWx7o3-K3a5BQ6h" : {
      "key_obra" : "-KcRZuFhB05QPeNhsr65",
      "nombre" : "eggs.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Feggs.jpg?alt=media&token=7ffbb266-6e66-42ba-8ae2-eb8e17f67c45"
    },
    "-KcWVxX0q0R-JR0df7gu" : {
      "key_obra" : "-KcRZuFnQ4-cdNjWyoyP",
      "nombre" : "couple.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fcouple.jpg?alt=media&token=b1234105-a5d3-4def-a802-67f9a7cdefe0"
    },
    "-KcWVxX5_KCwX9aTjHdK" : {
      "key_obra" : "-KcRZuFs4StzSBkcn3fr",
      "nombre" : "confessions_01.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fconfessions_01.jpg?alt=media&token=b7ff5033-a7aa-4175-aa9a-891b0a747e15"
    },
    "-KcWVxXCNl9d9u-dp42M" : {
      "key_obra" : "-KcRZuG2x3kPAHQ__z40",
      "nombre" : "confessions_02.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fconfessions_02.jpg?alt=media&token=7dede4ec-8b64-4d2e-a5e9-8c245438b3cf"
    },
    "-KcWVxXHuY8ke0zBqvEq" : {
      "key_obra" : "-KcRZuG7XBOMEeoyjfxy",
      "nombre" : "confessions_03.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fconfessions_03.jpg?alt=media&token=875ee6f9-0127-492d-a064-fbd8020aa192"
    },
    "-KcWVxXMcj3rU-B0yTfs" : {
      "key_obra" : "-KcRZuGCLHWdDdIL6xhu",
      "nombre" : "gallo.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fgallo.jpg?alt=media&token=148439d5-a173-41f0-ae3c-f99182ed8f11"
    },
    "-KcWVxXVHfrTBTWBxbZ9" : {
      "key_obra" : "-KcRZuGMyLFdrh8EOkDu",
      "nombre" : "botechenta.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fbotechenta.jpg?alt=media&token=c4fc8ba2-1c2c-496c-b2f3-2c6e77d71cfd"
    },
    "-Kf2c-7l31MRzlda2iN6" : {
      "key_obra" : "sinAsignar",
      "nombre" : "IMG-20170312-WA0010.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FIMG-20170312-WA0010.jpg?alt=media&token=63e8d5e5-a628-476a-9e86-f8ae2a7c0349"
    },
    "-KfaKJ_o0sRliJ4G5A7x" : {
      "key_obra" : "sinAsignar",
      "nombre" : "14899228845172049940548.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F14899228845172049940548.jpg?alt=media&token=73663580-df1c-45d3-aed5-84b4693cd8ae"
    },
    "-KfaKhGQDYVnDpmEqJK6" : {
      "key_obra" : "sinAsignar",
      "nombre" : "1489923004369718735805.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F1489923004369718735805.jpg?alt=media&token=5fb88ee8-8ac5-42ff-aa22-a1c808517206"
    },
    "-KfaLafqsDjaDAuILwSc" : {
      "key_obra" : "sinAsignar",
      "nombre" : "FB_IMG_1470221739245.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FFB_IMG_1470221739245.jpg?alt=media&token=eb9a21d4-e1bf-4cf9-8a3c-394bbf69cf99"
    },
    "-KfaLwDHMZujfqEnb-ZX" : {
      "key_obra" : "sinAsignar",
      "nombre" : "IMG_20161202_092759.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FIMG_20161202_092759.jpg?alt=media&token=21ce243a-4b81-458a-8dc0-69bf6d8ed980"
    },
    "-KfaMFo3Zdn_uaU4HeRB" : {
      "key_obra" : "sinAsignar",
      "nombre" : "IMG_20160805_102040.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FIMG_20160805_102040.jpg?alt=media&token=d9e75ee9-4557-4468-a31d-297ad921afbe"
    },
    "-KfaMXLW5R3KFL93btFj" : {
      "key_obra" : "sinAsignar",
      "nombre" : "IMG-20161228-WA0043.jpeg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FIMG-20161228-WA0043.jpeg?alt=media&token=bb2c0e25-26e4-4047-b4c7-a0587f03262e"
    },
    "-KfaMdPt-aDmzY2b1Pdm" : {
      "key_obra" : "sinAsignar",
      "nombre" : "1489923511215-1712738893.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F1489923511215-1712738893.jpg?alt=media&token=74f9623d-5857-43ac-bfba-a12e2d774c6a"
    },
    "-KfaNsm5GNl0kZg4Rz--" : {
      "key_obra" : "sinAsignar",
      "nombre" : "FB_IMG_1482951651438.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FFB_IMG_1482951651438.jpg?alt=media&token=442fe73f-04d0-41d3-b9e6-3a14f317008e"
    },
    "-KfaO2TPym_2t0Tc1c7L" : {
      "key_obra" : "sinAsignar",
      "nombre" : "1489923875177982821152.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F1489923875177982821152.jpg?alt=media&token=743f1579-4037-42af-acb9-25ff46e8d434"
    },
    "-KfaOXOO3miNI3q_02sV" : {
      "key_obra" : "sinAsignar",
      "nombre" : "1489924007632-274383828.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F1489924007632-274383828.jpg?alt=media&token=dd49b43c-bea7-46ee-ab74-26343804fa6c"
    },
    "-KfaOzSjj9ITZmIjnFdR" : {
      "key_obra" : "sinAsignar",
      "nombre" : "14899241186221547378918.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F14899241186221547378918.jpg?alt=media&token=95f5b225-a88d-43cd-ad2c-940b62693703"
    },
    "-KfaROMI3yJthAk5raN5" : {
      "key_obra" : "sinAsignar",
      "nombre" : "14899247616242079081223.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F14899247616242079081223.jpg?alt=media&token=d8f421c2-1ede-44dc-af7a-cf9c7c754ae6"
    },
    "-KfhpNXHptKXjYUao4Up" : {
      "key_obra" : "sinAsignar",
      "nombre" : "dduuro (5).jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fdduuro%20(5).jpg?alt=media&token=82396243-cc38-4a50-a4ed-f3db03b22d78"
    },
    "-Kfhp_Sj-Kw-q1v_IPnZ" : {
      "key_obra" : "sinAsignar",
      "nombre" : "mARLó 012.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FmARL%C3%B3%20012.JPG?alt=media&token=ffe1ffa2-2412-41a4-8e74-9cc17d0d58f4"
    },
    "-KfhpjVdB-tYdVS2snpv" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04933.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04933.JPG?alt=media&token=cb810681-2458-4a76-a63f-0b795f8415e8"
    },
    "-Kfhq5ogkLQcATDzN700" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04973.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04973.JPG?alt=media&token=23eaa224-d99c-46eb-af7e-0896e3f2e2b5"
    },
    "-KfhqHglGfzWtJCuGp2A" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04959.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04959.JPG?alt=media&token=5d2fbe9a-b6a9-4996-bb19-81bf92bc32b2"
    },
    "-KfhqvZuLwQe2rOlosoh" : {
      "key_obra" : "sinAsignar",
      "nombre" : "IMG_0031.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FIMG_0031.JPG?alt=media&token=ac72de96-b019-4c41-b9c2-a36198133cae"
    },
    "-Kfhr22UIwcoA687VI-i" : {
      "key_obra" : "sinAsignar",
      "nombre" : "QUEDAN ESTAS (4).jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FQUEDAN%20ESTAS%20(4).jpg?alt=media&token=9a11a864-414d-44a5-be15-9eed70e054ed"
    },
    "-KfhrDBD8WhgqRbQ2Z-r" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC05029.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC05029.JPG?alt=media&token=128d5e72-dbcc-44e9-b21c-35f7fbc40626"
    },
    "-KfhrIWysKCMsEGDDbhf" : {
      "key_obra" : "sinAsignar",
      "nombre" : "Zaparreando. 17X12cm. mARLó.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FZaparreando.%2017X12cm.%20mARL%C3%B3.jpg?alt=media&token=48dbde75-295e-4e9f-b03b-546b56d822a5"
    },
    "-KfhrPDhGkqD9kRc1Rec" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04331.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04331.JPG?alt=media&token=c42333ee-7c1a-40a7-be44-e4cb08cca3fd"
    },
    "-KfhrWfybfHppwORTUPx" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04304.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04304.JPG?alt=media&token=b4d282b4-ad2a-4027-af80-4f38fc6640de"
    },
    "-Kfhrd7HeYticGMSiTiJ" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04692.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04692.JPG?alt=media&token=6b41dbad-4527-4e68-a7e3-e8c0247726bc"
    },
    "-KfhrhSUAyuMl5Abgye3" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04351.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04351.JPG?alt=media&token=7be0f971-d17e-4385-ae0d-740d2cbd54ac"
    },
    "-KfhrxqO2EBNLhebjTYy" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04874.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04874.JPG?alt=media&token=6d89be7a-9405-40e3-833c-287a1db7ac8b"
    },
    "-Kfhs3sKNxdtOHqr8wKK" : {
      "key_obra" : "sinAsignar",
      "nombre" : "dduuro (1).JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fdduuro%20(1).JPG?alt=media&token=2ed3ec1a-83b8-4342-bf08-8402162bb357"
    },
    "-KfhsZXnTZQ-2VODcxmj" : {
      "key_obra" : "sinAsignar",
      "nombre" : "IMG-20140826-WA0004 - copia.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FIMG-20140826-WA0004%20-%20copia.jpg?alt=media&token=ecdd167c-993a-496c-a13e-b3f46c12f8ea"
    },
    "-Kfht1udNVUsouLyWLQZ" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04856.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04856.JPG?alt=media&token=e76b2e15-d623-4a19-8936-bcbca3ddfd46"
    },
    "-Kfht8krrunTP1sJzD4C" : {
      "key_obra" : "sinAsignar",
      "nombre" : "20150516_103021.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F20150516_103021.jpg?alt=media&token=52dce129-a3f9-40db-91ed-0594aa3781bb"
    },
    "-KfhtSO2w1T3TI_XNnS-" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04699.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04699.JPG?alt=media&token=ff399827-4543-4dd6-a2bf-e4ce91e7aa83"
    },
    "-Kfht_Deo8O0UckJOM_P" : {
      "key_obra" : "sinAsignar",
      "nombre" : "QUEDAN ESTAS (5).jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FQUEDAN%20ESTAS%20(5).jpg?alt=media&token=0c0a8352-eba3-421a-9d12-5525a51708d6"
    },
    "-KfhtfylpphKmNCqlqbU" : {
      "key_obra" : "sinAsignar",
      "nombre" : "IMG-20130731-WA0000 - copia.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FIMG-20130731-WA0000%20-%20copia.jpg?alt=media&token=d5c419fa-5a71-4b40-8512-719a8ce9e3e5"
    },
    "-KfhuDUzRh8x2iXxjqJV" : {
      "key_obra" : "sinAsignar",
      "nombre" : "LOVERS HATE 1115 50X70COM.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FLOVERS%20HATE%201115%2050X70COM.jpg?alt=media&token=3e66e156-78a0-4a7a-a988-69ffa5f3d3ac"
    },
    "-KfhuJPjKr5dSCBIQsIK" : {
      "key_obra" : "sinAsignar",
      "nombre" : "MANCHA NEGRA.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FMANCHA%20NEGRA.jpg?alt=media&token=1a85dfe1-b7d9-4ff1-872a-dd3a85a5ec1a"
    },
    "-KfhuWtEXJcjnqZlwRWC" : {
      "key_obra" : "sinAsignar",
      "nombre" : "september13 319.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fseptember13%20319.JPG?alt=media&token=6ebf9e04-f043-4a97-b8b4-0b7745e4934e"
    },
    "-KfhuegyXCQP7MCz4uKQ" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04339.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04339.JPG?alt=media&token=afd06608-0626-43df-81d1-fc437135c0d6"
    },
    "-Kfhur9lXWEW9zZvyNgV" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04753.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04753.JPG?alt=media&token=4e793302-4d57-4e08-a101-f75c10e9f46c"
    },
    "-Kfhv03uOj54j7kUkDg1" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC05044.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC05044.JPG?alt=media&token=6d6bae1e-0816-4fa6-bc6d-648949c5c81b"
    },
    "-KfhvGxKb5JZPsdh_pOj" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04319.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04319.JPG?alt=media&token=bae8f1aa-0247-4fde-8be7-5c7fc300cd70"
    },
    "-KfhvLnGTmcSzr2zN0zF" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC05051 (2).jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC05051%20(2).jpg?alt=media&token=38867641-1b1b-4119-adba-0b008e66e233"
    },
    "-KfhvWc2e5aprNXRTXNt" : {
      "key_obra" : "sinAsignar",
      "nombre" : "2014-01-20 18.13.42-1.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F2014-01-20%2018.13.42-1.jpg?alt=media&token=25f77d56-bcdb-4b76-ad85-0937c69f0937"
    },
    "-Kfhvl3d5E0iscCHDR-F" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04310.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04310.JPG?alt=media&token=3ed231d0-c3f5-45ee-8278-fddcd3ce771b"
    },
    "-KfhvqoEpMpo5hwOAQKO" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04804.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04804.JPG?alt=media&token=cb94fa16-430c-49bc-be80-d2a7f53153c9"
    },
    "-KfhvwHbIgDimqd-QH5Q" : {
      "key_obra" : "sinAsignar",
      "nombre" : "Spoir. 18X12cm. mARLó.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FSpoir.%2018X12cm.%20mARL%C3%B3.JPG?alt=media&token=c56e349b-142e-47ce-a56b-d60d7a151410"
    },
    "-KfhwaucobMUf-xQI7Hw" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC05037.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC05037.JPG?alt=media&token=cee11e78-7b4e-4864-b3d5-02a09a93c57d"
    },
    "-Kfhwmf2jzJyO1Ezl8qn" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04357.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04357.JPG?alt=media&token=d260e57a-113f-49fb-973b-47680387b47f"
    },
    "-KgJ0WdUkmkD6I17Vp9Q" : {
      "key_obra" : "sinAsignar",
      "nombre" : "WhatsApp Image 2017-03-28 at 10.24.57.jpeg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FWhatsApp%20Image%202017-03-28%20at%2010.24.57.jpeg?alt=media&token=09f079e6-7ebe-4905-8c0a-344d76780c7c"
    },
    "-KgJIEVjfZZj5G_RZmQU" : {
      "key_obra" : "sinAsignar",
      "nombre" : "Arbero di natale. 20X8cm. mARLó.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FArbero%20di%20natale.%2020X8cm.%20mARL%C3%B3.jpg?alt=media&token=652049b9-1523-4e74-b165-013a17672ba1"
    },
    "-KgJII06wkLBppRYCG-1" : {
      "key_obra" : "sinAsignar",
      "nombre" : "2015-01-15 12.41.28-1.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F2015-01-15%2012.41.28-1.jpg?alt=media&token=95ae0f5b-f6c4-423b-ba8b-3c524d70c593"
    },
    "-KgJIOxUG1BeWE8LiuhX" : {
      "key_obra" : "sinAsignar",
      "nombre" : "20140301_140908 (1).jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2F20140301_140908%20(1).jpg?alt=media&token=ef31b74f-a5c7-43e1-802c-993c6b6d05bf"
    },
    "-KgJIgW93dl3uyyEJSH5" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04938.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04938.JPG?alt=media&token=cbe7c47b-cbe6-40a1-9804-d151ffa75e41"
    },
    "-KgJJP9tWY99Zf4zwlkv" : {
      "key_obra" : "sinAsignar",
      "nombre" : "collage_01.jpg",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2Fcollage_01.jpg?alt=media&token=9422acc5-908f-4d28-9c90-023523cb883e"
    },
    "-KgJKRl4wBAldUYoGugc" : {
      "key_obra" : "sinAsignar",
      "nombre" : "DSC04315.JPG",
      "url" : "https://firebasestorage.googleapis.com/v0/b/marlo-es.appspot.com/o/galeria%2Fprincipal%2FDSC04315.JPG?alt=media&token=703cd422-9a87-43dc-98fe-cd1aac8780ae"
    }
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
