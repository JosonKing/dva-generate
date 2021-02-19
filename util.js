
var path = require('path');
var fs = require("fs");

/**
 * 判读路径是否存在,如不存在创建文件夹
 * @param pathStr 参数要用path.join()拼接,项目下的相对路径
 * @return projectPath 返回绝对路径,可要可不要
 */
function mkdirPath(pathStr) {
  var projectPath = path.join(process.cwd());
  var tempDirArray = pathStr.split('\\');
  for (var i = 0; i < tempDirArray.length; i++) {
    projectPath = projectPath+'/'+tempDirArray[i];
    if (fs.existsSync(projectPath)) {
      var tempstats = fs.statSync(projectPath);
      if (!(tempstats.isDirectory())) {
        fs.unlinkSync(projectPath);
        fs.mkdirSync(projectPath);
      }
    }
    else{
      fs.mkdirSync(projectPath);
    }
  }
  return projectPath;
}

function curDate() {
  var curDate = new Date();
  let year = curDate.getFullYear();
  let moment = curDate.getMonth() + 1;
  let day = curDate.getDate();
  return year + (moment > 9 ? moment : '0' + moment) + (day > 9 ? day : '0' + day);
}

module.exports = {
  mkdirPath,
  curDate,
}