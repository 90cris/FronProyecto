import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../estilos/LaCard.css";
import { Comentarios } from "../componentes/Comentarios";
import { UserContext } from "../context/UserContext";
import Notas from "../pages/Notas";

export const Card = () => {
  const location = useLocation();
  const { user, rut_usuario } = location.state || {};
  const navigate = useNavigate();

  // if (!user) {
  //   navigate("/");
  //   return null;
  // }

  const { nickname, edad, genero, comentario, url } = user;

  return (
    <div className="cardYComentario">
      <div className="Contenido-Card">
        {/* Contenedor para notas */}
        <div className="notas-container">
          {/* <Notas nickname={nickname} />  */}
        </div>

        {/* Detalles del usuario */}
        <div className="card-detail">
          <img src={url} alt={nickname} className="detail-img" />
          <div className="detail-info">
            {/* este es el nick_usuario para agregar un comentario */}
            <h2>{nickname}</h2>
            <p>
              {/* <strong>Edad:</strong> {edad} */}
            </p>
            <p>
              <strong>Género:</strong> {genero}
            </p>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="card-comentarios">
        <Comentarios nickname={nickname} />
      </div>
    </div>
  );
};
