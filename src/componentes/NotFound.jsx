import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page-wrap d-flex flex-row align-items-center" style={{ height: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">The page you are looking for was not found.</div>
          <Link to="/" type="submit" className="zone-button">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
