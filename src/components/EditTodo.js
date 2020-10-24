import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

export default function EditTodo() {
	const history = useHistory();	
  const [todoDescription, setTodoDescription] = useState("");
	const [todoResponsible, setTodoResponsible] = useState("");
	const [todoPriority, setTodoPriority] = useState("");
	const [todoCompleted, setTodoCompleted] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		axios.get('http://localhost:4000/todos/' + id)
			.then(response => {
				setTodoPriority(response.data.todoPriority);
		    setTodoResponsible(response.data.todoResponsible);
		    setTodoDescription(response.data.todoDescription);
		    setTodoCompleted(response.data.todoCompleted);
			})
			.catch(function(error) {
				console.log(error);
			})
	}, [id])

	function onChangeTodoDescription(e) {
		setTodoDescription(e.target.value);
	}

	function onChangeTodoResponsible(e) {
		setTodoResponsible(e.target.value);
	}

	function onChangeTodoPriority(e) {
		setTodoPriority(e.target.value);
	}

	function onChangeTodoCompleted(e) {
		setTodoCompleted(!todoCompleted);
	}

	function onSubmit(e) {
		
		e.preventDefault();

    const obj = {
    	todoDescription: todoDescription,
    	todoResponsible: todoResponsible,
    	todoPriority: todoPriority,
    	todoCompleted: todoCompleted,
    };
    console.log(obj);

    axios.post('http://localhost:4000/todos/update/' + id, obj)
    	.then(res => console.log(res.data));
    
    history.push('/');
	}	

  return (
	  <div>
      <h3 align="center">Update Todo</h3>
      <form onSubmit={onSubmit}>
      	<div>
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
      	<div className="form-check">
      		<input 
      			className="form-check-input"
      			id="completedCheckbox"
      			type="checkbox"
      			onChange={onChangeTodoCompleted}
      			checked={todoCompleted}
      			value={todoCompleted}
      		/>
      		<label className="form-check-label" htmlFor="completedCheckbox">
      			Completed
      		</label>
      	</div>

      	<br />

      	<div className="form-group">
      		<input type="submit" value="Update Todo" className="btn btn-primary" />
      	</div>
      </form>
    </div>
  );
}