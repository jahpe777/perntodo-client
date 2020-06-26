import React, { Component, Fragment } from 'react';
import TodoContext from '../Context/TodoContext';

class EditTodo extends Component {
  static contextType = TodoContext;

  constructor(props) {
    super(props);
    this.state = {
      newTodo: ''
    };
  }
  updateTodoValue = e => {
    e.preventDefault();
    const newTodo = { description: e.target.value };
    this.updateTodoButton(newTodo);
  };

  updateTodoButton = (todoId, newTodo) => {
    this.context.updateTodo(todoId, newTodo);
    console.log(todoId, newTodo);
  };

  render() {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target="#myModal"
        >
          Edit
        </button>

        <div className="modal" id="myModal">
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
                  onChange={e => this.updateTodoValue(e)}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  id={this.props.todoId}
                  onClick={e => this.updateTodoButton(e.target.id)}
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
