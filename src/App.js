import React, { Component, Fragment } from 'react';
import InputTodo from './InputTodo/InputTodo';

import TodoContext from './Context/TodoContext';

import EditTodo from './EditTodo/EditTodo';
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
          .then(res => {
            this.setState({ todos: [...this.state.todos, res] });
          })
          .catch(err => console.log(err));
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
    return (
      <TodoContext.Provider value={this.state}>
        <Fragment>
          <div className="container">
            <InputTodo />
            <EditTodo />
            <ListTodos />
          </div>
        </Fragment>
      </TodoContext.Provider>
    );
  }
}

export default App;
