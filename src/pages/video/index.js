/**
 * Created by lei_sun on 2017/11/6.
 */
import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import store from './store';
import * as actions from './actions';

import CommonStyle from '../../styles/commonStyle';
import VideoStyle from '../../styles/videoStyle';
import TextComponent from '../../components/textComponent';
import CommonUtil from '../../utils/commonUtil';

export default class VideoPage extends Component<{}> {
    constructor(props){
        super(props);
        this.state = store.getState();
        store.dispatch(actions.initPageInfo());
    }

    componentWillMount() {}

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        CommonUtil.test();
        let { renderPlaceholderOnly, pageNum } = this.state;

        return (
            <View style={CommonStyle.container}>
                <TextComponent style={VideoStyle.instructions} value={'video-' + pageNum} />
                <Image style={VideoStyle.image} source={{ uri: 'https://pages.c-ctrip.com/you/livestream/videolist-cover.png' }} />
                <TouchableOpacity
                    onPress = {() => { store.dispatch(actions.addPageNum()); }}
                    style={CommonStyle.button}>
                    <Text style={CommonStyle.text}>Add Page Num</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {() => { store.dispatch(actions.subtractPageNum()); }}
                    style={CommonStyle.button}>
                    <Text style={CommonStyle.text}>Subtract Page Num</Text>
                </TouchableOpacity>
            </View>
        );
    }
}