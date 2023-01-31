(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.html = factory());
})(this, (function () { 'use strict';

	const REMOVE_ANY_INDENTATION_REGEX = /[\n\t]| {2,}/g;

	const RENDERER = document.createElement('div');

	const ID_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		  ID_LENGTH = 10;

	function _removeIndentation(strings) {
		return strings.map(htmlPart => htmlPart.replace(REMOVE_ANY_INDENTATION_REGEX, ''));
	}

	function _generateId() {
		let id = "";

		for (let i = 0; i < ID_LENGTH; i++) {
			id += ID_ALPHABET.charAt(Math.floor(Math.random() * ID_ALPHABET.length));
		}

		return id;
	}

	function _createInterpolationPlaceholders(values) {
		const interpolations = {
			nodes : []
		};

		interpolations.values = values.map(value => {
			if (value instanceof Node) {
				const id = _generateId();

				interpolations.nodes.push({
					id,
					node : value
				});

				return `<div id="${id}"></div>`; // placeholder
			} else {
				return value;
			}
		});

		return interpolations;
	}

	function html(strings, ...values){
		const interpolations = _createInterpolationPlaceholders(values);
		const htmlText = String.raw({ raw : _removeIndentation(strings.raw) }, ...interpolations.values);

		RENDERER.innerHTML = htmlText;

		interpolations.nodes.forEach(({ id, node }) => {
			const placeholder = RENDERER.querySelector(`#${id}`);

			placeholder.after(node);
			placeholder.remove();
		});

		const childCount = RENDERER.childElementCount;

		if (childCount === 1) {
			return RENDERER.firstChild;
		} else if (RENDERER.childElementCount > 1) {
			return RENDERER.children;
		} else {
			return null;
		}
	}

	return html;

}));
