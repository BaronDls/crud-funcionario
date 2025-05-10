import {db} from '../configdb.js';

export class FuncionarioDAO {
  static async getAll() {
    try {
      const query = `
      SELECT 
        f.*,
        ec.descripcion as estado_civil,
        s.descripcion as sexo,
        td.descripcion as tipo_documento
      FROM funcionario f
      LEFT JOIN estadocivil ec ON f.estadocivil_id = ec.id
      LEFT JOIN sexo s ON f.sexo_id = s.id
      LEFT JOIN tipodocumento td ON f.tipodocumento_id = td.id
    `;
    
    const [rows] = await db.query(query);
    return rows;
    } catch (error) {
      throw new Error(`Error al obtener funcionarios: ${error.message}`);
    }
  }

  static async create(funcionario) {
    try {
      const [result] = await db.query(
        'INSERT INTO funcionario SET ?', 
        funcionario
      );
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Ya existe un funcionario con esta cédula');
      }
      throw new Error(`Error al crear funcionario: ${error.message}`);
    }
  }

  static async update(num_cedula, funcionario) {
    try {
      const [result] = await db.query(
        'UPDATE funcionario SET ? WHERE num_cedula = ?',
        [funcionario, num_cedula]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Funcionario no encontrado');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error al actualizar funcionario: ${error.message}`);
    }
  }

  static async delete(num_cedula) {
    try {
      await db.query('DELETE FROM formacionacademica WHERE funcionario_num_cedula = ?', [num_cedula]);
      await db.query('DELETE FROM grupofamiliar WHERE funcionario_num_cedula = ?', [num_cedula]);
  
      const [result] = await db.query(
        'DELETE FROM funcionario WHERE num_cedula = ?',
        [num_cedula]
      );
      
      if (result.affectedRows === 0) {  
        throw new Error('Funcionario no encontrado');
      }
      
      return true;
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new Error('No se puede eliminar el funcionario porque tiene registros relacionados');
      }
      throw new Error(`Error al eliminar funcionario: ${error.message}`);
    }
  }

  static async getLookupData() {
    try {
      const [estadosCiviles] = await db.query('SELECT * FROM estadocivil');
      const [sexos] = await db.query('SELECT * FROM sexo');
      const [tiposDocumento] = await db.query('SELECT * FROM tipodocumento');
      
      return {
        estadosCiviles,
        sexos,
        tiposDocumento
      };
    } catch (error) {
      throw new Error(`Error al obtener datos de referencia: ${error.message}`);
    }
  }
}

