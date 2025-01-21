import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

const Tabla = (nota1) => {
  return (
    <div>
        <p></p>
    <ProgressBar 
    variant="success"
    animated 
    now={nota1} />
    </div>
  )
}

export default Tabla