import React from "react";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="mycard">
      <div className="card card_auth">
        <h2>Tarmoq</h2>
        <div className="input-field col s6">
          <i className="material-icons prefix icon">person</i>
          <input id="icon_name" type="text" className="validate" />
          <label for="icon_name">Ismingizni kiriting</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix icon">email</i>
          <input id="icon_email" type="text" className="validate" />
          <label for="icon_email">Pochta manzilingizni kiriting</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix icon">vpn_key</i>
          <input id="icon_password" type="text" className="validate" />
          <label for="icon_password">Parolingizni kiriting</label>
        </div>
        <button className="waves-effect waves-light btn #00e676 green accent-3">
          Kirish
        </button>
        <p>
          <Link to="/signin">Already have account?</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
