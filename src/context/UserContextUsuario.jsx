import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContextUsuario = createContext();

export const UserProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar usuarios
  const [usuario, setUsuario] = useState(null); // Estado para un usuario específico
  const [loading, setLoading] = useState(false); // Estado para mostrar carga
  const [error, setError] = useState(null); // Estado para errores

  const URL = "http://localhost:3000/usuario";

  // Función para buscar usuarios por email
  

  return (
    <UserContextUsuario.Provider
      value={{
        usuarios,
        usuario,
        loading,
        error,
        buscarPorEmail,
        buscarPorRut,
        buscarPorNickname,
        cargarUsuarios,
      }}
    >
      {children}
    </UserContextUsuario.Provider>
  );
};
