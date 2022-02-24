/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import "./Css/Modal.css";
function Modal() {
  const { state, dispatch } = useContext(userContext);

  return (
    <div className="fullcontent">
      <div className="oynaBox">
        <p>Assalamu aleykum.🖐🖐</p>
        <img src={state.pic} alt="avatar" />
        <p className="userName">{state ? state.name : "User"}</p>
        <br />
        <p>Adminga Murojaat qilmoqchi bo'lsangiz tugmani bosing!!!</p>
        <div className="footer">
          <Link className="btn yashil" to="/admin">
            Ok
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;
