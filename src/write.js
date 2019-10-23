/***
 * 输出字典
 * @constructor
 */

var sqlFile = './dump/dump.sql';
var tempFile = './dump/template.sql';
var jsonFile = './dump/fontIndex.json';
var jsonFolder = './dump/fontDict/';
var fs = require('fs');

function Write(value) {
    this.value = value;
}

/**
 * 输出sql语句
 */
Write.prototype.dumpSql = function (){
    var sqlStr = '';

    sqlStr += "\n"
            + "--\n"
            + "-- "
            + new Date().toLocaleString()
            +"\n"
            + "--\n";


    if(!Array.isArray(this.value)){
        this.value = [this.value];
    }

    sqlStr += "INSERT INTO `xn_font` (`name`, `dict`) VALUES \n";

    for(let i in this.value){
        let v = this.value[i];
        sqlStr += `('${v.name}', '${JSON.stringify(v.dict)}')`;
        sqlStr += i == this.value.length-1 ? "; \n" : ", \n";
    }

    fs.access(sqlFile, fs.constants.F_OK, (err) => {
        if(err){
            //文件不存在
            fs.copyFile(tempFile, sqlFile, (err) => {
                if (err) throw err;
                fs.appendFile(sqlFile, sqlStr , (err) => {
                    if (err) throw err;
                });
            });
        }
    });


}

/**
 * 输出json文件
 *
 * 文件格式为
 * {
 *      names : ['537bd952e8016056' , '3bd3886991ba7842' , '2d2bfa29a49acdf5'],
 *      '537bd952e8016056' : {},
 *      '3bd3886991ba7842' : {},
 *      '2d2bfa29a49acdf5' : {}
 * }
 */
Write.prototype.dumpJSON= function (){
    fs.open(jsonFile, 'r', (err, fd) => {
        if (err) {
            //文件不存在
            if (err.code === 'ENOENT') {
                var jsonObj = {
                    'names' : []
                };
            }
        }else{
            //文件存在
            var jsonObj = JSON.parse(fs.readFileSync(jsonFile , 'utf8'));
        }

        if(!Array.isArray(this.value)){
            this.value = [this.value];
        }

        for(let v of this.value){
            jsonObj.names.push(v.name);
            fs.writeFileSync(jsonFolder+v.name+'.json' , JSON.stringify(v.dict));
        }

        fs.writeFile(jsonFile, JSON.stringify(jsonObj) , (err) => {
            if (err) throw err;
        });
    });
}

module.exports = Write;


