import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-elements';
import CardList from './CarList';
import FilterMenu from './FilterMenu';

export default class HomeScreen extends Component<any> {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ThemeProvider>
        <CardList navigate={navigate} />
      </ThemeProvider>
    );
  }
}
