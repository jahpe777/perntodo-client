import React, { Component, Fragment } from 'react';
import TodoContext from '../Context/TodoContext';

class InputTodo extends Component {
  static contextType = TodoContext;

  onSubmitForm = event => {
    event.preventDefault();
    const todo = event.target.todo.value;
    this.context.addNewTodo(todo);
    this.form.reset();
  };

  render() {
    return (
      <Fragment>
        <h1 className="text-center mt-5">Pern Todo List</h1>
        <form
          className="d-flex mt-5"
          ref={form => (this.form = form)}
          onSubmit={this.onSubmitForm}
        >
          <input
            placeholder="get mail"
            type="text"
            className="form-control"
            name="todo"
            required
          />
          <button className="btn btn-success" type="submit">
            Add
          </button>
        </form>
      </Fragment>
    );
  }
}

export default InputTodo;
