export interface VentasResponse {
    id:            string;
    detalleVentas: DetalleVenta[];
    fecha:         Date;
    total:         number;
    metodoPago:    null;
    activo:        boolean;
    terminado:        boolean;
    factura:        boolean;
}

export interface DetalleVenta {
    id:             string;
    nombreProducto: string;
    precioProducto: number;
    cantida:        number;
}
