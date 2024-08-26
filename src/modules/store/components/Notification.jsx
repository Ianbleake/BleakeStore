import React from 'react';
import { useNotificacion } from '../../../contexts/NotificationContext';
import Alert from '../../../assets/Alert.svg';
import Success from '../../../assets/Success.svg';
import Warning from '../../../assets/Warning.svg';

function Notificacion() {
  const { notificacion } = useNotificacion();

  if (!notificacion.show) return null;

  const { role, message } = notificacion;

  if (role === 'success') {
    return(
      <div className="notification success">
        <div className="success__icon">
          <img src={Success} alt="Success icon" />
        </div>
        <div className="success__title">{message}</div>
      </div>
    );
    
  } else if (role === 'error') {
    return(
      <div className="notification error">
        <div className="error__icon">
          <img src={Alert} alt="Error icon" />
        </div>
        <div className="error__title">{message}</div>
      </div>
    );
    
  } else if (role === 'warning'){
    return(
      <div className="notification warning">
        <div className="warning__icon">
          <img src={Warning} alt="Warning icon" />
        </div>
        <div className="warning__title">{message}</div>
      </div>
    );

  } else {
    return (
      <div className="notification info">
        <div className="info__icon">
          <img src={Alert} alt="Info icon" />
        </div>
        <div className="info__title">{message}</div>
      </div>
    );
  }
}

export default Notificacion;
