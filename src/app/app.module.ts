import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AngularFireModule } from 'angularfire2';

// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ObrasService } from './servicios/obras.service';
import { AlmacenDatosService } from './servicios/almacen-datos.service';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    AngularFontAwesomeModule
  ],
  providers: [ObrasService, AlmacenDatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
