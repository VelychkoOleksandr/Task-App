import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';
import todoAPIService from "../../services/todoAPIService";

import './app.css';
import LoginWindow from '../login-window/';
import RegisterWindow from '../register-window/register-window';

export default class App extends Component {
  maxId = 100;

  state = {
    isLogged: false,
    userName: null,
    password: null,
    showRegisterWindow: true,
    showLoginWindow: false,
    showTasks: false,
    taskList: [],
    saveAvailable: false,
    todoAPIService: new todoAPIService()
  }

  creatTaskItem(label) {
    return {
      label,
      important: false,
      done: false,
      createDate: Date.now(),
      id: Math.floor(Math.random() * 999) // Temporary ID. Required better solution. Normal ID assigns after push to DB
    }
  }

  deleteItem = async (id) => {
    await this.setState(({ taskList }) => {
      const indx = taskList.findIndex((el) => el.id === id);
      const modifiedTodoData = [...taskList.slice(0, indx), ...taskList.slice(indx + 1)];

      return {
        taskList: modifiedTodoData,
        saveAvailable: true
      };
    });
  }

  onItemAdded = async (label) => {
    if (!label) return;
    await this.setState(({ taskList }) => {
      const newTodoItem = this.creatTaskItem(label);
      const modifiedTodoData = [...taskList, newTodoItem];

      return {
        taskList: modifiedTodoData,
        saveAvailable: true
      };
    });
  }

  showRegisterWindow = async () => {
    await this.setState({
      ...this.state,
      showRegisterWindow: true,
      showLoginWindow: false,
      showTasks: false
    });
  }

  showLoginWindow = async () => {
    await this.setState({
      ...this.state,
      showRegisterWindow: false,
      showLoginWindow: true,
      showTasks: false
    });
  }

  onLogin = async (userName, password) => {
    if (!userName || !password) return;
    const taskList = await this.state.todoAPIService.login(userName, password);
    if (!taskList.error) {
      await this.setState({
        ...this.state,
        taskList,
        userName,
        password,
        showLoginWindow: false,
        showTasks: true
      });
    };
  }

  onRegister = async (userName, password, email) => {
    if (!userName || !password) return;
    const response = await this.state.todoAPIService.register(userName, password, email);
    if (!response.error) {
      await this.setState({
        ...this.state,
        userName,
        password,
        showRegisterWindow: false,
        showTasks: true
      });
    };
  };

  onUpdateTasks = async () => {
    {
      const { userName, password, taskList } = this.state;
      await this.state.todoAPIService.updateTaskList(userName, password, taskList);
    }

    const taskList = await this.state.todoAPIService.getTaskList(this.state.userName, this.state.password);

    if (!taskList.error) {
      this.setState({
        ...this.state,
        taskList: taskList,
        saveAvailable: false
      });
    }
  };

  getTaskList = async () => {
    const taskList = await this.state.todoAPIService.getTaskList(this.state.userName, this.state.password);

    if (!taskList.error) {
      this.setState({
        ...this.state,
        taskList: taskList
      });
    }
  }

  onSendTask = (id) => {
    const email = prompt('Enter the receiver email:');

    if (email === null) return;

    const task = [...this.state.taskList].find(task => task.id === id);
    this.state.todoAPIService.sendTask(email, task, this.state.userName);
  };

  onEdit = async (id) => {

    const editedTaskIndex = [...this.state.taskList].findIndex(item => item.id === id);
    const editedTask = [...this.state.taskList][editedTaskIndex];
    const editResult = prompt('Edit task:', editedTask.label);

    if (editResult === null || editedTask.label === editResult) return;
    editedTask.label = editResult;

    await this.setState({
      ...this.state,
      taskList: [
        ...this.state.taskList.slice(0, editedTaskIndex),
        editedTask,
        ...this.state.taskList.slice(editedTaskIndex + 1)],
      saveAvailable: true
    });
  };

  render() {
    const { taskList, showRegisterWindow, showLoginWindow, userName } = this.state;

    return (
      <React.Fragment>
        {
          showRegisterWindow
            ? <RegisterWindow showLoginWindow={this.showLoginWindow} onRegister={this.onRegister} />
            : showLoginWindow
              ? <LoginWindow showRegiserWindow={this.showRegisterWindow} onLogin={this.onLogin} />
              : <React.Fragment>
                <AppHeader userName={userName} onUpdateTasks={this.onUpdateTasks} saveAvailable={this.state.saveAvailable} />
                <TodoList
                  taskList={taskList}
                  onDeleted={this.deleteItem}
                  onToggleImportant={this.toggleImportant}
                  onToggleDone={this.toggleDone}
                  onSendTask={this.onSendTask}
                  onEdit={this.onEdit} 
                  getTaskList={this.getTaskList}
                  saveAvailable={this.state.saveAvailable} />
                <ItemAddForm onItemAdded={this.onItemAdded} />
              </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
