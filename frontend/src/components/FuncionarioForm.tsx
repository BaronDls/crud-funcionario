import { createFuncionario, updateFuncionario, getFuncionarios} from "../../api/funcionario";
import {useForm} from "react-hook-form";
import { useParams } from "react-router-dom";
import { Funcionario } from "../funcionario";
import { useEffect } from "react";
export const FuncionarioForm = () => {
    const { register, handleSubmit, reset, setValue  } = useForm<Funcionario>();
    const { num_cedula } = useParams<{ num_cedula: string }>();
    
    const onSubmit = async (data: Funcionario) => {
        try {
            if (num_cedula) {
                await updateFuncionario(parseInt(num_cedula), data);
                alert("Funcionario actualizado con éxito");
            } else {
                await createFuncionario(data);
                alert("Funcionario creado con éxito");
            }
            reset();
        } catch (error) {
            console.error("Error al crear funcionario:", error);
            alert("Error al crear funcionario");
        }
    };

    useEffect(()=>{
        if(num_cedula){
            const fetchFuncionario = async () => {
                try {
                    const response = await getFuncionarios();
                    const data = response.find((funcionario: Funcionario) => funcionario.num_cedula === parseInt(num_cedula));
                    setValue("tipodocumento_id", data.tipodocumento_id);
                    setValue("num_cedula", data.num_cedula);
                    setValue("nombres", data.nombres);
                    setValue("apellidos", data.apellidos);
                    setValue("fecha_nacimiento", data.fecha_nacimiento.split("T")[0]);
                    setValue("direccion", data.direccion);
                    setValue("telefono", data.telefono);
                    setValue("estadocivil_id", data.estadocivil_id);
                    setValue("sexo_id", data.sexo_id);
                } catch (error) {
                    console.error("Error al obtener funcionario:", error);
                }
            };
            fetchFuncionario();
        }
    },[num_cedula, setValue]);


  return (
    <div className="bg-gray-700 w-full h-[calc(100dvh-64px)] flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
         {num_cedula ? "Editar Funcionario" : "Crear Funcionario"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="tipodocumento"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Tipo de Documento *
              </label>
              <select
                {...register("tipodocumento_id", { required: true })}
                id="tipodocumento_id"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >

                <option value="">Seleccione...</option>
                <option value="1">Cédula</option>
                <option value="2">Tarjeta Ident</option>
                <option value="3">Cédula Extran</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="num_cedula"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Número de Cédula *
              </label>
              <input
                {...register("num_cedula", { required: true })}
                type="number"
                id="num_cedula"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="nombres"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Nombres *
              </label>
              <input
                {...register("nombres", { required: true })}
                type="text"
                id="nombres"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="apellidos"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Apellidos *
              </label>
              <input
                {...register("apellidos", { required: true })}
                type="text"
                id="apellidos"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="fecha_nacimiento"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Fecha de Nacimiento *
              </label>
              <input
                {...register("fecha_nacimiento", { required: true })}
                type="date"
                id="fecha_nacimiento"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Dirección *
              </label>
              <input
                {...register("direccion", { required: true })}
                type="text"
                id="direccion"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Teléfono *
              </label>
              <input
                {...register("telefono", { required: true })}
                type="tel"
                id="telefono"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="estadocivil"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Estado Civil *
                </label>
                <select
                    {...register("estadocivil_id", { required: true })}
                  id="estadocivil_id"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="1">Soltero</option>
                  <option value="2">Casado</option>
                  <option value="3">Divorciado</option>
                  <option value="4">Viudo</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="sexo_id"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Sexo *
                </label>
                <select
                    {...register("sexo_id", { required: true })}
                  id="sexo_id"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Registrar Funcionario
          </button>
        </div>
      </form>
    </div>
  );
};
