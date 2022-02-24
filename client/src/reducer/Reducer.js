export const initialState = null;

export const Reducer = (state, action) => {
  if (action.type === "USER") {
    if ("following" in action.payload && "followers" in action.payload) {
      console.log("2");

      return { ...action.payload };
    } else if ("followers" in action.payload) {
      console.log("4");

      return { ...action.payload, following: [] };
    } else if ("following" in action.payload) {
      console.log("3");

      return { ...action.payload, followers: [] };
    } else {
      console.log("1");
      return { ...action.payload, followers: [], following: [] };
    }
  }
  if (action.type === "CLEAR") {
    return null;
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  }
  if (action.type === "UPDATEPIC") {
    return {
      ...state,
      pic: action.payload,
    };
  }
  if (action.type === "UPDATEPROFILE") {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
};
