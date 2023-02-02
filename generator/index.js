/*
 * @Author: luxian 
 * @Date: 2022-07-01 17:41:14
 * @LastEditors: luxian 
 * @LastEditTime: 2023-02-01 17:27:43
 * @Description: 
 * @version: 
 */
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const fg = require('fast-glob');

module.exports = async (api, options) => {
  // 获取当前项目路径
  const cwd = process.cwd();

  // 删除allMd文件
  fs.removeSync('allMd.md')

  // 项目路径：自定义项目目录或默认src/pages下
  let proPath = options.promptsIsCustomize ? options.promptsProjectPath : 'src/pages';

  // 需要读取的目录地址
  const targetAir = path.join(cwd, proPath);

  // 判断是否已经存在该目录
  if (!fs.existsSync(targetAir)) {
    let { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: '该读取目录不存在:',
        choices: [
          {
            name: 'Cancel',
            value: false
          }
        ]
      }
    ])
    if (!action) {
      return;
    }
  }

  // 生成allMd文件
  // 查找md文件
  const allMd = await fg([`${proPath}/**/*.md`])
    .then(paths => Promise.all(paths.map(async (file) => {
      const filePath = path.join(process.cwd(), file);
      return await new Promise((resolve) => {
        fs.readFile(filePath, 'utf8', (error, content) => resolve(content))
      })
    })));

  const allMdContent = allMd.reduce((pre, cur, index) => `${pre}\n${cur}`, '')

  fs.writeFile(path.join(process.cwd(), 'allMd.md'), allMdContent, 'utf8', () => {
    console.log('输出完了')
  })
}
