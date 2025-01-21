import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const Admin = ({isAllow, redirecTo='/', children}) => {

!isAllow ?  (
  <Navigate to={redirecTo}
  replace/>

): null;

return children ? children: <Outlet/>;

}
