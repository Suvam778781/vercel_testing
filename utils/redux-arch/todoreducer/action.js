

// Fetch Todos Action

import { ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ASSIGN_TODO_TO_USER_FAILURE, ASSIGN_TODO_TO_USER_REQUEST, ASSIGN_TODO_TO_USER_SUCCESS, DELETE_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, UPDATE_TODO_FAILURE, UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS } from "./actionType";

// Fetch all todos action
export const fetchTodos = (page=1,limit=10) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });

    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    let url;
    try {
      const details=JSON.parse(localStorage.getItem('details'));
        if(details.role=="user"){
          url="todo/useralltodo"
         }
         else {
           url="todo/alltodo"
         }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': details.token,
          'Email': details.email
        }
      });
      const data = await response.json();
      console.log(data)
      if (data) {
        dispatch({ type: FETCH_TODOS_SUCCESS, payload: data});
      } else {
        dispatch({ type: FETCH_TODOS_FAILURE, error: 'Failed to fetch todos' });
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: FETCH_TODOS_FAILURE, error: 'An error occurred' });
    }
  };
};

// Add todo action
export const addTodo = (todo) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TODO_REQUEST });

    try {
      const details=JSON.parse(localStorage.getItem('details'));
      let url;
      if(details.role=="user"){
      
       url="todo/useraddtodo"
      }
      else {
        url="todo/addtodo"
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': details.token,
          'Email': details.email
        },
        body: JSON.stringify(todo)
      });
        const data = await response.json();
      console.log(response,data)
        if(data.message){
        dispatch({ type: ADD_TODO_SUCCESS, payload: todo });
      } else {
        dispatch({ type: ADD_TODO_FAILURE, error: 'Failed to add todo' });
      }
    } catch (error) {
      dispatch({ type: ADD_TODO_FAILURE, error: 'An error occurred' });
    }
  };
};

// Delete todo action
export const deleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TODO_REQUEST });

    try {
      const details=JSON.parse(localStorage.getItem('details'));
      let url;
if(details.role=="user"){

 url="todo/userdeletetodo"

}
else{
  url="todo/delete"
}
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': details.token,
          'Email': details.email
        }
      });
    
        dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
      
        // dispatch({ type: DELETE_TODO_FAILURE, error: 'Failed to delete todo' });
      
    } catch (error) {
      dispatch({ type: DELETE_TODO_FAILURE, error: 'An error occurred' });
    }
  };
};


// Update todo action
export const updateTodo = (id, updatedTodo) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TODO_REQUEST });
    let url;
    try {
      const details=JSON.parse(localStorage.getItem('details'));
      if(details.role=="user"){
      
       url="todo/userupdatetodo"
      }
      else{
        url="todo/update"
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': details.token,
          'Email':details.email
        },
        body: JSON.stringify(updatedTodo)
      });

        const data = await response.json();
        console.log(data)
        if(data.message){
       
        dispatch({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
      } else {
        dispatch({ type: UPDATE_TODO_FAILURE, error: 'Failed to update todo' });
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: UPDATE_TODO_FAILURE, error: 'An error occurred' });}
    }
};


export const assignTodoToUser = (todoId, email) => {
  return async (dispatch) => {
    dispatch({ type: ASSIGN_TODO_TO_USER_REQUEST });
    const details=JSON.parse(localStorage.getItem('details'));
    try {
      // Make API call to assign todo to user
     let response= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/assignto/${todoId}`, {
        method: 'PATCH',
        headers:{
        Authorization:details.token,
        Email:details.email
        },
      body:JSON.stringify(email)
      });

      let data=await response.json()
      console.log(data)
      
      dispatch({ type: ASSIGN_TODO_TO_USER_SUCCESS, payload: todoId });
    } catch (error) {
      dispatch({ type: ASSIGN_TODO_TO_USER_FAILURE, payload: error.message });
    }
  };
};

 
