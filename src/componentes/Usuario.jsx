import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CambiarCiudad } from "../pages/CambiarCiudad";
import "../estilos/CiudadCambiar.css";

const Usuario = () => {
  const { fetchUsersByNickname, users, setUsers, error, searchResults, setSearchResults } =
    useContext(UserContext);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    setUsers([]); // Limpia el estado de usuarios al montar el componente
  }, []);

  const handleBuscarUsuario = (e) => {
    e.preventDefault();
    fetchUsersByNickname(nickname);
  };

  return (
    <div>
      <h1>Buscar Usuario por Nickname</h1>
      <form onSubmit={handleBuscarUsuario}>
        <label>
          Nickname:
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostramos errores */}
      <div>
        <h2>Resultados:</h2>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((user) => (
              <li key={user.rut_usuario}>
                {user.nombre} {user.apellido} - {user.ciudad}
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No se encontraron usuarios con ese nickname</p>
        )}
      
      </div>
       <div> <CambiarCiudad/></div>
    </div>
  );
};

export default Usuario;
