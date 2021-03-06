import React from 'react';

import attention from '../../images/attention.png';

import './ErrorIndicator.css';

const ErrorIndicator = () => {
  return (
    <div className="card classErrorMessage">
      <div className="card-screen">
        <div className="card-body" style={{ textAlign: 'center' }}>
          <img className="card-img-top" src={attention} style={{ width: 50, margin: '10px auto'}} alt="Error message" />
          <h2 className="card-body-title">Что-то пошло не так.</h2>
          <p className="card-body-text">Перезапустить страницу?</p>
          <button type='button' onClick={() => window.location.reload()} className='btn-err'>Продолжить</button>
        </div>
      </div>
      <div className="shadow1" />
      <div className="shadow2" />
    </div>
  );
}

export default ErrorIndicator;
