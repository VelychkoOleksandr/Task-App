import React, { Component } from 'react';

import './register-window.css';

class RegisterWindow extends Component {
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

  onEmailChange = async (e) => {
    await this.setState({
      ...this.state,
      email: e.target.value 
    });
  };

  render() {
    return (
      <div className='register-box'>
        <div className='register-window'>

        <div className='header'>
            <h3>Register</h3>
          </div>

          <div className='username'>
            <label htmlFor='username-field'>Your Name:</label>
            <input type='text' id='username-field' className='form-control' onChange={(e) => {this.onUserNameChange(e)}}/>
          </div>

          <div className='email'>
            <label htmlFor='email-field'>Your Name:</label>
            <input type='email' id='email-field' className='form-control' onChange={(e) => {this.onEmailChange(e)}} />
          </div>

          <div className='password'>
            <label htmlFor='password-field'>Your Password:</label>
            <input type='password' id='password-field' className='form-control' onChange={(e) => {this.onPasswordChange(e)}} />
          </div>

          <div className='submit'>
            <input type='button' value='REGISTER' className='login-button btn btn-info' onClick={() => {
              this.props.onRegister(this.state.userName, this.state.password, this.state.email);
            }}/>
          </div>

          <div
            className='create-account'
            onClick={this.props.showLoginWindow}
          >
            <span>I already have an account!</span>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterWindow;