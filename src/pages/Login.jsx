import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../estilos/Login.css";

export const Login = () => {
  const { updateNickname, fetchLoginUsuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Inicializar con cadena vacía
  const [password, setPassword] = useState(""); // Inicializar con cadena vacía
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const nickname = await fetchLoginUsuario(
        loginData.email,
        loginData.password
      );
      updateNickname(nickname); 
      // localStorage.setItem("nickname", nickname);
      navigate("/Cards");
    } catch (error) {
      setError("Credenciales incorrectas. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesión - Usuario</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="dropdown-label">
            Correo Electrónico:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Ingrese su correo"
            className="dropdown-select"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="dropdown-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
            className="dropdown-select"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-registrar">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
