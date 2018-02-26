export interface Obra {
    id?: string;
    dimension?: string;
    fecha?: string;
    key_imagen?: string;
    tecnica?: string;
    titulo?: string;
}
export interface Imagen {
    key_obra: string;
    nombre: string;
    url: string;
}
