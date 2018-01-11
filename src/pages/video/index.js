/**
 * Created by lei_sun on 2018/1/10.
 */

import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Video from 'react-native-video';

import store from './store';
import * as actions from './actions';
import VideoStyle from '../../styles/videoStyle';
import config from '../../utils/config';

export default class VideoPage extends Component<{}> {
    constructor(props){
        super(props);
        this.state = store.getState();
    }

    componentWillMount() {
        console.log('state', this.state);
        store.dispatch(actions.getIndexFilesAction());
        store.dispatch(actions.getIndexAction());
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onLoad = (data) => {
        store.dispatch(actions.setDurationAction({ duration: data.duration }));
    };

    onProgress = (data) => {
        store.dispatch(actions.setCurrentTimeAction({ currentTime: data.currentTime }));
    };

    onEnd = () => {
        store.dispatch(actions.setPausedAction({ paused: true, end: true }));
        this.video.seek(0);
    };

    onAudioBecomingNoisy = () => {
        store.dispatch(actions.setPausedAction({ paused: true }));
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        store.dispatch(actions.setPausedAction({ paused: !event.hasAudioFocus }));
    };

    onPressVideo = () => {
        let { videoOption } = this.state;
        store.dispatch(actions.setPausedAction({ paused: !videoOption.paused }));
    };

    render() {
        let { videoOption, videoIndexFiles } = this.state;
        //console.log('videoOption', videoOption, videoIndexFiles);

        var urlPrefix = 'http://' + config.ip + ':9999';
        var playUrl = urlPrefix + '/movie/IMG_4597.mp4';
        var playType = 'mp4';
        var pathName = videoIndexFiles.pathName;

        if(pathName != undefined){
            playUrl = urlPrefix + pathName;
        }
        //console.log('playUrl', playUrl);

        return (
            <View style={VideoStyle.fullScreen}>
                <TouchableOpacity
                    style={VideoStyle.fullScreen}
                    onPress={this.onPressVideo}>
                    <Video
                        ref={(ref: Video) => { this.video = ref }}
                        source={{ uri: playUrl, type: playType }}
                        style={VideoStyle.fullScreen}
                        rate={videoOption.rate}
                        paused={videoOption.paused}
                        volume={videoOption.volume}
                        muted={videoOption.muted}
                        resizeMode={videoOption.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}