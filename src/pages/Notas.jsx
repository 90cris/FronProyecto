import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../estilos/Notas.css";
import "../estilos/LaCard.css";

const Notas = ({ nickname }) => {
  const { fetchPromNotasUsuario } = useContext(UserContext);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [activeStyle, setActiveStyle] = useState(false);
  const [promedios, setPromedios] = useState({
    promedio_nota1: 0,
    promedio_nota2: 0,
    promedio_nota3: 0,
    promedio_nota4: 0,
    promedio_nota5: 0,
  });

  const [promedioTotal, setPromedioTotal] = useState(0);

  useEffect(() => {
    const obtenerNotas = async () => {
      try {
        const data = await fetchPromNotasUsuario(nickname);
        setPromedios(data);
        // Calcular el promedio total
        const totalPromedio =
          (data.promedio_nota1 +
            data.promedio_nota2 +
            data.promedio_nota3 +
            data.promedio_nota4 +
            data.promedio_nota5) /
          5;
        setPromedioTotal(totalPromedio.toFixed(2)); // Mostrar con 2 decimales
      } catch (error) {
        console.error("Error al obtener los promedios:", error);
      }
    };

    obtenerNotas();
  }, [nickname, fetchPromNotasUsuario]);
  // Función para mostrar los dropdowns
  const handleAddClick = () => {
    setShowDropdowns(true);
    setActiveStyle(true);
   
  };

  // Función para ocultar los dropdowns
  const handleInsertClick = () => {
    setShowDropdowns(false);
    setActiveStyle(false);

  };

  return (
    <div className="notas-container1">
      <div className="promedio-container">
        <p className="promedio-total">Prom: {promedioTotal}</p>
        {!showDropdowns && (
  <button className="btn" onClick={handleAddClick}>
    Add
  </button>
)}
{showDropdowns && (
  <button className="btn" onClick={handleInsertClick}>
    Insert
  </button>
)}
      </div>

      <div className="progress-bars">
        <div className="progress-item">
          <label
            className={`LabelNota ${activeStyle ? "move-up" : "move-down"}`}
          >
            N° 1:
          </label>

          <progress
            className={`progress-bar ${
              activeStyle ? "move-down-progress" : "move-up-progress"
            }`}
            value={promedios.promedio_nota1}
            max="10"
          ></progress>
          {showDropdowns && (
            <select
              className={`dropdownNotas ${
                activeStyle ? "active-dropdownNotas" : ""
              }`}
            >
              <option value="" disabled selected>
                Nota
              </option>
              {[...Array(10).keys()].reverse().map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          )}
          <span className="progress-value">{promedios.promedio_nota1}</span>
        </div>

        <div className="progress-item">
          <label
            className={`LabelNota ${activeStyle ? "move-up" : "move-down"}`}
          >
            N° 2:
          </label>
          <progress
            className={`progress-bar ${
              activeStyle ? "move-down-progress" : "move-up-progress"
            }`}
            value={promedios.promedio_nota2}
            max="10"
          ></progress>
          {showDropdowns && (
            <select
              className={`dropdownNotas ${
                activeStyle ? "active-dropdownNotas" : ""
              }`}
            >
              <option value="" disabled selected>
                Nota
              </option>
              {[...Array(10).keys()].reverse().map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          )}
          <span className="progress-value">{promedios.promedio_nota2}</span>
        </div>

        <div className="progress-item">
          <label
            className={`LabelNota ${activeStyle ? "move-up" : "move-down"}`}
          >
            N° 3:
          </label>
          <progress
            className={`progress-bar ${
              activeStyle ? "move-down-progress" : "move-up-progress"
            }`}
            value={promedios.promedio_nota3}
            max="10"
          ></progress>
          {showDropdowns && (
            <select
              className={`dropdownNotas ${
                activeStyle ? "active-dropdownNotas" : ""
              }`}
            >
              <option value="" disabled selected>
                Nota
              </option>
              {[...Array(10).keys()].reverse().map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          )}
          <span className="progress-value">{promedios.promedio_nota3}</span>
        </div>

        <div className="progress-item">
          <label
            className={`LabelNota ${activeStyle ? "move-up" : "move-down"}`}
          >
            N° 4:
          </label>
          <progress
            className={`progress-bar ${
              activeStyle ? "move-down-progress" : "move-up-progress"
            }`}
            value={promedios.promedio_nota4}
            max="10"
          ></progress>
          {showDropdowns && (
            <select
              className={`dropdownNotas ${
                activeStyle ? "active-dropdownNotas" : ""
              }`}
            >
              <option value="" disabled selected>
                Nota
              </option>
              {[...Array(10).keys()].reverse().map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          )}
          <span className="progress-value">{promedios.promedio_nota4}</span>
        </div>

        <div className="progress-item">
          <label
            className={`LabelNota ${activeStyle ? "move-up" : "move-down"}`}
          >
            N° 5:
          </label>
          <progress
            className={`progress-bar ${
              activeStyle ? "move-down-progress" : "move-up-progress"
            }`}
            value={promedios.promedio_nota5}
            max="10"
          ></progress>
          {showDropdowns && (
            <select
              className={`dropdownNotas ${
                activeStyle ? "active-dropdownNotas" : ""
              }`}
            >
              <option value="" disabled selected>
                Nota
              </option>
              {[...Array(10).keys()].reverse().map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          )}
          <span className="progress-value">{promedios.promedio_nota5}</span>
        </div>
      </div>
    </div>
  );
};

export default Notas;
