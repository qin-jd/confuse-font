/***
 * 字体文件类,根据指定的ttf文件随机混淆
 * @constructor
 */

var Font = require('fonteditor-core').Font;
var TTF = require('fonteditor-core').TTF;
var fs = require('fs');
var shuffle = require('knuth-shuffle').knuthShuffle;
var md5 = require('crypto-js/md5');


function XnFont(path , words) {
    if(path){
        this.path = path;
    }
    if(words){
        this.words = words;
    }
}

/***
 * 设置字体文件的路径
 *
 * @param path
 * @returns {XnFont}
 */
XnFont.prototype.setPath = function (path) {
    this.path = path;
    return this;
};

/***
 * 设置需要进行混淆的文字
 *
 * @param words
 * @returns {XnFont}
 */
XnFont.prototype.setWords = function (words) {
    this.words = words;
    return this;
};

/***
 * 获取ttf的模板字体对象
 *
 * @returns {Font}
 */
XnFont.prototype.getTplFont = function () {
    var buffer = fs.readFileSync(this.path);
    return Font.create(buffer, {
        type: 'ttf', // support ttf,woff,eot,otf,svg
        hinting: true, // save font hinting
        compound2simple: true, // transform ttf compound glyf to simple
        inflate: null, // inflate function for woff
        combinePath: false, // for svg path
    });
};

/***
 * 获取需要生成的文字的十六进制的unicode码
 *
 * @returns {string[] | *}[ '$31', '$32', '$33', '$34', '$35', '$36', '$37', '$38', '$39' ]
 */
XnFont.prototype.getUnicode = function () {
    var wordsArr = Array.isArray(this.words) ? this.words : this.words.split('');
    unicodeArr = wordsArr.map(function (char) {
        return '$'+char.toString().charCodeAt(0).toString(16);
    });
    return unicodeArr;
};

/***
 * 将需要混淆的字符进行洗牌,返回洗牌后的文字十进制的unicode码
 *
 * @returns {Array}
 */
XnFont.prototype.shuffle = function () {
    var wordsArr = Array.isArray(this.words) ? this.words : this.words.split('');
    wordsArr = shuffle(wordsArr);
    unicodeArr = wordsArr.map(function (char) {
        return char.toString().charCodeAt(0);
    });
    return unicodeArr;
};

/***
 * 将字形写入文件
 *
 * @param glyfArr
 * @returns {string}
 */
XnFont.prototype.write = function (glyfArr) {
    var newFont = Font.create();
    var ttfObject = newFont.get();
    var ttf = new TTF(ttfObject);
    ttf.setName({
        "fontFamily": "xuannaer",
        "fontSubFamily": "Medium",
        "uniqueSubFamily": "xuannaer",
        "version": "Version 1.0",
        "postScriptName": "xuannaer",
        "fullName": "xuannaer"
    });
    ttf.appendGlyf(glyfArr);
    //调整字体大小
    ttf.adjustGlyf([...Array(glyfArr.length).keys()],{scale:0.495});
    newFont.set(ttf.get());

    //获取新文件的名字
    var wordsStr = Array.isArray(this.words) ? this.words.join('') : this.words;
    var fileName = md5(wordsStr+Math.round(new Date())).toString().substr(8 , 16);
    //创建目录
    fs.mkdir('./fonts/'+fileName+'/');

    ['woff', 'eot', 'svg', 'ttf', 'symbol'].forEach((fileType) => {
        var name =  'font.' + fileType;
        buffer = newFont.write({
            type:fileType
        });
        fs.writeFile('./fonts/'+fileName+'/'+name, buffer , (err) => {
            if (err) throw err;
        });
    });

    return fileName;
};


/***
 * 生成字体文件并返回字元的字典
 *
 * @returns {{dict, name: string}}
 */
XnFont.prototype.create = function () {
    var dict = {};

    //1.获取TTF模板
    var tpl = this.getTplFont();

    //2.获取需要混淆的字体Unicode码
    var unicodeArr = this.getUnicode();

    //3.从TTF模板里筛选出需要混淆的字形
    var glyfArr = tpl.find({
        unicode : unicodeArr
    });

    //4.将文字进行洗牌
    var shuffledWords = this.shuffle();

    //5.将字形的码元进行混淆
    for(var i in glyfArr){
        dict[String.fromCharCode(glyfArr[i].unicode[0])] = String.fromCharCode(shuffledWords[i]);
        glyfArr[i].unicode = [shuffledWords[i]];
        glyfArr[i].name = '*';
    }

    //6.将字形导出
    var fileName = this.write(glyfArr);

    return {
        dict : dict,
        name : fileName
    };
}


module.exports = XnFont;