const svelte = require('svelte/compiler');
const ProcessorsExtenderSinglyPreprocessor = require('@beyond-js/bundles-sdk/processor/extender/preprocessor/singly');

module.exports = class extends ProcessorsExtenderSinglyPreprocessor {
	async _preprocessSource(source) {
		try {
			const extensions = new Map();

			let script;
			await svelte.preprocess(
				source.content,
				{
					script: ({ content }) => (script = content) && void 0,
					style: ({ content: code }) => extensions.set('sass', { code }) && void 0,
				},
				{ filename: source.file },
			);

			// Svelte components files export SvelteComponent as default
			let code = script ? `${script}\n\n` : '';
			code +=
				`declare const Component: import('svelte/internal').SvelteComponent;\n` + 'export default Component;';
			extensions.set('ts', { code });
			return { extensions };
		} catch (exc) {
			return { errors: [exc.message] };
		}
	}
};
