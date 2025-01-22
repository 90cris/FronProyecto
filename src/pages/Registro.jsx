import React, { useState, useContext } from "react";
import "../estilos/Registro.css";
import { Ciudad } from "../componentes/Ciudad";
import { UserContext } from "../context/UserContext";

export const Registro = () => {
  const {
    fetchVerificaRut,
    fetchVerificaNickname,
    fetchAgregarUsuario,
    validarUsuarioExistente,
  } = useContext(UserContext);

  const [usuario, setUsuario] = useState({
    rut_usuario: "",
    nombre: "",
    apellido: "",
    nickname: "",
    fechaNacimiento: "",
    email: "",
    edad: "",
    genero: "",
    fono: "",
    password: "",
    RepitePassword: "",
    url: "",
    ciudad: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let error = null;

    switch (name) {
      case "rut_usuario":
        updatedValue = value.replace(/[^0-9kK.-]/g, "").toUpperCase();
        if (!/^\d{1,2}\.?\d{3}\.?\d{3}-?[0-9K]?$/.test(updatedValue)) {
          error = "Formato de RUT no válido.";
        }
        break;
      case "password":
        if (updatedValue.length < 6) {
          error = "La contraseña debe tener al menos 6 caracteres.";
        } else if (!/[a-zA-Z]/.test(updatedValue) || !/\d/.test(updatedValue)) {
          error = "La contraseña debe contener letras y números.";
        }
        break;
      case "RepitePassword":
        if (updatedValue !== usuario.password) {
          error = "Las contraseñas no coinciden.";
        }
        break;
      case "fono":
        updatedValue = value.replace(/[^0-9]/g, "");
        if (updatedValue.length !== 9) {
          error = "El número de contacto debe tener exactamente 9 dígitos.";
        }
        break;
      default:
        break;
    }

    setUsuario({ ...usuario, [name]: updatedValue });
    setErrors({ ...errors, [name]: error });
  };

  const handleCitySelect = (city) => {
    setUsuario({ ...usuario, ciudad: city });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (
      Object.values(errors).some((error) => error) 
      // || Object.values(usuario).some((value) => !value)
    ) {
      setAlert({
        type: "danger",
        message: "Por favor, corrija los errores antes de enviar.",
      });
      return;
    }
    if (
      !usuario.rut_usuario ||
      !usuario.email ||
      !usuario.nickname ||
      !usuario.password ||
      !usuario.RepitePassword
    ) {
      setAlert({
        type: "danger",
        message: "Complete todos los campos obligatorios.",
      });
      return;
    }

    try {
      const existe = await validarUsuarioExistente(
        usuario.rut_usuario,
        usuario.email,
        usuario.nickname
      );
      if (existe) {
        setAlert({
          type: "danger",
          message: "El RUT, email o nickname ya existen.",
        });
        return;
      }
      
      const response = await fetchAgregarUsuario(usuario);
      if (response.success) {
        setAlert({ type: "success", message: "Usuario registrado con éxito." });
        setUsuario({
          rut_usuario: "",
          nombre: "",
          apellido: "",
          nickname: "",
          fechaNacimiento: "",
          email: "",
          edad: "",
          genero: "",
          fono: "",
          password: "",
          RepitePassword: "",
          url: "",
          ciudad: "",
        });
      } else {
        setAlert({
          type: "danger",
          message: response.message || "Error al registrar usuario.",
        });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setAlert({
        type: "danger",
        message: "Ocurrió un error al registrar el usuario. Intente nuevamente.",
      });
    }
  };

  return (
    <div>
      <div className="registro-container">
        <h1 className="h1-title">Registro Usuario</h1>
        {alert && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rut_usuario">RUT:</label>
            <input
              type="text"
              id="rut_usuario"
              name="rut_usuario"
              value={usuario.rut_usuario}
              onChange={handleChange}
              placeholder="Ingrese su RUT"
              required
            />
            {errors.rut_usuario && (
              <div className="alert alert-warning">{errors.rut_usuario}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombres:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              placeholder="Ingrese sus nombres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellidos:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={usuario.apellido}
              onChange={handleChange}
              placeholder="Ingrese sus apellido"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">Nickname:</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={usuario.nickname}
              onChange={handleChange}
              placeholder="Ingrese un alias o nickname"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={usuario.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={usuario.edad}
              onChange={handleChange}
              placeholder="Ingrese su edad"
              required
            />
          </div>
{/* 
          <div className="form-group">
            <label htmlFor="tipoPerfil">Tipo de Perfil:</label>
            <select
              id="tipoPerfil"
              name="tipoPerfil"
              value={usuario.tipoPerfil}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Seleccione un perfil
              </option>
              <option value="usuario">Usuario</option>
              <option value="cliente">Cliente</option>
            </select>
          </div> */}

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />
            {errors.password && (
              <div className="alert alert-warning">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="RepitePassword">Repita Contraseña:</label>
            <input
              type="password"
              id="RepitePassword"
              name="RepitePassword"
              value={usuario.RepitePassword}
              onChange={handleChange}
              placeholder="Repita su contraseña"
              required
            />
            {errors.RepitePassword && (
              <div className="alert alert-warning">{errors.RepitePassword}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="fono">Teléfono:</label>
            <input
              type="text"
              id="fono"
              name="fono"
              value={usuario.fono}
              onChange={handleChange}
              placeholder="Ingrese su número de contacto"
              required
            />
            {errors.fono && (
              <div className="alert alert-warning">{errors.fono}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="url">Imagen de Perfil:</label>
            <input
              type="text"
              id="url"
              name="url"
              value={usuario.url}
              onChange={handleChange}
              placeholder="Ingrese la URL de su imagen de perfil"
              required
            />
          </div>

          <div className="form-group">
            <label>Género:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="femenino"
                  checked={usuario.genero === "femenino"}
                  onChange={handleChange}
                  required
                />
                Femenino
              </label>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="masculino"
                  checked={usuario.genero === "masculino"}
                  onChange={handleChange}
                  required
                />
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="otro"
                  checked={usuario.genero === "otro"}
                  onChange={handleChange}
                  required
                />
                Otro
              </label>
            </div>
          </div>

          <Ciudad onCitySelect={handleCitySelect} />

          <button type="submit" className="btn-registrar">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};
