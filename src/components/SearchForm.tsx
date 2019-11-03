import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-elements";

export default class SearchForm extends Component<any> {
    constructor(props) {
        super(props);
    }
    render() {
        const { isLoaded, onChangeTextCallback, onSearchTrigged, value } = this.props;
        return (
            <View>
                <TextInput
                    value={value}
                    onChangeText={onChangeTextCallback}
                    style={{ padding: 8, margin: 8, borderBottomWidth: 1 }}
                    placeholder={isLoaded ? 'Search a card by name' : 'Please wait, loading cards...'}
                    editable={isLoaded}
                />
                <Button
                    onPress={() => onSearchTrigged(value)}
                    style={{ flex: 1 }}
                    title='Search'
                />
            </View>
        );
    }
}