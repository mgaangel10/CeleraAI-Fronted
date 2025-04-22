import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { EncryptServiceService } from '../../service/encrypt-service.service';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private service: UsuarioService,
    private router: Router,
    private encrypt: EncryptServiceService
  ) {}
  navegarEncriptado(ruta: string, idNegocio: string) {
    const datos = { idNegocio, ruta };
    let cifrado = this.encrypt.encrypt(datos);
  
    // 🔐 Reemplazar caracteres problemáticos para que la URL funcione bien
    cifrado = cifrado
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
      .replace(/=/g, '.');
  
    this.router.navigate(['/go', cifrado]);
  }
  
  
  
  
  menuItems = [
    {
      label: 'Home',
      icon: 'bi bi-house-door-fill',
      action: () => this.detallesNegocios()
    },
    {
      label: 'Inventario',
      icon: 'bi bi-archive',
      action: () => this.inventario()
    },
    {
      label: 'Ventas',
      icon: 'bi bi-wallet',
      action: () => this.ventas()
    },
    {
      label: 'Facturar',
      icon: 'bi bi-layout-text-window-reverse',
      action: () => this.facturas()
    },
    {
      label: 'Estadísticas',
      icon: 'bi bi-bar-chart-line',
      action: () => this.estadisticas()
    },
    {
      label: 'Asistente',
      icon: 'bi bi-slack',
      action: () => this.asistente()
    }
  ];
  
  
  inventario() {
    let id = localStorage.getItem('IDNEGOCIO');
    if (id) this.navegarEncriptado('inventario', id);
  }
  
  ventas() {
    let id = localStorage.getItem('IDNEGOCIO');
    if (id) this.navegarEncriptado('ventas', id);
  }
  
  facturas() {
    let id = localStorage.getItem('IDNEGOCIO');
    if (id) this.navegarEncriptado('facturar', id);
  }
  
  asistente() {
    let id = localStorage.getItem('IDNEGOCIO');
    if (id) this.navegarEncriptado('asistente', id);
  }
  
  estadisticas() {
    let id = localStorage.getItem('IDNEGOCIO');
    if (id) this.navegarEncriptado('estadisticas', id);
  }
  
  detallesNegocios() {
    let id = localStorage.getItem('IDNEGOCIO');
    if (id) this.navegarEncriptado('dash-board', id);
  }
  
  
}
