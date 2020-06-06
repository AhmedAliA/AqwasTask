/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("pk.eyJ1IjoiYWhtZWRtYWxpYTIyMiIsImEiOiJja2F5MnB3amswYTMyMnFwNnJndDZ3eXE0In0.suvmRVmd1Td-Yfg1IyUZ-g");

import AppNavigation from './src/navigation/navigator';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    return (

      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
};
