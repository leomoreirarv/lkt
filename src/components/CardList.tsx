import React, { Component } from "react";
import { actionTypes } from '../commons/actionTypes';
import { Provider, connect } from 'react-redux';
import { ProgressBar, Colors } from 'react-native-paper';
import { createStore } from 'redux';
import { FlatList } from "react-native";
import CardItem from "./CardItem";
import Toast from 'react-native-simple-toast';
import SearchForm from "./SearchForm";
import CardsService from "../core/network/CardsService";

const service = new CardsService();

const initialState = {
  cards: [],
  page: 0,
  loaded: false,
  search: ''
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCards: cards => dispatch(updateCards(cards)),
    pageIncrement: () => dispatch(pageIncrement()),
    searchCard: search => dispatch(searchCard(search))
  }
}

const updateCards = cards => ({ type: actionTypes.UPDATE_CARDS, payload: cards });
const pageIncrement = () => ({ type: actionTypes.PAGE_INCREMENT });
const searchCard = search => ({ type: actionTypes.SEARCH_CARD, payload: search });

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CARDS:
      return Object.assign({}, state, {
        cards: state.cards.concat(action.payload),
        page: state.page,
        loaded: true,
        search: ''
      });
    case actionTypes.PAGE_INCREMENT:
      return Object.assign({}, state, {
        cards: state.cards,
        page: state.page + 1,
        loaded: false,
        search: ''
      });
    case actionTypes.SEARCH_CARD:
      const { cards, search } = action.payload;
      return Object.assign({}, state, {
        cards: cards,
        page: 0,
        loaded: true,
        search: search
      })
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    loaded: state.loaded,
    page: state.page,
    search: state.search
  }
}

const store = createStore(rootReducer);

export function loadCards(page = 0, search = '') {
  return service.loadCards(page, search);
}

export default class CardList extends Component<any> {
  state;
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      page: 0,
      loaded: false,
      search: ''
    }
  }

  componentDidMount() {
    this.updateCarsList();
  }

  updateCarsList() {
    loadCards(this.state.page, this.state.search).then(data => {
      store.dispatch({ type: actionTypes.UPDATE_CARDS, payload: data.cards });
      this.setState(store.getState())
    });
  }

  incrementPageList() {
    Toast.show('Loading more cards.', Toast.LONG);
    store.dispatch({ type: actionTypes.PAGE_INCREMENT });
    this.setState(store.getState());
    this.updateCarsList();
  }

  searchCard = search => {
    Toast.show('Searching cards...', Toast.LONG);
    this.setState({ search, loaded: false });
    loadCards(0, search).then(data => {
      store.dispatch({ type: actionTypes.SEARCH_CARD, payload: { cards: data.cards, search: search } });
      this.setState(store.getState())
    });
  }

  onTextSearchChanges = search => {
    this.setState({ search });
  }

  cancelSearch = () => {
    this.setState({ search: '' });
    this.updateCarsList();
  }

  render() {
    const { search, cards, loaded } = this.state;
    const { navigate } = this.props;
    return (
      <Provider store={store} >
        {!loaded ? (<ProgressBar indeterminate={true} color={Colors.red800} />) : null}
        <SearchForm
          value={search}
          onChangeTextCallback={this.onTextSearchChanges}
          isLoaded={loaded}
          onSearchTrigged={() => this.searchCard(search)} />
        {/* <View>
          <TextInput
            value={search}
            onChangeText={this.onTextSearchChanges}
            style={{ padding: 8, margin: 8, borderBottomWidth: 1 }}
            placeholder={loaded ? 'Search a card by name' : 'Please wait, loading cards...'}
          />
          <Button
            onPress={() => this.searchCard(search)}
            style={{ flex: 1 }}
            title='Search'
          />
        </View> */}
        <FlatList
          data={cards}
          extraData={cards}
          renderItem={(item) => <CardItem navigate={navigate} data={item} />}
          onEndReached={() => this.incrementPageList()}
        >
        </FlatList>
      </Provider>
    );
  }
}

connect(mapStateToProps, mapDispatchToProps)(CardList);