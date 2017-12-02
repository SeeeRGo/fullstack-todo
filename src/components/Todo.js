import React from 'react'
import {store} from './../app'
import {addTodo,
		deleteTodo,
		updateTodo,
		toggleCompleted,
		newTodo,
		editTodo} from './../actions'
import EditForm from './EditForm'
import axios from 'axios'

class Todo extends React.Component {
	constructor(props) {
		super(props)
		this.handleEditTodo = this.handleEditTodo.bind(this)
	}
	handleEditTodo(e, id) {
		e.preventDefault()
		const title = e.target.elements.title.value.trim()
		const body = e.target.elements.body.value.trim()
		axios.patch(`http://localhost:3000/api/Todos/update/{id}?id=${id}`, {title, body})
		.then(response => {
			console.log(response)
		}).catch(e => console.log(e))
		store.dispatch(updateTodo(id, title, body))
	}
	render() {
		return (
			<div>
				<p>{this.props.todo.title}</p>
				<p>{this.props.todo.body}</p>
				{this.props.todo.completed && <p> Completed at {this.props.todo.completedAt}</p>}
				<button onClick={() => {
					axios.patch(`http://localhost:3000/api/Todos/toggle/{id}?id=${this.props.todo.id}`)
						.then(response => {
							console.log(response)
						}).catch(e => console.log(e))
					store.dispatch(toggleCompleted(this.props.todo.id))}}>
					{this.props.todo.completed ? 'Completed' : 'Uncompleted'}
				</button>
				<button onClick={() => {
					store.dispatch(editTodo(this.props.todo.id))
					console.log(store.getState())
				}}>Edit Todo</button>
				<button onClick={() => {
					axios.delete(`http://localhost:3000/api/Todos/delete/{id}?id=${this.props.todo.id}`)
						.then(response => {
							console.log(response)
						}).catch(e => console.log(e))
					store.dispatch(deleteTodo(this.props.todo.id))
				}}>Delete Todo</button>
				{this.props.todo.edit && <EditForm handleSubmit={(e) => {this.handleEditTodo(e, this.props.todo.id)}}/>}
			</div>
		)
	}
}


export default Todo