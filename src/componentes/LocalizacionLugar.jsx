import React, { useState, useContext } from 'react';
import "../estilos/Local.css";
import { zonas } from '../helpers/zonas';
import { UserContext } from "../context/UserContext";

export const LocalizacionLugar = () => {
     const { setSelectedCity } = useContext(UserContext); // Acceso al contexto para actualizar la ciudad globalmente
      const [activeZone, setActiveZone] = useState(''); // Zona activa (norte, central, sur)
      const [selectedNorthRegion, setSelectedNorthRegion] = useState('');
      const [selectedCentralRegion, setSelectedCentralRegion] = useState('');
      const [selectedSouthRegion, setSelectedSouthRegion] = useState('');
      const [selectedCity, setSelectedCityLocal] = useState(''); // Estado local para la ciudad seleccionada
    
      const handleZoneSelect = (zone) => {
        setActiveZone(zone);
        setSelectedNorthRegion('');
        setSelectedCentralRegion('');
        setSelectedSouthRegion('');
        setSelectedCityLocal('');
      };
    
      const handleCitySelect = (city) => {
        setSelectedCityLocal(city); // Actualizar la ciudad en el estado local
        setSelectedCity(city); // Actualizar la ciudad en el contexto global
      };
    
      const getRegionsAndCities = () => {
        if (activeZone === 'norte') return zonas.norte;
        if (activeZone === 'central') return zonas.central;
        if (activeZone === 'sur') return zonas.sur;
        return [];
      };
    
      const getCities = (region) => {
        const zoneRegions = getRegionsAndCities();
        const selectedRegion = zoneRegions.find((r) => r.region === region);
        return selectedRegion ? selectedRegion.ciudades : [];
      };
    
      const activeRegions = getRegionsAndCities();
    
  return (
    <div className="dropdown-container">
    <div className="zone-buttons">
      <button
        className={`zone-button ${activeZone === "norte" ? "active" : ""}`}
        onClick={() => handleZoneSelect("norte")}
      >
        Zona Norte
      </button>
      <button
        className={`zone-button ${activeZone === "central" ? "active" : ""}`}
        onClick={() => handleZoneSelect("central")}
      >
        Zona Central
      </button>
      <button
        className={`zone-button ${activeZone === "sur" ? "active" : ""}`}
        onClick={() => handleZoneSelect("sur")}
      >
        Zona Sur
      </button>
    </div>

    {activeZone && (
      <div className="dropdown">
        <select
          value={
            activeZone === "norte"
              ? selectedNorthRegion
              : activeZone === "central"
              ? selectedCentralRegion
              : selectedSouthRegion
          }
          onChange={(e) =>
            activeZone === "norte"
              ? setSelectedNorthRegion(e.target.value)
              : activeZone === "central"
              ? setSelectedCentralRegion(e.target.value)
              : setSelectedSouthRegion(e.target.value)
          }
          className="dropdown-select"
        >
          <option value="" disabled>
            {`Elige una región del ${activeZone}`}
          </option>
          {activeRegions.map((regionObj, index) => (
            <option key={index} value={regionObj.region}>
              {regionObj.region}
            </option>
          ))}
        </select>
      </div>
    )}

    {(selectedNorthRegion || selectedCentralRegion || selectedSouthRegion) && (
      <div className="city-buttons">
        {getCities(
          selectedNorthRegion || selectedCentralRegion || selectedSouthRegion
        ).map((city, index) => (
          <button
            key={index}
            className={`city-button ${selectedCity === city ? "active" : ""}`}
            onClick={() => handleCitySelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    )}
  </div>
  )
}
