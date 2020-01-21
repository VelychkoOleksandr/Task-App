import React from "react";
import './save-button.css';

const SaveButton = (props) => {
  return (
    <input type='button' className='btn btn-success save-button' value='SAVE' onClick={props.onUpdateTasks} disabled={!props.saveAvailable}/>
  );
}

export default SaveButton;