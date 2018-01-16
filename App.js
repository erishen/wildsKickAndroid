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
    WebView,
    Dimensions,
    TouchableOpacity
} from 'react-native';

//获取设备的宽度和高度
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

import Video from './src/pages/video';
import CommonStyle from './src/styles/commonStyle';

export default class App extends Component<{}> {
    render() {
        return (
            <View style={CommonStyle.container}>
                <Video style={{ width: deviceWidth, height: deviceHeight }}></Video>
                {/*<WebView bounces={false}
                         scalesPageToFit={true}
                         mediaPlaybackRequiresUserAction={false}
                         domStorageEnabled={true}
                         mixedContentMode={'always'}
                         startInLoadingState={true}
                         source={{uri:"http://10.32.64.22:3000/video",method: 'GET'}}
                         onLoad={()=>{
                             console.log('onLoad');
                         }}
                         onLoadStart={()=>{
                             console.log('onLoadStart');
                         }}
                         onLoadEnd={()=>{
                             console.log('onLoadEnd');
                         }}
                         onError={(e)=>{
                             console.log('onError', e);
                         }}
                         renderError={()=>{
                             console.log('renderError');
                         }}
                         style={{width:deviceWidth, height:deviceHeight}}>
                </WebView>*/}
            </View>
        );
    }
}