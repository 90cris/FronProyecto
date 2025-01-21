import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../estilos/comentarios.css";
import { fetchAgregarComentarioUsuario } from "../api/ComentariosAPI";

export const Comentarios = ({ nickname }) => {
  const {
    loading,
    comentarios,
    fetchEliminaComentarioUsuario,
    fetchUpdateLikeUsuario,
    clienteData,
  } = useContext(UserContext);
  const [filteredComentarios, setFilteredComentarios] = useState([]);
  const [error, setError] = useState(null);
  const [showAddComentario, setShowAddComentario] = useState(false); // Estado para mostrar/ocultar AddComentario
  const [newComment, setNewComment] = useState(""); // Estado para manejar el texto del nuevo comentario
  const fechaActual = new Date().toISOString().split("T")[0]; // Obtener fecha actual
  const [comentariosAEliminar, setComentariosAEliminar] = useState([]);

  const fetchComentarios = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/comentarios/nick_usuario/${nickname}`,
        {
          headers: {
            Authorization: `Bearer ${clienteData.token}`, // Enviar token si es necesario
          },
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          setFilteredComentarios([]); // Limpia los comentarios previos
          setError("Usuario sin comentarios.");
          return;
        }
        throw new Error("Error al obtener comentarios");
      }
      const data = await response.json();
      if (data.length === 0) {
        setFilteredComentarios([]);
        setError("Usuario sin comentarios.");
      } else {
        setFilteredComentarios(data);
        setError(null); // Limpiar error si ya hay comentarios
      }
    } catch (error) {
      console.error(error);
      setError("Usuario sin Comentarios !");
    }
  };
  useEffect(() => {
    if (nickname) {
      fetchComentarios();
    } else {
      setFilteredComentarios([]);
      setError("Nickname no proporcionado.");
    }
  }, [nickname]);

  useEffect(() => {
    if (clienteData && Object.keys(clienteData).length > 0) {
      console.log("Datos del cliente:", clienteData);

      // Usa clienteData.rut_cliente, clienteData.fono, clienteData.nickname según necesites
    } else {
      console.error("No hay datos del cliente en el contexto");
    }
  }, [clienteData]);
  //useEfect para eliminar comentario
  useEffect(() => {
    const eliminarComentarios = async () => {
      for (const idComentario of comentariosAEliminar) {
        try {
          await fetchEliminaComentarioUsuario(idComentario);

          // Eliminar del estado local después de eliminar del backend
          setFilteredComentarios((prevComentarios) =>
            prevComentarios.filter(
              (comentario) => comentario.id_comentario !== idComentario
            )
          );

          console.log(
            `Comentario con ID ${idComentario} eliminado correctamente.`
          );
        } catch (error) {
          console.error(
            `Error al eliminar el comentario con ID ${idComentario}:`,
            error
          );
          setError("Error al eliminar el comentario.");
        }
      }

      // Limpiar el estado de comentarios a eliminar
      setComentariosAEliminar([]);
    };

    if (comentariosAEliminar.length > 0) {
      eliminarComentarios();
    }
  }, [comentariosAEliminar]);
  // funcion para liminar comentario
  const handleDenuncia = async (index) => {
    const comentario = filteredComentarios[index];

    if (!comentario.id_comentario) {
      console.error("Comentario sin id_comentario válido");
      return;
    }

    if (comentario.likes >= 5) {
      try {
        // Llamar directamente a la función de eliminación sin agregar a otro estado
        await fetchEliminaComentarioUsuario(comentario.id_comentario);

        // Actualizar el estado local eliminando el comentario
        setFilteredComentarios((prevComentarios) =>
          prevComentarios.filter(
            (item) => item.id_comentario !== comentario.id_comentario
          )
        );

        console.log(
          `Comentario con ID ${comentario.id_comentario} eliminado automáticamente.`
        );
      } catch (error) {
        console.error(
          `Error al eliminar el comentario con ID ${comentario.id_comentario}:`,
          error
        );
        setError("Error al eliminar el comentario.");
      }
    } else {
      try {
        const updatedLikes = comentario.likes + 1;

        const updatedComentario = await fetchUpdateLikeUsuario(
          comentario.id_comentario,
          updatedLikes
        );

        // Actualizar el comentario con el nuevo número de likes
        setFilteredComentarios((prevComentarios) => {
          const updatedComentarios = [...prevComentarios];
          updatedComentarios[index] = updatedComentario.data;
          return updatedComentarios;
        });

        console.log("Likes actualizados correctamente.");
      } catch (error) {
        console.error("Error al actualizar el like:", error);
        setError("No se pudo actualizar el like.");
      }
    }
  };

  const handleAddComment = () => {
    setError(null); // Limpiar error
    setShowAddComentario(true);
  };

  // Aquí puedes manejar el guardado del comentario
  const handleSaveComment = async () => {
    try {
      if (!clienteData || !clienteData.token) {
        setError("Debes iniciar sesión para agregar un comentario.");
        return;
      }
      const { rut_cliente, fono, nickname: nick_cliente } = clienteData;

      // Validar que los datos requeridos estén presentes
      if (!rut_cliente || !fono || !nickname || !newComment) {
        setError("Faltan datos para guardar el comentario.");
        return;
      }

      // Preparar el objeto para el backend
      const nuevoComentario = {
        rut_cliente,
        fecha: fechaActual,
        comentario: newComment,
        likes: 0,
        fono,
        nick_cliente, // Usuario autenticado
        nick_usuario: nickname, // Usuario objetivo
      };
      const response = await fetchAgregarComentarioUsuario(nuevoComentario);

      // Actualizar el estado local con el nuevo comentario
      setFilteredComentarios((prevComentarios) => [
        ...prevComentarios,
        response,
      ]);
      fetchComentarios();
      // Limpiar campos
      setNewComment("");
      setShowAddComentario(false);

      console.log("Comentario agregado exitosamente:", response);
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
      setError("No se pudo guardar el comentario.");
    }
  };

  const handleCancel = () => {
    setShowAddComentario(false); // Ocultar AddComentario sin guardar
  };

  // if (loading) return <p>Cargando comentarios...</p>;
  // if (error) return <p>{error}</p>;
  if (loading) {
    return (
      <div className="comentarios-panel">
        <h2>
          Comentarios <button onClick={handleAddComment}>Agregar</button>
        </h2>
        <p>Usuario sin comentarios !</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comentarios-panel">
        <h2>
          Comentarios <button onClick={handleAddComment}>Agregar</button>
        </h2>
        <p>{error}</p>
      </div>
    );
  }
  if (error && filteredComentarios.length === 0) {
    return (
      <div className="comentarios-panel">
        <h2>
          Comentarios <button onClick={handleAddComment}>Agregar</button>
        </h2>
        <p>{error}</p>
      </div>
    );
  }
  if (error && filteredComentarios.length === 0) {
    return (
      <div className="comentarios-panel">
        <h2>
          Comentarios
          <button onClick={handleAddComment}>Agregar</button>
        </h2>
        {showAddComentario ? (
          <div className="AddComentario comentario-item">
            <textarea
              placeholder="Escribe tu comentario aquí..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="btnGuardar" onClick={handleSaveComment}>
              Guardar
            </button>
            <button className="btnCancelar" onClick={handleCancel}>
              Cancelar
            </button>
            <input type="hidden" value={fechaActual} />
          </div>
        ) : (
          <p>{error}</p>
        )}
      </div>
    );
  }
  return (
    <div className="comentarios-panel">
      <h2>Comentarios</h2>
      <button onClick={() => setShowAddComentario(true)}>Agregar</button>

      {/* Mostrar el formulario para agregar un comentario si showAddComentario es true */}
      {showAddComentario && (
        <div className="AddComentario comentario-item">
          <textarea
            placeholder="Escribe tu comentario aquí..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btnGuardar" onClick={handleSaveComment}>
            Guardar
          </button>
          <button
            className="btnCancelar"
            onClick={() => setShowAddComentario(false)}
          >
            Cancelar
          </button>
          {/* Fecha no visible, pero accesible */}
          <input type="hidden" value={fechaActual} />
        </div>
      )}

      {/* Lista de comentarios o mensaje cuando no hay comentarios */}
      {filteredComentarios.length > 0 ? (
        <div className="comentarios-lista">
          {filteredComentarios.map((comentario, index) => (
            <div key={index} className="comentario-item">
              <div className="DatosComentador">
                <p>
                  <strong>Nick :</strong> {comentario.nick_cliente}
                </p>
                <p>
                  <strong>Id Comentario :</strong> {comentario.id_comentario}
                </p>
                <p>
                  <strong>Fecha :</strong>{" "}
                  {comentario.fecha
                    ? new Date(comentario.fecha).toISOString().split("T")[0]
                    : "Fecha no disponible"}
                </p>
                <p>
                  <strong>Fono:</strong> {comentario.fono}
                </p>
              </div>
              <p>
                <strong>Comentario:</strong> {comentario.comentario}
              </p>
              <button onClick={() => handleDenuncia(index)}>
                Likes ({comentario.likes})
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay comentarios disponibles.</p>
      )}
    </div>
  );
};
