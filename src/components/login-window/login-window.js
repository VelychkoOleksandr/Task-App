import React, { Component } from 'react';

import './login-window.css';

class LoginWindow extends Component {

  state = {
    userName: '',
    password: ''
  };

  onUserNameChange = async (e) => {
    await this.setState({
      ...this.state,
      userName: e.target.value 
    });
  };

  onPasswordChange = async (e) => {
    await this.setState({
      ...this.state,
      password: e.target.value 
    });
  };


  render() {
    return (
      <div className='login-box'>
        <div className='login-window'>
          <div className='header'>
            <h3>Log In</h3>
          </div>

          <div className='username'>
            <label htmlFor='username-field'>Your Name:</label>
            <input type='text' id='username-field' className='form-control' onChange={(e) => {this.onUserNameChange(e)}} />
          </div>

          <div className='password'>
            <label htmlFor='password-field'>Your Password:</label>
            <input type='password' id='password-field' className='form-control' onChange={(e) => {this.onPasswordChange(e)}} />
          </div>

          <div className='submit'>
            <input type='button' value='LOG IN' className='login-button btn btn-info' onClick={() => {this.props.onLogin(this.state.userName, this.state.password)}} />
          </div>

          <div
            className='create-account'
            onClick={this.props.showRegiserWindow}
          >
            <span>I don't have an account. Register!</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginWindow;