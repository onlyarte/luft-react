import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';

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
        type: 'round',
        dates: [new Date(), new Date()],
        date: new Date(),
      },
      airports: [],
    };
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
          clearableValue: false,
        }));
        this.setState({ airports });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { route } = this.state;
    route[name] = value;
    this.setState({ route });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { route } = this.state;
    const formatted = { from: route.from, to: route.to };
    console.log(formatted);

    if (route.type === 'round') {
      formatted.date =
        Date.UTC(
          route.dates[0].getFullYear(),
          route.dates[0].getMonth(),
          route.dates[0].getDate(),
        ).toString();
      formatted.dateBack =
        Date.UTC(
          route.dates[1].getFullYear(),
          route.dates[1].getMonth(),
          route.dates[1].getDate(),
        ).toString();
    } else {
      formatted.date =
        Date.UTC(
          route.date.getFullYear(),
          route.date.getMonth(),
          route.date.getDate(),
        );
    }
    console.log(route.dates);
    console.log(formatted);
    this.props.onPick(formatted);
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
            clearable={false}
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
            clearable={false}
          />
        </div>
        <div className="form-group">
          <Select
            name="type"
            value={this.state.route.type}
            onChange={option => this.handleChange({ target: { name: 'type', value: option.value } })}
            options={[
              {
                value: 'round',
                label: 'Туди і назад',
              }, {
                value: 'oneway',
                label: 'В один бік',
              },
            ]}
            className="input"
            clearable={false}
          />
        </div>
        <div className="form-group">
          {this.state.route.type === 'round' && (
            <Calendar
              onChange={
                dates => this.handleChange({ target: { name: 'dates', value: dates } })
              }
              locale="uk-UK"
              returnValue="range"
              selectRange
              value={this.state.route.dates}
              className="calendar"
            />
          )}
          {this.state.route.type === 'oneway' && (
            <Calendar
              onChange={
                dates => this.handleChange({ target: { name: 'date', value: dates } })
              }
              locale="uk-UK"
              value={this.state.route.date}
              className="calendar"
            />
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Шукати</button>
        </div>
      </form>
    );
  }
}

RoutePicker.propTypes = {
  onPick: PropTypes.func.isRequired,
};

export default RoutePicker;
