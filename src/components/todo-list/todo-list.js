import React, { Component } from 'react';

import TodoListItem from '../todo-list-item/';
import './todo-list.css';

class TodoList extends Component {

  componentDidMount() {
    setInterval(() => {
      if (!this.props.saveAvailable) {
        this.props.getTaskList();
      }
    }, 5000);
  }

  render() {

    const { taskList, onDeleted, onToggleImportant, onToggleDone, onSendTask, onEdit } = this.props;
    const elements = taskList.map((item) => {
      const { id } = item;

      return (
        <li key={id} className="list-group-item">
          <TodoListItem
            {...item}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
            onSendTask={() => onSendTask(id)}
            onEdit={() => onEdit(id)}
          />
        </li>
      );
    });

    return (
      <ul className="list-group todo-list">
        {elements}
      </ul>
    );
  };
};

export default TodoList;