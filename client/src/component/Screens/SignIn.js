/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { userContext } from "../../App";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../Screens/Css/Signin.css";
import M from "materialize-css";
function SignIn() {
  const { state, dispatch } = useContext(userContext);
  const [clicked, setClicked] = useState(false);
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [img, setImg] = useState("");
  const [url, setUrl] = useState(
    "https://res.cloudinary.com/dvngnmkau/image/upload/v1643611942/e6ft1zhh82vocweysnj5.png"
  );

  useEffect(() => {
    if (url) {
      ourFiles();
    }
  }, [url]);

  const logData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        logEmail
      )
    ) {
      M.toast({
        html: "Email manzilingizni to'g'ri kiriting",
        classes: "red",
      });
      return;
    }
    if (logPassword.length < 6) {
      M.toast({
        html: "Parolingiz kamida 6 ta belgili bo'lishi kerak",
        classes: "red",
      });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email: logEmail,
        password: logPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Siz muvaffaqiyatli kirish qildingiz",
            classes: "green",
          });
          history.push("/");
        }
      });
  };
  // const history = useHistory();
  const uploadPicture = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "itjimoiy");
    data.append("cloud_name", "dvngnmkau");
    fetch("https://api.cloudinary.com/v1_1/dvngnmkau/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };
  const ourFiles = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        regEmail
      )
    ) {
      M.toast({
        html: "Email manzilingizni to'g'ri kiriting",
        classes: "red",
      });
      return;
    }
    if (regPassword.length < 6) {
      M.toast({
        html: "Parolingiz kamida 6 ta belgili bo'lishi kerak",
        classes: "red",
      });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red" });
        } else {
          M.toast({ html: data.msg, classes: "green" });
          setClicked(!clicked);
        }
      });
  };

  const postData = () => {
    if (img) {
      uploadPicture();
    } else {
      ourFiles();
    }
  };

  return (
    <>
      <section>
        <div className={clicked ? "container active uzm" : "container uzm"}>
          <div className="user signinBx">
            <div className="imgBx">
              <img
                alt="signin"
                src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643649421/imac-apple-mockup-app-38544_siyifb.jpg"
              />
            </div>
            <div className="formBx">
              <div className="form">
                <h2 style={{ color: "black" }}>Kirish</h2>
                <input
                  type="text"
                  value={logEmail}
                  onChange={(e) => setLogEmail(e.target.value)}
                  name=""
                  placeholder="Email manzilingiz"
                />
                <input
                  type="password"
                  value={logPassword}
                  onChange={(e) => setLogPassword(e.target.value)}
                  name=""
                  placeholder="Parolingiz"
                />
                <button className="btn" onClick={() => logData()}>
                  Profilga kirish
                </button>{" "}
                <p className="signup">
                  Hisobingiz yo'qmi ?
                  {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  }{" "}
                  <a
                    href="#"
                    onClick={() => {
                      setClicked(!clicked);
                    }}
                  >
                    Ro'yxatdan o'tish
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <div className="form">
                <h2 style={{ margin: "0", color: "black" }}>
                  Ro'yxatdan o'tish
                </h2>
                <div className="containers">
                  <img
                    src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643611942/e6ft1zhh82vocweysnj5.png"
                    alt="Avatar"
                    className="images"
                  />
                  <div className="middless">
                    <button
                      className="btn"
                      onClick={() => setIsOpenModal(true)}
                    >
                      <i className="material-icons">add_a_photo</i>
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="ismingiz"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
                <input
                  type="email"
                  name=""
                  placeholder="Email manzilingiz"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Parolingiz"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <button className="btn" onClick={() => postData()}>
                  Ro'yxatdan o'tish
                </button>
                <p className="signup">
                  Hisobingiz bormi ?
                  {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  }{" "}
                  <a
                    href="#"
                    onClick={() => {
                      setClicked(!clicked);
                    }}
                  >
                    {" "}
                    Hisobga kirish{" "}
                  </a>
                </p>
              </div>
            </div>
            <div className="imgBx">
              <img
                alt="img"
                src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643650039/pexels-photo-5082561_o5grsb.jpg"
              />
            </div>
          </div>
          {isOpenModal ? (
            <div className="modalS" onClick={() => setIsOpenModal(false)}>
              <div
                className="modalSContent"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modalHeader">
                  <h4>Add Your Account photo</h4>

                  <i
                    style={{
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => setIsOpenModal(false)}
                    className="small material-icons"
                  >
                    close
                  </i>
                </div>
                <div className="modalContent">
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>
                        {" "}
                        <i className="material-icons">add_a_photo</i>
                      </span>
                      <input
                        type="file"
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input
                        className="file-path validate"
                        type="text"
                        placeholder="Your Photo"
                      />
                    </div>
                  </div>
                </div>
                <div className="modalFooter">
                  <button onClick={() => setIsOpenModal(false)} className="btn">
                    Save Image
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
  // return (
  //   <div classNameName="mycard">
  //     <div classNameName="card card_auth">
  //       <h2>Tarmoq</h2>

  //       <div classNameName="input-field col s6">
  //         <i classNameName="material-icons prefix icon">email</i>
  //         <input id="icon_email" type="text" classNameName="validate" />
  //         <label for="icon_email">Pochta manzilingizni kiriting</label>
  //       </div>
  //       <div classNameName="input-field col s6">
  //         <i classNameName="material-icons prefix icon">vpn_key</i>
  //         <input id="icon_password" type="text" classNameName="validate" />
  //         <label for="icon_password">Parolingizni kiriting</label>
  //       </div>
  //       <button classNameName="waves-effect waves-light btn #00e676 green accent-3">
  //         Kirish
  //       </button>
  //       <p>
  //         <Link to="/signup">Do not have an account?</Link>
  //       </p>
  //     </div>
  //   </div>
  // );
}

export default SignIn;
