import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';

export default function TodosList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
  	axios.get('http://localhost:4000/todos')
  		.then((response) => {
  			setTodos(response.data);
  		})
  		.catch(function(error){
  			console.log(error);
  		})
  },[])

  function todoList() {
  	return todos.map(function(currentTodo, i) {
  		return <Todo todo={currentTodo} key={i} />
  	})
  }

  return (
	  <div>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
      	<thead>
      		<tr>
      			<th>Description</th>
      			<th>Responsible</th>
      			<th>Priority</th>
      			<th>Action</th>
      		</tr>
      	</thead>
      	<tbody>
      		{todoList()}
      	</tbody>
      </table>
    </div>
  );
}