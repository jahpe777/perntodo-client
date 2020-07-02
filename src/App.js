import React, { Component, Fragment } from 'react';
import InputTodo from './InputTodo/InputTodo';

import TodoContext from './Context/TodoContext';

import ListTodos from './ListTodos/ListTodos';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],

      addNewTodo: description => {
        fetch('http://localhost:9000/api/todos', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ description })
        })
          .then(res => res.json())
          .then(res => {
            this.setState({ todos: [...this.state.todos, res] });
          })
          .catch(err => console.log(err));
      },

      updateTodo: (todoId, todoItem) => {
        fetch(`http://localhost:9000/api/todos/${todoId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
          body: JSON.stringify(todoItem)
        })
          .then(res => res)
          .then(() => {
            let newTodos = this.state.todos.map(todo => {
              console.log(todo, todoId);
              if (todo.id === parseInt(todoId, 10)) {
                return todoItem;
              } else {
                return todo;
              }
            });
            this.setState({
              todos: newTodos
            });
          })
          .catch(err => console.log(err));
      },

      deleteTodo: todoId => {
        fetch(`http://localhost:9000/api/todos/${todoId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'DELETE',
          body: JSON.stringify(todoId)
        })
          .then(res => {
            if (!res.ok) return res.json().then(e => Promise.reject(e));
            return true;
          })
          .then(deletedTodo => {
            this.setState({
              todos: this.state.todos.filter(todo => todo.id !== todoId)
            });
          });
      }
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9000/api/todos`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json();
      })
      .then(todos => {
        this.setState({ todos: todos });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    console.log('5', this.state.todos);
    return (
      <TodoContext.Provider value={this.state}>
        <Fragment>
          <div className="container">
            <InputTodo />
            <ListTodos />
          </div>
        </Fragment>
      </TodoContext.Provider>
    );
  }
}

export default App;
