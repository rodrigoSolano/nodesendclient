import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "services/config";
import tokenAuth from "services/tokenAuth";

import { 
  REGISTRO_EXITOSO, 
  REGISTRO_ERROR, 
  LOGIN_EXITOSO, 
  LOGIN_ERROR, 
  USUARIO_AUTENTICADO,
  CERRAR_SESION 
} from "types";

const AuthState = ({ children }) => {

  // Definir state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem("token") : "",
    autenticado: typeof window !== 'undefined' ? (localStorage.getItem("token") ? true : null) : null ,
    usuario: null,
    mensaje: null,
  }

  // Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registrar usuario
  const registrarUsuario = async (datos) => {
    try{
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg
      });
    }catch(error){
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      });
    }
  }

  // Autenticar usuario
  const iniciarSesion = async (datos) => {
    try{
      const respuesta = await clienteAxios.post('/api/auth', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token
      });
    }catch(error){
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      });
    }
  }

  // Usuario autenticado en base al JWT
  const usuarioAutenticado = async () => {
    try{
      const token = localStorage.getItem("token");
      if(token){
        tokenAuth(token);
      }
      const respuesta = await clienteAxios.get('/api/auth');
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.usuario
      });
    }catch(error){
    }
  }

  // Cerrar sesion
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  }

  return (
    <authContext.Provider value={{
      token: state.token,
      autenticado: state.autenticado,
      usuario: state.usuario,
      mensaje: state.mensaje,
      registrarUsuario,
      iniciarSesion,
      usuarioAutenticado,
      cerrarSesion
    }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthState;