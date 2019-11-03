import React, { Component } from "react";
import { ListItem } from "react-native-elements";

export default class CardItem extends Component<any> {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <ListItem
          title={this.props.data.item.name}
          subtitle={this.props.data.item.text}
          leftAvatar={{
            source: this.props.data.item.imageUrl && { uri: this.props.data.item.imageUrl },
            title: this.props.data.item.name
          }}
          bottomDivider
          chevron
        />
      );
    }
  }