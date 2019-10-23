/***
 * 生成混淆的字体文件
 *
 * @type {XnFont}
 */

var XnFont = require('./src/xnfont');

var shuffle = require('knuth-shuffle').knuthShuffle;

var str = require('./src/unicode');

var Write = require('./src/write');


//生成单个字体文件并输出字典到json
// var xnFont = new XnFont('./fonts/msyh.ttf' , '0123456789'+shuffle(str.split('')).join('').substr(5 , 300));
// var rs = xnFont.create();
// var ws = new Write(rs);
// ws.dumpJSON();


//批量生成多个字体文件输出到sql语句
var xnFont = new XnFont('./fonts/msyh.ttf');
let rsArr = [];
for (let i = 0; i < 10; i++){
    console.log("-----正在生成第"+(i+1)+"个字体文件-----");
    let newStr = '0123456789'+shuffle(str.split('')).join('').substr(5 , 300);
    xnFont.setWords(newStr);
    rsArr.push(xnFont.create());
    console.log("-----第"+(i+1)+"个字体文件生成成功-----");
}
var ws = new Write(rsArr);
ws.dumpJSON();




