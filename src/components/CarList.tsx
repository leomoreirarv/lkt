import React, { Component } from "react";
import { actionTypes } from '../commons/actionTypes';
import { Provider, connect } from 'react-redux';
import { ProgressBar, Colors } from 'react-native-paper';
import { createStore } from 'redux';
import { FlatList } from "react-native";
import CardItem from "./CarItem";

const initialState = {
  cards: [],
  page: 0,
  loaded: false
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCards: cards => dispatch(updateCards(cards)),
    pageIncrement: () => dispatch(pageIncrement())
  }
}

const updateCards = cards => ({ type: actionTypes.UPDATE_CARDS, payload: cards });
const pageIncrement = () => ({ type: actionTypes.PAGE_INCREMENT });

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CARDS:
      return Object.assign({}, state, {
        cards: state.cards.concat(action.payload),
        page: state.page,
        loaded: true
      });
    case actionTypes.PAGE_INCREMENT:
      return Object.assign({}, state, {
        cards: state.cards,
        page: state.page + 1,
        loaded: false
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
      page: 0,
      loaded: false
    }
  }

  componentDidMount() {
    this.updateCarsList();
  }

  updateCarsList() {
    loadCards(this.state.page).then(data => {
      store.dispatch({ type: actionTypes.UPDATE_CARDS, payload: data.cards });
      this.setState(store.getState())
    });
  }

  incrementPageList() {
    store.dispatch({ type: actionTypes.PAGE_INCREMENT });
    this.setState(store.getState());
    this.updateCarsList();
  }

  render() {
    return (
      <Provider store={store} >
        {!this.state.loaded ? (<ProgressBar indeterminate={true} color={Colors.red800} />) : null}
        <FlatList
          data={this.state.cards}
          extraData={this.state.cards}
          renderItem={(item) => <CardItem data={item} />}
          onEndReached={() => this.incrementPageList()}
        >
        </FlatList>
      </Provider>
    );
  }
}

connect(mapStateToProps, mapDispatchToProps)(CardList);

export function loadCards(page = 0) {
  return fetch(`https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=30&contains=imageUrl`)
    .then(response => response.json())
    .then(json => {
      return json
    });
}