import React, { Component, Fragment, useEffect } from 'react';
import TodoContext from '../Context/TodoContext';

class ListTodos extends Component {
  static contextType = TodoContext;

  render() {
    return (
      <Fragment>
        {' '}
        <table class="table mt-5 text-center">
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
                  <button className="btn btn-warning" type="submit" name="edit">
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="submit"
                    name="delete"
                  >
                    Delete
                  </button>
                  <br />
                </tr>
              );
            })}
            {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ListTodos;
