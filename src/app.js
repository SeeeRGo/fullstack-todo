import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import axios from 'axios'
import TodoList from './components/TodoList'

import {createStore, applyMiddleware} from 'redux'
const {todoManager} = require('./store')
import {addTodo,
		deleteTodo,
		updateTodo,
		toggleCompleted,
		newTodo,
		editTodo} from './actions'
export let store = createStore(todoManager, applyMiddleware(thunk))

const render = () => ReactDOM.render(<TodoList/>, document.getElementById("app"))
render()
store.subscribe(render)