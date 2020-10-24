import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTodo() {
	const [todoDescription, setTodoDescription] = useState("");
	const [todoResponsible, setTodoResponsible] = useState("");
	const [todoPriority, setTodoPriority] = useState("");
	const [todoCompleted, setTodoCompleted] = useState(false);

	function onChangeTodoDescription(e) {
		setTodoDescription(e.target.value);
	}

	function onChangeTodoResponsible(e) {
		setTodoResponsible(e.target.value);
	}

	function onChangeTodoPriority(e) {
		setTodoPriority(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();

		console.log(`Form submitted:`);
    console.log(`Todo Description: ${todoDescription}`);
    console.log(`Todo Responsible: ${todoResponsible}`);
    console.log(`Todo Priority: ${todoPriority}`);

    const newTodo = {
    	todoDescription: todoDescription,
    	todoResponsible: todoResponsible,
    	todoPriority: todoPriority,
    	todoCompleted: todoCompleted,
    };

    axios.post('http://localhost:4000/todos/add', newTodo)
    	.then(res => console.log(res.data));
    
    setTodoPriority("");
    setTodoResponsible("");
    setTodoDescription("");
    setTodoCompleted(false);
	}

  return (
	  <div style={{marginTop: 10}}>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
      	<div className="form-group">
      		<label>Description: </label>
      		<input 
      			type="text"
      			className="form-control"
      			value={todoDescription}
      			onChange={onChangeTodoDescription}
      		/>
      	</div>
      	<div className="form-group">
      		<label>Responsible: </label>
      		<input 
      			type="text"
      			className="form-control"
      			value={todoResponsible}
      			onChange={onChangeTodoResponsible}
      		/>
      	</div>
      	<div className="form-group">
      		<div className="form-check form-check-inline">
      			<input 
      				type="radio"
      				name="priorityOptions"
      				id="priorityLow"
      				value="Low"
      				checked={todoPriority==='Low'}
      				onChange={onChangeTodoPriority} 
      			/>
      			<label className="form-check-label">Low</label>
      		</div>
      		<div className="form-check form-check-inline">
      			<input 
      				type="radio"
      				name="priorityOptions"
      				id="priorityMedium"
      				value="Medium"
      				checked={todoPriority==='Medium'}
      				onChange={onChangeTodoPriority} 
      			/>
      			<label className="form-check-label">Medium</label>
      		</div>
      		<div className="form-check form-check-inline">
      			<input 
      				type="radio"
      				name="priorityOptions"
      				id="priorityHigh"
      				value="High"
      				checked={todoPriority==='High'}
      				onChange={onChangeTodoPriority} 
      			/>
      			<label className="form-check-label">High</label>
      		</div>
      	</div>

      	<div className="form-group">
      		<input type="submit" value="Create Todo" className="btn btn-primary" />
      	</div>
      </form>
    </div>
  );
}