import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Asegúrate de que la ruta sea correcta
//Cliente
export const LoginCliente = () => {
  const {updateNickname, updateClienteData, fetchLoginCliente } = useContext(UserContext); // Obtén `fetchLoginCliente`
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Inicializar con cadena vacía
  const [password, setPassword] = useState(""); // Inicializar con cadena vacía
  const [loginData, setLoginData] = useState({ email: "",  password: "",});
  const [error, setError] = useState("");
//updateClienteData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { nickname, rut_cliente, fono, token } = await fetchLoginCliente(
        loginData.email,
        loginData.password
      );
  
      // Actualizar el contexto con los datos del cliente
      updateNickname(nickname); // Actualizar solo el nickname
      updateClienteData({ nickname, rut_cliente, fono, token }); // Actualizar el cliente completo
  
      // Navegar a otra página
      navigate("/Cards");
    } catch (error) {
      console.error("Error al iniciar sesión como cliente:", error.message);
      setError("Error al procesar la respuesta del servidor. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesión - Cliente</h1>
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
