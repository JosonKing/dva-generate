module.exports = function (moduleName, moduleZhName) {
  let capitalModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  return `
{
  "title": {
    "add": "添加${moduleZhName}",
    "view": "查看${moduleZhName}",
    "edit": "修改${moduleZhName}"
  },
  "datasource": {
    "${moduleName}": [
      "${moduleName}s"
    ]
  },
  "tabs": [
    {
      "form": [
        {
          "label": "${moduleZhName}",
          "placeholder": "请输入${moduleZhName}",
          "require": true,
          "field": "${moduleZhName}",
          "control": "input",
          "max":32
        }
      ]
    }
  ]
}
  ` 
}