import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Cards } from "./componentes/Cards";
import { Localizacion } from "./componentes/Localizacion";
import Navbar from "./componentes/Navbar";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { Arriendos } from "./pages/Arriendos";
import { Home } from "./pages/Home";
import NotFound from "./componentes/NotFound";
import { Card } from "./pages/Card";
import { UserProvider } from "./context/UserContext";
import { Comentarios } from "./componentes/Comentarios";
import BubbleEffect from "./componentes/BubbleEffect ";
import { CambiarCiudad } from "./pages/CambiarCiudad";
import Usuario from "./componentes/Usuario";
import { Footer } from "./componentes/Footer";
import "./App.css";
import { ConsejosUsuarios } from "./pages/ConsejosUsuarios";
import { LoginCliente } from "./componentes/LoginCliente";
import { RegistroCliente } from "./pages/RegistroCliente";
import { NavbLogin } from "./componentes/NavbLogin";
import { NavbRegitro } from "./componentes/NavbRegitro";

function App() {
  return (
    <>
      <div className="contenedor">
        <UserProvider>
          <BrowserRouter>
            <BubbleEffect />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/Login" element={<NavbLogin />}>
              <Route index element={<LoginCliente />} />
              <Route path="clienteLogin" element={<LoginCliente />} />
              <Route path="usuarioLogin" element={<Login />} />
              </Route>

              <Route path="/registro" element={<NavbRegitro />}>
                <Route index element={<RegistroCliente />} />
                <Route path="cliente" element={<RegistroCliente />} />
                <Route path="usuario" element={<Registro />} />
              </Route>
              <Route path="/Cards" element={<Cards />} />
              <Route path="/Card" element={<Card />} />
              <Route path="/CambiarCiudad" element={<CambiarCiudad />} />
              <Route path="/ConsejosUsuarios" element={<ConsejosUsuarios />} />
              <Route path="/Arriendos" element={<Arriendos />} />
              <Route path="/Comentarios" element={<Comentarios />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
