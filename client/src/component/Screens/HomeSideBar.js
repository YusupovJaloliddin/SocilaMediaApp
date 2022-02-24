/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Css/HomeSidebar.css";
function HomeSideBar() {
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useContext(userContext);
  // useEffect(() => {
  //   if (users) {
  //     console.log(users.users);
  //   }
  // }, [users]);
  useEffect(() => {
    fetch("/allusers")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        for (let i = 0; i < data.users.length - 1; i++) {
          for (let j = i + 1; j < data.users.length; j++) {
            if (
              data.users[i].followers.length < data.users[j].followers.length
            ) {
              const tempUser = data.users[i];
              data.users[i] = data.users[j];
              data.users[j] = tempUser;
            }
          }
        }
        // let l;
        // if (data.users.length > 6) {
        //   l = 6;
        // } else {
        //   l = data.users.length;
        // }
        // const newData = { users: [] };
        // for (let i = 0; i < l; i++) {
        //   console.log(data.users[i]);
        //   newData.users.push(data.users[i]);
        // }

        setUsers(data);
      })
      .catch((err) => console.log(err));
  });

  // const [post, setPost] = useState([]);
  // useEffect(() => {
  //   fetch("/mypost", {
  //     headers: {
  //       Authorization: "Jalol " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => setPost(result.myPost));
  // }, []);
  return (
    <div className="aaaa">
      {" "}
      <h6 style={{ color: "black", fontFamily: "cursive" }}>Mashxurlar:</h6>
      <ul className="collection ungProfile">
        {users.users !== undefined
          ? users.users.map((item) => {
              return (
                <Link
                  style={{ color: "black" }}
                  to={
                    item._id !== state._id ? `/profile/${item._id}` : "/profile"
                  }
                >
                  <li className="collection-item avatar ">
                    <img src={item.pic} alt="" className="circle" />
                    <span className="title">{item.name}</span>
                    <p>{item.email}</p>
                    <a href="#!" className="secondary-content">
                      <i className="material-icons">grade</i>
                    </a>
                  </li>
                </Link>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default HomeSideBar;
