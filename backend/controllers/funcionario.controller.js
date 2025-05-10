import {FuncionarioDAO} from '../repository/funcionario.repository.js';

export class FuncionarioController {
  static async getAll(req, res, next) {
    try {
      const funcionarios = await FuncionarioDAO.getAll();
      res.json(funcionarios);
    } catch (error) {
      next(error);
    }
  }


  static async create(req, res, next) {
    try {
      const newFuncionarioId = await FuncionarioDAO.create(req.body);
      res.status(201).json({ 
        message: 'Funcionario creado exitosamente',
        id: newFuncionarioId
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await FuncionarioDAO.update(req.params.id, req.body);
      res.json({ message: 'Funcionario actualizado exitosamente' });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await FuncionarioDAO.delete(req.params.id);
      res.json({ message: 'Funcionario eliminado exitosamente' });
    } catch (error) {
      next(error);
    }
  }

  static async getLookupData(req, res, next) {
    try {
      const lookupData = await FuncionarioDAO.getLookupData();
      res.json(lookupData);
    } catch (error) {
      next(error);
    }
  }
}

