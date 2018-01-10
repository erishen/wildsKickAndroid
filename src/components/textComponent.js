/**
 * Created by lei_sun on 2017/11/1.
 */
import React, { Component } from 'react';
import {
    Platform,
    Text
} from 'react-native';

export default class TextComponent extends Component<{}> {
    render() {
        let { style, value } = this.props;

        return (
            <Text style={style}>
                {value}
            </Text>
        );
    }
}