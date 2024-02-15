import uncenter from '@uncenter/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	...uncenter.configs['core/typescript'],
	...uncenter.configs['addons/vitest'],
	{
		ignores: ['dist/'],
	},
	{
		rules: {},
	},
];
