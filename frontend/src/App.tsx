import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { FuncionariosList } from "./components/FuncionariosList";
import { FuncionarioForm } from "./components/FuncionarioForm";
export const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/funcionarios" element={<FuncionariosList />} />
        <Route path="/crear-funcionario" element={<FuncionarioForm />} />
        <Route path="/editar-funcionario/:num_cedula" element={<FuncionarioForm />} />
      </Routes>
    </>
  );
};
