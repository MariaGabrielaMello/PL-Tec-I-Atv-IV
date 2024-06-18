import React from 'react';
import logo from './assets/img/pllogo.png'; 

const MeuComponente = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={logo} alt="Logotipo do Projeto" />
    </div>
  );
};

export default MeuComponente;