import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { VerNegocios } from '../../model/ver-negocios';

@Component({
  selector: 'app-crear-negocio',
  standalone: false,
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit{
  loginError: string = '';
  cargando: boolean = false;
  constructor(private service:UsuarioService,private router: Router){}
  ngOnInit(): void {
    this.profileLogin.valueChanges.subscribe(() => {
      this.loginError = '';
    });
  }

  profileLogin = new FormGroup({
    nombre: new FormControl(''),
    categorias: new FormControl(''),
    numeroEmpleados: new FormControl(),
    telefono: new FormControl(''),
    email: new FormControl(''),
    ciudad: new FormControl(''),
    pais: new FormControl(''),
    sitioweb: new FormControl(''),
  })

  login() {
    console.log('Datos enviados al servidor:', this.profileLogin.value);
    this.cargando = true;
    this.service.crearNegocio(this.profileLogin.value.nombre!, this.profileLogin.value.categorias!,this.profileLogin.value.numeroEmpleados!,this.profileLogin.value.telefono!,this.profileLogin.value.email!,this.profileLogin.value.ciudad!,this.profileLogin.value.pais!,this.profileLogin.value.sitioweb!)
      .subscribe({
        next:  (l: VerNegocios) => {
        localStorage.setItem('IDNEGOCIO', l.id);
        localStorage.setItem('NOMBRE', l.nombre);
        this.router.navigate(['/home']);


      }, error: (error) => {
        this.cargando = false;
        console.error("❌ Error al consultar la IA:", error);
        this.loginError = 'La categoría esta mal escrita';
      },complete: () => {
        this.cargando = false; // 👈 Cuando termina (bien o mal), quita el spinner
      }}
      );
  }

}
