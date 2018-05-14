import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class AuthModal extends Component {
  constructor(props) {
    super(props);

    this.closeButton = React.createRef();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin({ email, password }) {
    axios.post('https://api-luft-kma.herokuapp.com/users/login', {
      email, password,
    }, { withCredentials: true })
      .then(({ data }) => {
        this.closeButton.current.click();
        setTimeout(() => {
          this.props.onLogin(data);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRegister({ email, password, firstname, surname }) {
    axios.post('https://api-luft-kma.herokuapp.com/users/new', {
      email, password, firstname, surname,
    }, { withCredentials: true })
      .then(({ data }) => {
        this.closeButton.current.click();
        setTimeout(() => {
          this.props.onLogin(data);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="modal fade" id="auth">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Авторизація</h4>
              <button type="button" className="close" data-dismiss="modal" ref={this.closeButton}>&times;</button>
            </div>

            <div className="modal-body">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" href="#login" data-toggle="tab" data-target="#login" role="tab">Вхід</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#register" data-toggle="tab" data-target="#register" role="tab">Реєстрація</a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="login" role="tabpanel"><br />
                  <LoginForm onSubmit={this.handleLogin} />
                </div>
                <div className="tab-pane fade" id="register" role="tabpanel"><br />
                  <RegisterForm onSubmit={this.handleRegister} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AuthModal.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default AuthModal;
