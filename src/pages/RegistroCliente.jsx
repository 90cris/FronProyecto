import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Ciudad } from "../componentes/Ciudad";
import "../estilos/Registro.css";

export const RegistroCliente = () => {
  const { validarClienteExistente, fetchAgregarCliente } =
    useContext(UserContext);

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

    const existe = await validarClienteExistente(
      cliente.rut_cliente,
      cliente.email,
      cliente.nickname
    );
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
    <div className="registro-container">
      <h1>Registro Cliente</h1>
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rut_cliente" className="form-label">
            RUT:
          </label>
          <input
            type="text"
            className="form-control"
            name="rut_cliente"
            value={cliente.rut_cliente}
            onChange={handleChange}
            placeholder="Ingrese su RUT"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nombres:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            placeholder="Ingrese sus nombres"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Apellidos:</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChange}
            placeholder="Ingrese sus apellido"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nickname:</label>
          <input
            type="text"
            className="form-control"
            name="nickname"
            value={cliente.nickname}
            onChange={handleChange}
            placeholder="Ingrese un alias o nickname"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha de Nacimiento:</label>
          <input
            type="date"
            className="form-control"
            name="fecha_nac"
            value={cliente.fecha_nac}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            placeholder="Ingrese su correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Edad:</label>
          <input
            type="number"
            className="form-control"
            name="edad"
            value={cliente.edad}
            onChange={handleChange}
            placeholder="Ingrese su edad"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            name="pass"
            value={cliente.pass}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Repetir Contraseña:</label>
          <input
            type="password"
            className="form-control"
            name="repetirPass"
            value={cliente.repetirPass}
            onChange={handleChange}
            placeholder="Repita su contraseña"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="fono"
            value={cliente.fono}
            onChange={handleChange}
            placeholder="Ingrese su número de contacto"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Imagen de Perfil:</label>
          <input
            type="url"
            className="form-control"
            name="url"
            value={cliente.url}
            onChange={handleChange}
            placeholder="Ingrese la URL de su imagen de perfil"
            required
          />
        </div>

        <div className="form-group">
          <label className="">Género</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="genero"
                value="Masculino"
                checked={cliente.genero === "Masculino"}
                onChange={handleChange}
                required
              />
              Masculino
            </label>

            <label>
              <input
                type="radio"
                name="genero"
                value="Femenino"
                checked={cliente.genero === "Femenino"}
                onChange={handleChange}
                required
              />
              Femenino
            </label>

            <label>
              <input
                type="radio"
                name="genero"
                value="Otro"
                checked={cliente.genero === "Otro"}
                onChange={handleChange}
                required
              />
              Otro
            </label>
          </div>
        </div>

        <div className="mb-3">
          <Ciudad onCitySelect={handleCitySelect} />
        </div>

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
