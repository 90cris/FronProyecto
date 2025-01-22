import React, { useState, useContext, useEffect  } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../estilos/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [nickname, setNickname] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { nickname, updateNickname } = useContext(UserContext);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        {/* Logo principal con banner */}
        {/* <a className="navbar-brand" href="#">
          <img
            src="https://emojings.com/wp-content/uploads/2021/09/star-and-crescent-7.png"
            alt="Logo"
            width={"40px"}
            className="logo"
          />{" "}
        </a> */}
        <Link className="navbar-brand " to="/Pagos">
          <img
            // src="https://img.freepik.com/vector-premium/banner-letras-calidad-premium_28633-267.jpg"
            src="https://cdn-icons-png.flaticon.com/512/3594/3594363.png"
            alt="Calidad Premium"
            width={"100"}
            className="banner-logo"
          />
        </Link>

        {/* Menú hamburguesa */}
        <button
          id="abrir"
          className={`abrir-menu ${isMenuOpen ? "hidden" : ""}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-justify"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <button
          id="cerrar"
          className={`cerrar-menu ${isMenuOpen ? "" : "hidden"}`}
          onClick={toggleMenu}
          aria-expanded={!isMenuOpen}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        {/* Menú principal */}
        {/* <div className='collapse navbar-collapse ' id="navbarMenu" > */}
        <div className={`menu-container ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li>
              <button id="cerrar">
                <i className="bi bi-x-lg"></i>
              </button>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cards">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">
                Ingresar
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/registro">
                Registrate
              </Link>
            </li>
            <li className="nav-item  pruebaCiudad">
              <Link className="nav-link" to="/CambiarCiudad">
                Cambiar Ciudad            
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ConsejosUsuarios">
                Saber Mas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Arriendos">
                Lugar
              </Link>
            </li>
            {/* Menú desplegable de cuenta */}
               {nickname ? (
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      role="button"
      onClick={toggleDropdown}
    >
      Cuenta ({nickname})
    </a>
    {isDropdownOpen && (
      <div className="dropdown-menu show">
          <a
            className="dropdown-item "
            href="#"        
            onClick={() => {
              // Acción al seleccionar "Perfil"
            
              setIsDropdownOpen(false); // Cierra el menú desplegable
            }}
          >
            Perfil
          </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            // Acción al seleccionar "Modificar Cuenta"
            console.log("Modificar Cuenta seleccionado");
            setIsDropdownOpen(false); // Cierra el menú desplegable
          }}
        >
          Modificar Cuenta
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            updateNickname(""); // Limpia el nickname
            // Acción al cerrar sesión
            localStorage.removeItem("nickname");
            // setNickname("");
            setIsDropdownOpen(false); // Cierra el menú desplegable
          }}
        >
          Salir
        </a>
      </div>
    )}
  </li>
) : (
  <li className="nav-item">
    {/* <span className="nav-link">No autenticado</span> */}
  </li>
)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
