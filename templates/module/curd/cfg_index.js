module.exports = function (moduleName, gatwayName, moduleZhName) {
  let capitalModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  return `
{
  "windowTitle": "${moduleZhName}配置",
  "title": "${moduleZhName}配置",
  "name": "${moduleZhName}",
  "pagination": true,
  "init": {
    "dispatch": [
      "${gatwayName}/get${capitalModuleName}s",
    ]
  },
  "datasource": {
    "${moduleName}": [
      "${moduleName}s",
    ]
  },
  "queryContent": {
    "form": [
      {
        "label": "${moduleZhName}",
        "require": false,
        "field": "${moduleName}",
        "control": "input",
        "placeholder": "请输入${moduleZhName}"
      }
    ],
    "dispatch": "${gatwayName}/get${capitalModuleName}s",
    "payload": {
      "${moduleName}": "${moduleName}"
    }
  },
  "operateContent": [
    {
      "name": "添加${moduleZhName}",
      "type": "primary",
      "icon": "plus",
      "cmd": "add"
    }
  ],
  "tableColumns": [
    {
      "title": "id",
      "dataIndex": "id",
      "key": "id"
    },
    {
      "title": "${moduleZhName}",
      "dataIndex": "name",
      "key": "name"
    },
    {
      "title": "操作",
      "key": "action",
      "width": 150,
      "operateList": [
        {
          "name": "查看",
          "cmd": "view"
        },
        {
          "name": "修改",
          "cmd": "edit"
        },
        {
          "name": "删除",
          "Popconfirm": "确认要删除该${moduleZhName}吗？",
          "cmd": "delete"
        }
      ]
    }
  ],
  "tableData": {
    "tree": false,
    "datasource": {
      "list": "${moduleName}"
    }
  },
  "cmd": {
    "add": {
      "dispatch": "${gatwayName}/add${capitalModuleName}",
      "payload": [
        {
          "field": "ask",
          "type": "string",
          "require": false
        },
        {
          "field": "code",
          "type": "string",
          "require": false
        },
        {
          "field": "createdBy",
          "type": "string",
          "require": true
        },
        {
          "field": "problemType",
          "type": "string",
          "require": true
        },
        {
          "field": "objId",
          "type": "int",
          "require": true
        },
        {
          "field": "scoreLevel",
          "type": "string",
          "require": false
        },
        {
          "field": "natureId",
          "type": "int",
          "require": true
        },
        {
          "field": "updatedBy",
          "type": "string",
          "require": true
        }
      ]
    },
    "edit": {
      "dispatch": "${gatwayName}/edit${capitalModuleName}",
      "payload": [
        {
          "field": "ask",
          "type": "string",
          "require": false
        },
        {
          "field": "code",
          "type": "string",
          "require": false
        },
        {
          "field": "createdBy",
          "type": "string",
          "require": true
        },
        {
          "field": "problemType",
          "type": "string",
          "require": true
        },
        {
          "field": "objId",
          "type": "int",
          "require": true
        },
        {
          "field": "natureId",
          "type": "int",
          "require": true
        },
        {
          "field": "scoreLevel",
          "type": "string",
          "require": false
        },
        {
          "field": "updatedBy",
          "type": "string",
          "require": true
        }
      ]
    },
    "delete": {
      "dispatch": "${gatwayName}/delete${capitalModuleName}",
      "payload": "id"
    },
    "view": {
      "dispatch": "${gatwayName}/add${capitalModuleName}",
      "payload": "id"
    }
  }
}
  ` 
}