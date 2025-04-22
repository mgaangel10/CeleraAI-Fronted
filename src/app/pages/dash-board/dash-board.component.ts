import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { startOfDay } from 'date-fns';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // 👈 Necesario para todo ng-bootstrap
import { Color, ScaleType } from '@swimlane/ngx-charts';  // Importar Color y ScaleType

import { DetallesNegociosResponse, VentaDto } from '../../model/detalles-negocios';
import { ProductosMasVendidos } from '../../model/productos-mas-vendidos';
import { VentasSemanales } from '../../model/ventas-semana';
import { VentasMes } from '../../model/venta-mes';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ResumenDiario } from '../../model/resumen-diario';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dash-board',
  standalone: false,
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit{
  negocioId!: string | null;
  negocios!: DetallesNegociosResponse;
  alert:string[] = []; 
  productos: ProductosMasVendidos[] = [];
  ventas!: VentasSemanales;
  ventasMes: VentaDto[] = [];
  resumen!:ResumenDiario;
  semanalData: number[] = [];
mensualData: number[] = [];
ventasSeleccionadas: VentaDto[] = [];

viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject(); // 👉 Forzar redibujo

  view: [number, number] = [700, 300];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('modalContenido') modalContenido: any;


  // Controlar qué gráfico mostrar
  mostrarVentasSemanales: boolean = true;  // Iniciar mostrando las ventas semanales

  constructor(private service: UsuarioService, private route: ActivatedRoute,private modalService: NgbModal) {
    this.route.params.subscribe(params => {
      this.negocioId = params['idNegocio'];
    });
  }

  ngOnInit(): void {
    this.detallesNegocios();
    this.productosMasVendidos();
    this.ventasSemanales(); // esto ya actualiza el gráfico al final
    
    this.alertas();
    this.resumenDiario();
    this.ObtenerTodasLasVentas();

  }
  
  actualizarTamañoGrafico() {
    const width = window.innerWidth;
    const responsiveWidth = width < 768 ? width * 0.9 : 700; // 90% en móvil, 700px en desktop
    this.view = [responsiveWidth, 300];
  }



meses: string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

diasSemana: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

mesActual: number = new Date().getMonth();
anioActual: number = new Date().getFullYear();

calendario: { dia: number; mesActual: boolean; hayVenta: boolean }[][] = [];

// Agrega este método al final de tu clase para generar el calendario visual
generarCalendario(anio: number, mes: number): void {
  this.calendario = [];
  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0);

  let semana: { dia: number; mesActual: boolean; hayVenta: boolean }[] = [];

  const diasVenta = this.ventasMes
    .filter(v => new Date(v.fecha).getMonth() === mes && new Date(v.fecha).getFullYear() === anio)
    .map(v => new Date(v.fecha).getDate());

  for (let i = 0; i < (primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1); i++) {
    semana.push({ dia: 0, mesActual: false, hayVenta: false });
  }

  for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
    semana.push({
      dia,
      mesActual: true,
      hayVenta: diasVenta.includes(dia)
    });

    if (semana.length === 7) {
      this.calendario.push(semana);
      semana = [];
    }
  }

  while (semana.length < 7) {
    semana.push({ dia: 0, mesActual: false, hayVenta: false });
  }
  this.calendario.push(semana);
}

// Y este método para moverse entre meses
cambiarMes(delta: number): void {
  this.mesActual += delta;

  if (this.mesActual > 11) {
    this.mesActual = 0;
    this.anioActual++;
  }
  if (this.mesActual < 0) {
    this.mesActual = 11;
    this.anioActual--;
  }

  this.generarCalendario(this.anioActual, this.mesActual);
}
ventasPorDia(fecha: Date): VentaDto[] {
  return this.ventasMes.filter(v => {
    const fechaVenta = new Date(v.fecha);
    return fechaVenta.getFullYear() === fecha.getFullYear()
      && fechaVenta.getMonth() === fecha.getMonth()
      && fechaVenta.getDate() === fecha.getDate();
  });
}
abrirModalVentas(dia: number) {
  const fecha = new Date(this.anioActual, this.mesActual, dia);
  const ventas = this.ventasPorDia(fecha);

  this.ventasSeleccionadas = ventas;
  this.modalService.open(this.modalContenido, { size: 'lg' });
}
abrirModalVentasDelDia(dia: Date, modalRef: any) {
  const fechaSeleccionada = new Date(dia);
  this.ventasSeleccionadas = this.ventasMes.filter(v => {
    const fechaVenta = new Date(v.fecha);
    return fechaVenta.getDate() === fechaSeleccionada.getDate() &&
           fechaVenta.getMonth() === fechaSeleccionada.getMonth() &&
           fechaVenta.getFullYear() === fechaSeleccionada.getFullYear();
  });

  this.modalService.open(modalRef, { size: 'lg' });
}


// Llama a generarCalendario dentro de ObtenerTodasLasVentas luego de recibir las ventas
ObtenerTodasLasVentas() {
  const id = localStorage.getItem('IDNEGOCIO');
  if (!id) return;
  this.service.verTodasVentas(id).subscribe(r => {
    this.ventasMes = r;
    this.generarCalendario(this.anioActual, this.mesActual); // 🟢 aquí actualizamos
  });
}
// Cambiar de mes


  detallesNegocios() {
    this.negocioId = this.route.snapshot.paramMap.get('idNegocio');
    
    if (this.negocioId != null) {
      this.service.negocioId(this.negocioId).subscribe(r => {
        this.negocios = r;
       localStorage.setItem('NOMBRE', this.negocios.nombre);
        
      });
    }
  }

  productosMasVendidos() {
    let idNegocio = localStorage.getItem('IDNEGOCIO');
    this.service.productosMasVendidoSemana(idNegocio!).subscribe(r => {
      this.productos = r;
    });
  }

  alertas(){
    let idNegocio = localStorage.getItem('IDNEGOCIO');
    this.service.alertas(idNegocio!).subscribe(r=>{
      this.alert = r;
    })
  }
  resumenDiario(){
    let idNegocio = localStorage.getItem('IDNEGOCIO');
    this.service.resumenDiario(idNegocio!).subscribe(r=>{
      this.resumen = r;
    })
  }

  ventasSemanales() {
    const idNegocio = localStorage.getItem('IDNEGOCIO');
    if (idNegocio) {
      this.service.ventasEnSemana(idNegocio).subscribe(response => {
        this.ventas = response;
        this.ventasGraficoSemanales.labels = Object.keys(response.ventas);
        this.ventasGraficoSemanales.values = Object.values(response.ventas);
        
        // ❗ Siempre actualiza después de recibir los datos
        if (this.mostrarVentasSemanales) {
          this.actualizarGrafico();
        }
      });
    }
  }
  

  
  
  getStockPercentage(stock: number): number {
    const maxStock = 100; // ajusta si tienes un valor de referencia
    return Math.min(100, (stock / maxStock) * 100);
  }
  
  

  

  // Cambiar entre las ventas semanales y mensuales
  actualizarGrafico() {
    const datos = this.mostrarVentasSemanales ? this.ventasGraficoSemanales : this.ventasGraficoMensuales;
  
    this.barChartData.labels = [...datos.labels]; // Spread para cambiar referencia
    this.barChartData.datasets[0].data = [...datos.values];
  
    // 👇 Forzamos que Angular detecte el cambio y actualice el gráfico
    this.barChartData = { ...this.barChartData };
    this.chart?.update();
  }
  
  cambiarGrafico(tipo: string) {
    this.mostrarVentasSemanales = tipo === 'semanal';
  
    if (this.mostrarVentasSemanales) {
      this.ventasSemanales(); // este ya actualiza el gráfico al final
    } else {
       // este también lo actualiza al final
    }
  }
  

  obtenerDiasSemana(): string[] {
    return ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  }

  

  yMax: number = 100; // Valor inicial del eje Y


 

  barChartType: 'bar' = 'bar';

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: this.yMax
      }
    }
  };
  

  ventasGraficoSemanales: { labels: string[], values: number[] } = { labels: [], values: [] };
ventasGraficoMensuales: { labels: string[], values: number[] } = { labels: [], values: [] };

barChartData: ChartData<'bar'> = {
  labels: [],
  datasets: [
    {
      label: 'Ventas(€)',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(199, 199, 199, 0.5)'
      ]
    }
  ]
};

  
}



