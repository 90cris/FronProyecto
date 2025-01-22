import React, { useState } from "react";
import "../estilos/NavbRegistro.css";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import { RegistroCliente } from "../pages/RegistroCliente";
import { Registro } from "../pages/Registro";

export const NavbRegitro = () => {
  const [active, setActive] = useState("cliente");
  const handleClick = (option) => {
    setActive(option);
  };

  return (
    <div className="contenedor-outlet">
      <div className="Contenedor-navbar-registro">
        <nav>
          <ul style={{ display: "flex", padding: 0, margin: 0 }}>
            <li
              className={`liNav ${active === "cliente" ? "active" : ""}`}
              onClick={() => handleClick("cliente")}
            >
              <Link to="cliente">CLIENTE   </Link>
            </li>
            <li
              className={`liNav ${active === "usuario" ? "active" : ""}`}
              onClick={() => handleClick("usuario")}
            >
              <Link to="usuario">USUARIO</Link>
            </li>
          </ul>
          <span
            style={{ left: active === "cliente" ? "135px" : "240px" }}
          ></span>
        </nav>

      </div>
      <Outlet />
    </div>
  );
};
