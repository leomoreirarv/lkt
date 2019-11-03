import React, { Component } from "react"
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { colorsMap } from '../core/commons/colorsMap';

export default class IconsList extends Component<any> {

    constructor(props) {
        super(props);
    }

    render() {
        const card = this.props.data;
        return (
            <View style={{ alignContent: "flex-start", flexDirection: "row" }}>
                {card.colors.map((color, index) => 
                    <Icon
                        key={index}
                        name='tint'
                        type='font-awesome'
                        size={ 20 }
                        reverseColor={colorsMap[color]}
                        reverse 
                        color={colorsMap.Grey}
                    />
                )}
            </View>
        );
    }
}
