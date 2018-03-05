import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ObrasService } from './servicios/obras.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ObrasComponent } from './componentes/obras/obras.component';
import { AddObrasComponent } from './componentes/add-obras/add-obras.component';
import { HomeComponent } from './componentes/home/home.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { DetalleObraComponent } from './componentes/galeria/detalle-obra/detalle-obra.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ObrasComponent,
    AddObrasComponent,
    HomeComponent,
    GaleriaComponent,
    DetalleObraComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [ObrasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
