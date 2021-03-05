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

# 学习记录
2020
  12.14
    集成stylelint 及了解了一些相关加载流程，比如eslint 和 stylelint 都可以以插件配置方式在各自配置文件中加入
    所以prettier配置文件就没有必要了，而且加载顺序会被覆盖，两种lint都引入了prettier的config，并且配合vscode的
    插件，达到文件的自动修复
  12.15
    集成husky，以git钩子方式，在提交前对scss，vue，js等文件进行fix，不过使用上有个问题，git hook是pre-commit触发，也就是
    说需要先对文件进行add，如果可修复内容修复完成后还有问题，则不会进行后面操作，而检测的文件都是已加入到暂存中的，所以需要将暂存文件
    git resotre 出来，再修改再提交才能检测到已修改的内容，或者修改之后 git add
  12.16
    学习webpack optimization（优化），分包加载，
    vue.config.js 中 configureWebpack 和 chainWebpack 返回的config对象不一样
    了解了基础webpack加载流程
  12.17
    rem px dpr关系，如何根据设计图复现页面
    响应式(Responsive)，自适应(Adaptive)区别

# 遇到的问题
eslint 自动修复
按目前配置，无需设置vscode settings 即可实现自动修复
原版本设置自动修复 "eslint.autoFixOnSave": true
新版本设置自动修复 "editor.formatOnSave": true
