import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Calendar from 'react-calendar';

class RoutePicker extends Component {
  constructor(props) {
    super(props);
    this.loadAirports = this.loadAirports.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      route: {
        from: '',
        to: '',
        date: '',
        back: '',
      },
      airports: [],
    }
  }

  componentDidMount() {
    this.loadAirports();
  }

  loadAirports() {
    axios.get('http://localhost:3000/airports')
      .then(({ data }) => {
        const airports = data.map(airport => ({
          value: airport._id,
          label: airport.city,
          code: airport.code,
        }));
        this.setState({ airports });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { route } = this.state;
    route[name] = value;
    this.setState({ route });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <Select
            name="from"
            value={this.state.route.from}
            onChange={option => this.handleChange({ target: {
              name: 'from',
              value: option.value,
            }})}
            options={this.state.airports}
            placeholder="Відправлення"
            className="input"
          />
        </div>
        <div className="form-group">
          <Select
            name="to"
            value={this.state.route.to}
            onChange={option => this.handleChange({ target: {
              name: 'to',
              value: option.value,
            }})}
            options={this.state.airports}
            placeholder="Прибуття"
            className="input"
          />
        </div>
        <div className="form-group">
          <Calendar
            onChange={this.onChange}
            locale="uk-UK"
            value={this.state.route.date}
            className="calendar"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Шукати</button>
        </div>
      </form>
    );
  }
}

export default RoutePicker;
