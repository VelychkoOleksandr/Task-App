import React from 'react';

import './app-header.css';
import SaveButton from '../save-button/save-button';

const AppHeader = ({ toDo, done, userName, onUpdateTasks, saveAvailable }) => {
  return (
    <React.Fragment>
      <div className='user'>
        <span>Welcome, {userName}</span>
      </div>
      <div className="app-header d-flex">
        <h1>Task List</h1>
        <SaveButton onUpdateTasks={onUpdateTasks} saveAvailable={saveAvailable}/>
      </div>
    </React.Fragment>

  );
};

export default AppHeader;