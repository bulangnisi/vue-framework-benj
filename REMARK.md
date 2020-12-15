# 使用包
## main
  网络请求 axios
  状态管理 vuex
  路由 vue-router
  本地存储 vue-localstorage
## sub
  粘贴板 clipboard
  数字动画组件 vue-count-to
## lint
  prettierrc 基于eslint 和 stylelint代码规范
  eslint 代码规范和语法检查
  stylelint

  .eslintignore // 忽略文件 
  .eslintrc.js // 验证规则

  浏览器渲染渲染原理 https://blog.csdn.net/qq_36060786/article/details/79311244
  .stylelintignore // 忽略文件  https://stylelint.io/user-guide/ignore-code
  .stylelint.config.js

  编辑器全局设置自动修复
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true
  },

# 遇到的问题
eslint 自动修复
按目前配置，无需设置vscode settings 即可实现自动修复
原版本设置自动修复 "eslint.autoFixOnSave": true
新版本设置自动修复 "editor.formatOnSave": true


路由

全局状态管理

本地存储

引导页