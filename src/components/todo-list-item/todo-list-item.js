import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
  render() {
    const { label, onDeleted, id } = this.props;

    return (
      <span className='todo-list-item'>
        <span className="todo-list-item-label">
          {label}
        </span>

        {
          this.props.author
            ? <span className='author'>(from: {this.props.author})</span>
            : null
        }

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => {
            this.props.onSendTask(id);
          }}>
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </button>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => {
            this.props.onEdit(id);
          }}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={() => { onDeleted(label) }}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}