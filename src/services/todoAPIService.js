class todoAPIService {
  baseURL = 'http://localhost:4088';

  getTaskList = async (userName, password) => {
    const taskList = await fetch(`${this.baseURL}/getTodosList`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userData: { userName, password } })
    })
      .then(response => response.json());

    if (!Array.isArray(taskList)) return taskList;

    return this.mapTasks(taskList);
  };

  login = async (userName, password) => {
    const taskList = await fetch(`${this.baseURL}/getTodosList`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userData: { userName, password } })
    })
      .then(response => response.json());

    if (!Array.isArray(taskList)) return taskList;

    return this.mapTasks(taskList);
  };

  register = async (userName, password, email) => {
    const taskList = await fetch(`${this.baseURL}/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userData: { userName, password, email } })
    })
      .then(response => response.json());
      console.log('tasklist', taskList);

    if (!Array.isArray(taskList)) return taskList;

    return this.mapTasks(taskList);
  };

  updateTaskList = async (userName, password, tasks = []) => {
    const taskList = await fetch(`${this.baseURL}/updateTodos`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userData: { userName, password, tasks } })
    })
      .then(response => response.json());

    if (!Array.isArray(taskList)) return taskList;

    return this.mapTasks(taskList);
  };

  sendTask = async (email, task, author) => {
    const sendResult = await fetch(`${this.baseURL}/sendTask`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskData: { email, task: { ...task, author }}})
    })
      .then(response => response.json());

    return sendResult;
  }

  mapTasks = (tasks) => {
    return tasks.map(task => {
      return {
        id: task._id,
        label: task.label,
        important: task.important,
        done: task.done,
        createDate: task.createDate,
        author: task.author
      }
    });
  }
}

export default todoAPIService;
