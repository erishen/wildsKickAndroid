/**
 * Created by lei_sun on 2018/1/10.
 */
'use strict';

import React, {
    Component
} from 'react';

import {
    Platform,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Video from './src/pages/video';
import CommonStyle from './src/styles/commonStyle';

export default class App extends Component<{}> {
    render() {
        return (
            <View style={CommonStyle.container}>
                <Video/>
            </View>
        );
    }
}