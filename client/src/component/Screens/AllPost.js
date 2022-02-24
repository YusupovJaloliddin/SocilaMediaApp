/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Css/AllPost.css";
import Loader from "./Loader";
import { userContext } from "../../App";
import M from "materialize-css";

function AllPost() {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [number, setNumber] = useState("");
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((dataa) => {
        for (let i = 0; i < dataa.posts.length - 1; i++) {
          for (let j = i + 1; j < dataa.posts.length; j++) {
            if (dataa.posts[i].likes.length < dataa.posts[j].likes.length) {
              const tempPost = dataa.posts[i];
              dataa.posts[i] = dataa.posts[j];
              dataa.posts[j] = tempPost;
            }
          }
        }
        // console.log(dataa.posts);
        setData(dataa.posts);
      });
  }, []);
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
        setNumber(result);
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
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
        setNumber(natija);
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
        console.log(number);
        setNumber(result);

        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {" "}
      {data.length ? (
        <div className="container">
          <div className="box">
            {data.map((item) => (
              <div className="post">
                <img
                  src={item.photo}
                  className="a"
                  alt=""
                  onClick={() => {
                    setIsEdit(true);
                    setNumber(item);
                  }}
                />{" "}
                <div className="Centerboxx">
                  <i>{item.likes.length}</i>
                  <i className="material-icons">favorite</i>
                </div>
              </div>
            ))}
          </div>
          {isEdit ? (
            <div className="modalSS" onClick={() => setIsEdit(false)}>
              <div className="yopish">
                <i className="medium material-icons">close</i>
              </div>
              <div
                className="modalSSContent"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="box1">
                  <img
                    className="b"
                    key={number._id}
                    src={number.photo}
                    alt="Img"
                  />
                </div>
                <div className="box1">
                  <Link
                    to={
                      number.postedBy._id !== state._id
                        ? `/profile/${number.postedBy._id}`
                        : "/profile"
                    }
                  >
                    <div className="profileInfor">
                      <img
                        className="q"
                        key={number._id}
                        src={number.postedBy.pic}
                        alt=""
                      />
                      <b className="p" style={{ color: "black" }}>
                        {" "}
                        {number.postedBy.name}
                      </b>
                      {/* <p
                        style={{
                          display: "inline-block",
                          float: "left",
                          marginTop: "2vh",
                          marginLeft: "15vh",
                          color: "black",
                        }}
                      >
                        {number.title}
                      </p> */}
                    </div>{" "}
                  </Link>

                  <div className="commentUser">
                    <ul>
                      {number.comments.length ? (
                        number.comments.map((item) => {
                          console.log(number, "---------------------------");
                          return (
                            <li>
                              {" "}
                              <Link
                                style={{ color: "black" }}
                                to={
                                  item.postedBy._id !== state._id
                                    ? `/profile/${item.postedBy._id}`
                                    : "/profile"
                                }
                              >
                                <img
                                  className="q"
                                  src={item.postedBy.pic}
                                  alt=""
                                />
                                <b className="p">{item.postedBy.name}</b>{" "}
                              </Link>
                              <p>{item.text}</p>{" "}
                            </li>
                          );
                        })
                      ) : (
                        <div>
                          <p>Ushbu Postda Hech Qanday Izoh Yo'q</p>
                          <img
                            className="notFound"
                            src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
                            alt=""
                          />
                        </div>
                      )}
                    </ul>
                  </div>
                  <div className="footerBox">
                    <div className="topBox">
                      {number.likes.includes(state._id) ? (
                        <i
                          className="material-icons"
                          style={{ color: "red" }}
                          onClick={() => unlikePost(number._id)}
                        >
                          favorite
                        </i>
                      ) : (
                        <i
                          className="material-icons"
                          onClick={() => likePost(number._id)}
                        >
                          favorite_border
                        </i>
                      )}
                      Likes: {number.likes.length}
                      <p>
                        <i className="material-icons">access_time</i>
                        {dateFromObjectId(number._id).getDate() < 10
                          ? "0" + dateFromObjectId(number._id).getDate()
                          : dateFromObjectId(number._id).getDate()}
                        /
                        {dateFromObjectId(number._id).getMonth() + 1 < 10
                          ? "0" + (dateFromObjectId(number._id).getMonth() + 1)
                          : dateFromObjectId(number._id).getMonth() + 1}
                        /{dateFromObjectId(number._id).getFullYear()}
                        <br />
                        <hr />
                        {dateFromObjectId(number._id).getHours() < 10
                          ? "0" + dateFromObjectId(number._id).getHours()
                          : dateFromObjectId(number._id).getHours()}
                        :
                        {dateFromObjectId(number._id).getMinutes() < 10
                          ? "0" + dateFromObjectId(number._id).getMinutes()
                          : dateFromObjectId(number._id).getMinutes()}
                      </p>
                    </div>
                    <div className="input">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();

                          if (e.target[0].value) {
                            commentPost(e.target[0].value, number._id);
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
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default AllPost;
