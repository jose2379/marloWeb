export interface Obra {
    id?:            string;
    dimension?:     string;
    dimensiones?: {
        ancho?:         number;
        alto?:          number;
        profundidad?:   number;
    };
    fechaString?:       string;
    fecha?:             Date;
    tecnica?:           string;
    titulo?:            string;
    url_imagen?:        string;
    venta?: {
        fecha?:         Date;
        comprador?:     string;
        precio?:        number;
        mostrarPrecio?: boolean;
    }
    color?:             string;
    fondoHome?:         boolean;
}
