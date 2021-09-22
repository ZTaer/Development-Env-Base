<pre>
# TODO: 实验记录目录:
    0. 2021.09.20
        a) Create-react-app 项目格式化配置 - 实验一 ( 实验失败 )
            0. 失败原因: 此方法适合webpack原生配置, 不适合create-react-app
    1. 2021.09.21
        a) Create-react-app 项目格式化配置 - 实验二 ( 实验成功 )
            0. 成果: 已掌握create-react-app+typescript+eslint+prettier+husky+lint-stage+.vscode
    2. 2021.09.22
        a) Create-react-app 项目格式化配置 - 实验三 ( 实验中... )
            0. 目的: 应用研究成果
</pre>

<pre>
# TODO: 2021.09.20 ( 无需笔记 )
    a) Create-react-app 项目格式化配置 - 实验一 ( Eslint配置失败 - 等待笔记 )
        0. EditorConfig - 目的: 统一IDE文件代码格式
            a) 安装VsCode插件: EditorConfig for VS Code
            b) 写入规则: .editorconfig
        1. .nvmrc - 目的: 给生产环境CI告知，node版本
            a) 生成文件命令: node --version > ./.nvmrc
            b) 手动写入node版本: node -v 查看后，直接写入文件即可
        2. .npmrc - 目的: 设定安装源, 给yarn, npm安装第三方库时使用, 规避墙
            a) 安装: yarn global add nrm
            b) 使用淘宝源: nrm use taobao
            c) 查看当前源: nrm ls
            d) 注意: yarn ,npm 都会遵守npmrc
            e) 淘宝源查看: https://npm.taobao.org/mirrors
        3. .vscode - 目的: 设置保持vscode配置相关
            a) settings.json: 目的 - 配置vscode常用规则相关
            b) extensions.json: 目的 - 推荐安装的vscode插件
                0. 扩展搜索: "@recommended" 即可查看工作区推荐安装插件
        4. eslint - 目的: 规范js语言
            a) 安装: yarn add eslint -D
            b) 初始化eslint: yarn eslint --init / npx eslint --init
                0. 选择:
                    a) How would you like to use ESLint?
                        0. 选择: To check syntax, find problems, and enforce code style
                    b) What type of modules does your project use?
                        0. 选择: JavaScript modules (import/export)
                    c) Which framework does your project use?
                        0. react
                    d) Does your project use TypeScript?
                        0. yes
                    f) Where does your code run?
                        0. 全选: browser 和 node 两个都选上
                    g) How would you like to define a style for your project?
                        0. Use a popular style guide
                    h) Which style guide do you want to follow?
                        0.  Airbnb
                    i) What format do you want your config file to be in?
                        0. javascript
                    j) Would you like to install them now with npm?
                        0. yes ( 一定要选择yes，等npm安装完，在使用yarn来一遍, 防止错误 )
            c) 保证正常，且为最新版本:
                0. yarn
                1. yarn upgrade --latest
            d) 初步配置eslint
                0. eslint-config-airbnb: react hooks 检查
                    a) 文档: https://www.npmjs.com/package/eslint-config-airbnb
                    b) 安装: yarn add eslint-config-airbnb -D
                    c) 配置:
                        {
                            "extends": ["airbnb", "airbnb/hooks"]
                        }
                1. @typescript-eslint/parser: 使用他推荐的eslint规则, 这是个规则合集
                    a) 文档: https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
                    b) 安装: yarn add -D typescript @typescript-eslint/parser
                    c) 配置:
                        {
                            "parser": "@typescript-eslint/parser",
                            "plugins": ["@typescript-eslint"],
                            "rules": {
                                "@typescript-eslint/rule-name": "error"
                            },
                            "extends": [
                                "eslint:recommended",
                                "plugin:@typescript-eslint/recommended",
                                "plugin:@typescript-eslint/recommended-requiring-type-checking"
                            ]
                        }
                2. eslint-plugin-import: 文件路径相关规则
                    a) 文档: https://www.npmjs.com/package/eslint-plugin-import
                    b) 安装: yarn add eslint-plugin-import eslint-import-resolver-typescript -D
                    c) 配置:
                        {
                            "extends": [
                                "plugin:import/typescript"
                            ],
                            settings: {
                                'import/resolver': {
                                    node: {
                                        // import 模块时，不写后缀将尝试导入的后缀，出现频率高的文件类型放前面
                                        extensions: ['.tsx', '.ts', '.js', '.json'],
                                    },
                                    typescript: {
                                        // 配置 eslint-import-resolver-typescript 读取 tsconfig.json 的路径
                                        directory: [resolve('./src/tsconfig.json'), resolve('./scripts/tsconfig.json')],
                                    },
                                },
                            },
                            rules: {
                                'import/extensions': [
                                    ERROR,
                                    'ignorePackages',
                                    {
                                        ts: 'never',
                                        tsx: 'never',
                                        json: 'never',
                                        js: 'never',
                                    },
                                ],
                                // 为了防止constructor就会报这个错的bug
                                '@typescript-eslint/no-useless-constructor': ERROR,
                                'no-useless-constructor': OFF,
                            },
                            // 针对 .d.ts 文件我们还需要要禁用一些规则, 防止出bug
                            overrides: [
                                {
                                    files: ['**/*.d.ts'],
                                    rules: {
                                        'import/no-duplicates': OFF,
                                    },
                                },
                                {
                                    files: ['scripts/**/*.ts'],
                                    rules: {
                                        'import/no-extraneous-dependencies': OFF,
                                    },
                                },
                            ]
                        }
                3. eslint-plugin-unicorn: 错误机制控制( 可选 )
                4. 常用: 个人常用eslit规则
                    a) 配置: https://github.com/ZTaer/JavaScript_Study/blob/master/2020.12.23_Eslint/.eslintrc.json
        5. prettier - 目的: 代码格式化
            a) 安装: yarn add prettier eslint-config-prettier -D
            b) 官网: https://prettier.io/playground/
            c) eslint-config-prettier: 禁用所有会和 prettier 起冲突的eslint规则
                0. 配置: .eslintrc.js
                    {
                        extends: [
                            'prettier',
                            'prettier/react',
                            'prettier/@typescript-eslint'
                        ]
                    }
                1. 注意: 要把prettier放最后面,因为这样才能让prettier有机会禁用前面所有的extends中配置的会起冲突的规则
</pre>
<pre>
# TODO: 2021.09.21 ( 无需笔记 )
    a) Create-react-app 项目格式化配置 - 实验二 ( 实验中 )
        0. 参考资料:
            a) Github: https://github.com/alfianandinugraha/create-react-typescript-app
        1. 关于什么是别名?
            a) import xxx from "@xxx/xx.js"; 直接使用@符号的路径
            b) 注意: 正是因为别名问题，故在create-react-app下及使在已有react-app-rewired支持下eslint下的"@typescript-eslint"也无法启作用, 所以项目业务读取eslint规则
            c) 参考文档: https://juejin.cn/post/6868472838613893127
        2. 逆向解析
            a) tsconfig嵌套优先级: tsconfig.base.json < tsconfig.json < tsconfig.eslint.json
                0. 拆开tsconfig文件原因:
                    a) create-react-app会复原tsconfig.js源配置
                1. 拆分文件:
                    a) 注意: 3个文件有相互嵌套关系
                        0. 嵌套方式:
                            {
                                extends: "xxx.json"
                            }
                    b) tsconfig.base.json: config-overrides.js需要
                    c) tsconfig.json: .eslintrc.js需要
                    d) tsconfig.eslint.json: .eslintrc.js需要
            b) react-app-rewired: 控制create-react-app的webpack配置 ( 核心 )
                0. 文档: https://github.com/timarney/react-app-rewired/blob/HEAD/README_zh.md
                1. 创建config-overrides.js: 按照游戏规则写入代码
                2. 并应用react-app-rewire-alias, 别名需要, 保证eslint规则生效 
                3. 当然也可以根据需求配置环境变量, 通过.env配置变量, 导入方式require('dotenv')
                4. tsconfig扩展属性: 注意拆分文件
                    {
                        "compilerOptions": {
                            "baseUrl": ".",
                            "paths": {
                            "@/*": ["src/*"]
                            }
                        },
                        "include": [
                            "src",
                            "tests",
                            ".eslintrc.js",
                            "config-overrides.js",
                            "reset-app.js"
                        ]
                    }
        3. 功能扩展
            a) 文件格式化: 目的 - 方便vscode按照约定规则识别文件格式
                0. VsCode安装插件: EditorConfig for VS Code
                1. 构建文件: .editorconfig
                    root = true
                    [*]
                    indent_style = tab            # 缩进格式为tab
                    indent_size = 4               # 缩进单位大小为4
                    charset = utf-8               
                    trim_trailing_whitespace = false
                    insert_final_newline = false
                    end_of_line = unset           # 自动识别换行符
            b) prettier与eslint冲突问题
                0. 缩进冲突
                    a) .eslintrc.js
                        {
                            indent: 'off',
                            '@typescript-eslint/indent': 'off',
                        }
                    b) .prettierrc.js
                        {
                            trailingComma: 'es5', # 尾部逗号
                            tabWidth: 4,          # 4个索引单位,个人习惯
                            semi: true,           # 尾部跟";"号
                            singleQuote: true,    # 单引号
                            endOfLine: 'auto',    # 换行符自动识别
                            useTabs: true,        # 使用tab索引,不喜欢空格,个人习惯
                        }
            c) 报错导致项目无法启动问题
                0. tsconfig.json
                    {
                        strict: false,      # 解决因ts问题无法启动项目问题, 放宽ts限制
                    }
                1. .eslintrc.js
                    {
                        extends: [          # 注意: 规则排序, 目的 - 尽量使prettier规则覆盖eslint规则 
                            'airbnb-typescript',
                            'eslint:recommended',
                            'plugin:react/recommended',
                            'plugin:@typescript-eslint/recommended',
                            'plugin:prettier/recommended',
                            'prettier',
                            'prettier/react',
                            'prettier/@typescript-eslint',
                        ],
                        rules: [
                            {
                                'prettier/prettier': [
                                    'warn',                 # 格式问题放宽限制
                                    {
                                        endOfLine: 'auto',  # 换行符自动识别
                                        semi: true,         # 代码结尾要有";"
                                    },
                                ],
                            }
                        ]
                    }
            d) Git提交校验: husky + lint-staged
                0. 注意: husky必须安装4.3.8版本, 新版本有严重的功能缺失问题
                    a) 安装: yarn remove husky | yarn add husky@4.3.8 lint-staged -D
                1. 配置package.json
                    {
                        "scripts": {
                            "lint": "eslint src/**/*.ts src/**/*.tsx *.js --ignore-path .gitignore --fix",
                            "prettier": "prettier --write --loglevel silent src/**/*.{css,scss,json,md}",
                        },
                        "husky": {
                            "hooks": {
                                "pre-commit": "lint-staged"
                            }
                        },
                        "lint-staged": {
                            "src/**/*.{js,jsx,ts,tsx}": [
                                "npm run lint"
                            ],
                            "src/**/*.{css,scss,json,md}": [
                                "npm run prettier"
                            ]
                        },
                    }
        4. .vscode文件相关配置: 保证vscode在不同的机器上都使用相同的配置
            a) extensions.json: 目的 - 推荐安装vscode插件
            b) launch.json: 目的 - vscode和chrome使用F5调试debug代码
            c) settings.json: 目的 -  保证vscode在不同的机器上都使用相同的设置
</pre>

<pre>
# TODO: 2021.09.22 ( 等待笔记 )
    a) Create-react-app 项目格式化配置 - 实验三
        0. 目的: 应用研究成果, 搭配好生产环境级别React开发环境
        1. 用到的第三方库原因:
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
        2. 实现功能:
            a) 规范JS代码
            b) Git提交时,避免无用或者冗余代码进入仓库
            c) 格式化代码格式，使可读性更好
            d) 保证在不同机器上有相同的VSCODE环境, 使开发更便捷
            f) 保证在不同的机器上IDE文件配置保持一致, 使开发更便捷
        3. 搭配细节
            a) Create-react-app: 目的 - 官方单页面应用程序脚手架, 社区资源丰富, 我没想到的配置他能想到
                0. 参考文档: 
                    a) 官网: https://zh-hans.reactjs.org/docs/static-type-checking.html#using-typescript-with-create-react-app 
                1. 安装: npx create-react-app my-app --template typescript
            b) TypeScript: 目的 - 方便开发, 预知所需属性
                0. 安装: react-app-rewired 相关库方便在不eject项目的情况下自定义webpack配置
                    a) yarn add react-app-rewired tsconfig-paths -D
                    b) yarn add dotenv react-app-rewire-alias
                    c) 解析:
                        0. react-app-rewired - 不eject项目的情况下自定义webpack配置
                        1. react-app-rewire-alias - 别名问题,保证ts与eslint配置兼容性
                        2. tsconfig-paths - 保证tsconfig相关文件路径导入文件正常
                        3. dotenv - 方便使用.env直接配置环境变量, 也方便required("dotenv")读取环境变量
                1. 关于什么是别名?
                    a) import xxx from "@xxx/xx.js"; 直接使用@符号的路径
                    b) 注意: 正是因为别名问题，故在create-react-app下及使在已有react-app-rewired支持下eslint下的"@typescript-eslint"也无法启作用, 所以项目业务读取eslint规则
                    c) 参考文档: https://juejin.cn/post/6868472838613893127
                    d) 解决别名问题: react-app-rewire-alias
                2. 配置:
                    a) dotenv应用:
                        0. .env文件
                        1. config-overrides.js文件
                        2. .eslintrc.js
                        3. 具体可查看源码
                    a) 配置config-overrides.js
                        0. 原因: 因为这是react-app-rewired以及react-app-rewire-alias游戏规则 
                        1. 源码: 
                            <pre>
                                // 导入环境变量
                                require('dotenv');
                                const { aliasJest, configPaths, alias } = require('react-app-rewire-alias');

                                // 导入tsconfig配置,保证别名功能正常
                                const aliasExp = configPaths('./tsconfig.base.json');

                                module.exports = function (config, env) {
                                    const newConfig = alias(aliasExp)(config, env);
                                    newConfig.output.publicPath = process.env.PUBLIC_URL;
                                    return newConfig;
                                };

                                module.exports.jest = aliasJest(aliasExp);
                            </pre>
                    b) 配置tsconfig相关文件
                        0. 拆开tsconfig文件原因:
                            a) create-react-app会复原tsconfig.js源配置
                        1. 拆分tsconfig文件:
                            a) 注意: 3个文件有相互嵌套关系
                                0. 嵌套方式:
                                    {
                                        extends: "./xxx.json"
                                    }
                                1. tsconfig嵌套优先级: tsconfig.base.json < tsconfig.json < tsconfig.eslint.json
                            b) tsconfig.json: 后续配置会给.eslintrc.js应用
                                {
                                    "extends": "./tsconfig.base.json"
                                }
                            c) tsconfig.base.json: 后续配置会给config-overrides.js应用 ( 保证别名正常 )
                                {
                                    "compilerOptions": {
                                        "baseUrl": ".",
                                        "paths": {
                                            "@/*": ["src/*"]
                                        }
                                    },
                                    "extends": "./tsconfig.eslint.json"
                                }
                            d) tsconfig.eslint.json: 后续配置会给.eslintrc.js应用 ( 保证tsconfig能读取eslint规则 )
                                {
                                    "extends": "./tsconfig.json",
                                    "include": [
                                        "src",
                                        "tests",
                                        ".eslintrc.js",
                                        "config-overrides.js",
                                        "reset-app.js"
                                    ]
                                }
                 
            c) Eslint: 目的 - 规范JS相关代码
                0. 安装并初始化eslint: 
                    a) 安装: yarn add eslint eslint-config-airbnb-typescript  -D
                    b) 初始化eslint: yarn eslint --init / npx eslint --init
                        0. 选择:
                            a) How would you like to use ESLint?
                                0. 选择: To check syntax, find problems, and enforce code style
                            b) What type of modules does your project use?
                                0. 选择: JavaScript modules (import/export)
                            c) Which framework does your project use?
                                0. react
                            d) Does your project use TypeScript?
                                0. yes
                            f) Where does your code run?
                                0. 全选: browser 和 node 两个都选上
                            g) How would you like to define a style for your project?
                                0. Use a popular style guide
                            h) Which style guide do you want to follow?
                                0.  Airbnb
                            i) What format do you want your config file to be in?
                                0. javascript
                            j) Would you like to install them now with npm?
                                0. yes ( 一定要选择yes，等npm安装完，在使用yarn来一遍, 防止错误 )
                    c) 保证正常，且为最新版本:
                        0. yarn 
                        1. yarn upgrade --latest ( 可选 )
                    d) 安装完毕后eslint会自动配置一些第三方库如下方, 检查package.json ( 注意: eslint自动安装配置 )
                        {
                            "devDependencies": {
                                "@typescript-eslint/eslint-plugin": "^4.31.2",
                                "@typescript-eslint/parser": "^4.31.2",
                                "eslint": "^7.32.0",
                                "eslint-config-airbnb": "^18.2.1",
                                "eslint-plugin-import": "^2.24.2",
                                "eslint-plugin-jsx-a11y": "^6.4.1",
                                "eslint-plugin-react": "^7.26.0",
                                "eslint-plugin-react-hooks": "^4.2.0"
                            }
                        }
                1. 配置:
            d) Prettier: 目的 - 格式化文件格式, 提高可读性
                0. 安装: yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
            e) Husky: 目的 - 拦截Git提交
            f) Lint-staged: 目的 - 配合Husky, 对commit代码进行Eslint检测JS相关代码, 确保代码规范化, 避免冗余代码进入仓库 
            g) .vscode: 目的 - 保证在不同机器上有相同的VSCODE环境, 使开发更便捷
                0. settings.json: 目的 - vscode配置
                1. extensions.json: 目的 - 推荐安装的vscode插件
                2. launch.json: 目的 - 方便vscode与chrome进行debug调试
            h) .editorConfig: 目的 - 保证在不同的机器上IDE文件配置保持一致, 使开发更便捷
            i) .nvmrc: 目的 - 给生产环境CI告知，node版本
            j) .npmrc: 目的 - 设定安装源, 给yarn, npm安装第三方库时使用, 规避墙
        4. 报错导致项目无法启动问题总结:
            a) tsconfig.json
                {
                    strict: false,                      # 解决因ts问题无法启动项目问题, 放宽ts限制
                }
            b) .eslintrc.js
                {
                    extends: [                          # 注意: 规则排序, 目的 - 尽量使prettier规则覆盖eslint规则 
                        'airbnb-typescript',
                        'eslint:recommended',
                        'plugin:react/recommended',
                        'plugin:@typescript-eslint/recommended',
                        'plugin:prettier/recommended',
                        'prettier',
                        'prettier/react',
                        'prettier/@typescript-eslint',
                    ],
                    rules: [
                        {
                            'prettier/prettier': [
                                'warn',                 # 格式问题放宽限制
                                {
                                    endOfLine: 'auto',  # 换行符自动识别
                                    semi: true,         # 代码结尾要有";"
                                },
                            ],
                        }
                    ]
                }

</pre>
