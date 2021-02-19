const util = require("../../../util");

module.exports = function (moduleZhName) {
  return `
## 名称
name=${moduleZhName}

## 描述

## 参数

## 更新日志
- ${util.curDate()} 1.0.1 初始版本
  ` 
}