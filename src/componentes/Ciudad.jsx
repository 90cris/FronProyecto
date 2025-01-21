import React, { useState } from 'react';
import "../estilos/Local.css";

export const Ciudad = ({ onCitySelect }) => {
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const zonas = {
    norte: [
      { region: 'Arica y Parinacota', ciudades: ['Arica', 'Putre', 'Camarones'] },
      { region: 'Tarapacá', ciudades: ['Iquique', 'Alto Hospicio', 'Pozo Almonte'] },
      { region: 'Antofagasta', ciudades: ['Antofagasta', 'Calama', 'Tocopilla'] },
      { region: 'Atacama', ciudades: ['Copiapó', 'Vallenar', 'Chañaral'] },
      { region: 'Coquimbo', ciudades: ['La Serena', 'Coquimbo', 'Ovalle'] }
    ],
    central: [
      { region: 'Valparaíso', ciudades: ['Valparaíso', 'Viña del Mar', 'Concón'] },
      { region: 'Metropolitana de Santiago', ciudades: ['Santiago', 'Maipú', 'Providencia','Las Condes','Vitacura','Peñalolén','La Reina','Lo Barnechea','San Jose de Maipo', 'Recoleta', 'La Florida', 'Ñuñoa','Macul'] },
      { region: 'O’Higgins', ciudades: ['Rancagua', 'Machalí', 'San Fernando'] },
      { region: 'Maule', ciudades: ['Talca', 'Curicó', 'Linares'] },
      { region: 'Ñuble', ciudades: ['Chillán', 'San Carlos', 'Los Ángeles'] }
    ],
    sur: [
      { region: 'Biobío', ciudades: ['Concepción', 'Los Ángeles', 'Chillán'] },
      { region: 'La Araucanía', ciudades: ['Temuco', 'Villarrica', 'Pucón'] },
      { region: 'Los Ríos', ciudades: ['Valdivia', 'La Unión', 'Mariquina'] },
      { region: 'Los Lagos', ciudades: ['Puerto Montt', 'Osorno', 'Frutillar'] },
      { region: 'Aysén', ciudades: ['Coyhaique', 'Puerto Aysén', 'Chile Chico'] },
      { region: 'Magallanes', ciudades: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] }
    ]
  };

  const handleZoneChange = (e) => {
    const zone = e.target.value;
    setSelectedZone(zone);
    setSelectedRegion('');
    setSelectedCity('');
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (onCitySelect) onCitySelect(city);
  };


  const regions = selectedZone ? zonas[selectedZone] : [];
  const cities =
    selectedRegion &&
    regions.find((regionObj) => regionObj.region === selectedRegion)?.ciudades;

  return (
    <div>
    <h2 className="localizacion-title">Ingresa tu Ciudad</h2>
    <div className="cont_dropdown">
      <div className="chx_dropdown" >
        <label htmlFor="zona" className="dropdown-label">Zona:   </label>
        <select
          id="zona"
          value={selectedZone}
          onChange={handleZoneChange}
          className="dropdown-select"
        >
          <option value="" disabled>Seleccione una zona</option>
          <option value="norte">Zona Norte</option>
          <option value="central">Zona Central</option>
          <option value="sur">Zona Sur</option>
        </select>
      </div>

      {regions.length > 0 && (
        <div className="chx_dropdown">
          <label htmlFor="region" className="dropdown-label">Región: </label>
          <select
            id="region"
            value={selectedRegion}
            onChange={handleRegionChange}
            className="dropdown-select"
          >
       <option value="" disabled>Seleccione una región</option>
              {regions.map((regionObj, index) => (
                <option key={index} value={regionObj.region}>
                  {regionObj.region}
                </option>
            ))}
          </select>
        </div>
      )}

      {cities && (
        <div className="chx_dropdown">
          <label htmlFor="ciudad" className="dropdown-label">Ciudad:</label>
          <select
            id="ciudad"
            value={selectedCity}
            onChange={handleCityChange}
            className="dropdown-select"
          >
            <option value="" disabled>Seleccione una ciudad</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  </div>
  );
};
