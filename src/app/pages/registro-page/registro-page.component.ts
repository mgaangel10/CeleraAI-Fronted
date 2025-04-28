import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../../model/login-response';
import { UsuarioService } from '../../service/usuario.service';
import { RegisterResponse } from '../../model/register-response';

@Component({
  selector: 'app-registro-page',
  standalone: false,
  templateUrl: './registro-page.component.html',
  styleUrl: './registro-page.component.css'
})
export class RegistroPageComponent implements OnInit{
  cargando: boolean = false;
  loginError: string = '';

  constructor(private service:UsuarioService,private router: Router){}
  ngOnInit(): void {
    this.profileLogin.valueChanges.subscribe(() => {
      this.loginError = '';
    });
  }

  profileLogin = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
  })

  login() {
    console.log('Datos enviados al servidor:', this.profileLogin.value);
    this.cargando = true;

    this.service.register(this.profileLogin.value.email!,this.profileLogin.value.name!,this.profileLogin.value.lastName!, this.profileLogin.value.password!,this.profileLogin.value.phoneNumber!)
      .subscribe({
        next:(l: RegisterResponse) => {
       
        this.router.navigate(['/login']);


      },error:(err)=>{
        this.cargando = false; 
        console.error('Registro incorrecto:', err);
        this.loginError = 'El email ya ha sido registrado';

      },
      complete: () => {
        this.cargando = false; // 👈 Cuando termina (bien o mal), quita el spinner
      }}
       );
  }
}
