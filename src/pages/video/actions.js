/**
 * Created by lei_sun on 2018/1/10.
 */

import config from '../../utils/config';
import commonUtil from '../../utils/commonUtil';
import videoService from '../../services/video';

var indexFiles = null; // 获取后端存储的 index, files, status
var currentIndex = 0; // 当前播放的序号
var currentStatus = ''; // 当前播放状态
var getVideoIndexTimeout = null; // 获取Index定时器
var newIndex = 0; // 新的播放序号
var newStatus = ''; // 新的播放状态
var endFlag = false; // 是否播放结束

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
export const setPausedAction = (params) => {

    if(params){
        if(params.end != undefined)
            endFlag = params.end;

        if(params.paused == false)
            endFlag = false;
    }

    return {
        type: setPaused,
        ...params
    };
};

var pausedAction = function(dispatch, flag){
    var params = {};
    params.paused = flag;
    dispatch({
        type: setPaused,
        ...params
    });
};

export const getIndexFiles = 'getIndexFiles';
export const getIndexFilesAction = (params) => {
    return function(dispatch){
        videoService.getVideoIndexFiles(function(result){
            console.log('getVideoIndexFiles', result);

            if(result){
                if(params == undefined)
                    params = {};

                var files = result.files;
                var index = result.index;
                var status = result.status;
                var filesLen = files.length;
                if(index < filesLen){
                    var file = files[index];
                    params.pathName = file.pathName;
                }
                indexFiles = result;
                currentIndex = parseInt(index, 0);
                currentStatus = status;

                dispatch({
                    type: getIndexFiles,
                    ...params
                });
            }
        });
    };
};

var setVideoIndex = function(callback){
    console.log('setVideoIndex', currentIndex, currentStatus);
    videoService.setVideoIndex({ index: parseInt(currentIndex, 10), status: currentStatus }, callback);
};

var setRandom = function(dispatch, params, files){
    var filesLen = files.length;
    commonUtil.getVideoRandomNum(currentIndex, filesLen, function (randomIndex) {
        console.log('randomIndex', randomIndex);
        if(randomIndex < filesLen) {
            currentIndex = randomIndex;
            setVideoIndex(function(){
                var file = files[currentIndex];

                if(params == undefined)
                    params = {};

                params.pathName = file.pathName;
                dispatch({
                    type: getNextPathName,
                    ...params
                });
            });
        }
    });
};

var setPre = function(dispatch, params, files){
    var filesLen = files.length;
    if(currentIndex >= 1) {
        currentIndex--;
    }
    else {
        currentIndex = filesLen - 1;
    }
    setVideoIndex(function(){
        var file = files[currentIndex];

        if(params == undefined)
            params = {};

        params.pathName = file.pathName;
        dispatch({
            type: getNextPathName,
            ...params
        });
    });
};

var setNext = function(dispatch, params, files){
    var filesLen = files.length;
    if(currentIndex <= filesLen - 2) {
        currentIndex++;
    }
    else {
        currentIndex = 0;
    }
    setVideoIndex(function(){
        var file = files[currentIndex];

        if(params == undefined)
            params = {};

        params.pathName = file.pathName;
        dispatch({
            type: getNextPathName,
            ...params
        });
    });
};

var nextPathNameAction = function(dispatch, params){
    if(indexFiles){
        var files = indexFiles.files;

        if(files && files.length > 0){
            switch (currentStatus) {
                case 'random':
                    setRandom(dispatch, params, files);
                    break;
                case 'pre':
                    setPre(dispatch, params, files);
                    break;
                case 'next':
                    setNext(dispatch, params, files);
                    break;
                default:
                    setRandom(dispatch, params, files);
                    break;
            }
        }
    }
};

export const getNextPathName = 'getNextPathName';
export const getNextPathNameAction = (params) => {
    return function(dispatch) {
        console.log('indexFiles', indexFiles, currentIndex, currentStatus);
        nextPathNameAction(dispatch, params);
    }
};

var getVideoIndex = function(params, dispatch){
    if(getVideoIndexTimeout != null){
        clearTimeout(getVideoIndexTimeout);
        getVideoIndexTimeout = null;
    }

    videoService.getVideoIndex(function(result){
        console.log('getVideoIndex', result, currentStatus, currentIndex);
        if(result){
            var index = result.index;
            var status = result.status;

            newIndex = parseInt(index, 10);
            newStatus = status;

            if(newIndex != currentIndex)
            {
                currentIndex = newIndex;
                var files = indexFiles.files;
                var filesLen = files.length;

                if(currentIndex < filesLen){
                    pausedAction(dispatch, true);

                    if(params == undefined)
                        params = {};

                    var file = files[currentIndex];
                    params.pathName = file.pathName;
                    console.log('file.pathName', file.pathName);

                    dispatch({
                        type: getNextPathName,
                        ...params
                    });

                    pausedAction(dispatch, false);
                }
            }

            if(newStatus == 'play')
                pausedAction(dispatch, false);
            else if(newStatus == 'pause')
                pausedAction(dispatch, true);
            else {
                if(newStatus != currentStatus){
                    currentStatus = newStatus;
                }

                if(endFlag){
                    endFlag = false;
                    nextPathNameAction(dispatch, params);
                    pausedAction(dispatch, false);
                }
            }
        }

        getVideoIndexTimeout = setTimeout(function(){
            getVideoIndex(params, dispatch);
        }, 3000);
    });
};

export const getIndex = 'getIndex';
export const getIndexAction = (params) => {
    return function(dispatch){
        getVideoIndex(params, dispatch);
    };
};