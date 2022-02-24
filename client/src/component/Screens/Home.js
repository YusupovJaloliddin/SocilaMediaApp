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
import Sites from "./Sites";
import Modal from "./Modal";

function Home() {
  const [div, setdiv] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setdiv(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [setdiv]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setdiv(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
    };
  }, [setdiv]);
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [showComment, setShowComments] = useState(false);
  useEffect(() => {
    fetch("/allpost", {
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
        const newData = data.filter((s) => s._id !== result._id);
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
      {div && <Modal />}
      {data.length ? (
        <div className="home">
          <div className="post_items">
            <div className="left_left">
              <Sites />
            </div>
            <div className="left_side">
              <h6 style={{ color: "black", fontFamily: "cursive" }}>
                Maqolalar
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
                      <img
                        src={item.postedBy.pic}
                        alt=""
                        className="imgProfile"
                      />
                      <p
                        style={{ display: "inline-block" }}
                        className="card-title postedBy"
                      >
                        {item.postedBy.name}
                      </p>
                    </Link>
                    <div className="card-image">
                      <img src={item.photo} alt={item._id} />
                    </div>
                    <div className="card-content">
                      <p
                        style={{
                          display: "inline-block",
                          float: "right",
                          // margin: "10px",
                        }}
                      >
                        <p
                          style={{
                            display: "inline-block",
                          }}
                        >
                          {dateFromObjectId(item._id).getDate() < 10
                            ? "0" + dateFromObjectId(item._id).getDate()
                            : dateFromObjectId(item._id).getDate()}
                          /
                          {dateFromObjectId(item._id).getMonth() + 1 < 10
                            ? "0" + (dateFromObjectId(item._id).getMonth() + 1)
                            : dateFromObjectId(item._id).getMonth() + 1}
                          /{dateFromObjectId(item._id).getFullYear()}
                          <br />
                          <hr />
                          {dateFromObjectId(item._id).getHours() < 10
                            ? "0" + dateFromObjectId(item._id).getHours()
                            : dateFromObjectId(item._id).getHours()}
                          :
                          {dateFromObjectId(item._id).getMinutes() < 10
                            ? "0" + dateFromObjectId(item._id).getMinutes()
                            : dateFromObjectId(item._id).getMinutes()}
                        </p>
                      </p>
                      <b
                        className="material-icons"
                        style={{ float: "right", marginRight: "5px" }}
                      >
                        access_time
                      </b>
                      {item.likes.includes(state._id) ? (
                        <i
                          className="material-icons"
                          style={{ color: "red" }}
                          onClick={() => unlikePost(item._id)}
                        >
                          favorite
                        </i>
                      ) : (
                        <i
                          className="material-icons"
                          onClick={() => likePost(item._id)}
                        >
                          favorite_border
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
                      <br />
                      <p style={{ display: "inline-block" }}>likes</p>
                      <p
                        style={{
                          display: "inline-block",
                          color: "red",
                          width: "25px",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        {item.likes.length}
                      </p>
                      <h5 style={{ margin: 0 }}>{item.title}</h5>
                      <p> {item.body}</p>
                      {showComment ? (
                        item.comments.map((s) => (
                          <p
                            key={s._id}
                            style={{
                              border: "1px solid blue",
                              marginTop: "5px",
                              overflowY: "hidden",
                              scrollbarWidth: "none",
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

export default Home;
