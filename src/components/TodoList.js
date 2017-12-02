import React from 'react'
import Todo from './Todo'
import {store} from './../app'
import {addTodo,
		getTodos,
		deleteTodo,
		updateTodo,
		toggleCompleted,
		newTodo,
		editTodo} from './../actions'
import EditForm from './EditForm'
import axios from 'axios'

class TodoList extends React.Component {
	constructor(props){
		super(props)
		this.handleAddTodo = this.handleAddTodo.bind(this)
	}
	handleAddTodo(e) {
		e.preventDefault()
		const title = e.target.elements.title.value.trim()
		const body = e.target.elements.body.value.trim()		
		axios.post(`http://localhost:3000/api/Todos/add?title=${title}&body=${body}`)
		.then(response => {
			store.dispatch(addTodo(title, body))
		}).catch(e => console.log(e))
		
	}
	componentWillMount() {
		axios.get('http://localhost:3000/api/Todos/all')
		.then(response => {
			let todos = response.data.todos
			store.dispatch(getTodos(todos))
		}).catch(e => console.log(e))
		
	}
	renderTodos() {
		return store.getState().todos.map((todo) => {
			return <Todo key={todo.id} todo={todo}/>		
		}) 
	}
	render() {
		
		
		return (
			<div>
				<button onClick={() => {store.dispatch(newTodo())}}>Add Todo</button>
				{store.getState().add && <EditForm handleSubmit={this.handleAddTodo}/>}
				{this.renderTodos()}
			</div>
		)
	}
}


export default TodoList