/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import M from "materialize-css";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: "Jalol " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
          } else {
            M.toast({
              html: "Siz muvaffiqiyatli maqola qo'shdingiz",
              classes: "#2e7d32 green darken-3",
            });
            history.push("/");
          }
        });
    }
  }, [url]);
  const postDetails = () => {
    if (!body) {
      M.toast({
        html: "Maqola yozishingiz shart",
        classes: "red",
      });
      return;
    }
    if (!title) {
      M.toast({
        html: "Sarlavha kiritishingiz shart",
        classes: "red",
      });
      return;
    }
    if (!img) {
      M.toast({
        html: "pic yozishingiz shart",
        classes: "red",
      });
      return;
    }
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

  return (
    <div className="card cardPost">
      <div className="card-image">
        <img
          alt="image bor"
          src="https://media.istockphoto.com/photos/email-marketing-concept-picture-id1282799241?b=1&k=20&m=1282799241&s=170667a&w=0&h=0MRaTWVvtApyUjK2I4wOMbQSDD0HMSxP-I_O7egPFDQ="
        />
        <span className="card-title">Maqolangizni yarating</span>{" "}
      </div>
      <div className="card-content">
        <div className="input-field col s6">
          <i className="material-icons prefix">subtitles</i>
          <input
            placeholder="Sarlavha"
            type="text"
            className="validate"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">content_paste</i>
          <input
            placeholder="Maqola"
            type="text"
            className="validate"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="file-field input-field">
          <div className="btn">
            <span>
              {" "}
              <i className="material-icons">add</i>
            </span>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              placeholder="Maqola uchun rasmni tanlang"
              type="text"
            />
          </div>
        </div>
        <button onClick={() => postDetails()} className="btn">
          Maqola qo'shish
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
