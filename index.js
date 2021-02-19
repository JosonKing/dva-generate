#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const util = require("./util");

// 引入模板文件
const templates = require('./templates/index');
// 处理文件
const fs = require("fs");

// 命令行选择列表
let prompList = [
  {
      type:'list',
      name: 'template',
      message: '请选择你想要生成的模板：',
      choices: templates,
      default: templates[0]
  }
]

// cli版本
program.version(require('./package').version, '-v, --version', 'cli的最新版本');
// 设置选项
program
  .option('-d, --debug', '调试一下')
  .action((options, command) => {
    // 进行逻辑处理
    if(options.debug) {
      console.log("调试成功")
    }
  });

// 创建model文件命令行
program
  .command('model <modelName> <gatwayName>')
  .description('创建model文件')
  .action(async (modelName, gatwayName) => {
    if (!modelName) {
      modelName = 'hello';
    }
    const res = await inquirer.prompt(prompList)
    // const res = {template: 'curdPage'};
    templates.forEach((item) => {
      if(item.name === res.template) {
        util.mkdirPath('./test');
        fs.writeFile(`./test/${modelName}.js`, item.src(modelName, gatwayName), function(err) {
          if(err) {
            console.log('model创建失败：', err)
          } else {
            console.log(`model创建成功！${modelName}.js`);
          }
        })
      }
    })
  })

// 创建module文件夹命令行
program
  .command('module <folder>')
  .description('创建module文件夹')
  .action((folder) => {
    if(fs.existsSync(folder)) {
      console.log('module已存在')
    } else {
      fs.mkdirSync(folder);
      console.log('module创建成功')
    }
  });

// 处理命令行输入的参数
program.parse(process.argv);