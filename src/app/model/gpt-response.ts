export interface ChatGPTResponse {
    accion:   string;
    tipo:     string;
    datos:    Datos;
    response: string;
}

export interface Datos {
    productos: string[];
}
