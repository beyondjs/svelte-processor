const ProcessorSourcesDependencies = require('@beyond-js/bundles-sdk/processor/base/dependencies/sources');

module.exports = class extends ProcessorSourcesDependencies {
	get dp() {
		return 'svelte.dependencies';
	}

	_update() {
		const errors = [],
			updated = new Map();

		const add = resource => {
			const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
			dependency.is.add('import');
			updated.set(resource, dependency);
		};
		add('svelte/internal');

		return { updated, errors };
	}
};
