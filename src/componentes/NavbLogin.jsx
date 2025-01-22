import React, { useState } from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import {Login} from "../pages/Login";
import "../estilos/NavbLogin.css";
import {LoginCliente} from "../componentes/LoginCliente";

export const NavbLogin = () => {
  const [active, setActive] = useState("clienteLogin");
  const handleClick = (option) => {
    setActive(option);
  };
  return (
   <div className="contenedor-outlet">
        <div className="Contenedor-navbar-login">
          <nav>
            <ul style={{ display: "flex", padding: 0, margin: 0 }}>
              <li
                className={`liNav ${active === "clienteLogin" ? "active" : ""}`}
                onClick={() => handleClick("clienteLogin")}
              >
                <Link to="clienteLogin">CLIENTE   </Link>
              </li>
              <li
                className={`liNav ${active === "usuarioLogin" ? "active" : ""}`}
                onClick={() => handleClick("usuarioLogin")}
              >
                <Link to="usuarioLogin">USUARIO</Link>
              </li>
            </ul>
            <span
              style={{ left: active === "clienteLogin" ? "135px" : "240px" }}
            ></span>
          </nav>
  
        </div>
        <Outlet />
      </div>
  )
}
