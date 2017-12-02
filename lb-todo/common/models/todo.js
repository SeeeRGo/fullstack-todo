'use strict';

module.exports = function(Todo) {
	Todo.toggleCompleted = function(id, cb) {
		Todo.findById(id, function(err, todo) {
			if(todo){
				todo.updateAttribute('completed', !todo.completed, function(err, todo){
					if(err) throw err
					return cb(null, todo)
				})
			} else {
				cb(null, todo)
			}
			
		})
	}
	Todo.remoteMethod(
		'toggleCompleted',
		{
			http: {path: '/toggle/:id', verb: 'patch'},
			accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
			returns: {arg: 'todo', type: 'object'}
		})
	Todo.updateTodo = function(id, updates, cb) {
		Todo.findById(id, function(err, todo) {
			if(todo){
				todo.updateAttributes(updates, function(err, todo){
					if(err) throw err
					return cb(null, todo)
				})
			} else {
				cb(null, todo)
			}
			
		})
	}
	Todo.remoteMethod(
		'updateTodo',
		{
			http: {path: '/update/:id', verb: 'patch'},
			accepts: [
				{arg: 'id', type: 'string', http: { source: 'query' } },
				{arg: 'data', type: 'object', http: { source: 'body' } }],
			returns: {arg: 'todo', type: 'object'}
		})
	Todo.addTodo = function(title, body, cb) {
		let data = {
			title,
			body,
			completed: false,
			edit: false
		}
		Todo.create(data, function(err, todo) {
			if(err){
				throw err
			} else {
				cb(null, todo)
			}			
		})
	}
	Todo.remoteMethod(
		'addTodo',
		{
			http: {path: '/add', verb: 'post'},
			accepts: [
				{arg: 'title', type: 'string', http: { source: 'query' } },
				{arg: 'body', type: 'string', http: { source: 'query' } }],
			returns: {arg: 'todo', type: 'object'}
		})
	Todo.deleteTodo = function(id, cb) {
		Todo.destroyById(id, function(err, todo) {
			if(err) {
				throw err
			} else {
				cb(null, todo)
			}			
		})
	}
	Todo.remoteMethod(
		'deleteTodo',
		{
			http: {path: '/delete/:id', verb: 'delete'},
			accepts: [
				{arg: 'id', type: 'string', http: { source: 'query' } }],
			returns: {arg: 'todo', type: 'object'}
		})
	Todo.getTodos = function(cb) {
		Todo.find({}, function(err, todos) {
			if(err) {
				throw err
			} else {
				cb(null, todos)
			}		
		})
	}
	Todo.remoteMethod(
		'getTodos',
		{
			http: {path: '/all', verb: 'get'},
			accepts: [],
			returns: {arg: 'todos', type: 'array'}
		}
		)
};
