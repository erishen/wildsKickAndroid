/**
 * Created by lei_sun on 2018/1/10.
 */

import { combineReducers } from 'redux';
import _ from 'lodash';
import {
    setDuration, setCurrentTime, setPaused,
    getIndexFiles
} from './actions';

var defaultVideoOption = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true
};

const videoOption = (state = defaultVideoOption, action) => {
    switch (action.type) {
        case setDuration:
            var newState = _.cloneDeep(state);
            newState.duration += action.duration;
            return newState;
        case setCurrentTime:
            var newState = _.cloneDeep(state);
            newState.currentTime += action.currentTime;
            return newState;
        case setPaused:
            var newState = _.cloneDeep(state);
            newState.paused = action.paused;
            return newState;
        default:
            return state
    }
};

const videoIndexFiles = (state = {}, action) => {
    switch (action.type){
        case getIndexFiles:
            var newState = _.cloneDeep(state);
            newState.indexFiles = action.indexFiles;
            return newState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    videoOption,
    videoIndexFiles
});

export default rootReducer;