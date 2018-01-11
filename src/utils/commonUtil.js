/**
 * Created by lei_sun on 2017/11/1.
 */
var randomArray = [];
exports.test = function(){
    console.log('test');
};
exports.getRandomNum = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
};
exports.getOtherRandomNum = function(notArray, length){
    var self = this;
    var notArrayLen = notArray.length;
    var randomIndex = self.getRandomNum(0, length - 1);
    for(var i = 0; i < notArrayLen; i++){
        if(randomIndex == notArray[i])
        {
            return self.getOtherRandomNum(notArray, length);
        }
    }
    return randomIndex;
};
exports.handleRandomArray = function(index, length, indexArray, callback){
    var self = this;
    var randomArrayLen = randomArray.length;
    var randomIndex = 0;

    if(indexArray && indexArray.newArray && indexArray.newArray.length > 0){
        var newArray = indexArray.newArray;
        var indexArrayLen = newArray.length;
        var indexArrayRandom = self.getRandomNum(0, indexArrayLen - 1);
        randomIndex = newArray[indexArrayRandom];
        length = indexArrayLen;
    }
    else if(indexArray && indexArray.notArray && indexArray.notArray.length > 0) {
        var notArray = indexArray.notArray;
        randomIndex = self.getOtherRandomNum(notArray, length);
        length = length - notArray.length;
    }
    else {
        randomIndex = self.getRandomNum(0, length - 1);
    }

    if(index == randomIndex)
    {
        return callback && callback(false);
    }
    else {
        if(randomArrayLen < length){
            for(var i = 0; i < randomArrayLen; i++){
                var storeRandomIndex = randomArray[i];
                if(storeRandomIndex == randomIndex){
                    return callback && callback(false);
                }
            }
        }
        else {
            randomArray.length = 0;
        }
        return callback && callback(true, randomIndex);
    }
};
exports.getVideoRandomNum = function(index, length, callback, indexArray){
    var self = this;

    self.handleRandomArray(index, length, indexArray, function(flag, randomIndex){

        if(!flag){
            return self.getVideoRandomNum(index, length, callback, indexArray);
        }
        else {
            randomArray.push(randomIndex);
            console.log('randomArray', JSON.stringify(randomArray));
            return callback && callback(randomIndex);
        }
    });
};