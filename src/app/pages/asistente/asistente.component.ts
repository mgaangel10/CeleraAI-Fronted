import { Component, OnInit } from '@angular/core';
import { ChatGPTResponse } from '../../model/gpt-response';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-asistente',
  standalone: false,
  templateUrl: './asistente.component.html',
  styleUrl: './asistente.component.css'
})
export class AsistenteComponent implements OnInit{

  respuesta!: ChatGPTResponse;
  nombre!: string;
  archivoSeleccionado: File | null = null;
  cargando: boolean = false;

  constructor(private service: UsuarioService) {}

  ngOnInit(): void {
    this.nombre = localStorage.getItem('NOMBRE') || '';  
  }
  profileLogin = new FormGroup({
    pregunta: new FormControl(''),
    archivo: new FormControl<File | null>(null)
  });
  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }
  

  preguntar() {
    console.log('Datos enviados al servidor:', this.profileLogin.value);
    let id = localStorage.getItem('IDNEGOCIO');
    let mensaje = this.profileLogin.value.pregunta!;
  
    this.cargando = true; // 👈 Antes de lanzar la petición, activa el spinner
  
    this.service.usarAsistenteIA(id!, mensaje, this.archivoSeleccionado!)
      .subscribe({
        next: (response: ChatGPTResponse) => {
          console.log("🚀 Respuesta de IA:", response);
          if (response && response.response && response.response != null) {
            this.respuesta = response;
          }
        },
        error: (error) => {
          this.cargando = false;
          console.error("❌ Error al consultar la IA:", error);
          
        },
        complete: () => {
          this.cargando = false; // 👈 Cuando termina (bien o mal), quita el spinner
        }
      });
  }
  
  
  
}
