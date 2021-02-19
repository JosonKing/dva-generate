#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const util = require("./util");

// 引入model模板文件
const modelTemplates = require('./templates/model/index');
// 引入module模板文件
const moduleTemplates = require('./templates/module/index');
// 处理文件
const fs = require("fs");

// model命令行选择列表
let modelPrompList = [
  {
      type:'list',
      name: 'template',
      message: 'please select template:',
      choices: modelTemplates,
      default: modelTemplates[0]
  }
]
// module命令行选择列表
let modulePrompList = [
  {
      type:'list',
      name: 'template',
      message: 'please select template:',
      choices: moduleTemplates,
      default: moduleTemplates[0]
  }
]

// cli版本
program.version(require('./package').version, '-v, --version', 'cli last version');
// 设置选项
program
  .option('-d, --debug', 'debug')
  .action((options, command) => {
    // 进行逻辑处理
    if(options.debug) {
      console.log("debug success!")
    }
  });

// 创建model命令行
program
  .command('model <modelName> <gatwayName>')
  .description('generate model file')
  .action(async (modelName, gatwayName) => {
    if (!modelName) {
      modelName = 'hello';
    }
    const res = await inquirer.prompt(modelPrompList)
    // const res = {template: 'curdPage'};
    modelTemplates.forEach((item) => {
      if(item.name === res.template) {
        util.mkdirPath('./test/model');
        fs.writeFile(`./test/model/${modelName}.js`, item.src(modelName, gatwayName), function(err) {
          if(err) {
            console.log('model generate error:', err)
          } else {
            console.log(`model generate success! ${modelName}.js`);
          }
        })
      }
    })
  })

// 创建module命令行
program
  .command('module <moduleName> <gatwayName> <moduleZhName>')
  .description('generate module folder')
  .action(async (moduleName, gatwayName, moduleZhName) => {
    if (!moduleName) {
      moduleName = 'hello';
    }
    const res = await inquirer.prompt(modulePrompList)
    // const res = {template: 'curd'};
    moduleTemplates.forEach((item) => {
      if(item.name === res.template) {
        util.mkdirPath('./test/module');
        console.log(`start generate ${moduleName} module...`);
        util.mkdirPath(`test/module/${moduleName}`);
        console.log(`${moduleName}`);
        util.mkdirPath(`test/module/${moduleName}/assets`);
        console.log(`${moduleName}/assets`);
        util.mkdirPath(`test/module/${moduleName}/components`);
        console.log(`${moduleName}/components`);
        util.mkdirPath(`test/module/${moduleName}/models`);
        console.log(`${moduleName}/models`);
        util.mkdirPath(`test/module/${moduleName}/public`);
        console.log(`${moduleName}/public`);
        util.mkdirPath(`test/module/${moduleName}/routes`);
        console.log(`${moduleName}/routes`);
        fs.writeFile(`./test/module/${moduleName}/index.js`, item.src(moduleName, gatwayName), function(err) {
          if(err) {
            console.log('module generate error:', err)
            return;
          } else {
            console.log(`${moduleName}/index.js`);
          }
        })
        fs.writeFile(`./test/module/${moduleName}/models/model.js`, item.srcModel(moduleName), function(err) {
          if(err) {
            console.log('module generate error:', err)
            return;
          } else {
            console.log(`${moduleName}/models/model.js`);
          }
        })
        fs.writeFile(`./test/module/${moduleName}/router.js`, item.src(), function(err) {
          if(err) {
            console.log('module generate error:', err)
            return;
          } else {
            console.log(`${moduleName}/router.js`);
          }
        })
        fs.writeFile(`./test/module/${moduleName}/cfg_index.json`, item.srcCfgIndex(moduleName, gatwayName, moduleZhName), function(err) {
          if(err) {
            console.log('module generate error:', err)
            return;
          } else {
            console.log(`${moduleName}/cfg_index.json`);
          }
        })
        fs.writeFile(`./test/module/${moduleName}/cfg_modal.json`, item.srcCfgModal(moduleName, moduleZhName), function(err) {
          if(err) {
            console.log('module generate error:', err)
            return;
          } else {
            console.log(`${moduleName}/cfg_modal.json`);
          }
        })
        fs.writeFile(`./test/module/${moduleName}/readme.md`, item.srcReadme(moduleZhName), function(err) {
          if(err) {
            console.log('module generate error:', err)
            return;
          } else {
            console.log(`${moduleName}/readme.md`);
          }
        })
      }
      // console.log(`module generate success!`);
    })
  })

// 处理命令行输入的参数
program.parse(process.argv);