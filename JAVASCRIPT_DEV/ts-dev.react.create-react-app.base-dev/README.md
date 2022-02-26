# Create-react-app 搭建脚手架: 此脚手架适合生产环境编译React页面, 支持webpack定制化配置 ( Create-react-app+Typescript+Scss+Babel+Eslint+Prettier+Husky+LintStaged )

# 详细搭建日志参考: ./lod.md

<pre>
# TODO: 2021.09.23 ( 等待笔记 )
    a) Create-react-app 项目格式化配置 - 实验四 ( 实验成功 )
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
        1. 安装: npx create-react-app my-app --template typescript 
            a) 注意: 尝试启动下默认项目, 是否正常
            b) 注意: vscode仅打开当前安装项目文件路径, 这样vscode才能有效的反馈eslint效果
        2. 删除一些影响配置的东西:
            a) lock: 一些锁定版本的文件
            b) node_modules: 删除当前库, 防止缓存影响后续安装配置
            c) 相信我, 这些都会影响配置过程, 后面我们配置好后, 在安装回来
                0. 注意: 这些会导致，"明明我一模一样的配置, 为什么我就运行不起来?"就是因为这些文件前期影响的
        3. 一定要注意: 
            a) 千万不要用yarn / npm 一个库一个库的安装, 这有非常大的概率造成"明明我一模一样的配置, 为什么我就运行不起来?" 
            b) 如果你遇到"明明我一模一样的配置, 为什么我就运行不起来?"这种问题, 直接重复上面操作即可
            c) 一把梭: 我们要直接修改配置文件, 然后yarn一把梭, 这样才能保证配置有效性, 不受vscode缓存配置, 其他配置文件缓存影响
            d) 这是无数个日日夜夜的头发踩的坑
        4. package.json新增改动: 
        5. 注意: 约定的游戏规则及文件配好后做的事情
            a) 安装: vscode插件"editorconfig.editorconfig"目的是让.editorconfig生效
            b) 重新打开vscode, 并打开项目, 避免vscode缓存配置影响( 别嫌麻烦,为了稳定性值得 )
        6. package.json: ( 增加内容 - 注意: “增加内容”, 是要保留默认文件内容, 这里展示的是文件需要增加的内容 )
            <p>
                {
                    "dependencies": {
                        "@testing-library/jest-dom": "^5.11.4",
                        "@testing-library/react": "^11.1.0",
                        "@testing-library/user-event": "^12.1.10",
                        "@types/jest": "^26.0.15",
                        "@types/node": "^12.0.0",
                        "@types/react": "^17.0.0",
                        "@types/react-dom": "^17.0.0",
                        "react": "^17.0.2",
                        "react-dom": "^17.0.2",
                        "react-scripts": "4.0.3",
                        "web-vitals": "^1.0.1",
                        "dotenv": "^8.2.0",
                        "react-app-rewire-alias": "^1.0.3"
                    },
                    "devDependencies": {
                        "@typescript-eslint/eslint-plugin": "^4.15.0",
                        "@typescript-eslint/parser": "^4.15.0",
                        "eslint": "^7.19.0",
                        "eslint-config-airbnb-typescript": "^12.3.1",
                        "eslint-config-prettier": "^7.2.0",
                        "eslint-plugin-import": "2.22.0",
                        "eslint-plugin-jsx-a11y": "6.3.1",
                        "eslint-plugin-prettier": "^3.3.1",
                        "eslint-plugin-react": "7.20.3",
                        "eslint-plugin-react-hooks": "4.0.8",
                        "husky": "4.3.8",
                        "lint-staged": "^11.1.2",
                        "prettier": "^2.2.1",
                        "react-app-rewired": "^2.1.8",
                        "tsconfig-paths": "^3.9.0",
                        "typescript": "^4.1.5"
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
                    "scripts": {
                        "start": "react-app-rewired start",
                        "build": "react-app-rewired build",
                        "test": "react-app-rewired test",
                        "eject": "react-scripts eject",
                        "lint": "eslint src/**/*.ts src/**/*.tsx *.js --ignore-path .gitignore --fix",
                        "prettier": "prettier --write --loglevel silent src/**/*.{css,scss,json,md}",
                        "reset": "node reset-app.js"
                    }
                }
            </p>
        7. tsconfig: 增修内容
            a) 目的: 之所以拆开文件,是因为create-react-app会还原tsconfig.js文件
            b) tsconfig.json: ( 增加内容 )
                <p>
                    {
                        "compilerOptions": {
                            "strict": false,
                        },
                        "extends": "./tsconfig.base.json"
                    }
                </p>
            c) tsconfig.base.json: ( 新建文件 )
                <p>
                   {
                        "compilerOptions": {
                            "baseUrl": ".",
                            "paths": {
                                "@/*": ["src/*"]
                            }
                        }
                    }
                </p>
            d) tsconfig.eslint.json: ( 新建文件 )
                <p>
                    {
                        "extends": "./tsconfig.json",
                        "include": [
                            "src",
                            "tests",
                            ".eslintrc.js",
                            "config-overrides.js"
                        ]
                    }
                </p> 
        8. config-overrides.js: ( 新建文件 )
            a) 目的: 为配合react-app-rewire在不eject项目情况下配置webpack
            <p>
                require('dotenv');
                const { aliasJest, configPaths, alias } = require('react-app-rewire-alias');

                const aliasMap = configPaths('./tsconfig.base.json');

                module.exports = function override(config, env) {
                    const newConfig = alias(aliasMap)(config, env);
                    newConfig.output.publicPath = process.env.PUBLIC_URL;
                    return newConfig;
                };

                module.exports.jest = aliasJest(aliasMap);
            </p>
        9. .env: ( 新建文件 )
            <p>
                NODE_ENV=development
                PUBLIC_URL=/
            </p>
        10. .eslintrc.js: ( 新建文件 )
            <p>
                require('dotenv').config();

                const { NODE_ENV } = process.env; // 可选逻辑

                const config = {
                    root: true,
                    env: {
                        browser: true,
                        es2021: true,
                        node: true,
                    },
                    extends: [
                        'airbnb-typescript',
                        'eslint:recommended',
                        'plugin:react/recommended',
                        'plugin:@typescript-eslint/recommended',
                        'plugin:prettier/recommended',
                        'prettier',
                        'prettier/react',
                        'prettier/@typescript-eslint',
                    ],
                    overrides: [
                        {
                            files: ['*.ts', '*.tsx', '*/**.ts'],
                            parserOptions: {
                                project: ['./tsconfig.json'],
                            },
                        },
                    ],
                    parserOptions: {
                        ecmaFeatures: {
                            jsx: true,
                        },
                        ecmaVersion: 12,
                        sourceType: 'module',
                        project: ['./tsconfig.eslint.json'],
                    },
                    plugins: [
                        'react',
                        '@typescript-eslint',
                        'jsx-a11y',
                        'import',
                        'prettier'
                    ],
                    rules: {
                        'no-console': NODE_ENV === 'development' ? 'off' : 'error',
                        'import/newline-after-import': 'error',
                        quotes: ['error', 'single'],
                        'prettier/prettier': [
                            'warn',
                            {
                                endOfLine: 'auto',
                                semi: true,
                            },
                        ],
                        semi: 'off',
                        '@typescript-eslint/semi': 'off',
                        'arrow-body-style': ['error', 'as-needed'],
                        '@typescript-eslint/comma-dangle': [
                            'error',
                            {
                                arrays: 'always-multiline',
                                exports: 'always-multiline',
                                functions: 'never',
                                imports: 'always-multiline',
                                objects: 'always-multiline',
                            },
                        ],
                        '@typescript-eslint/no-var-requires': ['off'],
                        'import/order': 'error',
                        'import/first': 'error',
                        'import/no-unresolved': 'off',
                        indent: 'off',
                        '@typescript-eslint/indent': 'off',
                        '@typescript-eslint/no-unused-vars': ['error'],
                    },
                };
                module.exports = config;
            </p>
        11. .prettierrc.js: ( 新建文件 )
            <p>
                /**
                 * 注意: 这里优先级不高, 如出现冲突请在eslint下的'prettier/prettier'配置
                 */
                module.exports = {
                    trailingComma: 'es5',
                    tabWidth: 4,
                    semi: true,
                    singleQuote: true,
                    printWidth: 80,
                    endOfLine: 'auto',
                    useTabs: true,
                };
            </p>
        12. .editorconfig: ( 新建文件 )
            <p>
                root = true

                [*]
                indent_style = tab
                indent_size = 4
                charset = utf-8
                trim_trailing_whitespace = false
                insert_final_newline = false
                # 加上这一行, 自动识别换行符
                end_of_line = unset
            </p>
        13. 一把梭: yarn install走起, 安装完 yarn start, 启动时请闭眼( 心中默念一定能成功,哈哈哈哈... )
        14. 如果启动成功: yarn lint 然后在 yarn prettierrc 格式化一遍项目, 运行完, 最好在重新打开vscode和项目( 预防万一,真的被缓存配置吓怕了 )
        15. .vscode ( 新建文件夹 )
            a) settings.json ( 新建文件 - 个人习惯 )
                0. 目的: vscode配置设置属性, 方便不同的机器上使用相同的设置
                <p>
                    {
                        "typescript.tsdk": "./node_modules/typescript/lib",
                        "search.exclude": {
                            "**/node_modules": true,
                            "dist": true,
                            "yarn.lock": true
                        },
                        "files.watcherExclude": {
                            "**/.git/objects/**": true,
                            "**/.git/subtree-cache/**": true,
                            "**/node_modules/*/**": true,
                            "**/dist/**": true
                        },
                        "[javascript]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[javascriptreact]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[typescript]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[typescriptreact]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[json]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[jsonc]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[html]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[css]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[less]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[scss]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[yaml]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        },
                        "[markdown]": {
                            "editor.defaultFormatter": "esbenp.prettier-vscode"
                        }
                    }
                </p>
            b) extensions.json ( 新建文件 - 个人推荐 )
                0. 目的: vscode第三方插件推荐安装, 方便不同的机器上使用相同的设置
                <p>
                    {
                        "recommendations": [
                            "steoates.autoimport",
                            "ms-ceintl.vscode-language-pack-zh-hans",
                            "mikestead.dotenv",
                            "editorconfig.editorconfig",
                            "dsznajder.es7-react-js-snippets",
                            "dbaeumer.vscode-eslint",
                            "eamodio.gitlens",
                            "httpsterio.henna",
                            "iceliu.highlight-icemode",
                            "bauke.horizon-vscode",
                            "kisstkondoros.vscode-gutter-preview",
                            "zignd.html-css-class-completion",
                            "xabikos.javascriptsnippets",
                            "pkief.material-icon-theme",
                            "vscodeshift.material-ui-snippets",
                            "chris-noring.node-snippets",
                            "christian-kohler.npm-intellisense",
                            "christian-kohler.path-intellisense",
                            "esbenp.prettier-vscode",
                            "2gua.rainbow-brackets",
                            "xabikos.reactsnippets",
                            "ms-vscode-remote.remote-ssh",
                            "ms-vscode-remote.remote-ssh-edit",
                            "humao.rest-client",
                            "mde.select-highlight-minimap",
                            "maxfieldwalker.vscode-color-theme-spirited-away",
                            "cssho.vscode-svgviewer",
                            "wayou.vscode-todo-highlight",
                            "gruntfuggly.todo-tree",
                            "ms-vscode.vscode-typescript-tslint-plugin",
                            "vscodevim.vim",
                            "jpoissonnier.vscode-styled-components",
                            "tabnine.tabnine-vscode"
                        ],
                        "unwantedRecommendations": [
                            "hookyqr.beautify",
                            "ms-vscode.vscode-typescript-tslint-plugin",
                            "dbaeumer.jshint"
                        ]
                    }
                </p>
            c) launch.json ( 新建文件 )
                0. 目的: vscode与chrome进行debug
                <p>
                    {
                        "version": "0.2.0",
                        "configurations": [
                            {
                                "type": "pwa-chrome",
                                "request": "launch",
                                "name": "Launch Chrome against localhost",
                                "url": "http://localhost:3000",
                                "webRoot": "${workspaceFolder}"
                            }
                        ]
                    }
                </p>
        16. .npmrc ( 新建文件 )
            a) 目的: 设置安装源
            <p>
                SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
            </p>
        17. .nvmrc ( 新建文件 )
            a) 目的: 本项目推荐node版本
            <p>
                v14.15.0
            </p>
        18. 重启vscode, 重新打开项目, 让vscode读取到我们的配置
        19. 等待后续成长...

            
</pre>
