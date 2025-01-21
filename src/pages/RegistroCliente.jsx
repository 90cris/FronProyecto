import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Ciudad } from "../componentes/Ciudad";

export const RegistroCliente = () => {
  const { validarClienteExistente, fetchAgregarCliente } = useContext(UserContext);

  const [cliente, setCliente] = useState({
    rut_cliente: "",
    nombre: "",
    apellido: "",
    nickname: "",
    fecha_nac: "",
    email: "",
    edad: "",
    genero: "",
    fono: "",
    pass: "",
    repetirPass: "",
    url: "",
    ciudad: "",
  });

  const [errorCampos, setErrorCampos] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleCitySelect = (city) => {
    setCliente({ ...cliente, ciudad: city });
  };

  const validarCampos = async () => {
    if (cliente.pass !== cliente.repetirPass) {
      setErrorCampos("Las contraseñas no coinciden.");
      return false;
    }

    const camposRequeridos = [
      "rut_cliente",
      "nombre",
      "apellido",
      "nickname",
      "email",
      "pass",
      "ciudad",
      "edad",
      "fecha_nac",
      "fono",
    ];

    for (const campo of camposRequeridos) {
      if (!cliente[campo]) {
        setErrorCampos("Todos los campos son obligatorios.");
        return false;
      }
    }

    const existe = await validarClienteExistente(cliente.rut_cliente, cliente.email, cliente.nickname);
    if (existe) {
      setErrorCampos("El RUT, email o nickname ya existen.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorCampos("");
    setMensaje(null);

    const esValido = await validarCampos();
    if (esValido) {
      try {
        const response = await fetchAgregarCliente(cliente);
        setMensaje({ tipo: "success", texto: "Cliente registrado con éxito." });
        setCliente({
          rut_cliente: "",
          nombre: "",
          apellido: "",
          nickname: "",
          fecha_nac: "",
          email: "",
          edad: "",
          genero: "",
          fono: "",
          pass: "",
          repetirPass: "",
          url: "",
          ciudad: "",
        });
      } catch (error) {
        setMensaje({ tipo: "danger", texto: "Error al registrar cliente." });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Cliente</h2>
      {mensaje && <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>}
      <form onSubmit={handleSubmit}>
        {/* RUT */}
        <div className="mb-2">
          <label className="form-label">RUT</label>
          <input
            type="text"
            className="form-control"
            name="rut_cliente"
            value={cliente.rut_cliente}
            onChange={handleChange}
          />
        </div>

        {/* Nombre */}
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
          />
        </div>

        {/* Apellido */}
        <div className="mb-2">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChange}
          />
        </div>

        {/* Nickname */}
        <div className="mb-2">
          <label className="form-label">Nickname</label>
          <input
            type="text"
            className="form-control"
            name="nickname"
            value={cliente.nickname}
            onChange={handleChange}
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div className="mb-2">
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="fecha_nac"
            value={cliente.fecha_nac}
            onChange={handleChange}
          />
        </div>

        {/* Contraseña */}
        <div className="mb-2">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="pass"
            value={cliente.pass}
            onChange={handleChange}
          />
        </div>

        {/* Repetir Contraseña */}
        <div className="mb-2">
          <label className="form-label">Repetir Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="repetirPass"
            value={cliente.repetirPass}
            onChange={handleChange}
          />
        </div>

        {/* Edad */}
        <div className="mb-2">
          <label className="form-label">Edad</label>
          <input
            type="number"
            className="form-control"
            name="edad"
            value={cliente.edad}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={cliente.email}
            onChange={handleChange}
          />
        </div>

        {/* Teléfono */}
        <div className="mb-2">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="fono"
            value={cliente.fono}
            onChange={handleChange}
          />
        </div>

        {/* URL */}
        <div className="mb-2">
          <label className="form-label">URL</label>
          <input
            type="url"
            className="form-control"
            name="url"
            value={cliente.url}
            onChange={handleChange}
          />
        </div>

        {/* Género */}
        <div className="mb-2">
          <label className="form-label">Género</label>
          <div className="radio-group">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="genero"
                value="Masculino"
                checked={cliente.genero === "Masculino"}
                onChange={handleChange}
              />
              <label className="form-check-label">Masculino</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="genero"
                value="Femenino"
                checked={cliente.genero === "Femenino"}
                onChange={handleChange}
              />
              <label className="form-check-label">Femenino</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="genero"
                value="Otro"
                checked={cliente.genero === "Otro"}
                onChange={handleChange}
              />
              <label className="form-check-label">Otro</label>
            </div>
          </div>
        </div>

        {/* Ciudad */}
        <div className="mb-3">
          <label className="form-label">Ciudad</label>
          <Ciudad onCitySelect={handleCitySelect} />
        </div>

        {/* Error general */}
        {errorCampos && (
          <div className="alert alert-danger mt-2">{errorCampos}</div>
        )}

        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};