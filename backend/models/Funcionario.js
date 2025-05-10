class Funcionario {
    constructor({ 
      num_cedula, 
      nombres, 
      apellidos, 
      fecha_nacimiento, 
      direccion, 
      telefono, 
      estadocivil_id, 
      sexo_id, 
      tipodocumento_id 
    }) {
      this.num_cedula = num_cedula;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.fecha_nacimiento = fecha_nacimiento;
      this.direccion = direccion;
      this.telefono = telefono;
      this.estadocivil_id = estadocivil_id;
      this.sexo_id = sexo_id;
      this.tipodocumento_id = tipodocumento_id;
    }
  }
  
  export default Funcionario;