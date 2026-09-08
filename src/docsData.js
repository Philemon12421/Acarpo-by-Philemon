// ---------------------------------------------------------------------------
// Reference content for the Docs page. Organized as:
//   DOCS.html / DOCS.css / DOCS.js  ->  { label, color, sections: [ { title, items: [ {name, desc, code} ] } ] }
// Add a new item by adding one object to a section's `items` array, or a new
// section by adding one object to a language's `sections` array \u2014 nothing
// else in the codebase needs to change.
// ---------------------------------------------------------------------------

export const DOCS = {
  html: {
    label: 'HTML',
    color: '#DC2626',
    sections: [
      {
        title: 'Document Structure',
        items: [
          { name: '<!DOCTYPE html>', desc: 'Tells the browser to render the page in standards mode. Always the first line of an HTML document.', code: '<!DOCTYPE html>' },
          { name: '<html>, <head>, <body>', desc: 'The three root containers: <html> wraps everything, <head> holds metadata not shown on the page, <body> holds everything visible.', code: '<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>' },
          { name: '<meta>', desc: 'Metadata about the page: character encoding, viewport for mobile scaling, and search/social descriptions.', code: '<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<meta name="description" content="Page summary for search engines" />' },
          { name: '<title>', desc: 'Sets the browser tab title and the default title used in search results.', code: '<title>My Page</title>' },
          { name: '<link>', desc: 'Links external resources into the page \u2014 most commonly a stylesheet or a favicon.', code: '<link rel="stylesheet" href="/styles.css" />\n<link rel="icon" href="/favicon.svg" />' },
          { name: '<script>', desc: 'Embeds or references JavaScript. `defer` runs the script after the page parses; `async` runs it as soon as it downloads.', code: '<script src="/app.js" defer></script>' },
        ],
      },
      {
        title: 'Text Content',
        items: [
          { name: '<h1>\u2013<h6>', desc: 'Headings, in order of importance. Use exactly one <h1> per page for SEO and accessibility, and don\u2019t skip levels.', code: '<h1>Page title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>' },
          { name: '<p>', desc: 'A paragraph of text. Browsers add spacing above and below it by default.', code: '<p>A block of text.</p>' },
          { name: '<a>', desc: 'A hyperlink. `target="_blank"` opens in a new tab \u2014 pair it with `rel="noopener noreferrer"` for security.', code: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>' },
          { name: '<strong> / <em>', desc: '<strong> marks text as important (bold by default); <em> marks emphasis (italic by default). Both carry semantic meaning, unlike <b>/<i>.', code: '<strong>Important</strong> and <em>emphasized</em> text.' },
          { name: '<ul>, <ol>, <li>', desc: 'Unordered (bulleted) and ordered (numbered) lists. Every direct child must be an <li>.', code: '<ul>\n  <li>First</li>\n  <li>Second</li>\n</ul>' },
          { name: '<blockquote> / <code>', desc: '<blockquote> marks a quoted block; <code> marks inline code or a code sample in a monospace font.', code: '<blockquote>A quoted passage.</blockquote>\n<code>const x = 1;</code>' },
        ],
      },
      {
        title: 'Semantic Elements',
        items: [
          { name: '<header>, <footer>', desc: 'Introductory content (often a logo and nav) and closing content (often copyright and links) for a page or a section.', code: '<header><nav>...</nav></header>\n<footer>© 2026</footer>' },
          { name: '<nav>', desc: 'Wraps a block of primary navigation links, so assistive tech and search engines can identify it as navigation.', code: '<nav><a href="/">Home</a><a href="/about">About</a></nav>' },
          { name: '<main>', desc: 'The single, unique, main content of the page, excluding repeated header/footer/nav. Only one per page.', code: '<main><h1>Page content</h1></main>' },
          { name: '<section> / <article>', desc: '<section> groups related content under a heading. <article> is content that\u2019s independently distributable, like a blog post.', code: '<article>\n  <h2>Post title</h2>\n  <p>Post body.</p>\n</article>' },
          { name: '<aside>', desc: 'Content tangentially related to the main content \u2014 a sidebar, a pull quote, related links.', code: '<aside>Related links go here.</aside>' },
          { name: '<figure> / <figcaption>', desc: 'Groups an image (or diagram/code sample) with its caption as one semantic unit.', code: '<figure>\n  <img src="chart.png" alt="Revenue chart" />\n  <figcaption>Q3 revenue</figcaption>\n</figure>' },
        ],
      },
      {
        title: 'Forms & Inputs',
        items: [
          { name: '<form>', desc: 'Wraps a set of inputs meant to be submitted together. `onSubmit` (or the `action`/`method` attributes outside a JS framework) controls submission.', code: '<form onSubmit={handleSubmit}>\n  ...\n</form>' },
          { name: '<input>', desc: 'A single-line field. The `type` attribute changes both behavior and the keyboard shown on mobile (email, tel, number, password, etc.).', code: '<input type="email" placeholder="you@example.com" required />' },
          { name: '<label>', desc: 'Associates readable text with a form control \u2014 required for accessibility, and clicking the label focuses the input.', code: '<label htmlFor="email">Email</label>\n<input id="email" type="email" />' },
          { name: '<select> / <option>', desc: 'A dropdown list. Each <option> is one selectable value.', code: '<select>\n  <option value="a">Option A</option>\n  <option value="b">Option B</option>\n</select>' },
          { name: '<textarea>', desc: 'A multi-line text input, unlike <input> which is always a single line.', code: '<textarea rows="4" placeholder="Your message"></textarea>' },
          { name: '<button>', desc: 'A clickable button. Always set `type="button"` explicitly unless it should submit a form (`type="submit"` is the default inside a <form>).', code: '<button type="button" onClick={handleClick}>Click me</button>' },
        ],
      },
      {
        title: 'Media & Accessibility',
        items: [
          { name: '<img>', desc: 'Embeds an image. The `alt` attribute is mandatory for accessibility and is what search engines read \u2014 never leave it empty on a meaningful image.', code: '<img src="/photo.jpg" alt="Team standing outside the office" />' },
          { name: '<video> / <audio>', desc: 'Embed playable media with native browser controls, no plugin required.', code: '<video src="/clip.mp4" controls></video>' },
          { name: 'aria-* attributes', desc: 'Add semantic meaning for screen readers when native HTML alone isn\u2019t enough \u2014 e.g. labeling an icon-only button.', code: '<button aria-label="Close dialog"><XIcon /></button>' },
          { name: 'alt vs aria-hidden', desc: 'Decorative images that add no information should have `alt=""` (empty, not omitted) or `aria-hidden="true"` so screen readers skip them.', code: '<img src="/decorative-line.svg" alt="" />' },
        ],
      },
    ],
  },

  css: {
    label: 'CSS',
    color: '#2563EB',
    sections: [
      {
        title: 'Selectors',
        items: [
          { name: 'Type, class, ID', desc: 'Select by tag name, by `.class` (reusable), or by `#id` (unique, higher specificity \u2014 use sparingly).', code: 'p { }\n.card { }\n#main-header { }' },
          { name: 'Descendant & child', desc: 'A space selects any descendant; `>` selects only direct children.', code: '.card p { }      /* any <p> inside .card */\n.card > p { }    /* only direct child <p> */' },
          { name: 'Pseudo-classes', desc: 'Match an element based on state or position: `:hover`, `:focus`, `:first-child`, `:nth-child(n)`.', code: 'button:hover { background: #333; }\nli:nth-child(2) { color: red; }' },
          { name: 'Pseudo-elements', desc: 'Target a virtual part of an element, like `::before`/`::after` for inserted content, or `::placeholder` for input hint text.', code: '.tag::before { content: "#"; }' },
          { name: 'Attribute selectors', desc: 'Match elements by an attribute\u2019s presence or value.', code: 'input[type="email"] { }\na[target="_blank"] { }' },
        ],
      },
      {
        title: 'Box Model',
        items: [
          { name: 'content, padding, border, margin', desc: 'Every element is a box: content in the center, padding inside the border, margin outside it. This order (inside-out) is the box model.', code: '.box {\n  padding: 16px;\n  border: 1px solid #ddd;\n  margin: 8px;\n}' },
          { name: 'box-sizing', desc: '`border-box` (recommended, and the modern default in most resets) makes width/height include padding and border, instead of adding on top of them.', code: '* { box-sizing: border-box; }' },
          { name: 'display', desc: 'Controls how an element participates in layout: `block` (own line), `inline` (flows with text), `flex`/`grid` (layout containers), `none` (removed entirely).', code: '.hidden { display: none; }\n.row { display: flex; }' },
          { name: 'position', desc: '`relative` shifts an element from its normal spot; `absolute` positions it relative to the nearest positioned ancestor; `fixed` positions it relative to the viewport.', code: '.modal {\n  position: fixed;\n  top: 0; left: 0;\n}' },
        ],
      },
      {
        title: 'Flexbox',
        items: [
          { name: 'display: flex', desc: 'Turns an element into a flex container; its direct children become flex items laid out in a row by default.', code: '.row { display: flex; }' },
          { name: 'justify-content', desc: 'Aligns flex items along the main axis (horizontally, by default): `flex-start`, `center`, `space-between`, `space-around`.', code: '.row { justify-content: space-between; }' },
          { name: 'align-items', desc: 'Aligns flex items along the cross axis (vertically, by default): `flex-start`, `center`, `stretch`.', code: '.row { align-items: center; }' },
          { name: 'gap', desc: 'Adds consistent spacing between flex (or grid) items, without needing margin hacks on individual children.', code: '.row { display: flex; gap: 12px; }' },
          { name: 'flex-wrap / flex: 1', desc: '`flex-wrap: wrap` lets items drop to a new line when they don\u2019t fit; `flex: 1` on a child makes it grow to fill available space.', code: '.row { flex-wrap: wrap; }\n.grow { flex: 1; }' },
        ],
      },
      {
        title: 'Grid',
        items: [
          { name: 'display: grid', desc: 'Turns an element into a 2D grid container, for layouts that need both rows and columns aligned together.', code: '.layout { display: grid; }' },
          { name: 'grid-template-columns', desc: 'Defines column tracks. `fr` units divide remaining space proportionally; `repeat()` avoids writing the same value repeatedly.', code: '.layout {\n  grid-template-columns: repeat(3, 1fr);\n}' },
          { name: 'grid-gap / gap', desc: 'Spacing between grid rows and columns, same property as flexbox\u2019s gap.', code: '.layout { gap: 16px; }' },
          { name: 'grid-column / grid-row', desc: 'Makes a specific item span multiple tracks.', code: '.featured {\n  grid-column: span 2;\n}' },
        ],
      },
      {
        title: 'Typography & Color',
        items: [
          { name: 'font-family / font-weight', desc: 'Sets the typeface and its boldness. Always include a generic fallback (`sans-serif`, `serif`) in case the primary font fails to load.', code: 'body {\n  font-family: "Inter", sans-serif;\n  font-weight: 500;\n}' },
          { name: 'color / background-color', desc: 'Text color and background color, accepting hex, rgb(), hsl(), or named colors.', code: '.card {\n  color: #1f2937;\n  background-color: #ffffff;\n}' },
          { name: 'line-height / letter-spacing', desc: 'Controls vertical rhythm between lines and horizontal spacing between characters \u2014 both meaningfully affect readability.', code: 'p { line-height: 1.6; letter-spacing: 0.01em; }' },
          { name: 'rem vs px vs %', desc: '`rem` scales with the root font size (better for accessibility/zoom), `px` is a fixed size, `%` is relative to the parent.', code: 'h1 { font-size: 2rem; }' },
        ],
      },
      {
        title: 'Responsive Design',
        items: [
          { name: '@media queries', desc: 'Apply styles conditionally based on viewport width (or other features), the core mechanism behind responsive layouts.', code: '@media (max-width: 640px) {\n  .row { flex-direction: column; }\n}' },
          { name: 'Mobile-first approach', desc: 'Write base styles for small screens first, then use `min-width` media queries to add complexity for larger screens \u2014 usually leads to simpler CSS than the reverse.', code: '.grid { grid-template-columns: 1fr; }\n@media (min-width: 768px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}' },
          { name: 'clamp()', desc: 'Sets a value that scales smoothly between a minimum and maximum, useful for fluid font sizes without a media query.', code: 'h1 { font-size: clamp(1.5rem, 4vw, 3rem); }' },
        ],
      },
      {
        title: 'Transitions & Animation',
        items: [
          { name: 'transition', desc: 'Smoothly animates a property change (like on `:hover`) instead of it snapping instantly.', code: 'button {\n  transition: background-color 0.2s ease;\n}\nbutton:hover { background-color: #333; }' },
          { name: '@keyframes / animation', desc: 'Defines a multi-step animation sequence and applies it to an element, independent of any user interaction.', code: '@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.4; }\n}\n.dot { animation: pulse 2s infinite; }' },
          { name: 'transform', desc: 'Moves, rotates, or scales an element without affecting the layout of surrounding elements \u2014 and it\u2019s GPU-accelerated, so it animates smoothly.', code: '.card:hover {\n  transform: translateY(-4px) scale(1.02);\n}' },
        ],
      },
    ],
  },

  js: {
    label: 'JavaScript',
    color: '#CA8A04',
    sections: [
      {
        title: 'Variables & Types',
        items: [
          { name: 'let, const, var', desc: '`const` for values that never get reassigned (default choice), `let` for values that do, `var` is legacy and best avoided \u2014 it doesn\u2019t respect block scope.', code: 'const name = "Ada";\nlet count = 0;\ncount = count + 1;' },
          { name: 'Primitive types', desc: 'string, number, boolean, null, undefined, and symbol/bigint. Everything else (arrays, objects, functions) is an object.', code: 'typeof "hi";     // "string"\ntypeof 42;       // "number"\ntypeof true;     // "boolean"' },
          { name: 'Template literals', desc: 'Backtick strings that support embedded expressions with `${}` and multi-line text without concatenation.', code: 'const name = "Ada";\nconsole.log(`Hello, ${name}!`);' },
          { name: '== vs ===', desc: '`===` checks value and type with no conversion (use this by default). `==` performs type coercion first, which causes surprising bugs.', code: '0 == "0";   // true  (coerced)\n0 === "0";  // false (no coercion)' },
        ],
      },
      {
        title: 'Operators & Control Flow',
        items: [
          { name: 'if / else / switch', desc: 'Standard branching. `switch` is useful when comparing one value against many discrete options.', code: 'if (age >= 18) {\n  console.log("adult");\n} else {\n  console.log("minor");\n}' },
          { name: 'Ternary operator', desc: 'A compact inline if/else that returns a value, common in JSX.', code: 'const label = isDone ? "Done" : "Pending";' },
          { name: 'Optional chaining (?.)', desc: 'Safely accesses a nested property, returning `undefined` instead of throwing if something along the chain is null/undefined.', code: 'const city = user?.address?.city;' },
          { name: 'Nullish coalescing (??)', desc: 'Returns the right-hand value only when the left is `null` or `undefined` \u2014 unlike `||`, it doesn\u2019t trigger on `0` or `""`.', code: 'const count = input ?? 0;' },
          { name: 'for / for...of / for...in', desc: '`for...of` iterates values (arrays, strings); `for...in` iterates object keys. Plain `for` gives full control over the loop.', code: 'for (const item of [1, 2, 3]) { console.log(item); }' },
        ],
      },
      {
        title: 'Functions',
        items: [
          { name: 'Function declaration', desc: 'A named, hoisted function \u2014 it can be called before its definition appears in the file.', code: 'function add(a, b) {\n  return a + b;\n}' },
          { name: 'Arrow functions', desc: 'A shorter syntax that also doesn\u2019t rebind `this`, which is why they\u2019re preferred inside classes and callbacks.', code: 'const add = (a, b) => a + b;' },
          { name: 'Default parameters', desc: 'Gives a parameter a fallback value if the caller doesn\u2019t provide one.', code: 'function greet(name = "friend") {\n  return `Hi, ${name}`;\n}' },
          { name: 'Rest & spread (...)', desc: '`...` gathers arguments into an array (rest) or expands an array/object into individual values (spread), depending on context.', code: 'function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }\nconst combined = [...arr1, ...arr2];' },
        ],
      },
      {
        title: 'Arrays & Objects',
        items: [
          { name: '.map() / .filter() / .reduce()', desc: 'The core array transformation trio: `map` transforms each item, `filter` keeps items matching a condition, `reduce` collapses the array into one value.', code: 'const doubled = [1, 2, 3].map(n => n * 2);\nconst evens = [1, 2, 3, 4].filter(n => n % 2 === 0);\nconst total = [1, 2, 3].reduce((sum, n) => sum + n, 0);' },
          { name: '.find() / .includes()', desc: '`find` returns the first matching item (or undefined); `includes` returns a boolean for whether a value exists in the array.', code: 'const user = users.find(u => u.id === 5);\nconst hasAdmin = roles.includes("admin");' },
          { name: 'Destructuring', desc: 'Unpacks values from arrays or properties from objects into individual variables in one line.', code: 'const { name, email } = user;\nconst [first, second] = list;' },
          { name: 'Object.keys/values/entries', desc: 'Extract an object\u2019s keys, values, or [key, value] pairs as arrays, so you can loop over an object like a list.', code: 'Object.entries({ a: 1, b: 2 }).forEach(([key, val]) => {\n  console.log(key, val);\n});' },
        ],
      },
      {
        title: 'DOM Manipulation',
        items: [
          { name: 'querySelector / querySelectorAll', desc: 'Selects one (or all) elements matching a CSS selector \u2014 the modern replacement for older `getElementById`-style lookups.', code: 'const btn = document.querySelector(".submit-btn");\nconst items = document.querySelectorAll("li");' },
          { name: 'addEventListener', desc: 'Attaches a function to run when an event fires, without overwriting any other listener on the same element.', code: 'btn.addEventListener("click", () => {\n  console.log("clicked");\n});' },
          { name: 'classList', desc: 'Adds, removes, or toggles CSS classes on an element without manually building a class string.', code: 'el.classList.add("active");\nel.classList.toggle("open");' },
          { name: 'textContent vs innerHTML', desc: '`textContent` sets plain text safely. `innerHTML` parses a string as HTML \u2014 only use it with trusted content, since it can execute injected markup.', code: 'el.textContent = userInput;   // safe\nel.innerHTML = trustedHtml;   // only with content you control' },
        ],
      },
      {
        title: 'Async: Promises & async/await',
        items: [
          { name: 'Promise', desc: 'Represents a value that will be available later (success or failure), the foundation for handling anything asynchronous like a network request.', code: 'fetch("/api/data")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));' },
          { name: 'async / await', desc: 'Syntax sugar over promises that lets asynchronous code read like synchronous code, usually easier to follow than chained `.then()` calls.', code: 'async function loadData() {\n  const res = await fetch("/api/data");\n  const data = await res.json();\n  return data;\n}' },
          { name: 'try / catch with async', desc: 'Wraps `await` calls so a rejected promise is caught as a regular error instead of crashing silently.', code: 'try {\n  const data = await loadData();\n} catch (err) {\n  console.error("Failed:", err);\n}' },
          { name: 'Promise.all', desc: 'Runs multiple promises concurrently and waits for all of them, much faster than awaiting each one sequentially when they don\u2019t depend on each other.', code: 'const [a, b] = await Promise.all([fetchA(), fetchB()]);' },
        ],
      },
      {
        title: 'ES6+ Features',
        items: [
          { name: 'Modules (import/export)', desc: 'Splits code across files. `export` makes something available; `import` brings it into another file.', code: '// utils.js\nexport const add = (a, b) => a + b;\n\n// main.js\nimport { add } from "./utils.js";' },
          { name: 'Classes', desc: 'Syntax for creating objects with shared behavior via a constructor and methods \u2014 built on JavaScript\u2019s prototype system under the hood.', code: 'class Person {\n  constructor(name) { this.name = name; }\n  greet() { return `Hi, I\'m ${this.name}`; }\n}' },
          { name: 'Sets & Maps', desc: '`Set` stores unique values with fast lookups; `Map` stores key-value pairs with any type of key (unlike plain objects, which coerce keys to strings).', code: 'const unique = new Set([1, 2, 2, 3]); // {1, 2, 3}\nconst map = new Map();\nmap.set("key", "value");' },
          { name: 'Array/Object spread copy', desc: 'A quick way to create a shallow copy, commonly used in React to update state immutably.', code: 'const updated = { ...state, count: state.count + 1 };\nconst copy = [...originalArray];' },
        ],
      },
    ],
  },
};
