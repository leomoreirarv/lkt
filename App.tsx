import React, { Component } from 'react';
import { ThemeProvider, Header } from 'react-native-elements';
import CardList from './src/components/CarList';

export default class App extends Component {
  data: any;
  isLoaded: Boolean = false;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider>
        <Header
          centerComponent={{ text: 'Magic: The Gathering', style: { color: '#fff' } }}
        />
        <CardList/>
      </ThemeProvider>
    );
  }
}
