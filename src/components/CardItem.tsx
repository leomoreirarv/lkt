import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { View, Text } from "react-native";
import IconsList from "./IconsList";

export default class CardItem extends Component<any> {
  constructor(props) {
    super(props);
  }

  render() {
    const navigate = this.props.navigate;
    const card = this.props.data.item;
    return (
      <ListItem
        title={card.name}
        subtitle={
          <View>
            <Text>{card.setName}</Text>
            <Text>Type: { card.types.map( type => `${type} ` )}</Text>
            <IconsList data={card}/>
          </View>
        }
        onPress={() => navigate('Details', card)}
        leftAvatar={{
          source: card.imageUrl && { uri: card.imageUrl },
          title: card.name
        }}
        bottomDivider
      />
    );
  }
}