import { UPDATE_TODO_FAILURE } from "../todoreducer/actionType";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  ASSIGN_TODO_TO_USER_REQ,
  ASSIGN_TODO_TO_USER_FAIL,
  ASSIGN_TODO_TO_USER_SUC,
} from "./actionTypes";
// Fetch users action
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const details = JSON.parse(localStorage.getItem("details"));

      // Make API call to fetch users
      const users = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/alluser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: details.token,
          Email: details.email,
        },
      });
      const data = await users.json();
      if (data) {
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
      } else {
        dispatch({ type: FETCH_USERS_FAILURE, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };
};

// Assign todo to user action
export const assignTodoToUser = (email, todo) => {
  return async (dispatch) => {
    const details = JSON.parse(localStorage.getItem("details"));
    try {
      // Make API call to assign todo to user
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/client/assigntodo`,
        {
        method:"POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: details.token,
          Email: details.email,
          specific_user_email:email
        },
      body:JSON.stringify(todo)
      }
      );
      let data = await response.json();

      console.log(data)

      if(data.message){
        alert(data.message)
      }
      // if (data) {
      //   dispatch({ type: ASSIGN_TODO_TO_USER_SUC, payload: todoId });
      // } else {
      //   dispatch({ type: ASSIGN_TODO_TO_USER_FAIL, payload: data.error });
      // }
    } catch (error) {
      // dispatch({ type: ASSIGN_TODO_TO_USER_FAIL, payload: error.message });
    }
  };
};

// Add user action
export const addUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST });
    const details = JSON.parse(localStorage.getItem("details"));
    try {
      // Make API call to add user
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/adduser`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Authorization: details.token,
          Email: details.email,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
        dispatch({ type: ADD_USER_FAILURE, payload: data.error });
      } else if ((data.message === "User already exits")) {
        alert(data.message);

        dispatch({ type: ADD_USER_FAILURE, payload: data.error });
      } else if (data.message) {
        alert(data.message);
        dispatch({ type: ADD_USER_SUCCESS, payload: user });
      }
    } catch (error) {
      alert(error.error);
      dispatch({ type: ADD_USER_FAILURE, payload: error.message });
    }
  };
};

// Update user action
export const updateUser = (userId, updatedUser) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    const details = JSON.parse(localStorage.getItem("details"));
    try {
      // Make API call to update user
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/updateuser/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: details.token,
            Email: details.email,
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();
      if (data.message) {
        alert(data.message)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
      } else {
        dispatch({ type: UPDATE_TODO_FAILURE, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
  };
};

// Delete user action

export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

  
    try {
      const details = JSON.parse(localStorage.getItem("details"));
      // Make API call to delete user
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/deleteuser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: details.token,
            Email: details.email,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.message) {
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
      } else {
        dispatch({ type: DELETE_USER_FAILURE, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
  };
};
