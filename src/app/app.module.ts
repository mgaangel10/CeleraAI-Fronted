import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';

import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioSesionPageComponent } from './pages/inicio-sesion-page/inicio-sesion-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { HeaderComponent } from './componentes/header/header.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { CrearNegocioComponent } from './pages/crear-negocio/crear-negocio.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatLabel } from '@angular/material/form-field';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { AsistenteComponent } from './pages/asistente/asistente.component';
import { RutaOcultaComponentComponent } from './componentes/ruta-oculta-component/ruta-oculta-component.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionPageComponent,
    HomePageComponent,
    RegistroPageComponent,
    HeaderComponent,
    DashBoardComponent,
    CrearNegocioComponent,
    InventarioComponent,
    VentasComponent,
    EstadisticasComponent,
    FacturaComponent,
    AsistenteComponent,
    RutaOcultaComponentComponent
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    NgChartsModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatLabel,
    
    ReactiveFormsModule,
    MatFormField,
    MatCardModule,
    MarkdownModule,
    MatChipsModule,
    NgxChartsModule,
    NgbAccordionModule,
    NgbCollapseModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

    MatProgressBarModule,
    HttpClientModule,
    
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
