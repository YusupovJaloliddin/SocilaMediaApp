/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./Css/Admin.css";
import { userContext } from "../../App";

function Admin() {
  const { state, dispatch } = useContext(userContext);

  return (
    <div className="Container">
      <div className="leftBox">
        <img
          src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643756071/LogoSample_ByTailorBrands_snko2x.png"
          alt="Loading..."
        />
      </div>
      <div className="rightBox">
        <div className="topBox">
          <p>
            Assalamu aleykum {state ? <b>{state.name}</b> : <b>User</b>} fikr
            mulohazalaringizni adminga yozib qoldirishingiz mumkin.
          </p>
        </div>
        <div className="beetwenBox">3</div>
        <div className="input">
          <form
          // onSubmit={(e) => {
          //   e.preventDefault();

          //   if (e.target[0].value) {
          //     commentPost(e.target[0].value, number._id);
          //     e.target[0].value = "";
          //   } else {
          //     M.toast({
          //       html: "Comment yozmaysizmi ?",
          //       classes: "red",
          //     });
          //     return;
          //   }
          // }}
          >
            <input type="text" placeholder="Add A Comment" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
