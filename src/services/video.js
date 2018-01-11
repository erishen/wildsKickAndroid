/**
 * Created by lei_sun on 2018/1/11.
 */
import config from '../utils/config';

var urlPrefix = 'http://' + config.ip + ':3000/';

var fetchJson = function(url, sucCallback, errCallback){
    return fetch(urlPrefix + url)
        .then((response) => response.json())
        .then((responseJson) => {
            return sucCallback && sucCallback(responseJson);
        })
        .catch((error) => {
            console.log('error', error);
            return errCallback && errCallback();
        });
};

var fetchPost = function(url, data, sucCallback, errCallback){
    return fetch(urlPrefix + url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function(response) {
        return response.json();
    }).then(function(responseJson) {
        return sucCallback && sucCallback(responseJson);
    }).catch((error) => {
        console.log('error', error);
        return errCallback && errCallback();
    });
};

exports.getVideoIndexFiles = function(callback) {
    fetchJson('getVideoIndexFiles', callback);
};

exports.getVideoIndex = function(callback){
    fetchJson('getVideoIndex', callback);
};

exports.setVideoIndex = function(data, callback){
    fetchPost('setVideoIndex', data, callback);
};
