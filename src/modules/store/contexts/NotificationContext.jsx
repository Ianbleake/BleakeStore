import React, { createContext, useState, useContext } from 'react';


const NotificacionContext = createContext();

export function NotificacionProvider({ children }) {
  const [notificacion, setNotificacion] = useState({
    role: '',
    message: '',
    show: false,
  });

  return (
    <NotificacionContext.Provider value={{ notificacion, setNotificacion }}>
      {children}
    </NotificacionContext.Provider>
  );
}


export function useNotificacion() {
  return useContext(NotificacionContext);
}
