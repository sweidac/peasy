import html from './index.mjs';

it('it exports the tagging function', () => {
	expect(html).toBeInstanceOf(Function);
});

it('creates simple html elements', () => {
	const div = html`<div></div>`;

	expect(div).toBeInstanceOf(HTMLElement);
	expect(div.nodeName).toBe('DIV');

	const span = html`<span>`;

	expect(span).toBeInstanceOf(HTMLElement);
	expect(span.nodeName).toBe('SPAN');
});

it('creates a deeper html structure', () => {
	const view = html`
		<div>
			<h1>Title</h1>
			<span>Text</span>
			<span>Text2</span>
			<p>paragraph</p>
		</div>
	`;

	expect(view.querySelectorAll('span').length).toBe(2);
	expect(view.querySelector('p').textContent).toBe('paragraph');
});

it('works with interpolations', () => {
	const divWithText = html`<div>${'Text'}</div>`;

	expect(divWithText.textContent).toBe('Text');
});

it('works with node interpolations', () => {
	const innerView = html`<div class="myuser"><span>John</span><span>Doe</span></div>`,
		outerView = html`<section>${innerView}</section>`;

	expect(outerView).toBeInstanceOf(HTMLElement);
	expect(outerView.querySelector('.myuser').textContent).toBe('JohnDoe');
});

it('works with properties', () => {
	const view = html`
		<div class="foo" data-lol="sometext" aria-role="code">
			<h1>Title</h1>
			<span>Text</span>
			<span>Text2</span>
			<p>paragraph</p>
		</div>
	`;

	expect(view.childElementCount).toBe(4);
	expect(view.childNodes.length).toBe(4); // make sure we have no textnodes from the indentation
	expect(view.getAttribute('data-lol')).toBe('sometext');
	expect(view.getAttribute('aria-role')).toBe('code');
});

describe('tab-indenations removal', () => {

	it('removes basic tab-indentation', () => {
		const view = html`
			<div>
				<h1>Title</h1>
				<span>Text</span>
				<span>Text2</span>
				<p>paragraph</p>
			</div>
		`;

		expect(view.childElementCount).toBe(4);
		expect(view.childNodes.length).toBe(4); // make sure we have no textnodes from the indentation
	});

	it('removes tab-indentations when used with properties', () => {
		const view = html`
			<div	class="foo"
					data-lol="sometext"
					aria-role="code">
				<h1>Title</h1>
				<span>Text</span>
				<span>Text2</span>
				<p>paragraph</p>
			</div>
		`;

		expect(view.childElementCount).toBe(4);
		expect(view.childNodes.length).toBe(4); // make sure we have no textnodes from the indentation
		expect(view.getAttribute('data-lol')).toBe('sometext');
		expect(view.getAttribute('aria-role')).toBe('code');
	});

});