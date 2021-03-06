import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map'

class WeatherList extends Component {

    renderWeather(cityData) {
        const name = cityData.city.name;
        const temp = cityData.list.map(weather => weather.main.temp-273);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const {lon,lat} = cityData.city.coord;

        console.log(humidity);

        return (
            <tr key={name}>
                <td><GoogleMap lat={lat} lng={lon}/></td>
                <td><Chart data={temp} color="black" units="C" /></td>
                <td><Chart data={pressure} color="orange" units="hPa"/></td>
                <td><Chart data={humidity} color="blue" units="%" /></td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (C)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}


function mapStateToProps(state) {
  return {
    weather: state.weather
  };
}


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ props: props }, dispatch);
// }

export default connect(mapStateToProps)(WeatherList);