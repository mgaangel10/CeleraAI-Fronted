import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosMasVendidos } from '../../model/productos-mas-vendidos';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { VentaDto } from '../../model/detalles-negocios';


@Component({
  selector: 'app-estadisticas',
  standalone: false,
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  nombre!: string;
  negocioId!: string | null;
  productos: ProductosMasVendidos[] = [];
  ingresos!: number;
  gastos!: number;
  beneficio!: number;
  productosVendidosHoy = 18;
resumen = {
  topProducto: 'Pan',
  cantidadTopProducto: 8,
  productoStockBajo: 'Leche',
  stockRestante: 2
};

  todasVentas: VentaDto[] = [];
  ventasPorProducto: { [nombreProducto: string]: number } = {};

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nombre = localStorage.getItem('NOMBRE') || '';
    this.negocioId = this.route.snapshot.paramMap.get('idNegocio');

    this.verIngresos();
    this.verGastos();
    this.verBeneficio();
    this.verTodasVentas(); // Aquí calculamos todo para el gráfico real
  }

  // ===========================
  // Gráfico REAL de productos vendidos
  // ===========================
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Unidades vendidas',
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

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} unidades`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  verTodasVentas() {
    const id = this.negocioId!;
    this.service.verTodasVentas(id).subscribe(r => {
      this.todasVentas = r;
      this.calcularVentasPorProducto();
    });
  }

  calcularVentasPorProducto() {
    this.ventasPorProducto = {};

    for (const venta of this.todasVentas) {
      for (const detalle of venta.detalleVentas) {
        const nombre = detalle.nombreProducto;
        const cantidad = detalle.cantida;

        if (!this.ventasPorProducto[nombre]) {
          this.ventasPorProducto[nombre] = 0;
        }

        this.ventasPorProducto[nombre] += cantidad;
      }
    }

    const labels = Object.keys(this.ventasPorProducto);
    const values = Object.values(this.ventasPorProducto);

    this.barChartData.labels = labels;
    this.barChartData.datasets[0].data = values;
    this.barChartData = { ...this.barChartData }; // Refresca el gráfico

    // Si quieres forzar redibujo (opcional)
    setTimeout(() => this.chart?.update(), 0);
  }

  // ===========================
  // Finanzas
  // ===========================
  verIngresos() {
    let id = localStorage.getItem('IDNEGOCIO');
    this.service.verIngresos(id!).subscribe(r => {
      this.ingresos = r;
    });
  }

  verGastos() {
    let id = localStorage.getItem('IDNEGOCIO');
    this.service.verGastos(id!).subscribe(r => {
      this.gastos = r;
    });
  }

  verBeneficio() {
    let id = localStorage.getItem('IDNEGOCIO');
    this.service.verBeneficio(id!).subscribe(r => {
      this.beneficio = r;
    });
  }
}
