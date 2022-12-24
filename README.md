# Peasy - Makes Elements easy

Peasy is a [template string tagging function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) that parses HTML from the template string and returns Elements.

This makes dynamic creation easy-peasy while being as lightweight as possible.

## Example

```javascript
import html from 'peasy';

const foo = html`<div class="foo"></div>`;

foo.innerText = 'i now have an element to interact with';

document.body.append(foo);
```

Of course, you can also go multiline:

```javascript
import html from 'peasy';

const multiline = html`
	<section class="deeper">
		<h1>Complicated Structure</h1>
		<p>Peasy removes empty whitespace between elements so you don't end up
		with nasty collapsed TextNodes.
		</p>
	</section>
	`;
```

It get's more fancy! Thanks to the magic of tagging functions, you can also append
other elements inline:

```javascript
import html from 'peasy';

const bar = html`<h2>Gnarly</h2>`;

const foo = html`
	<div class="foo">
		${bar /* bar is an actual Element! */}
	</div>
	`;
```