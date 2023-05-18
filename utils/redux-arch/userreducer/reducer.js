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
    ASSIGN_TODO_TO_USER_FAIL,
    ASSIGN_TODO_TO_USER_SUC,
    ASSIGN_TODO_TO_USER_REQ
  } from './actionTypes';
  
  const initialState = {
    users: [],
    loading: false,
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
      case ADD_USER_REQUEST:
      case UPDATE_USER_REQUEST:
      case DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload,
          loading: false,
          error: null
        };
      case ADD_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, action.payload],
          loading: false,
          error: null
        };
      case UPDATE_USER_SUCCESS:
        const updatedUsers = state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
        return {
          ...state,
          users: updatedUsers,
          loading: false,
          error: null
        };
      case DELETE_USER_SUCCESS:
        const filteredUsers = state.users.filter((user) => user.id !== action.payload);
        return {
          ...state,
          users: filteredUsers,
          loading: false,
          error: null
        };
      case FETCH_USERS_FAILURE:
      case ADD_USER_FAILURE:
      case UPDATE_USER_FAILURE:
      case DELETE_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };

        case ASSIGN_TODO_TO_USER_REQ:
            return {
              ...state,
              loading: true,
              error: null
            };
          case ASSIGN_TODO_TO_USER_SUC:
            // Filter out the assigned todo from the todos array
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
      
            return {
              ...state,
              loading: false,
              todos: updatedTodos
            };
          case ASSIGN_TODO_TO_USER_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload
            };

      default:
        return state;
    }
  };
  
  export {userReducer};
  