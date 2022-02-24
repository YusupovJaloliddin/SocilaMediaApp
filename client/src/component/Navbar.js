/* eslint-disable no-unused-vars */
import { useContext, useRef, useEffect, useState } from "react";
import { userContext } from "../App.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../component/Screens/Css/Navbar.css";
import M from "materialize-css";
export default function Navbar() {
  const { state, dispatch } = useContext(userContext);
  const searchPanel = useRef(null);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [userFind, setUserFind] = useState([]);
  useEffect(() => {
    M.Modal.init(searchPanel.current);
  }, []);

  const renderNav = () => {
    if (state) {
      return [
        <>
          <li key="18">
            <Link to="/users">
              <i
                style={{
                  cursor: "pointer",
                }}
                className="Medium material-icons mashxur"
              >
                group
              </i>
            </Link>
          </li>
          <li key="1">
            <i
              style={{ cursor: "pointer" }}
              data-target="modal1"
              className="Medium material-icons modal-trigger"
            >
              search
            </i>
          </li>
          <li key="11">
            <Link to="/allpostrender">
              <i
                style={{
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "60%",
                }}
                className="Medium material-icons modal-trigger"
              >
                explore
              </i>
            </Link>
          </li>
          <li key="2">
            <Link to="/profile">
              <i className="Medium material-icons">person</i>
            </Link>
          </li>
          <li key="3">
            {" "}
            <Link to="/createpost">
              <i className="Medium material-icons">playlist_add</i>
            </Link>{" "}
          </li>
          <li key="4">
            <Link
              style={{ color: "red" }}
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/signin");
              }}
              className="Medium material-icons"
              to="/signin"
            >
              <i className="Medium material-icons">exit_to_app</i>
            </Link>{" "}
          </li>
        </>,
      ];
    } else {
      return [
        <li key="5">
          {" "}
          <Link to="/signin">
            <i className="Medium material-icons">input</i>
          </Link>{" "}
        </li>,
      ];
    }
  };
  const searchUser = (query) => {
    setSearch(query);
    fetch("/searchuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserFind(data.user);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="navBar">
        <div className="navigationBar">
          <div className="mainPage">
            <Link to="/sites">
              <i className="Medium material-icons orqa">keyboard_backspace</i>
            </Link>

            <Link to="/AboutUs">
              <i className="Medium material-icons">assignment_ind</i>
            </Link>
            <Link to={state ? "/" : "/signin"}>
              <i className="Medium material-icons">home</i>
            </Link>
          </div>
          <div className="navLink">
            <ul key="6">{renderNav()}</ul>
          </div>
        </div>
        <div id="modal1" className="modal" ref={searchPanel}>
          <div className="modal-content">
            <div className="input-field col s6">
              <i className="Medium material-icons prefix">search</i>
              <input
                value={search}
                id="icon_prefix"
                type="text"
                className="validate"
                onChange={(e) => searchUser(e.target.value)}
              />
              <label htmlFor="icon_prefix">Search...</label>
            </div>
            <div>
              <ul className="collection">
                {userFind.map((item) => (
                  <Link
                    style={{ color: "black" }}
                    to={
                      item._id !== state._id
                        ? "/profile/" + item._id
                        : "/profile"
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchPanel.current).close();
                      setSearch("");
                      setUserFind([]);
                    }}
                  >
                    <li className="collection-item avatar">
                      <img src={item.pic} alt="" className="circle" />
                      <span className="title">
                        <p
                          style={{ display: "inline-block", fontSize: "15px" }}
                        >
                          {item.name}
                        </p>{" "}
                        <br />
                        <p
                          style={{ display: "inline-block", fontSize: "15px" }}
                        >
                          {item.email}
                        </p>
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect  btn"
              onClick={() => {
                setSearch("");
                setUserFind([]);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10vh" }}></div>
    </div>
    // <nav
    //   className="#424242 grey darken-3 navbar-fixed"
    //   style={{ height: "10vh" }}
    // >
    //   <div className="nav-wrapper container #424242 grey darken-3">
    //     <Link to={state ? "/" : "/signin"} className="brand-logo">
    //       SammiGram
    //     </Link>
    //     <ul id="nav-mobile" className="right hide-on-med-and-down">
    //       {renderNav()}
    //     </ul>
    //   </div>
    // </nav>
  );
}
