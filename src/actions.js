import uniqid from 'uniqid'

export const addTodo = (title, body) => {
	return {
		type: "ADD_TODO",
		todo: {
			title: title || 'Untitled',
			body: body || '',
			completed: false,
			edit: false,
			completedAt: null
		}
	}
}
export const getTodos = (todos) => {
	return {
		type: "GET_TODOS",
		todos
	}
}
export const deleteTodo = (id) => {
	return {
		type: "DELETE_TODO",
		id
	}
}

export const updateTodo = (id, title, body) => {
	return {
		type: "UPDATE_TODO",
		id,
		title,
		body
	}
}

export const toggleCompleted = (id) => {
	return {
		type: "TOGGLE_COMPLETED",
		id
	}
}

export const newTodo = () => {
	return {
		type: "NEW_TODO"
	}
}

export const editTodo = (id) => {
	return {
		type: "EDIT_TODO",
		id
	}
}