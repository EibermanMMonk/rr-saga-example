import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';

import logo from './logo.svg';
import { WEATHER_FETCH_REQUESTED } from './store';

interface IAppProps {
  loading: false,
  weather: any,
  getTemperatureAction?: any,
}

const getTemperatureAction = () => {
  return {
    type: WEATHER_FETCH_REQUESTED,
  };
};

class App extends React.Component<IAppProps>{
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.props.loading && <h3>Loading Temperature...</h3>}
          {this.props.weather && this.props.weather.temp && <h3>The temperature is {this.props.weather.temp} {this.props.weather.meter}</h3>}
          <button onClick={this.props.getTemperatureAction}>Look Again please!</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.loading,
  weather: state.weather,
});

const mapDispatchToProps = {
  getTemperatureAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
