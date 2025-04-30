import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/login-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VerNegocios } from '../model/ver-negocios';
import { DetallesNegociosResponse, VentaDto } from '../model/detalles-negocios';
import { ProductosMasVendidos } from '../model/productos-mas-vendidos';
import { VentasSemanales } from '../model/ventas-semana';
import { VentasMes } from '../model/venta-mes';
import { TodosLosProductos } from '../model/todos-productos';
import { VentasResponse } from '../model/ventas-dto';
import { FacturaResponse } from '../model/factura-response';
import { VerFacturas } from '../model/ver-facturas';
import { ChatGPTResponse } from '../model/gpt-response';
import { RegisterResponse } from '../model/register-response';
import { ResumenDiario } from '../model/resumen-diario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  //url de backend servidor
  url='https://celeraai-backend.onrender.com';
  //url='http://localhost:9000';

  LoginResponseAdministrador(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/auth/login/user`,
      {
        "email": `${email}`,
        "password": `${password}`
      });
  }

  register(email: string, name: string,lastName: string,password: string,phoneNumber: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/auth/register/user`,
      {
        "email": `${email}`,
        "name": `${name}`,
        "lastName": `${lastName}`,
        "password": `${password}`,
        "phoneNumber": `${phoneNumber}`,
      });
  }
  
  informacionUsuario():Observable<LoginResponse>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<LoginResponse>(`${this.url}/usuario/informacion/usuario`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }


  verNegocios():Observable<VerNegocios[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VerNegocios[]>(`${this.url}/usuario/ver/negocios/usuarios`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  crearNegocio(nombre:string,categorias:string,numeroEmpleados:number,telefono:string,email:string,ciudad:string,pais:string,sitioweb:string):Observable<VerNegocios>{
    let token = localStorage.getItem('TOKEN');
    return this.http.post<VerNegocios>(`${this.url}/usuario/crear/negocio`,{
      "nombre": `${nombre}`,
        "categorias": `${categorias}`,
        "numeroEmpleados": `${numeroEmpleados}`,
        "telefono": `${telefono}`,
        "email": `${email}`,
        "ciudad": `${ciudad}`,
        "pais": `${pais}`,
        "sitioweb": `${sitioweb}`

    }, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  negocioId(id:string):Observable<DetallesNegociosResponse>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<DetallesNegociosResponse>(`${this.url}/usuario/negocio/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  productosMasVendidoSemana(id:string):Observable<ProductosMasVendidos[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<ProductosMasVendidos[]>(`${this.url}/usuario/producto/mas/vendido/semana/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  productosMasVendidoMes(id:string):Observable<ProductosMasVendidos[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<ProductosMasVendidos[]>(`${this.url}/usuario/producto/mas/vendido/mes/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  ventasEnSemana(id:string):Observable<VentasSemanales>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VentasSemanales>(`${this.url}/usuario/ventas/semana/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  ventasMe(id:string):Observable<VentasMes>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VentasMes>(`${this.url}/usuario/ventas/mes/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  crearProducto(id:string,nombre:string,precio:number,stock:number,precioProveedor:number):Observable<TodosLosProductos>{
    let token = localStorage.getItem('TOKEN');
    return this.http.post<TodosLosProductos>(`${this.url}/usuario/crear/producto/${id}`,{
      "nombre": `${nombre}`,
        "precio": `${precio}`,
        "stock": `${stock}`,
        "precioProveedor": `${precioProveedor}`,
     

    }, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  todosProductos(id:string):Observable<TodosLosProductos[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<TodosLosProductos[]>(`${this.url}/usuario/ver/productos/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  ordenarProductoAlfabeticamente(id:string):Observable<TodosLosProductos[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<TodosLosProductos[]>(`${this.url}/usuario/producto/alfabeticamente/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  productoMayorPrecio(id:string):Observable<TodosLosProductos[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<TodosLosProductos[]>(`${this.url}/usuario/producto/mayor/precio/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  productoMayorStock(id:string):Observable<TodosLosProductos[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<TodosLosProductos[]>(`${this.url}/usuario/producto/mayor/stock/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  productoMeborStock(id:string):Observable<TodosLosProductos[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<TodosLosProductos[]>(`${this.url}/usuario/producto/menor/stock/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  detallesVentasSemanal(id:string):Observable<VentasResponse[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VentasResponse[]>(`${this.url}/usuario/ventas/totales/semanas/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  crearVenta(id:string):Observable<VentasResponse>{
    let token = localStorage.getItem('TOKEN');
    return this.http.post<VentasResponse>(`${this.url}/usuario/agregar/producto/venta/${id}`,{

    }, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  verVentaActual(id:string):Observable<VentasResponse>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VentasResponse>(`${this.url}/usuario/ver/venta/actual/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  terminarVenta(id:string):Observable<VentaDto>{
    let token = localStorage.getItem('TOKEN');
    return this.http.post<VentaDto>(`${this.url}/usuario/terminar/venta/${id}`,{}, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  crearFactura(id:string,numeroFacura:string,cliente:string,impuestos:number,numeroAlbaran:number):Observable<FacturaResponse>{
    let token = localStorage.getItem('TOKEN');
    return this.http.post<FacturaResponse>(`${this.url}/usuario/crear/factura/${id}`,{
      "numeroFacura": `${numeroFacura}`,
      "cliente": `${cliente}`,
      "impuestos": `${impuestos}`,
      "numeroAlbaran": `${numeroAlbaran}`
      
    }, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  ventasSinFacturas(id:string):Observable<VentaDto[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VentaDto[]>(`${this.url}/usuario/ver/ventas/sin/factura/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  VerFacturas(id:string):Observable<VerFacturas[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VerFacturas[]>(`${this.url}/usuario/ver/facturas/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  VerDetallesFacturas(id:string):Observable<VerFacturas>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VerFacturas>(`${this.url}/usuario/ver/detalles/de/factura/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  preguntarAsistente(pregunta:string,id:string):Observable<ChatGPTResponse>{
    let token = localStorage.getItem('TOKEN');
    return this.http.post<ChatGPTResponse>(`${this.url}/usuario/generarRecomendaciones/${id}`,{
      "pregunta": `${pregunta}`,
    }, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  verTodasVentas(id:string):Observable<VentaDto[]>{
    let token = localStorage.getItem('TOKEN');
    return this.http.get<VentaDto[]>(`${this.url}/usuario/ver/todas/ventas/${id}`, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  editarVenta(idV:string,idP:string):Observable<VentaDto>{
    let token = localStorage.getItem('TOKEN');
    return this.http.post<VentaDto>(`${this.url}/usuario/añadir/mas/productos/ventas/${idV}/${idP}`,{
      
    }, {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

 //hehehe

 ventasPorDate(id:string):Observable<VentaDto[]>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<VentaDto[]>(`${this.url}/usuario/filtrar/ventas/date/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

ventasConFactura(id:string):Observable<VentaDto[]>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<VentaDto[]>(`${this.url}/usuario/filtrar/ventas/factura/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

ventasEditables(id:string):Observable<VentaDto[]>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<VentaDto[]>(`${this.url}/usuario/filtrar/ventas/editable/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

ventasConTotalVentas(id:string):Observable<VentaDto[]>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<VentaDto[]>(`${this.url}/usuario/filtrar/ventas/total/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

importarProductos(file:File,idNegocio:string):Observable<any>{
  let token = localStorage.getItem('TOKEN');

  const formData = new FormData();
  formData.append('file', file);
  
  return this.http.post<any>(`${this.url}/usuario/importar/productos/excel/${idNegocio}`, formData,{
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

}

agregarCantidad(id:string):Observable<VentaDto>{
  let token = localStorage.getItem('TOKEN');
  return this.http.post<VentaDto>(`${this.url}/usuario/agregar/cantidad/${id}`, {},{
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

quitarCantidad(id:string):Observable<VentaDto>{
  let token = localStorage.getItem('TOKEN');
  return this.http.post<VentaDto>(`${this.url}/usuario/quitar/cantidad/${id}`, {},{
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

verIngresos(id:string):Observable<number>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<number>(`${this.url}/usuario/ver/ingresos/total/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

verGastos(id:string):Observable<number>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<number>(`${this.url}/usuario/ver/gastos/total/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

verBeneficio(id:string):Observable<number>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<number>(`${this.url}/usuario/ver/beneficio/total/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

verDetallesVenta(id:string):Observable<VentaDto>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<VentaDto>(`${this.url}/usuario/ver/detalles/venta/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}


editarProducto(id:string,nombre:string,precio:number,stock:number,precioProveedor:number):Observable<TodosLosProductos>{
  let token = localStorage.getItem('TOKEN');
  return this.http.post<TodosLosProductos>(`${this.url}/usuario/editar/producto/${id}`,{
    "nombre": `${nombre}`,
      "precio": `${precio}`,
      "stock": `${stock}`,
      "precioProveedor": `${precioProveedor}`,
   

  }, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

ponerNoDisponible(id:string):Observable<TodosLosProductos>{
  let token = localStorage.getItem('TOKEN');
  return this.http.post<TodosLosProductos>(`${this.url}/usuario/poner/no/disponible/${id}`,{}, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

alertas(id:string):Observable<string[]>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<string[]>(`${this.url}/usuario/alertas/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

resumenDiario(id:string):Observable<ResumenDiario>{
  let token = localStorage.getItem('TOKEN');
  return this.http.get<ResumenDiario>(`${this.url}/usuario/resumen/diario/${id}`, {
    headers: {
      accept: 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

usarAsistenteIA(id:string,mensaje: string, archivo?: File): Observable<any> {
  const formData = new FormData();
  formData.append('mensaje', mensaje);
  formData.append('nombre', 'Miguel Ángel'); // 👈 O lo que quieras dinámico
  formData.append('empresa', 'Bizyvel'); // 👈 O lo que quieras dinámico

  if (archivo) {
    formData.append('archivo', archivo);
  }

  const token = localStorage.getItem('TOKEN');

  return this.http.post<any>(`https://bizyvelai.onrender.com/asistente/accion/${id}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      // No pongas "Content-Type" manual porque FormData lo pone solo 👈 muy importante
    }
  });
}
enviarFacturaPython(factura: VerFacturas): Observable<any> {
  return this.http.post<any>('https://bizyvelai.onrender.com/factura', factura);
}


enviarFacturaYDescargarPDF(factura: VerFacturas): Observable<Blob> {
  return this.http.post('https://bizyvelai.onrender.com/factura/pdf', factura, {
    responseType: 'blob'  // 👈 Esto es lo más importante
  });
}




}
