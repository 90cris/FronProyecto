import React, { useState, useContext, useEffect } from "react";
import { Ciudad } from "../componentes/Ciudad";
import { UserContext } from "../context/UserContext"; 
import "../estilos/CambiarCiudad.css";

export const CambiarCiudad = () => {
  const [ciudad, setCiudad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nickname, setNickname] = useState("");

  // Accede a la función desde el contexto
  const { fetchModificarCiudad } = useContext(UserContext);

  useEffect(() => {
    // Obtén el nickname desde localStorage
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    } else {
      setMensaje("No se encontró el nickname. Por favor, inicia sesión.");
    }
  }, []);

  const handleCitySelect = (city) => {
    setCiudad(city);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname || !ciudad) {
      setMensaje("Debe seleccionar una ciudad para actualizar.");
      return;
    }

    try {
      const response = await fetchModificarCiudad(nickname, ciudad);
      setMensaje(response.msg); // Muestra el mensaje de éxito
    } catch (error) {
      setMensaje("Error al actualizar la ciudad: " + error.message); // Muestra el mensaje de error
    }
  };

  return (
    <div className="contenedor-cambiar">
      <h1>Actualizar Ciudad del Usuario</h1>
      <div className="CambiarCiudad-container">
        <form className="fromu" onSubmit={handleSubmit}>
          <Ciudad onCitySelect={handleCitySelect} />
          <button type="submit" className="zone-buttons2">
            Cambiar Ciudad
          </button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
};