import React, { Component } from "react";
import { View, Image } from "react-native";

export default class DetailsScreen extends Component<any> {
    static navigationOptions = {
        title: 'Details',
    };
    private card;
    constructor(props) {
        super(props)
        this.card = props.navigation.state.params;
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>
                <Image
                    style={{ flex: 1, resizeMode: 'cover' }}
                    source={{ uri: this.card.imageUrl }}
                />
            </View>
        );
    }
}
