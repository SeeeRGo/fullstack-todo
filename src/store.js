
const initialState = {
	add: false,
	todos: []
}
let todos, newState, index;
export let todoManager = (prevState = initialState, action) => {
	switch(action.type) {
		case "GET_TODOS":
			newState = {
				add: prevState.add,
				todos: action.todos
			}
			return newState
		case "ADD_TODO":
			todos = [...prevState.todos, action.todo]
			newState = {
				todos,
				add: false,
				}
			return newState
		case "DELETE_TODO":
			todos = prevState.todos.filter((todo) => action.id !== todo.id)
			newState = {
				add: prevState.add,
				todos
				}
			return newState
		case "TOGGLE_COMPLETED":
			index = prevState.todos.findIndex((todo) => action.id === todo.id)
			todos = prevState.todos.slice()
			todos[index].completed = !todos[index].completed
			todos[index].completedAt = todos[index].completed ? new Date().getTime() : null
			newState = {
				add: prevState.add,
				todos
				}
			return newState
		case "UPDATE_TODO":
			index = prevState.todos.findIndex((todo) => action.id === todo.id)
			todos = prevState.todos.slice()
			todos[index].title = action.title || todos[index].title
			todos[index].body = action.body || todos[index].body
			todos[index].edit = false
			newState = {
				todos,
				add: prevState.add,
				}
			return newState
		case "EDIT_TODO":
			index = prevState.todos.findIndex((todo) => action.id === todo.id)
			todos = prevState.todos.slice()
			todos[index].edit = true

			newState = {
				todos,		
				add: prevState.add,
			}
			return newState
		case "NEW_TODO":
			newState = {
				todos: prevState.todos,
				add: true,
			}
			return newState
		default: return prevState
	}
}
