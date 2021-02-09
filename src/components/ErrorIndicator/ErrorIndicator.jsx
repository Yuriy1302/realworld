import React from "react";

import attention from "../../images/attention.png";
import { removeLocalData } from "../../service/local-service";

import "./ErrorIndicator.css";

const ErrorIndicator = () => {
  return (
    <div className="card classErrorMessage">
      <div className="card-screen">
        <div className="card-body text-position">
          <img className="card-img-top" src={attention} alt="Error message" />
          <h2 className="card-body-title">Что-то пошло не так.</h2>
          <p className="card-body-text">Перезапустить страницу?</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-err"
          >
            Продолжить
          </button>
          <button
            type="button"
            onClick={() => removeLocalData()}
            className="btn-err"
          >
            Перезапустить
          </button>
        </div>
      </div>
      <div className="shadow1" />
      <div className="shadow2" />
    </div>
  );
};

export default ErrorIndicator;
