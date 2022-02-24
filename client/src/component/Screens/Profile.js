/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { userContext } from "../../App";
import { useContext } from "react";
import NotFound from "./NotFound";
import M from "materialize-css";
import { Link } from "react-router-dom";
function Profile() {
  const [post, setPost] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [img, setImg] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [myName, setMyName] = useState("");
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setPost(result.myPost));
  }, []);

  useEffect(() => {
    if (img) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "itjimoiy");
      data.append("cloud_name", "dvngnmkau");
      fetch("https://api.cloudinary.com/v1_1/dvngnmkau/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Jalol " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: data.piv })
              );
              dispatch({ type: "UPDATEPIC", payload: data.pic });
            });
        })
        .catch((err) => console.log(err));
    }
  }, [img]);
  const updatePhoto = (file) => {
    setImg(file);
  };
  const editProfile = () => {
    if (myName) {
      fetch("/editname", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Jalol " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          myName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, name: data.name })
          );
          dispatch({ type: "UPDATEPROFILE", payload: data.name });
          M.toast({
            html: "Your was changed succesfully",
            classes: "green",
          });
        });
    }

    setIsEdit(false);
  };

  return (
    <div className="profile">
      <div className="profileMain">
        <div>
          {/* <img
            className="profileImg"
            src={state ? state.pic : "loading"}
            alt="profile"
          /> */}
          <div className="containers">
            <img
              className="profileImg"
              src={
                state
                  ? state.pic
                  : "https://res.cloudinary.com/dvngnmkau/image/upload/v1643611942/e6ft1zhh82vocweysnj5.png"
              }
              alt="Avatarrrr"
              // className="images"
            />
            {console.log(state)}
            <div className="middles">
              <button className="btn" onClick={() => setIsOpenModal(true)}>
                <i className="material-icons">add_a_photo</i>
              </button>
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
                          onChange={(e) => updatePhoto(e.target.files[0])}
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
                    <button
                      onClick={() => setIsOpenModal(false)}
                      className="btn"
                    >
                      Save Image
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <div className="profileName">
            <h4>{state ? state.name : "User"}</h4>
            <button className="btn" onClick={() => setIsEdit(true)}>
              <i className="material-icons">settings</i>
            </button>
          </div>
          <div className="infoProfile">
            <p>{post.length} Posts</p>
            <p>{state ? state.followers.length : "0"} Followers</p>
            <p>{state ? state.following.length : "0"} Following</p>
          </div>
          <Link to="/myfollowerpost">
            <button className="btn" style={{ margin: "10px 13px" }}>
              Show My Following Users Posts
            </button>
          </Link>
        </div>
      </div>

      <>
        {!post.length ? (
          <NotFound />
        ) : (
          <div className="gallery">
            {post.map((item) => {
              return (
                <div className="img-item">
                  <img src={item.photo} alt={item._id} />
                </div>
              );
            })}{" "}
          </div>
        )}
      </>
      {isOpenModal ? (
        <div className="modalS" onClick={() => setIsOpenModal(false)}>
          <div className="modalSContent" onClick={(e) => e.stopPropagation()}>
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
                    onChange={(e) => updatePhoto(e.target.files[0])}
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

      {isEdit ? (
        <div className="modalS" onClick={() => setIsEdit(false)}>
          <div className="modalSContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h4>Change Account Profile</h4>

              <i
                style={{
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => setIsEdit(false)}
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
                    onChange={(e) => updatePhoto(e.target.files[0])}
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
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  onChange={(e) => setMyName(e.target.value)}
                  type="text"
                  className="validate"
                  placeholder="Ismingizni kiriting"
                />
              </div>
            </div>

            <div className="modalFooter">
              <button onClick={() => editProfile()} className="btn">
                Save Image
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
