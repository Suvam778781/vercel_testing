import {
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ASSIGN_TODO_TO_USER_FAILURE,
  ASSIGN_TODO_TO_USER_REQUEST,
  ASSIGN_TODO_TO_USER_SUCCESS,
  DELETE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
} from "./actionType";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case ADD_TODO_REQUEST:
    case DELETE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
        error: null,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        loading: false,
        error: null,
      };
    case UPDATE_TODO_SUCCESS:
      let updatedtodo = state.todos.map((ele) => {
        if (ele.id == action.payload.id) {
          ele = action.payload;
          return ele;
        } else {
          return ele;
        }
      });
      console.log(updatedtodo);
      return {
        ...state,
        todos: updatedtodo,
        loading: false,
        error: null,
      };
    case FETCH_TODOS_FAILURE:
    case ADD_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

      case ASSIGN_TODO_TO_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ASSIGN_TODO_TO_USER_SUCCESS:
      // Filter out the assigned todo from the todos array
      const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);

      return {
        ...state,
        loading: false,
        todos: updatedTodos
      };
    case ASSIGN_TODO_TO_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export { todoReducer };
