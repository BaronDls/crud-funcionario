import { instance } from "./axios";

import { Funcionario } from "../src/funcionario";
export const getFuncionarios = async () => {
  try {
    const response = await instance.get('funcionarios');
    return response.data;
  } catch (error) {
    console.error('Error fetching funcionarios:', error);
    throw error;
  }
};

export const deleteFuncionario = async (num_cedula: number) => {
  try {
    const response = await instance.delete(`funcionarios/${num_cedula}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting funcionario:', error);
    throw error;
  }
}

export const createFuncionario = async (funcionario:Funcionario) => {
  try {
    const response = await instance.post('funcionarios', funcionario);
    return response.data;
  } catch (error) {
    console.error('Error creating funcionario:', error);
    throw error;
  }
}

export const updateFuncionario = async (num_cedula: number, funcionario: Funcionario) => {
  try {
    const response = await instance.put(`funcionarios/${num_cedula}`, funcionario);
    return response.data;
  } catch (error) {
    console.error('Error updating funcionario:', error);
    throw error;
  }
}