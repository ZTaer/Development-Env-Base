# ts-dev.react.create-react-app.base-dev ( 推荐 )
0. 此脚手架配置:
    a) Create-react-app: 目的 - 官方单页面应用程序脚手架, 社区资源丰富, 我没想到的配置他能想到
    b) TypeScript: 目的 - 方便开发, 预知所需属性
    c) Eslint: 目的 - 规范JS相关代码
    d) Prettier: 目的 - 格式化文件格式, 提高可读性
    e) Husky: 目的 - 拦截Git提交
    f) Lint-staged: 目的 - 配合Husky, 对commit代码进行Eslint检测JS相关代码, 确保代码规范化, 避免冗余代码进入仓库 
    g) .vscode: 目的 - 保证在不同机器上有相同的VSCODE环境, 使开发更便捷
        0. settings.json: 目的 - vscode配置
        1. extensions.json: 目的 - 推荐安装的vscode插件
        2. launch.json: 目的 - 方便vscode与chrome进行debug调试
    h) .editorConfig: 目的 - 保证在不同的机器上IDE文件配置保持一致, 使开发更便捷
    i) .nvmrc: 目的 - 给生产环境CI告知，node版本
    j) .npmrc: 目的 - 设定安装源, 给yarn, npm安装第三方库时使用, 规避墙
    
