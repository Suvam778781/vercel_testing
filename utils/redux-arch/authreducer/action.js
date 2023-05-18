import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "./actiontype";

// Login Action
export const login = ({email, password, userType}) => {
  return async (dispatch) => {
    try {
      // Dispatch login request action
      dispatch({ type: LOGIN_REQUEST });
      // Make API request to login
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${userType}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if login was successful
      if (!response.error) {
        const data = await response.json();
     localStorage.setItem("details",JSON.stringify(data))
     console.log(data)
     alert(data.error||data.message)
        // Dispatch login success action with user data
        dispatch({ type: LOGIN_SUCCESS, payload: data });
      } else {
        // Handle login failure
        dispatch({ type: LOGIN_FAILURE, error: "Login failed" });
      }
    } catch (error) {
      // Handle error
      dispatch({ type: LOGIN_FAILURE, error: "An error occurred" });
    }
  };
};

// Register Action
export const register = ({ email, password, firstname, lastname }) => {
  return async (dispatch) => {
    try {
      // Dispatch register request action
      console.log(email, password, firstname, lastname, "data");
      dispatch({ type: REGISTER_REQUEST });

      // Make API request to register
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });
      // Check if registration was successful
      const data = await response.json();
      alert(data.result||data.error)
      // Dispatch register success action with user data
      if (data) {
        dispatch({ type: REGISTER_SUCCESS, payload: data });
      }
      // Handle registration failure
    } catch (error) {
      // Handle error
      dispatch({ type: REGISTER_FAILURE, error: "An error occurred" });
    }
  };
};
export const logoutUser=()=>(dispatch)=>{
dispatch({type:LOGOUT})
  localStorage.removeItem("details")
}