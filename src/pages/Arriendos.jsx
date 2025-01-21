import React from "react";
import "../estilos/Arriendo.css";
import {LocalizacionLugar} from "../componentes/LocalizacionLugar";
import ubicacion from "../helpers/ubicacion";

export const Arriendos = () => {
  return (
    <div className="dropdown-container arriendo-container">
      {/* <h2>Arriendos</h2> */}
      <LocalizacionLugar/>
      <div className="card-wrapper">
        {ubicacion.map((ubicacion, index) => (
          <div className="card" key={index}>
            <iframe
              src={ubicacion.url}
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="card-body">
              <h5 className="card-title">{ubicacion.direccion}</h5>
              <h5 className="card-title">Ciudad: {ubicacion.ciudad} </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
