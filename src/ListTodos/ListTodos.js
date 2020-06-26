import React, { Component, Fragment } from 'react';
import EditTodo from '../EditTodo/EditTodo';
import TodoContext from '../Context/TodoContext';

class ListTodos extends Component {
  static contextType = TodoContext;

  deleteTodo = (e, todoId) => {
    e.preventDefault();
    this.context.deleteTodo(todoId);
  };

  updateTodo = e => {
    e.preventDefault();
    const newTodo = { description: e.target.newDescription.value };
    this.context.updateUser(newTodo);
    e.target.reset();
  };

  render() {
    return (
      <Fragment>
        {' '}
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.context.todos.map(todo => {
              return (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>
                    <EditTodo />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      type="submit"
                      name="delete"
                      onClick={e => this.deleteTodo(e, todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ListTodos;
