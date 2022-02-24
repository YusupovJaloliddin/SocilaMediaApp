/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Screens/Home";
import SignIn from "./component/Screens/SignIn";
import Profile from "./component/Screens/Profile";
import CreatePost from "./component/Screens/CreatePost";
import { createContext, useReducer, useContext } from "react";
import { Reducer, initialState } from "./reducer/Reducer";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserProfile from "./component/Screens/UserProfile";
import SubscripUserPost from "./component/Screens/SubscripUserPost";
import AllPost from "./component/Screens/AllPost";
import HomeSideBar from "./component/Screens/HomeSideBar";
import My from "./component/Screens/My";
import Sites from "./component/Screens/Sites";
import Admin from "./component/Screens/Admin";

export const userContext = createContext();
const Routing = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/createpost" component={CreatePost} />
      <Route path="/profile/:userId" component={UserProfile} />
      <Route path="/myfollowerpost" component={SubscripUserPost} />
      <Route path="/allpostrender" component={AllPost} />
      <Route path="/users" component={HomeSideBar} />
      <Route path="/AboutUs" component={My} />
      <Route path="/sites" component={Sites} />
      <Route path="/admin" component={Admin} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </userContext.Provider>
  );
}

export default App;
