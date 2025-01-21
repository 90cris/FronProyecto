import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //clientes hocks
  const [clientes, setClientes] = useState([]); // Estado para almacenar todos los clientes
  const [cliente, setCliente] = useState(null); // Estado para un cliente específico
 const [falla, setFalla] = useState(null); // Estado para errores 
  const [carga, setCarga ] = useState(false);// Estado para mostrar carga
  const URL_CL = "http://localhost:3000/cliente";
  //otroa hock comentarios y usuario
  const URL_COM = "http://localhost:3000/comentarios";
  const URL_USER = "http://localhost:3000/usuario";
  const [users, setUsers] = useState([]); // busca usuario por ciudad
  const [user, setUser] = useState([]); // login usuario
  const [cityUsers, setCityUsers] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLike, setLoadingLike] = useState(false);
  const [error, setError] = useState(""); // Para manejar errores
  const [rutCliente, setRutCliente] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(false);
  const [clienteData, setClienteData] = useState({});
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("nickname") || ""; // Cargar nickname desde localStorage
  });
  // para el manejo de agregar comentario de un cliente a usuario
  const updateClienteData = (data) => {
    setClienteData(data);
  };

  //manejo de nickaname paraloguea y mostrart en el Navbar
  const updateNickname = (newNickname) => {
    setNickname(newNickname);
    localStorage.setItem("nickname", newNickname); // Guardar en localStorage
  };

  // agregar Comentario usuario
  const fetchAgregarComentarioUsuario = async (comentario) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/comentarios/usuario/registro",
        comentario,
        {
          headers: {
            Authorization: `Bearer ${comentario.token}`, // Si usas autenticación
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta del backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al registrar comentario:", error.response || error);
      throw error;
    }
  };
  // agregar Comentario cliente
  const fetchAgregarComentarioCliente = async (comentario) => {
    console.log("Datos enviados al backend:", comentario);

    try {
      console.log("Datos enviados al backend:", comentario);
      const response = await axios.post(
        "http://localhost:3000/comentarios/cliente/registro",
        comentario
      );
      console.log("Respuesta del backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al registrar comentario:", error.response || error);
      throw error;
    }
  };

  const fetchUsersByCity = async (city) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/usuario/ciudad/${city}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios por ciudad:", error);
      setUsers([]); // Vaciar usuarios en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchUsersByCity(selectedCity); // Llamar a la función cuando cambia la ciudad seleccionada
    }
  }, [selectedCity]);

  const fetchModificarCiudad = async (nickname, ciudad) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/usuario/ciudad/${nickname}`,
        { ciudad }
      );
      return response.data;
    } catch (error) {
      console.error("Error en fetchModificarCiudad:", error.message);
      throw error;
    }
  };
  // Función para actualizar los likes de un comentario usuarios
  const fetchUpdateLikeUsuario = async (id_comentario, updatedLikes) => {
    try {
      const response = await fetch(
        `http://localhost:3000/comentarios/usuario/likes/${id_comentario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likes: updatedLikes, // Enviar el valor actualizado de likes
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar los likes");
      }

      const data = await response.json();
      console.log(data); // Verifica la respuesta

      return data;
    } catch (error) {
      console.error("Error al actualizar likes:", error);
      throw error;
    }
  };

  // Función para actualizar los likes de un comentario cliente
  const fetchUpdateLikeCliente = async (id_comentario, updatedLikes) => {
    try {
      const response = await fetch(
        `http://localhost:3000/comentarios/cliente/likes/${id_comentario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likes: updatedLikes, // Enviar el valor actualizado de likes
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar los likes");
      }

      const data = await response.json();
      console.log(data); // Verifica la respuesta

      return data;
    } catch (error) {
      console.error("Error al actualizar likes:", error);
      throw error;
    }
  };
  // elimina comentario ahora al llegar a los 5 likes usuario
  const fetchEliminaComentarioUsuario = async (idComentario) => {
    try {
      const response = await fetch(
        `http://localhost:3000/comentarios/usuario/eliminar/${idComentario}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error al eliminar comentario con ID ${idComentario}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
      throw error;
    }
  };
  // elimina comentario con 10 likes cliente
  const fetchEliminaComentarioCliente = async (idComentario) => {
    const response = await fetch(
      `http://localhost:3000/comentarios/cliente/eliminar/${idComentario}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar comentario");
    }
    return response.json();
  };

  // Nueva función para obtener el promedio de notas por nickname
  const fetchPromNotasUsuario = async (nickname) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/notas/promedio/${nickname}`
      );
      return response.data; // Devolvemos los datos obtenidos
    } catch (error) {
      console.error("Error al obtener el promedio de notas:", error);
      throw error;
    }
  };

  // Nueva función: Buscar usuarios por nickname
  const fetchVerificaRut = async (rut) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/usuario/buscar/rut?BuscaRut=${rut}`
      );
      console.log("Respuesta de verificar RUT:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al verificar RUT:", error.response || error);
      return false;
    }
  };

  const fetchVerificaNickname = async (nickname) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/usuario/buscar/nickname?busqueda=${nickname}`
      );
      console.log("Respuesta de verificar Nickname:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al verificar Nickname:", error.response || error);
      return false;
    }
  };
  // login Usuario
  const fetchLoginUsuario = async (email, pass) => {
    try {
      const response = await fetch("http://localhost:3000/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) {
        throw new Error("Error en las credenciales");
      }
      const data = await response.json();
      const { nickname } = data;
      return nickname;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message || error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  // LOGIN - Cliente
  const fetchLoginCliente = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/cliente/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass: password }),
      });

      if (!response.ok) {
        throw new Error("Error en las credenciales");
      }
      const data = await response.json();
      const { nickname, rut_cliente, fono, token } = data;

      // Almacenar el nickname y otros datos en el localStorage
      localStorage.setItem("nickname", nickname);
      localStorage.setItem(
        "clienteData",
        JSON.stringify({ nickname, rut_cliente, fono, token })
      );

      // Devolver el nickname para usarlo en el flujo de login
      return { nickname, rut_cliente, fono, token };
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message || error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };
  // ----***** FUNCIONES para  CLIENTES ******------
  // Agregar cliente
  const fetchAgregarCliente = async (cliente) => {  
    try {
      const response = await axios.post(
        "http://localhost:3000/cliente/registro",
        cliente
      );
      console.log("Respuesta del backend al registrar cliente:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al registrar cliente:", error.response || error);
      throw error; // Esto permitirá capturar el error en el componente que invoque la función
    }
  };

   // Función para buscar cliente por email
   const buscarPorRut = async (rutCliente) => {
    try {
      const response = await axios.get(`/cliente/buscar/rut_cliente`, {
        params: { BuscaRut: rutCliente },
      });  
      if (response.status === 404) {
        return false;
      }  
      if (response.status === 200) {
        return true;
      }  
      throw new Error("Error inesperado al verificar el Rut");
    } catch (error) {
      console.error("Error al verificar RUT:", error);  
      if (error.response && error.response.status === 404) {
        return false; // El RUT no existe
      }  
      throw error; // Lanzar otros errores
    }
  };
  
  
  const buscarPorEmail = async (email) => {
    try {
      const response = await axios.get(`/cliente/buscar/email`, {
        params: { BuscaEmail: email },
      });
  
      if (response.status === 404) {
        return false; // El email no existe
      }
  
      if (response.status === 200) {
        return true; // El email ya está registrado
      }
  
      throw new Error("Error inesperado al verificar el email");
    } catch (error) {
      console.error("Error al verificar email:", error);
  
      if (error.response && error.response.status === 404) {
        return false; // El email no existe
      }
  
      throw error;
    }
  };  
  
  const buscarPorNickname = async (nickname) => {
    try {
      const response = await axios.get(`/cliente/buscar/nickname`, {
        params: { BuscaNickname: nickname },
      });
  
      if (response.status === 404) {
        return false; // El nickname no existe
      }
  
      if (response.status === 200) {
        return true; // El nickname ya está registrado
      }
  
      throw new Error("Error inesperado al verificar el nickname");
    } catch (error) {
      console.error("Error al verificar nickname:", error);
  
      if (error.response && error.response.status === 404) {
        return false; // El nickname no existe
      }
  
      throw error;
    }
  };  
  
  const validarClienteExistente = async (rut_cliente, email, nickname) => {
    try {
      const response = await axios.get("http://localhost:3000/cliente/validar", {
        params: { rut_cliente, email, nickname },
      });
      console.log("Validación de cliente:", response.data);
      return response.data.existe;
    } catch (error) {
      console.error("Error al validar cliente existente:", error.response || error);
      throw error;
    }
  };

    // ----***** FUNCIONES para  USUARIO ******------
    // Agregar usuario
    const fetchAgregarUsuario = async (usuario) => {  
      try {
        const response = await axios.post( //error linea 405
          "http://localhost:3000/usuario/registro",
          usuario
        );
        console.log("Respuesta del backend al registrar usuario:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error al registrar usuario:", error.response || error); // linea 412
        throw error; // Esto permitirá capturar el error en el componente que invoque la función
      }
    };
  
     // Función para buscar usuario por rut
     const buscarUsuarioPorRut = async (rutUsuario) => {
      try {
        const response = await axios.get(`/usuario/buscar/rut_cliente`, {
          params: { BuscaRut: rutUsuario },
        });  
        if (response.status === 404) {
          return false;
        }  
        if (response.status === 200) {
          return true;
        }  
        throw new Error("Error inesperado al verificar el Rut usuario");
      } catch (error) {
        console.error("Error al verificar usuario RUT:", error);  
        if (error.response && error.response.status === 404) {
          return false; // El RUT no existe
        }  
        throw error; // Lanzar otros errores
      }
    };
    
    
    const buscarUsuarioPorEmail = async (email) => {
      try {
        const response = await axios.get(`/usuario/buscar/email`, {
          params: { BuscaEmail: email },
        });
    
        if (response.status === 404) {
          return false; // El email no existe
        }
    
        if (response.status === 200) {
          return true; // El email ya está registrado
        }
    
        throw new Error("Error inesperado al verificar el email usuario");
      } catch (error) {
        console.error("Error al verificar email usuario:", error);
    
        if (error.response && error.response.status === 404) {
          return false; // El email no existe
        }
    
        throw error;
      }
    };  
    
    const buscarUsuarioPorNickname = async (nickname) => {
      try {
        const response = await axios.get(`/usuario/buscar/nickname`, {
          params: { BuscaNickname: nickname },
        });
    
        if (response.status === 404) {
          return false; // El nickname no existe
        }
    
        if (response.status === 200) {
          return true; // El nickname ya está registrado
        }
    
        throw new Error("Error inesperado al verificar el nickname usuario");
      } catch (error) {
        console.error("Error al verificar nickname usuario:", error);
    
        if (error.response && error.response.status === 404) {
          return false; // El nickname no existe
        }
    
        throw error;
      }
    };  
 
    const validarUsuarioExistente = async (rut_usuario, email, nickname) => {
      try {
        const response = await axios.get("http://localhost:3000/usuario/validar", {
          params: { rut_usuario, email, nickname },
        });
        console.log("Validación de usuario:", response.data);
        return response.data.existe;
      } catch (error) {
        console.error("Error al validar usuario existente:", error.response || error);
        throw error;
      }
    };

  return (
    <UserContext.Provider
      value={{
        comentarios,
        user,
        users,
        setUsers,
        setUser,
        loading,
        error,
        setRutCliente,
        selectedCity,
        setSelectedCity,
        fetchUsersByCity,
        searchResults,
        setSearchResults,
        fetchModificarCiudad,
        loadingLike,
        fetchUpdateLikeUsuario,
        fetchUpdateLikeCliente,
        fetchAgregarComentarioUsuario,
        fetchAgregarComentarioCliente,
        fetchEliminaComentarioUsuario,
        fetchEliminaComentarioCliente,
        fetchPromNotasUsuario,
        fetchVerificaNickname,
        fetchVerificaRut,
        fetchLoginUsuario,
        fetchLoginCliente,
        nickname,
        updateNickname,
        clienteData,
        updateClienteData,
        clientes,
        cliente,
        carga,
        falla,
        buscarPorEmail,
        buscarPorRut,
        buscarPorNickname,
        fetchAgregarCliente,
        validarClienteExistente,
        validarUsuarioExistente,
        buscarUsuarioPorNickname,
        buscarUsuarioPorEmail,
        buscarUsuarioPorRut,
        fetchAgregarUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
