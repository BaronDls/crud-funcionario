export interface Funcionario {
  num_cedula: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date | string;
  direccion: string;
  telefono: number;

  tipodocumento_id?: number;
  estado_civil?: string;
  sexo?: string;
  estadocivil_id?: number;
  sexo_id?: number;
}