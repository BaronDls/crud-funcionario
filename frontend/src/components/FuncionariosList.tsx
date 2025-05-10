import { useEffect, useState } from "react";
import { getFuncionarios, deleteFuncionario } from "../../api/funcionario";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/trash.svg";
import { Funcionario } from "../funcionario";
import { useNavigate } from "react-router-dom";


export const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const data = await getFuncionarios();
        setFuncionarios(data);
      } catch (err) {
        setError(err as Error);
      }
    };
   
    
    fetchFuncionarios();
  }, []);

  const handleDelete = async (num_cedula: number) => {
    try {
      await deleteFuncionario(num_cedula);
      setFuncionarios((prev) =>
        prev.filter((funcionario) => funcionario.num_cedula !== num_cedula)
      );
    }
    catch (err) {
      setError(err as Error);
    }
  }
  const handleEdit = (num_cedula:number) => {
    navigate(`/editar-funcionario/${num_cedula}`);
  };
  return (
    <div
      className="relative h-[calc(100dvh-64px)] flex flex-col pt-8  px-4 dark:bg-gray-800 
    overflow-x-auto shadow-md "
    >
      {error && <div className="text-red-500">Error al cargar los datos</div> }
      <form className="w-full mx-auto mb-8">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <table className="w-full text-sm text-left border border-gray-600 rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Cedula
            </th>
            <th scope="col" className="px-6 py-3">
              Nombres
            </th>
            <th scope="col" className="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" className="px-6 py-3">
              Direccion
            </th>
            <th scope="col" className="px-6 py-3">
              Telefono
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha Nacimiento
            </th>
            <th scope="col" className="px-6 py-3">
              Estado Civil
            </th>
            <th scope="col" className="px-6 py-3">
              Sexo
            </th>
            <th scope="col" className="px-6 py-3">
              Botones
            </th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr
              key={funcionario.num_cedula}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {funcionario.num_cedula}
              </th>
              <td className="px-6 py-4">{funcionario.nombres}</td>
              <td className="px-6 py-4">{funcionario.apellidos}</td>
              <td className="px-6 py-4">{funcionario.direccion}</td>
              <td className="px-6 py-4">{funcionario.telefono}</td>
              <td className="px-6 py-4">
                {" "}
                {new Date(funcionario.fecha_nacimiento).toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
              </td>
              <td className="px-6 py-4">{funcionario.estado_civil}</td>
              <td className="px-6 py-4">{funcionario.sexo}</td>
              <td className="px-6 py-4 flex gap-2">
                <img onClick={()=>handleEdit(funcionario.num_cedula)} src={editIcon} alt="edit" className="w-6 h-6 cursor-pointer" />
                <img onClick={()=>handleDelete(funcionario.num_cedula)} src={deleteIcon} alt="delete" className="w-6 h-6 cursor-pointer " />
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
};
