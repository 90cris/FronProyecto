import React, { useContext, useState } from "react";
import "../estilos/Cards.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Importamos el contexto
import { Localizacion } from "./Localizacion";
import "../estilos/CiudadCambiar.css";

export const Cards = () => {
  const { users, setRutCliente } = useContext(UserContext); // Usamos los usuarios desde el contexto
  const navigate = useNavigate();
 const [rutInput, setRutInput] = useState("");

 const handleCardClick = (user) => {
  navigate("/Card", { state: { user, rut_usuario: user.rut_usuario } });
};
  const handleRutChange = (e) => {
    setRutInput(e.target.value); // Actualizamos el valor del rut
  };

  const handleSubmitRut = () => {
    setRutCliente(rutInput); // Establecemos el rut_usuario cuando el usuario hace submit
  };

  return (
    <>
      <Localizacion />
      <div className="card-wrapper">
        {users.map((user) => (
          <div
            key={user.rut_usuario}
            className="card"
            onClick={() => handleCardClick(user)} // Pasamos el usuario al hacer click
          >
            <img
              src={user.url}
              alt={user.nickname}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{user.nickname}</h5>
              <h5 className="card-title">{user.rut_usuario} 
                {/* años */}
                </h5>
        
            </div>
          </div>
        ))}
      </div>
    </>
  );
};