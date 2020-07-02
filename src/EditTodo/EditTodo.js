import React, { Component, Fragment } from 'react';
import TodoContext from '../Context/TodoContext';

class EditTodo extends Component {
  static contextType = TodoContext;

  constructor(props) {
    super(props);
    this.state = {
      newTodo: this.props.todoDescription
    };
  }

  updateTodoValue = e => {
    e.preventDefault();
    this.setState({ newTodo: e.target.value });
  };

  updateTodoButton = (todoId, todos) => {
    const oldTodo = todos.find(todo => todo.id === parseFloat(todoId));
    this.context.updateTodo(todoId, {
      ...oldTodo,
      description: this.state.newTodo
    });
    console.log('2', todoId, { description: this.state.newTodo });
  };

  render() {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target={`#id${this.props.todoId}`}
        >
          Edit
        </button>

        <div className="modal" id={`id${this.props.todoId}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.newTodo}
                  onChange={e => this.updateTodoValue(e)}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  id={this.props.todoId}
                  onClick={e =>
                    this.updateTodoButton(e.target.id, this.context.todos)
                  }
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditTodo;
