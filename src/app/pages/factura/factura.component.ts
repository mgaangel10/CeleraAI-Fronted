import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { VentaDto } from '../../model/detalles-negocios';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { FacturaResponse } from '../../model/factura-response';

import { VerFacturas } from '../../model/ver-facturas';

@Component({
  selector: 'app-factura',
  standalone: false,
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit{

  ventas: VentaDto [] = [];
  totalSinFacturar: number = 0;
totalFacturado: number = 0;
mensajeAlerta: string = '';
linkFactura: string = '';
mostrarAlerta: boolean = false;

  nombre!: string;
  idVenta!:string;
  idFactura!:string;
  detallesFactura!:VerFacturas;
  facturaSeleccionada!: VerFacturas;

  facturas:VerFacturas [] = [];

  constructor(private service:UsuarioService,	config: NgbModalConfig,
		private modalService: NgbModal,
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}
  ngOnInit(): void {
    this.nombre = localStorage.getItem('NOMBRE') || '';
    this.ventasSinFacturas();
    this.verFacturas();
    
  }

  ventasSinFacturas(){
    let id = localStorage.getItem('IDNEGOCIO');
    this.service.ventasSinFacturas(id!).subscribe(r=>{
      this.ventas = r;
      this.totalSinFacturar = this.ventas.reduce((acc, venta) => acc + venta.total, 0);

    })
  }

  verFacturas(){
    let id = localStorage.getItem('IDNEGOCIO');
    this.service.VerFacturas(id!).subscribe(r=>{
      this.facturas = r;
      this.totalFacturado = this.facturas.reduce((acc, f) => acc + f.total, 0);

    })
  }
  verDetallesFacturas(id:string){
    this.service.VerDetallesFacturas(id).subscribe(r=>{
      this.detallesFactura = r;
      this.facturaSeleccionada = r;
    })
  }


  open(content:any, idVenta:string) {
    this.idVenta= idVenta;
    
		this.modalService.open(content);
	}
  open2(detallesF:any, idFactura:string) {
    this.idFactura= idFactura;
    this.verDetallesFacturas(idFactura);
		this.modalService.open(detallesF);
	}


  profileLogin = new FormGroup({
    numeroFacura: new FormControl(''),
    cliente: new FormControl(''),
    impuestos: new FormControl(),
    numeroAlbaran: new FormControl(),
  })

  login() {
    console.log('Datos enviados al servidor:', this.profileLogin.value);
    
    this.service.crearFactura(this.idVenta!,this.profileLogin.value.numeroFacura!, this.profileLogin.value.cliente!,this.profileLogin.value.impuestos!,this.profileLogin.value.numeroAlbaran!)
      .subscribe((l: FacturaResponse) => {
        this.ventasSinFacturas();
        this.verFacturas();
        this.modalService.dismissAll();
        


      });
  }
  cerrarAlerta() {
    this.mostrarAlerta = false;
    this.mensajeAlerta = '';
    this.linkFactura = '';
  }
  

  generarFacturaPDF() {
      
    this.service.enviarFacturaPython(this.facturaSeleccionada).subscribe({
      next: (res) => {
        this.generarYDescargarFacturaPDF();
      },
      error: (err) => {
        console.error("❌ Error al generar la factura:", err);
        console.log("FACTURA ENVIADA >>>",this.facturaSeleccionada);

        alert("Error al generar la factura.");
      }
    });
  }

  generarYDescargarFacturaPDF() {
    this.service.enviarFacturaYDescargarPDF(this.facturaSeleccionada).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
  
        this.mensajeAlerta = '✅ ¡Factura generada correctamente!';
        this.linkFactura = url;
        this.mostrarAlerta = true;
      },
      error: (err) => {
        console.error("❌ Error al generar la factura:", err);
        this.mensajeAlerta = '❌ Error al generar la factura.';
        this.linkFactura = '';
        this.mostrarAlerta = true;
      }
    });
  }
  
  
  
  
  



}
