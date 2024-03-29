/* eslint-disable */
require('dotenv').config();

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
	plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'import', 'prettier'],
	rules: {
		'no-console': ['error', { allow: ['warn', 'error'] }],
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
		'arrow-body-style': ['off', 'as-needed'],
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
		'@typescript-eslint/no-unused-vars': ['warn'],
		'@typescript-eslint/explicit-module-boundary-types': ['off'],
		'react/react-in-jsx-scope': ['off'],
		'react/jsx-filename-extension': [
			1,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'react/jsx-props-no-spreading': ['off'],
		'import/prefer-default-export': ['off'],
		'react/prop-types': ['off'], // 强制react type 注释props数据类型, 其实有ts就够用了
		'react/jsx-fragments': ['off'], // 是否允许使用React.Fragments
		'react/destructuring-assignment': ['off'], // 必须解构的方式引用数据
		'@typescript-eslint/ban-ts-comment': ['off'], // 是否允许使用注释 @ts-ignore
		'@typescript-eslint/no-shadow': ['warn'], // 是否允许已有变量时, 不同之间变量作用域重命名 ( 重要 )
		'no-param-reassign': ['off'], // 是否允许在props修改
		'no-else-return': ['off'], // 保证 if else正常使用
		'no-restricted-globals': ['off'], // 是否允许location的使用
		'jsx-ally/click-events-have-key-events': ['off'], // 保证自由的使用onClick
		'jsx-ally/no-static-element-interactions': ['off'], // 保证自由的使用onClick
		'no-plusplus': ['warn'], // 是否允许使用++运算符
		'consistent-return': ['warn'], // 箭头函数必须有return
		'array-callback-return': ['warn'], // 回调写法警告
		'prefer-destructuring': ['off'], // 关闭要求必须解构
		'@typescript-eslint/no-explicit-any': ['off'], // 允许使用ts的any
		'react/display-name': ['off'],
		'jsx-a11y/click-events-have-key-events': ['off'],
		'jsx-a11y/no-static-element-interactions': ['off'],
		'@typescript-eslint/no-shadow': ['warn'],
		'react/no-array-index-key': ['off'],
		'no-unneeded-ternary': ['off'],
	},
};

module.exports = config;
