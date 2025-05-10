import express from 'express';
const router = express.Router();

import {FuncionarioController} from '../controllers/funcionario.controller.js';

// CRUD 
router.get('/', FuncionarioController.getAll);
router.post('/', FuncionarioController.create);
router.put('/:id', FuncionarioController.update);
router.delete('/:id', FuncionarioController.delete);

// Lookup data for forms
router.get('/lookup/data', FuncionarioController.getLookupData);

export default router;