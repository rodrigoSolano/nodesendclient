import { useContext, useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "services/config";
import {
  MOSTRATRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO_EXITOSO,
  CREAR_ENLACE_EXITOSO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from "types"

const AppState = ({ children }) => {

  const initialState = {
    mensaje_archivo: '',
    nombre: '',
    nombre_original: '',
    cargando: false,
    descargas: 1,
    password: '',
    autor: null,
    url: '',
  }

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Muestra una alerta
  const mostrarAlerta = msg => {
    dispatch({
      type: MOSTRATRAR_ALERTA,
      payload: msg
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 3000);

  }

  // sube los archivos al servidor
  const subirArchivo = async (formData, nombre_original) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });
    try {
      const respuesta = await clienteAxios.post("/api/archivos", formData)
      dispatch({
        type: SUBIR_ARCHIVO_EXITOSO,
        payload: {
          nombre: respuesta.data.archivo,
          nombre_original
        }
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg
      });
    }
  }

  // Crea un enlace una vez que el archivo se sube
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    }
    try {
      const resultado = await clienteAxios.post("/api/enlaces", data)
      dispatch({
        type: CREAR_ENLACE_EXITOSO,
        payload: resultado.data.msg
      })
    } catch (error) {
    }
  }

  // Reinicia el state
  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE
    })
  }

  // Agregar password
  const agregarPassword = password => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password
    })
  }

  // Agregar numero de descargas
  const agregarDescargas = descargas => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: parseInt(descargas)
    })
  }

  return (
    <appContext.Provider value={{
      mensaje_archivo: state.mensaje_archivo,
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      cargando: state.cargando,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
      url: state.url,
      mostrarAlerta,
      subirArchivo,
      crearEnlace,
      limpiarState,
      agregarPassword,
      agregarDescargas
    }}
    >
      {children}
    </appContext.Provider>
  )
}

export default AppState;