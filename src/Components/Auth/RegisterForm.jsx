import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      firstname: '',
      surname: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, firstname, surname } = this.state;

    this.props.onSubmit({ email, password, firstname, surname });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="reg-email">Електронна адреса:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="form-control"
            id="reg-email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-password">Пароль:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="form-control"
            id="reg-password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-firstname">Ім'я:</label>
          <input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
            className="form-control"
            id="reg-firstname"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-surname">Прізвище:</label>
          <input
            type="text"
            name="surname"
            value={this.state.surname}
            onChange={this.handleChange}
            className="form-control"
            id="reg-surname"
            required
          />
        </div>

        <div className="form-group">
          <input type="submit" className="btn btn-outline-success" value="Зареєструватися" />
        </div>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
