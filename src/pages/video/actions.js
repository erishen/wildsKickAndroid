/**
 * Created by lei_sun on 2018/1/10.
 */

import config from '../../utils/config';

export const setDuration = 'setDuration';
export const setDurationAction = (params) => ({
    type: setDuration,
    ...params
});

export const setCurrentTime = 'setCurrentTime';
export const setCurrentTimeAction = (params) => ({
    type: setCurrentTime,
    ...params
});

export const setPaused = 'setPaused';
export const setPausedAction = (params) => ({
    type: setPaused,
    ...params
});

var getVideoIndexFiles = function(callback) {
    var url = 'http://' + config.ip + ':3000/getVideoIndexFiles';
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log('responseJson', responseJson);
            return callback && callback(responseJson);
        })
        .catch((error) => {
            console.log('error', error);
            return callback && callback(null);
        });
}

export const getIndexFiles = 'getIndexFiles';
export const getIndexFilesAction = (params) => {
    return function(dispatch){
        getVideoIndexFiles(function(result){
            if(result){
                if(params == undefined)
                    params = {};
                params.indexFiles = result;
            }

            dispatch({
                type: getIndexFiles,
                ...params
            });
        });
    };
};
