/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./Css/Home.css";
import HomeSideBar from "./HomeSideBar";
import { userContext } from "../../App";
import M from "materialize-css";
import { Link } from "react-router-dom";
import Loader from "./Loader";
function SubscripUserPost() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [showComment, setShowComments] = useState(false);
  useEffect(() => {
    fetch("/getsubspost", {
      headers: {
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.posts.reverse());
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((natija) => {
        const newData = data.map((item) => {
          if (item._id === natija._id) {
            return natija;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  let dateFromObjectId = function (objectId) {
    const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    return date;
  };
  const commentPost = (text, postId) => {
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter(
          (s) => s._id.toString() !== result._id.toString()
        );
        setData(newData);
        M.toast({
          html: "O'chirildi tanlagan postingiz",
          classes: "red",
        });
        return;
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {data.length ? (
        <div className="home">
          <div className="post_items">
            <div className="left_left">
              <div className="a">
                <span>
                  {" "}
                  <img
                    src="https://media.istockphoto.com/vectors/vectot-weather-widget-for-smartphone-vector-id475696742?k=20&m=475696742&s=612x612&w=0&h=UD0dyd1VRDkBtI2EvsKNpyB79aNTbE0fCcQXYoO_kAA="
                    alt="salom"
                  />
                </span>
                <span className="name">
                  <b style={{ textAlign: "center" }}>Ob-Havo</b>
                  <p>Ob-havo Saytimizga tashrif buyiring</p>

                  <a
                    target="_blank"
                    href="https://weather-app-javascript4633.netlify.app/"
                    rel="noreferrer"
                  >
                    <button
                      className="btn"
                      style={{
                        marginTop: "10px",
                        marginLeft: "30px",
                        marginBottom: "10px",
                      }}
                    >
                      Kirish
                    </button>
                  </a>
                  <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
                </span>
              </div>
              <div className="a">
                <span>
                  {" "}
                  <img
                    src="https://static.wikia.nocookie.net/72d921e0-fe44-424b-9c3c-b542b70d4e51/scale-to-width/755"
                    alt="salom"
                  />
                </span>
                <span className="name">
                  <b style={{ textAlign: "center" }}>Snake Game</b>
                  <p>Snake game o'yini uchun bu yerga kiring</p>
                  <a
                    target="_blank"
                    href="https://snakegame-javascirpt-jaloliddin4633.netlify.app"
                    rel="noreferrer"
                  >
                    <button
                      className="btn"
                      style={{
                        marginTop: "10px",
                        marginLeft: "30px",
                        marginBottom: "10px",
                      }}
                    >
                      Kirish
                    </button>
                  </a>
                  <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
                </span>
              </div>
              <div className="a">
                <span>
                  {" "}
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="salom"
                  />
                </span>
                <span className="name">
                  <b style={{ textAlign: "center" }}>Online Calculator</b>
                  <p>Hisob kitobli ishlar uchun bu yerga kiring</p>
                  <a
                    target="_blank"
                    href="https://calculator4633.netlify.app"
                    rel="noreferrer"
                  >
                    <button
                      className="btn"
                      style={{
                        marginTop: "10px",
                        marginLeft: "30px",
                        marginBottom: "10px",
                      }}
                    >
                      Kirish
                    </button>
                  </a>
                  <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
                </span>
              </div>
            </div>
            <div className="left_side">
              <h6 style={{ color: "black", fontFamily: "cursive" }}>
                My Following Users Posts
              </h6>
              {data.map((item) => {
                return (
                  <div className="card" key={item._id}>
                    <Link
                      to={
                        item.postedBy._id !== state._id
                          ? `/profile/${item.postedBy._id}`
                          : "/profile"
                      }
                    >
                      <p
                        style={{ display: "inline-block" }}
                        className="card-title postedBy"
                      >
                        {item.postedBy.name}
                      </p>
                    </Link>
                    <p
                      style={{
                        display: "inline-block",
                        float: "right",
                        margin: "10px",
                      }}
                    >
                      <b>Soat -</b>{" "}
                      <p style={{ display: "inline-block" }}>
                        {dateFromObjectId(item._id).getHours() < 10
                          ? "0" + dateFromObjectId(item._id).getHours()
                          : dateFromObjectId(item._id).getHours()}
                        :
                        {dateFromObjectId(item._id).getMinutes() < 10
                          ? "0" + dateFromObjectId(item._id).getMinutes()
                          : dateFromObjectId(item._id).getMinutes()}
                        :
                        {dateFromObjectId(item._id).getSeconds() < 10
                          ? "0" + dateFromObjectId(item._id).getSeconds()
                          : dateFromObjectId(item._id).getSeconds()}
                      </p>
                    </p>
                    <div className="card-image">
                      <img src={item.photo} alt={item._id} />
                    </div>
                    <div className="card-content">
                      {item.likes.includes(state._id) ? (
                        <i
                          className="material-icons"
                          style={{
                            color: "green",
                          }}
                          onClick={() => unlikePost(item._id)}
                        >
                          thumb_down
                        </i>
                      ) : (
                        <i
                          className="material-icons"
                          style={{ color: "red" }}
                          onClick={() => likePost(item._id)}
                        >
                          thumb_up
                        </i>
                      )}
                      <button
                        onClick={() => setShowComments(!showComment)}
                        style={{
                          marginLeft: "10px",
                          color: "yellow",
                          border: "none",
                          outline: "none",
                          backgroundColor: "white",
                        }}
                        className="material-icons"
                      >
                        comment
                      </button>{" "}
                      <a href="#delete">
                        {item.postedBy._id === state._id ? (
                          <i
                            onClick={() => deletePost(item._id)}
                            className="material-icons"
                          >
                            delete_forever
                          </i>
                        ) : null}
                      </a>
                      <p style={{ display: "inline-block", float: "right" }}>
                        likes
                      </p>
                      <p
                        style={{
                          display: "inline-block",
                          marginLeft: "40px",
                          float: "right",
                          borderRadius: "50%",
                          backgroundColor: "red",
                          color: "white",
                          width: "25px",
                          textAlign: "center",
                        }}
                      >
                        {item.likes.length}
                      </p>
                      <h4 style={{ margin: 0 }}>Sarlavha: {item.title}</h4>
                      <p>Maqola: {item.body}</p>
                      {showComment ? (
                        item.comments.map((s) => (
                          <p
                            key={s._id}
                            style={{
                              border: "1px solid blue",
                              marginTop: "5px",
                              overflowY: "hidden",
                              // overflowX: "scroll",
                              scrollbarWidth: "none",
                              // width: "80%",
                            }}
                          >
                            <b>{s.postedBy.name} : </b>
                            {s.text}
                          </p>
                        ))
                      ) : (
                        <p style={{ opacity: "0.6" }}>
                          Comments: {item.comments.length}
                        </p>
                      )}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (e.target[0].value) {
                            commentPost(e.target[0].value, item._id);
                            e.target[0].value = "";
                          } else {
                            M.toast({
                              html: "Comment yozmaysizmi ?",
                              classes: "red",
                            });
                            return;
                          }
                        }}
                      >
                        <input type="text" placeholder="Add A Comment" />
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="right_side">
              <HomeSideBar />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default SubscripUserPost;
