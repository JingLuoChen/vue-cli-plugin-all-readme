/*
 * @Author: luxian
 * @Date: 2022-07-01 18:17:49
 * @LastEditors: luxian
 * @LastEditTime: 2023-02-01 17:27:31
 * @Description: 
 * @version: 
 */
module.exports = () => {
  const prompts = [
    {
      type: 'list',
      name: 'promptsIsCustomize',
      message: '请选择是否自定义readme文件读取路径(默认src/pages/)',
      choices: [
        { name: '是', value: true },
        { name: '否', value: false }
      ],
      default: false
    },
    {
      when: (answers) => answers.promptsIsCustomize === true,
      type: 'inpute',
      name: 'promptsProjectPath',
      message: '输入自定义项目路径(默认src/pages/)',
      default: 'src/pages'
    }
  ]
  return prompts
}
