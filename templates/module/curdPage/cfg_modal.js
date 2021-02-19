module.exports = function (moduleName, gatwayName) {
  return `
{
  "title": {
    "add": "添加问题类型",
    "view": "查看问题类型",
    "edit": "修改问题类型"
  },
  "datasource": {
    "dddx": [
      "dudaoObjects"
    ],
    "ddxz": [
      "dudaoNatures"
    ]
  },
  "tabs": [
    {
      "form": [
        {
          "label": "问题类型",
          "placeholder": "请输入问题类型",
          "require": true,
          "field": "problemType",
          "control": "input",
          "max":32
        },
        {
          "label": "问题对象",
          "require": true,
          "allowClear": true,
          "field": "objId",
          "control": "select",
          "placeholder": "请选择问题对象",
          "datasource": {
            "list": "dudaoObjects",
            "value": "id",
            "name": "ddObj"
          }
        },
        {
          "label": "问题性质",
          "require": true,
          "allowClear": true,
          "field": "natureId",
          "control": "select",
          "placeholder": "请选择问题性质",
          "datasource": {
            "list": "dudaoNatures",
            "value": "id",
            "name": "problemNature"
          }
        }
      ]
    }
  ]
}
  ` 
}