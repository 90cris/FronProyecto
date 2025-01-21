import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContextCliente = createContext();

export const UserProvider = ({ children }) => {


 

  return (
    <UserContextCliente.Provider
      value={{
       
      }}
    >
      {children}
    </UserContextCliente.Provider>
  );
};
