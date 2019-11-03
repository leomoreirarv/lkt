import React, { Component } from "react";
import { actionTypes } from '../commons/actionTypes';
import { Provider, connect } from 'react-redux';
import { ProgressBar, Colors } from 'react-native-paper';
import { createStore } from 'redux';
import { FlatList } from "react-native";
import CardItem from "./CarItem";

const initialState = {
  cards: [],
  loaded: false
}

const mapDispatchToProps = (dispatch, cards) => {
  return {
    updateCards: cards => dispatch(updateCards(cards))
  }
}

const updateCards = cards => ({ type: actionTypes.UPDATE_CARDS, payload: cards });

const rootReducer = (state = initialState, action) => {
  if (action.type === actionTypes.UPDATE_CARDS) {
    return Object.assign({}, state, {
      cards: state.cards.concat(action.payload),
      loaded: true
    });
  }
}

const mapStateToProps = state => {
  return { cards: state.cards, loaded: state.loaded }
}

const store = createStore(rootReducer);


export default class CardList extends Component<any> {
  state;
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      loaded: false
    }
  }

  componentDidMount() {
    loadCards().then(data => {
      store.dispatch({ type: actionTypes.UPDATE_CARDS, payload: data.cards });
      this.setState(store.getState())
      console.log(this.state);
    });
  }

  render() {
    return (
      <Provider store={store} >
        {!this.state.loaded ? (<ProgressBar indeterminate={true} color={Colors.red800} />) : (
          <FlatList
            data={this.state.cards}
            extraData={this.state.cards}
            renderItem={(item) => <CardItem data={item} />}
          >
          </FlatList>
        )
        }
      </Provider>
    );
  }
}

connect(mapStateToProps, mapDispatchToProps)(CardList);

export function loadCards() {
  return fetch("https://api.magicthegathering.io/v1/cards?page=0&pageSize=30&contains=imageUrl")
    .then(response => response.json())
    .then(json => {
      return json
    });
}