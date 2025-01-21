import axios from "axios";

export const fetchAgregarComentarioUsuario = async (nuevoComentario) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/comentarios/usuario/registro",
      nuevoComentario,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    throw error;
  }
};
