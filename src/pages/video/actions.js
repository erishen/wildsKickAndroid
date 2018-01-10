/**
 * Created by lei_sun on 2018/1/10.
 */

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
    return fetch('http://172.25.143.1:3000/getVideoIndexFiles')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('responseJson', responseJson);
            return callback && callback(responseJson);
        })
        .catch((error) => {
            console.error('error', error);
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
