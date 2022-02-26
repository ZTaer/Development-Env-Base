# Rollup 搭建脚手架: 此脚手架适合 Npm 包发布, 支持区分 cjs/es 双格式编译发布 ( Rollup+Storybook+Typescript+Scss+Babel+Eslint+Prettier+Husky+LintStaged )

# 详细搭建日志参考: ./lod.md

<pre>
# TODO: 2022.02.26 ( 等待笔记 - 推荐阅读 )
    a) Rollup搭建Npm发布脚手架总结
        0. 此脚手架配置:
            a) Rollup: 目的 - 简化配置,代替webpack
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
			k) Stroybook: 目的 - 根据组件生成文档，以及Demo
        1. 安装: 
            a) 注意: vscode仅打开当前安装项目文件路径, 这样vscode才能有效的反馈eslint效果
			b) 注意: 请根据当前文档下方提供的package.json文件内容安装 
				0. 为什么不提供每个库详细安装过程? 答: 因为用yarn / npm 一个库一个库的安装, 这有非常大的概率造成"明明我一模一样的配置, 为什么我就运行不起来?"所以我们配置好文件一把梭 
			c) 初始文件结构 - 详情参考: https://github.com/ZTaer/ztaer-npm-public
				<p>
					.vscode
					scripts
					src
						components
						stories
						utils
						index.ts
					package.json
				<p>
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
        4. 注意: 约定的游戏规则及文件配好后做的事情
            a) 安装: vscode插件"editorconfig.editorconfig"目的是让.editorconfig生效
            b) 重新打开vscode, 并打开项目, 避免vscode缓存配置影响( 别嫌麻烦,为了稳定性值得 )
        5. package.json: ( 配置很重要,此配置考虑到需要npm发布 )
			a) 属性解析:
				0. name - npm相关: 包名
				1. version - npm相关: 版本号( npm发布将尊崇此属性 )
				2. dependencies - npm相关: 描述
				3. main - cjs格式文件路径
				4. module - esm/es格式文件路径
				5. unpkg - ( 等待补充 )
				6. typings - 包到导出的ts类型,用于提示
				7. outputDir - 主要生成目录
				8. files - 核心文件目录
				9. keywords - npm相关: 的关键字方便搜索
				10. repository - npm相关: 用于展示包的信息相关,如github,demo等
				11. homepage - npm相关: 官网
				12. author - npm相关: 作者
				13. private - npm相关: 是否为私有包,不公开npm的发布信息( 需npm vip )
				14. license - npm相关: 开源协议
				15. peerDependencies - npm相关: 要求使用库时,项目必须安装的依赖库
				16. peerDependenciesMeta - npm相关: 要求使用库时,项目可选安装的依赖库
				17. dependencies - 主要生产依赖库
				18.	devDependencies - 开发相关依赖库
				19. husky - 第三方库相关: 拦截Git提交
				20.	lint-staged - 第三方库相关: 配合Husky, 对commit代码进行Eslint检测JS相关代码, 确保代码规范化, 避免冗余代码进入仓库 
				21. scripts - 操控项目命令相关
				22. engines - 要求node引擎版本
            <p>
				{
					"name": "ztaer-npm-public",
					"version": "1.0.10",
					"description": "npm public react component test",
					"main": "dist/index.js",
					"module": "lib/index.js",
					"unpkg": "dist/index.js",
					"typings": "lib/index.d.ts",
					"outputDir": "./dist",
					"files": [
						"dist",
						"lib"
					],
					"keywords": [
						"react",
						"react-component",
						"ztaer",
						"rollup"
					],
					"repository": {
						"type": "git",
						"url": "https://github.com/ZTaer/ztaer-npm-public",
						"directory": "npm public react component test"
					},
					"homepage": "https://github.com/ZTaer",
					"author": "Ztaer",
					"private": false,
					"license": "MIT",
					"peerDependencies": {
						"@types/react": "^16.8.6 || ^17.0.0",
						"react": "^17.0.2",
						"react-dom": "^17.0.2"
					},
					"peerDependenciesMeta": {
						"@types/react": {
							"optional": true
						}
					},
					"dependencies": {},
					"devDependencies": {
						"@babel/core": "^7.17.2",
						"@babel/preset-react": "^7.16.7",
						"@rollup/plugin-commonjs": "^21.0.1",
						"@rollup/plugin-node-resolve": "^13.1.3",
						"@rollup/plugin-typescript": "^8.3.0",
						"@storybook/addon-actions": "^6.4.18",
						"@storybook/addon-essentials": "^6.4.18",
						"@storybook/addon-links": "^6.4.18",
						"@storybook/preset-scss": "^1.0.3",
						"@storybook/react": "^6.4.18",
						"@typescript-eslint/eslint-plugin": "^5.12.0",
						"@typescript-eslint/parser": "^5.12.0",
						"babel-loader": "^8.2.3",
						"css-loader": "5.2.6",
						"eslint": "^8.9.0",
						"eslint-config-airbnb": "^19.0.4",
						"eslint-config-airbnb-typescript": "^16.1.0",
						"eslint-config-prettier": "^8.4.0",
						"eslint-import-resolver-typescript": "^2.5.0",
						"eslint-loader": "^4.0.2",
						"eslint-plugin-import": "^2.25.4",
						"eslint-plugin-jsx-a11y": "^6.5.1",
						"eslint-plugin-prettier": "^4.0.0",
						"eslint-plugin-react": "^7.28.0",
						"eslint-plugin-react-hooks": "^4.3.0",
						"eslint-plugin-storybook": "^0.5.7",
						"prettier": "^2.5.1",
						"react": "^17.0.2",
						"react-dom": "^17.0.2",
						"rollup": "^2.67.2",
						"rollup-plugin-babel": "^4.4.0",
						"rollup-plugin-peer-deps-external": "^2.2.4",
						"rollup-plugin-scss": "^3.0.0",
						"rollup-plugin-terser": "^7.0.2",
						"sass": "^1.49.8",
						"sass-loader": "10.1.1",
						"style-loader": "2.0.0",
						"typescript": "^4.5.5",
						"husky": "4.3.8",
						"lint-staged": "^11.1.2"
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
						"start": "start-storybook -p 6006",
						"build-storybook": "build-storybook",
						"build-prod": "yarn clear && node_modules/.bin/rollup -c ./scripts/rollup.config.prod.js && node_modules/.bin/rollup -c ./scripts/rollup.es-config.prod.js",
						"build-dev": "yarn clear && node_modules/.bin/rollup -c ./scripts/rollup.config.dev.js && node_modules/.bin/rollup -c ./scripts/rollup.es-config.dev.js",
						"build-publish": "yarn build-prod && npm publish",
						"clear": "node ./scripts/clear.script.js",
						"lint": "eslint src/**/*.ts src/**/*.tsx --ignore-path .gitignore --fix --quiet",
						"prettier": "prettier --write --loglevel silent src/**/*.{css,scss,json,md}"
					},
					"engines": {
						"node": ">=12.0.0"
					}
				}
            </p>
        6. tsconfig: 
            a) 目的: 拆开文件方便区分相关配置
            b) tsconfig.json: ( 增加内容 )
                <p>
					{
						"compilerOptions": {
							"module": "esnext",
							"target": "es5",
							"sourceMap": true,
							"moduleResolution": "node",
							"rootDir": "src",
							"noImplicitReturns": true,
							"noImplicitThis": true,
							"noImplicitAny": true,
							"strictNullChecks": true,
							"esModuleInterop": true,
							"baseUrl": "src/",
							"paths": {
								"components/*": ["components/*"],
								"utils/*": ["utils/*"]
							},
							"lib": ["dom", "es6"],
							"allowJs": true,
							"skipLibCheck": true,
							"allowSyntheticDefaultImports": true,
							"strict": false,
							"forceConsistentCasingInFileNames": true,
							"noFallthroughCasesInSwitch": true,
							"resolveJsonModule": true,
							"isolatedModules": true,
							"noEmit": true,
							"jsx": "react-jsx"
						},
						"exclude": [
							"node_modules",
							"build",
							"dist",
							"scripts",
							"acceptance-tests",
							"webpack",
							"jest"
						],
						"types": ["typePatches"]
					}
                </p>
            c) tsconfig.base.json: ( 新建文件 )
                <p>
                   {
						"extends": "./tsconfig.json",
						"exclude": [
							"node_modules",
							"build",
							"dist",
							"scripts",
							"acceptance-tests",
							"webpack",
							"jest",
							"src/stories/**"
						]
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
							"config-overrides.js",
							"src/**/*.tsx",
							"src/**/*.ts",
							"test/**/*.tsx",
							"test/**/*.ts"
						]
					}

                </p> 
        7. rollup相关: ( 新建文件 )
			a) rollup.config.js 
				0. 目的: 基本的rollup配置
			b) rollup.config.dev.js
				0. 目的: 用于cjs格式项目编译,开发环境所需
			c) rollup.config.prod.js
				0. 目的: 用于cjs格式项目编译,生产环境所需
			d) scripts/rollup.config.dev.js
				0. 目的: 用于esm/es格式项目编译,开发环境所需
			e) scripts/rollup.config.prod.js
				0. 目的: 用于esm/es格式项目编译,生产环境所需
			f) 项目属性解析:
				0. 注意: 这里仅展示rollup.config.js相关配置
				1. 其他文件参考: https://github.com/ZTaer/ztaer-npm-public/tree/main/scripts
				2. input - 主编译文件
				3. output - 输出文件
					a) 详细文档:
					b) 关于输出文件格式(format)区分
						0. cjs
						1. es/esm
						2. 
					<p>
						output: [
									{
										file: "dist/index.js", // 输出文件
										sourcemap: false, // 生成map文件方便debug,仅在开发环境为true
										format: "cjs", // 编译格式
									},
									{
										file: "dist/index.es.js",
										sourcemap: false,
										format: "esm",
									},
							]
					</p>
				4. plugin - 插件配置
					a) scss
						0. 依赖: "rollup-plugin-scss","sass"
						1. 目的: 编译scss文件 
						<p>
							scss({
								exclude: ["node_modules/**", "dist/**"], // 排除编译目录
								failOnError: true,
								runtime: sass,
								sourceMap: false, // 生成map文件方便debug,仅在开发环境为true
								output: "dist/index.css",
								outputStyle: "compressed", // 输出文件编译格式,compressed为压缩格式
							}),
						<p>
					b) babel
						0. 依赖: "rollup-plugin-babel"
						1. 目的: 编译兼容性更强的js 
					c) resolve
						0. 依赖: "@rollup/plugin-node-resolve"
						1. 目的: rollup第三方依赖库相关
					d) external
						0. 依赖: "rollup-plugin-peer-deps-external"
						1. 目的: 排除第三方依赖库打包相关( 如react,react-dom,防止引入库使用时产生冲突 )
					e) terser
						0. 依赖: "rollup-plugin-terser"
						1. 目的: 压缩文件
					f) typescript
						0. 依赖: "@rollup/plugin-typescript"
						1. 目的: ts语法编译 
					g) commonjs
						0. 依赖: "@rollup/plugin-commonjs"
						1. 目的: 配合resolve 
					h) uglify
						0. 依赖: "rollup-plugin-uglify"
						1. 目的: es5压缩代码,生产环境时使用
				5. external - 打包时需要剔除的库
				<p>
					import babel from "rollup-plugin-babel";
					import resolve from "@rollup/plugin-node-resolve";
					import external from "rollup-plugin-peer-deps-external";
					import { terser } from "rollup-plugin-terser";
					import typescript from "@rollup/plugin-typescript";
					import commonjs from "@rollup/plugin-commonjs";
					import scss from "rollup-plugin-scss";
					import sass from "sass";

					export default [
						{
							input: "src/index.ts",
							output: [
								{
									file: "dist/index.js",
									sourcemap: false, 
									format: "cjs",
								},
								{
									file: "dist/index.es.js",
									sourcemap: false,
									format: "esm",
								},
							],
							plugins: [
								babel({
									exclude: "node_modules/**",
									presets: ["@babel/preset-react"],
								}),
								external(),
								resolve(),
								commonjs({
									defaultIsModuleExports: "auto",
								}),
								terser(),
								scss({
									exclude: ["node_modules/**", "dist/**"],
									failOnError: true,
									runtime: sass,
									sourceMap: false, 
									output: "dist/index.css",
									outputStyle: "compressed", 
								}),
								typescript({
									tsconfig: "./tsconfig.base.json",
								}),
							],
							external: ["react", "react-dom"],
						},
					];
				
				</p>
		8. storybook相关:
			a) 参考项目: https://github.com/ZTaer/ztaer-npm-public
			b) 安装依赖: 参考package.json
			c) 配置文件: /.storybook/main.js
				0. 目的: 保证scss正常
			<p>
				module.exports = {
					stories: [
						"../src/**/*.stories.mdx",
						"../src/**/*.stories.@(js|jsx|ts|tsx)",
					],
					addons: [
						"@storybook/addon-links",
						"@storybook/addon-essentials",
						"@storybook/preset-scss", // 保证scss正常
					],
					framework: "@storybook/react",
				};
        9. eslintrc相关: 
			a) 参考项目: https://github.com/ZTaer/ztaer-npm-public
			b) 文件:
				0. .eslintrc.json
				1. .eslintignore
        10. prettierrc相关:
			a) 参考项目: https://github.com/ZTaer/ztaer-npm-public
			b) 文件:
				0. .prettierrc.json
				1. .prettierignore
        11. .editorconfig: 
			a) 参考项目: https://github.com/ZTaer/Development-Env-Base/tree/master/JAVASCRIPT_DEV/ts-dev.react.create-react-app.base-dev
        12. 一把梭: yarn install走起, 安装完 yarn start, 启动时请闭眼( 心中默念一定能成功,哈哈哈哈... )
        13. 如果启动成功: yarn lint 然后在 yarn prettierrc 格式化一遍项目, 运行完, 最好在重新打开vscode和项目( 预防万一,真的被缓存配置吓怕了 )
        14. .vscode
			a) 参考项目: https://github.com/ZTaer/Development-Env-Base/tree/master/JAVASCRIPT_DEV/ts-dev.react.create-react-app.base-dev
        15. .npmrc
            a) 目的: 设置安装源
			b) 参考项目: https://github.com/ZTaer/Development-Env-Base/tree/master/JAVASCRIPT_DEV/ts-dev.react.create-react-app.base-dev
        16. .nvmrc
            a) 目的: 本项目推荐node版本
			b) 参考项目: https://github.com/ZTaer/Development-Env-Base/tree/master/JAVASCRIPT_DEV/ts-dev.react.create-react-app.base-dev
        17. 重启vscode, 重新打开项目, 让vscode读取到我们的配置
        18. 等待后续成长...
	b) 发布Npm包 ( 核心 )
		0. 注册npm账号: https://www.npmjs.com/
		1. 准备发布到npm,确保npm项目名称唯一
    	2. 登陆npm, 输入npmjs.com注册的账号
        	a) 命令( 在本地控制台 ): npm login 
    	3. 修改package.json,打包输出文件相关配置
			a) 详细信息: 浏览文档上方package.json相关
        	b) 目的: 保证输出文件,是编译打包后的, 
			c) 指定核心文件属性:
			<p>
				{
					"main": "dist/index.js",
					"module": "dist/index.es.js"
				}
			<p>
    	4. 发布包:
			a) 命令: npm publish
    	5. 检测发布结果: npm 直接搜索包名
</pre>
