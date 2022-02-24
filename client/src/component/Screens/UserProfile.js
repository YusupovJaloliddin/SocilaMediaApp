/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { userContext } from "../../App";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const { state, dispatch } = useContext(userContext);

  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );
  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  });
  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setProfile(data);
        // console.log(data);
        // console.log(profile);
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unFollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Jalol " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setProfile(data);
        // console.log(data);
        // console.log(profile);
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (s) => s !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  return (
    <>
      {profile ? (
        <div className="profile">
          <div className="profileMain">
            <div>
              <img
                className="profileImg"
                src={
                  profile.user
                    ? profile.user.pic
                    : "https://res.cloudinary.com/dvngnmkau/image/upload/v1643639331/cch0cecwrto1lefekb1y.jpg"
                }
                alt="profile"
              />
            </div>
            <div>
              <h4>{profile.user.name}</h4>
              <div className="infoProfile">
                <p>{profile.posts.length} posts </p>
                <p>{profile.user.followers.length} followers</p>
                <p>{profile.user.following.length} following</p>
              </div>
              <div>
                {showFollow ? (
                  <button
                    style={{ marginTop: "10px" }}
                    className="btn"
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    style={{ marginTop: "10px" }}
                    className="btn"
                    onClick={() => unFollowUser()}
                  >
                    Un Follow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="gallery">
            {profile.posts.map((item) => {
              return (
                <div className="img-item">
                  <img src={item.photo} alt={item._id} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default UserProfile;
