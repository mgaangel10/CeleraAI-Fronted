import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptServiceService } from '../../service/encrypt-service.service';


@Component({
  selector: 'app-ruta-oculta-component',
  standalone: false,
  templateUrl: './ruta-oculta-component.component.html',
  styleUrl: './ruta-oculta-component.component.css'
})
export class RutaOcultaComponentComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encrypt: EncryptServiceService
  ) {}
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let cifrado = params['data'];

      // Restaurar los caracteres de la URL para poder desencriptar
      cifrado = cifrado
        .replace(/_/g, '/')
        .replace(/-/g, '+')
        .replace(/\./g, '=');

      const datos = this.encrypt.decrypt(cifrado);

      if (!datos || !datos.ruta || !datos.idNegocio) {
        this.router.navigate(['/']);
        return;
      }

      // Redirige a la ruta real
      this.router.navigate([`/${datos.ruta}`, datos.idNegocio]).then(() => {
        // ✅ Mantiene visualmente la URL cifrada
        window.history.replaceState({}, '', '/go/' + params['data']);
      });
    });
  }
}
