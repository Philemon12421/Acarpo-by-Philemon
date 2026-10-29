// docsData.js
// Content for the Docs page. Each language: label, color, tagline, about, docsUrl, facts, getStarted, sections.
// Each item: name, desc, syntax?, params?, code, tips?, pitfalls?, see?
// `c(...)` joins lines with newlines so code stays readable and quote-safe.
const c = (...lines) => lines.join('\n');

export const DOCS = {
  /* ============================== HTML ============================== */
  html: {
    label: 'HTML', color: '#E34F26',
    tagline: 'The standard markup language for structuring content on the web.',
    about: 'HTML (HyperText Markup Language) describes the structure and meaning of web content using elements. Browsers parse it into the DOM, which CSS styles and JavaScript manipulates. Modern HTML5 adds semantic elements, native media, form validation and APIs that remove the need for many plugins.',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    facts: [['Type', 'Markup language'], ['Created', '1993 (HTML5: 2014)'], ['Maintained by', 'WHATWG'], ['File ext.', '.html, .htm']],
    getStarted: c(
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1">',
      '  <title>My First Page</title>',
      '</head>',
      '<body>',
      '  <h1>Hello, web!</h1>',
      '</body>',
      '</html>'
    ),
    sections: [
      {
        title: 'Document Structure',
        items: [
          { name: '<!DOCTYPE html>', desc: 'Declares the document as HTML5 so browsers render in standards mode instead of quirks mode. It must be the very first thing in the file.', syntax: '<!DOCTYPE html>', code: c('<!DOCTYPE html>', '<html lang="en">', '  ...', '</html>'), pitfalls: ['Omitting it triggers quirks mode, which causes inconsistent layout between browsers.'] },
          { name: '<html>', desc: 'The root element. All other elements must be descendants of it. Always set the lang attribute so screen readers pronounce text correctly and search engines know the language.', params: [['lang', 'Language code of the page, e.g. en, fr, ar.'], ['dir', 'Text direction: ltr, rtl or auto.']], code: c('<html lang="en" dir="ltr">', '  <head>...</head>', '  <body>...</body>', '</html>'), tips: ['Use lang on inner elements too when switching language mid-page.'] },
          { name: '<head>', desc: 'Holds metadata that is not rendered directly: title, character set, stylesheets, scripts, SEO and social tags.', code: c('<head>', '  <meta charset="UTF-8">', '  <title>Page Title</title>', '  <link rel="stylesheet" href="styles.css">', '</head>') },
          { name: '<meta>', desc: 'Defines metadata such as character encoding, viewport behaviour, description for search engines and Open Graph tags for social sharing.', params: [['charset', 'Character encoding. Use UTF-8.'], ['name / content', 'Named metadata pair, e.g. description, viewport, robots.'], ['property', 'Open Graph property such as og:title.']], code: c('<meta charset="UTF-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">', '<meta name="description" content="A short summary under 160 characters.">', '<meta property="og:title" content="My Page">'), tips: ['Keep the description around 150-160 characters.'], pitfalls: ['Without the viewport meta tag, mobile browsers render a zoomed-out desktop layout.'] },
          { name: '<title>', desc: 'Sets the document title shown in browser tabs, bookmarks and search results. Required in every document.', code: '<title>Acarpo Docs | HTML Reference</title>', tips: ['Keep titles unique per page and under about 60 characters.'] },
          { name: '<link>', desc: 'Links external resources such as stylesheets, icons and preloaded assets. It is a void element and has no closing tag.', params: [['rel', 'Relationship: stylesheet, icon, preload, canonical, preconnect.'], ['href', 'URL of the resource.'], ['as', 'Resource type when using preload.'], ['media', 'Media query that must match for the resource to apply.']], code: c('<link rel="stylesheet" href="main.css">', '<link rel="icon" href="/favicon.ico">', '<link rel="preconnect" href="https://fonts.googleapis.com">', '<link rel="canonical" href="https://example.com/page">') },
          { name: '<script>', desc: 'Embeds or references JavaScript. Use defer or async to avoid blocking HTML parsing; type="module" enables ES modules.', params: [['src', 'URL of an external script.'], ['defer', 'Download in parallel, run after parsing, in order.'], ['async', 'Download in parallel, run as soon as ready, in any order.'], ['type', 'module for ES modules, otherwise omit.']], code: c('<script src="app.js" defer></script>', '<script type="module" src="main.js"></script>', '<script>', '  console.log("inline script");', '</script>'), tips: ['Prefer defer for scripts that depend on the DOM.'], pitfalls: ['Plain scripts in the head block rendering until they download and run.'] },
          { name: '<style>', desc: 'Contains CSS rules embedded directly in the document. Useful for critical CSS or small demos; external stylesheets are better for caching.', code: c('<style>', '  body { margin: 0; font-family: system-ui; }', '</style>') },
          { name: '<body>', desc: 'Contains all visible content: text, images, links, forms and media. There is exactly one body per document.', code: c('<body>', '  <h1>Welcome</h1>', '  <p>Hello world!</p>', '</body>') },
        ]
      },
      {
        title: 'Text Content',
        items: [
          { name: '<h1> to <h6>', desc: 'Section headings, from most important (h1) to least (h6). They build the document outline used by assistive technology and search engines.', code: c('<h1>Main Title</h1>', '<h2>Subsection</h2>', '<h3>Sub-subsection</h3>'), tips: ['Use a single h1 per page and do not skip levels.', 'Choose heading level by structure, not by font size; use CSS for size.'] },
          { name: '<p>', desc: 'Defines a paragraph of text. Browsers add vertical margin by default.', code: '<p>This is a standard paragraph of text.</p>', pitfalls: ['Do not use empty paragraphs or br tags to create spacing; use CSS margin.'] },
          { name: '<strong> and <em>', desc: 'strong marks content of strong importance (usually bold). em marks stress emphasis (usually italic). Both carry meaning, unlike b and i.', code: '<p>This is <strong>important</strong> and you <em>must</em> read it.</p>', see: ['<b>', '<i>'] },
          { name: '<br> and <hr>', desc: 'br inserts a line break inside text (poems, addresses). hr draws a thematic break between sections.', code: c('<p>Line one<br>Line two</p>', '<hr>'), pitfalls: ['Do not use br to separate paragraphs.'] },
          { name: '<blockquote> and <q>', desc: 'blockquote is a block-level quotation from another source; q is a short inline quotation. Use the cite attribute for the source URL.', code: c('<blockquote cite="https://example.com">', '  <p>A longer quotation goes here.</p>', '</blockquote>', '<p>He said <q>keep it simple</q>.</p>') },
          { name: '<pre> and <code>', desc: 'pre preserves whitespace and line breaks. code marks a fragment of computer code. Combine them for code blocks.', code: c('<pre><code>function hello() {', '  return "hi";', '}</code></pre>'), tips: ['Escape angle brackets as &lt; and &gt; inside code samples.'] },
          { name: '<span> and <div>', desc: 'Generic containers with no meaning. span is inline, div is block-level. Use them only when no semantic element fits.', code: c('<p>Total: <span class="price">$20</span></p>', '<div class="card">...</div>'), tips: ['Prefer section, article, nav, etc. over div when they apply.'] },
          { name: '<mark>, <small>, <sub>, <sup>', desc: 'mark highlights relevant text, small is side-comments or legal text, sub is subscript, sup is superscript.', code: c('<p>Search result: <mark>highlighted</mark></p>', '<p>H<sub>2</sub>O and E = mc<sup>2</sup></p>', '<small>Terms apply.</small>') },
          { name: '<abbr>, <time>, <address>', desc: 'abbr expands an abbreviation via title. time gives machine-readable dates. address marks contact information for its nearest article or body.', code: c('<abbr title="HyperText Markup Language">HTML</abbr>', '<time datetime="2026-10-28">28 Oct 2026</time>', '<address>Contact: <a href="mailto:hi@example.com">hi@example.com</a></address>') },
        ]
      },
      {
        title: 'Links, Images and Media',
        items: [
          { name: '<a>', desc: 'Creates a hyperlink to a page, file, email address, phone number or an in-page anchor.', params: [['href', 'Destination URL, #id, mailto: or tel:.'], ['target', '_blank opens a new tab.'], ['rel', 'noopener noreferrer for external _blank links.'], ['download', 'Prompts download instead of navigation.']], code: c('<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>', '<a href="#contact">Jump to contact</a>', '<a href="mailto:hi@example.com">Email us</a>', '<a href="tel:+233200000000">Call</a>'), tips: ['Write descriptive link text; avoid "click here".'], pitfalls: ['Using target="_blank" without rel="noopener" exposes window.opener in older browsers.'] },
          { name: '<img>', desc: 'Embeds an image. alt is required for accessibility; width and height prevent layout shift.', params: [['src', 'Image URL.'], ['alt', 'Text alternative. Use empty alt="" for decorative images.'], ['width / height', 'Intrinsic size in pixels, reserves space.'], ['loading', 'lazy defers offscreen images.'], ['srcset / sizes', 'Responsive image candidates.']], code: c('<img src="logo.png" alt="Company logo" width="200" height="80" loading="lazy">'), tips: ['Use modern formats like WebP or AVIF.'], pitfalls: ['Missing alt text fails accessibility checks.'] },
          { name: '<picture> and srcset', desc: 'Serve different images by screen size or format, with a fallback img inside.', code: c('<picture>', '  <source srcset="hero.avif" type="image/avif">', '  <source srcset="hero.webp" type="image/webp">', '  <img src="hero.jpg" alt="Hero banner">', '</picture>', '', '<img src="s.jpg" srcset="s.jpg 480w, m.jpg 800w, l.jpg 1200w"', '     sizes="(max-width: 600px) 480px, 800px" alt="Photo">') },
          { name: '<video> and <audio>', desc: 'Native media players. Provide multiple sources and captions for compatibility and accessibility.', params: [['controls', 'Shows playback controls.'], ['autoplay', 'Starts automatically (muted required in most browsers).'], ['loop', 'Repeats playback.'], ['poster', 'Preview image for video.'], ['preload', 'none, metadata or auto.']], code: c('<video controls width="640" poster="thumb.jpg">', '  <source src="movie.mp4" type="video/mp4">', '  <track kind="captions" src="en.vtt" srclang="en" label="English">', '  Your browser does not support video.', '</video>', '', '<audio controls src="song.mp3"></audio>') },
          { name: '<iframe>', desc: 'Embeds another HTML page inside the current one, such as maps or videos.', params: [['src', 'URL to embed.'], ['title', 'Required for accessibility.'], ['sandbox', 'Restricts what the embedded page can do.'], ['loading', 'lazy delays loading.']], code: '<iframe src="https://www.openstreetmap.org/export/embed.html" title="Map" loading="lazy" sandbox></iframe>', pitfalls: ['Embedding untrusted pages without sandbox is a security risk.'] },
          { name: '<figure> and <figcaption>', desc: 'Wrap self-contained media (image, chart, code) with an optional caption.', code: c('<figure>', '  <img src="chart.png" alt="Sales by quarter">', '  <figcaption>Figure 1: Sales by quarter</figcaption>', '</figure>') },
        ]
      },
      {
        title: 'Lists and Tables',
        items: [
          { name: '<ul>, <ol>, <li>', desc: 'ul is an unordered (bulleted) list, ol an ordered (numbered) list, li an item. Lists can be nested.', params: [['start', 'Starting number for ol.'], ['reversed', 'Counts down on ol.'], ['type', 'Numbering style on ol (1, a, A, i, I).']], code: c('<ul>', '  <li>Item 1</li>', '  <li>Item 2</li>', '</ul>', '<ol start="3">', '  <li>Third</li>', '  <li>Fourth</li>', '</ol>'), tips: ['Use lists for navigation menus too; it helps screen readers.'] },
          { name: '<dl>, <dt>, <dd>', desc: 'Description lists pair terms with descriptions, ideal for glossaries and metadata.', code: c('<dl>', '  <dt>HTML</dt>', '  <dd>Markup language for the web.</dd>', '</dl>') },
          { name: '<table>', desc: 'Displays tabular data. Use thead, tbody, tfoot, th (with scope) and caption for accessibility.', params: [['colspan', 'Cell spans multiple columns.'], ['rowspan', 'Cell spans multiple rows.'], ['scope', 'col or row on th for assistive tech.']], code: c('<table>', '  <caption>Team members</caption>', '  <thead>', '    <tr><th scope="col">Name</th><th scope="col">Role</th></tr>', '  </thead>', '  <tbody>', '    <tr><td>Ama</td><td>Designer</td></tr>', '  </tbody>', '</table>'), pitfalls: ['Never use tables for page layout; use CSS Grid or Flexbox.'] },
        ]
      },
      {
        title: 'Forms and Input',
        items: [
          { name: '<form>', desc: 'Container for user input that can be submitted to a server or handled by JavaScript.', params: [['action', 'URL that processes the form.'], ['method', 'get or post.'], ['novalidate', 'Disables native validation.'], ['autocomplete', 'on or off.']], code: c('<form action="/subscribe" method="post">', '  <label for="email">Email</label>', '  <input id="email" name="email" type="email" required>', '  <button type="submit">Subscribe</button>', '</form>'), tips: ['Always pair inputs with a label.'] },
          { name: '<input>', desc: 'The most versatile form control. The type attribute selects behaviour: text, email, password, number, date, range, checkbox, radio, file, color, search, tel, url and more.', params: [['type', 'Kind of control.'], ['name', 'Key used when submitting.'], ['required', 'Must be filled.'], ['placeholder', 'Hint text (not a label).'], ['min / max / step', 'Limits for numbers and dates.'], ['pattern', 'Regex the value must match.'], ['autocomplete', 'Hint for autofill, e.g. email, current-password.'], ['disabled / readonly', 'Prevent editing.']], code: c('<input type="text" name="user" placeholder="Username" required minlength="3">', '<input type="number" min="1" max="10" step="1">', '<input type="checkbox" id="agree" name="agree">', '<input type="file" accept="image/*" multiple>'), pitfalls: ['Placeholder is not a substitute for a label.', 'Client-side validation never replaces server-side validation.'] },
          { name: '<label>', desc: 'Associates text with a form control. Clicking the label focuses or toggles the control and screen readers announce it.', code: c('<label for="name">Name</label>', '<input id="name" type="text">', '', '<label>Remember me <input type="checkbox"></label>') },
          { name: '<select>, <option>, <optgroup>', desc: 'Dropdown list of choices.', code: c('<select name="country">', '  <optgroup label="Africa">', '    <option value="gh" selected>Ghana</option>', '    <option value="ng">Nigeria</option>', '  </optgroup>', '</select>') },
          { name: '<textarea>', desc: 'Multi-line text input.', params: [['rows / cols', 'Visible size.'], ['maxlength', 'Character limit.'], ['wrap', 'soft or hard.']], code: '<textarea name="msg" rows="4" maxlength="500"></textarea>' },
          { name: '<button>', desc: 'Clickable button. Defaults to type="submit" inside a form.', params: [['type', 'submit, button or reset.'], ['disabled', 'Prevents clicks.']], code: c('<button type="submit">Send</button>', '<button type="button" onclick="doThing()">Click</button>'), pitfalls: ['A button without type inside a form submits it unexpectedly.'] },
          { name: '<fieldset> and <legend>', desc: 'Group related controls with a caption, such as radio sets.', code: c('<fieldset>', '  <legend>Choose a plan</legend>', '  <label><input type="radio" name="plan" value="free"> Free</label>', '  <label><input type="radio" name="plan" value="pro"> Pro</label>', '</fieldset>') },
          { name: '<datalist>, <progress>, <meter>', desc: 'datalist gives autocomplete suggestions; progress shows task completion; meter shows a scalar within a known range.', code: c('<input list="browsers" name="b">', '<datalist id="browsers"><option value="Firefox"><option value="Chrome"></datalist>', '<progress value="70" max="100"></progress>', '<meter value="0.6">60%</meter>') },
        ]
      },
      {
        title: 'Semantic Layout',
        items: [
          { name: '<header>, <nav>, <main>, <footer>', desc: 'Landmark elements that describe page regions. They give assistive technology navigation shortcuts and improve SEO.', code: c('<header><h1>Site</h1></header>', '<nav><a href="/">Home</a> <a href="/docs">Docs</a></nav>', '<main>...</main>', '<footer>&copy; 2026</footer>'), tips: ['Use exactly one main per page.'] },
          { name: '<section> and <article>', desc: 'section groups thematically related content and should have a heading. article is self-contained content that could be distributed on its own (post, comment, card).', code: c('<article>', '  <h2>Blog post</h2>', '  <p>Content...</p>', '</article>') },
          { name: '<aside>', desc: 'Content tangentially related to the surrounding content, such as sidebars or callouts.', code: '<aside><h3>Related</h3>...</aside>' },
          { name: '<details> and <summary>', desc: 'Native disclosure widget that expands and collapses without JavaScript.', code: c('<details>', '  <summary>Show more</summary>', '  <p>Hidden content.</p>', '</details>') },
          { name: '<dialog>', desc: 'Native modal or non-modal dialog. Use showModal() for a modal with backdrop and focus trapping.', code: c('<dialog id="dlg"><p>Hello</p><button onclick="dlg.close()">Close</button></dialog>', '<button onclick="dlg.showModal()">Open</button>') },
          { name: '<template> and <slot>', desc: 'template holds inert markup that can be cloned by JavaScript; slot is a placeholder in web components.', code: c('<template id="row"><li class="item"></li></template>', '<script>', '  const node = document.getElementById("row").content.cloneNode(true);', '</script>') },
        ]
      },
      {
        title: 'Global Attributes and Accessibility',
        items: [
          { name: 'id, class, style', desc: 'id is a unique identifier; class is a reusable label for styling; style applies inline CSS.', code: '<div id="hero" class="card featured" style="margin: 0">...</div>', pitfalls: ['ids must be unique in a document.', 'Avoid inline styles; they are hard to override.'] },
          { name: 'data-* attributes', desc: 'Custom attributes for storing data, readable via dataset in JavaScript.', code: c('<li data-user-id="42" data-role="admin">Ama</li>', '<script>', '  document.querySelector("li").dataset.userId; // "42"', '</script>') },
          { name: 'hidden, tabindex, contenteditable', desc: 'hidden hides an element; tabindex controls keyboard focus order (0 adds to order, -1 makes programmatically focusable); contenteditable lets users edit content.', code: c('<p hidden>Not shown</p>', '<div tabindex="0">Focusable</div>', '<div contenteditable="true">Edit me</div>'), pitfalls: ['Avoid positive tabindex values; they break natural focus order.'] },
          { name: 'ARIA attributes', desc: 'Accessible Rich Internet Applications attributes expose roles, states and labels to assistive technology when native HTML is not enough.', params: [['role', 'Defines the widget type.'], ['aria-label', 'Accessible name when no visible text.'], ['aria-labelledby', 'Points to element(s) that label this one.'], ['aria-expanded', 'true/false for collapsible controls.'], ['aria-hidden', 'Hides decorative content from screen readers.'], ['aria-live', 'Announces dynamic updates.']], code: c('<button aria-expanded="false" aria-controls="menu">Menu</button>', '<ul id="menu" hidden>...</ul>', '<div role="status" aria-live="polite">Saved</div>'), tips: ['First rule of ARIA: use a native element if one exists.'] },
          { name: 'Character entities', desc: 'Escape reserved characters or insert symbols using named or numeric references.', code: c('&lt;  &gt;  &amp;  &quot;  &nbsp;  &copy;  &euro;  &#128512;') },
        ]
      }
    ]
  },

  /* ============================== CSS ============================== */
  css: {
    label: 'CSS', color: '#1572B6',
    tagline: 'The language that styles and lays out web pages.',
    about: 'Cascading Style Sheets control colour, typography, spacing, layout, animation and responsive behaviour. Rules are selected by selectors, resolved by the cascade (origin, specificity, order) and inherited through the DOM tree. Modern CSS includes Flexbox, Grid, custom properties, container queries and nesting.',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    facts: [['Type', 'Style sheet language'], ['Created', '1996'], ['Maintained by', 'W3C CSSWG'], ['File ext.', '.css']],
    getStarted: c('/* styles.css */', ':root { --brand: #1572b6; }', 'body { font-family: system-ui, sans-serif; margin: 0; }', '.btn { background: var(--brand); color: #fff; padding: 0.5rem 1rem; border-radius: 8px; }'),
    sections: [
      {
        title: 'Selectors and the Cascade',
        items: [
          { name: 'Basic selectors', desc: 'Element, class, id, universal and attribute selectors target elements.', syntax: c('element { }', '.class { }', '#id { }', '* { }', '[attr="value"] { }'), code: c('p { color: #333; }', '.card { padding: 1rem; }', '#hero { height: 80vh; }', 'a[target="_blank"] { text-decoration: underline; }'), tips: ['Prefer classes for styling; ids are hard to override.'] },
          { name: 'Combinators', desc: 'Describe relationships between elements: descendant (space), child (>), adjacent sibling (+) and general sibling (~).', code: c('nav a { color: white; }        /* any descendant */', 'ul > li { margin: 0; }          /* direct children */', 'h2 + p { font-weight: 600; }    /* next sibling */', 'h2 ~ p { color: gray; }         /* all later siblings */') },
          { name: 'Pseudo-classes', desc: 'Select elements by state or position: :hover, :focus, :focus-visible, :first-child, :nth-child(), :not(), :is(), :where(), :has().', code: c('a:hover { color: red; }', 'li:nth-child(odd) { background: #f4f4f5; }', 'button:focus-visible { outline: 2px solid dodgerblue; }', 'input:not(:disabled) { opacity: 1; }', '.card:has(img) { display: grid; }'), tips: ['Use :focus-visible instead of :focus to avoid outlines on mouse clicks.'] },
          { name: 'Pseudo-elements', desc: 'Style parts of an element or insert generated content: ::before, ::after, ::first-line, ::placeholder, ::selection, ::marker.', code: c('.required::after { content: " *"; color: red; }', '::selection { background: gold; }', 'input::placeholder { color: #a1a1aa; }'), pitfalls: ['::before and ::after do nothing without a content property.'] },
          { name: 'Specificity and cascade', desc: 'When rules conflict, the winner is decided by origin and importance, then specificity (inline > id > class/attribute/pseudo-class > element), then source order. Cascade layers (@layer) add another control.', code: c('/* specificity: (0,1,0) beats (0,0,1) */', 'p { color: black; }', '.note { color: blue; }', '', '@layer base, components;', '@layer base { a { color: blue; } }'), pitfalls: ['Overusing !important makes styles unmaintainable.'] },
          { name: 'CSS nesting', desc: 'Write child rules inside the parent rule, like in Sass, natively supported in modern browsers.', code: c('.card {', '  padding: 1rem;', '  &:hover { box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }', '  .title { font-weight: 700; }', '}') },
        ]
      },
      {
        title: 'Box Model and Sizing',
        items: [
          { name: 'margin', desc: 'Space outside an element border. Vertical margins between block siblings can collapse into one.', syntax: c('margin: all;', 'margin: vertical horizontal;', 'margin: top right bottom left;'), code: c('.box { margin: 20px; }', '.box { margin: 0 auto; } /* center a block with a width */', '.box { margin-block: 1rem; margin-inline: auto; }') },
          { name: 'padding', desc: 'Space inside an element between content and border. Background paints under padding.', code: c('.box { padding: 16px; }', '.box { padding: 8px 16px; }') },
          { name: 'border and outline', desc: 'border sits on the box edge and affects layout; outline is drawn outside and does not change size.', code: c('.card { border: 1px solid #e4e4e7; border-radius: 12px; }', 'button:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }') },
          { name: 'box-sizing', desc: 'Controls whether width and height include padding and border. border-box makes sizing predictable.', code: c('*, *::before, *::after { box-sizing: border-box; }'), tips: ['Apply border-box globally in every project.'] },
          { name: 'width, height, min/max', desc: 'Set sizes using px, %, rem, vw/vh, or modern units like dvh. min-* and max-* clamp the size.', code: c('.container { width: min(100% - 2rem, 1200px); margin-inline: auto; }', '.hero { min-height: 100dvh; }', 'img { max-width: 100%; height: auto; }') },
          { name: 'aspect-ratio and object-fit', desc: 'aspect-ratio keeps proportions; object-fit controls how images fill their box.', code: c('.thumb { aspect-ratio: 16 / 9; width: 100%; }', '.thumb img { width: 100%; height: 100%; object-fit: cover; }') },
          { name: 'overflow', desc: 'Controls what happens when content exceeds the box: visible, hidden, scroll, auto, clip.', code: c('.panel { overflow: auto; max-height: 300px; }', '.truncate { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }') },
          { name: 'Units', desc: 'Absolute (px) and relative (em, rem, %, vw, vh, ch, fr) units. rem is relative to the root font size; em to the element font size.', code: c('html { font-size: 100%; }', 'h1 { font-size: 2.5rem; }', '.sidebar { width: 30ch; }'), tips: ['Use rem for font sizes to respect user preferences.'] },
        ]
      },
      {
        title: 'Layout',
        items: [
          { name: 'display', desc: 'Sets the box type: block, inline, inline-block, flex, grid, none, contents.', code: c('.hidden { display: none; }', '.row { display: flex; }', '.layout { display: grid; }'), pitfalls: ['display: none removes the element from the accessibility tree as well.'] },
          { name: 'position', desc: 'Positioning scheme: static (default), relative, absolute, fixed, sticky. Use top/right/bottom/left/inset with non-static values.', code: c('.badge { position: absolute; top: 8px; right: 8px; }', '.card { position: relative; }', 'header { position: sticky; top: 0; z-index: 10; }'), tips: ['An absolute element positions against the nearest positioned ancestor.'] },
          { name: 'Flexbox', desc: 'One-dimensional layout along a row or column with powerful alignment and distribution.', params: [['flex-direction', 'row, column, row-reverse, column-reverse.'], ['justify-content', 'Alignment on main axis.'], ['align-items', 'Alignment on cross axis.'], ['flex-wrap', 'Allow items to wrap.'], ['gap', 'Space between items.'], ['flex: grow shrink basis', 'Item sizing shorthand.']], code: c('.container {', '  display: flex;', '  justify-content: space-between;', '  align-items: center;', '  gap: 1rem;', '  flex-wrap: wrap;', '}', '.item { flex: 1 1 200px; }'), tips: ['Use gap instead of margins between flex items.'] },
          { name: 'CSS Grid', desc: 'Two-dimensional layout with rows and columns, named areas and auto-placement.', params: [['grid-template-columns', 'Defines column tracks.'], ['grid-template-areas', 'Named layout regions.'], ['grid-auto-flow', 'Auto-placement direction.'], ['place-items', 'Shorthand for align-items and justify-items.'], ['minmax()', 'Track min and max sizes.'], ['auto-fit / auto-fill', 'Responsive column count.']], code: c('.grid {', '  display: grid;', '  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));', '  gap: 16px;', '}', '', '.page {', '  display: grid;', '  grid-template-areas: "head head" "side main";', '  grid-template-columns: 240px 1fr;', '}', '.page > header { grid-area: head; }'), tips: ['repeat(auto-fit, minmax(...)) gives responsive grids without media queries.'] },
          { name: 'z-index and stacking', desc: 'Controls overlap order for positioned elements. Stacking contexts isolate z-index values.', code: c('.modal { position: fixed; inset: 0; z-index: 1000; }'), pitfalls: ['z-index only works on positioned or flex/grid items.', 'transform, opacity and filter create new stacking contexts.'] },
          { name: 'Centering patterns', desc: 'Common ways to center content horizontally and vertically.', code: c('/* Grid */', '.center { display: grid; place-items: center; min-height: 100vh; }', '/* Flex */', '.center { display: flex; justify-content: center; align-items: center; }', '/* Block */', '.box { width: 600px; margin-inline: auto; }') },
        ]
      },
      {
        title: 'Typography and Color',
        items: [
          { name: 'font-family, font-size, font-weight', desc: 'Typeface, size and weight. Always provide generic fallbacks. Use @font-face or a font service for custom fonts.', code: c('body { font-family: "Inter", system-ui, sans-serif; font-size: 1rem; }', 'h1 { font-weight: 800; }', '@font-face {', '  font-family: "MyFont";', '  src: url("/fonts/my.woff2") format("woff2");', '  font-display: swap;', '}'), tips: ['Use font-display: swap to avoid invisible text while fonts load.'] },
          { name: 'line-height, letter-spacing, text-align', desc: 'Control vertical rhythm, tracking and alignment.', code: c('p { line-height: 1.6; letter-spacing: 0.01em; text-align: left; }'), tips: ['Use unitless line-height (1.5 to 1.7) for body text.'] },
          { name: 'text-decoration, text-transform, white-space', desc: 'Underline/strike styles, case conversion and whitespace handling.', code: c('a { text-decoration: none; }', '.caps { text-transform: uppercase; }', '.nowrap { white-space: nowrap; }') },
          { name: 'Color formats', desc: 'Hex, rgb(), hsl(), and modern oklch(), lab() and color-mix(). Alpha is set with a slash.', code: c('.a { color: #ef4444; }', '.b { color: rgb(239 68 68 / 0.5); }', '.c { color: hsl(0 84% 60%); }', '.d { color: oklch(63% 0.25 29); }', '.e { background: color-mix(in srgb, red 30%, white); }'), tips: ['Meet a contrast ratio of at least 4.5:1 for body text.'] },
          { name: 'background and gradients', desc: 'Backgrounds can layer colors, images and gradients.', code: c('.hero {', '  background: linear-gradient(135deg, #6366f1, #ec4899), url("bg.jpg") center / cover no-repeat;', '}', '.ring { background: conic-gradient(red, yellow, green); }') },
          { name: 'box-shadow, text-shadow, filter', desc: 'Shadows and visual effects.', code: c('.card { box-shadow: 0 4px 12px rgb(0 0 0 / 0.12); }', 'h1 { text-shadow: 0 1px 2px rgb(0 0 0 / 0.3); }', 'img { filter: grayscale(1) blur(2px); }', '.glass { backdrop-filter: blur(8px); }') },
        ]
      },
      {
        title: 'Variables, Functions and Responsive Design',
        items: [
          { name: 'Custom properties (variables)', desc: 'Define reusable values with --name and read them with var(). They cascade and can be changed at runtime.', code: c(':root { --brand: #6366f1; --space: 1rem; }', '.btn { background: var(--brand, blue); padding: var(--space); }', '.dark { --brand: #818cf8; }'), tips: ['Use variables for theming and dark mode.'] },
          { name: 'calc(), min(), max(), clamp()', desc: 'Math functions for fluid sizing. clamp(min, preferred, max) is ideal for responsive typography.', code: c('.w { width: calc(100% - 2rem); }', 'h1 { font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem); }') },
          { name: 'Media queries', desc: 'Apply styles based on viewport or user preferences such as dark mode and reduced motion.', code: c('@media (min-width: 768px) { .grid { grid-template-columns: 1fr 1fr; } }', '@media (prefers-color-scheme: dark) { body { background: #09090b; color: #fafafa; } }', '@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }'), tips: ['Design mobile-first with min-width queries.'] },
          { name: 'Container queries', desc: 'Style a component based on its container size rather than the viewport.', code: c('.card-wrap { container-type: inline-size; }', '@container (min-width: 400px) {', '  .card { display: grid; grid-template-columns: 1fr 2fr; }', '}') },
        ]
      },
      {
        title: 'Transitions, Transforms and Animation',
        items: [
          { name: 'transition', desc: 'Animates property changes smoothly between states.', syntax: 'transition: property duration timing-function delay;', code: c('.btn { background: #4f46e5; transition: background 0.2s ease, transform 0.2s ease; }', '.btn:hover { background: #4338ca; transform: translateY(-2px); }'), tips: ['Animate transform and opacity for best performance.'], pitfalls: ['Transitioning display or height: auto does not work directly.'] },
          { name: 'transform', desc: 'Move, scale, rotate and skew elements without affecting layout.', code: c('.a { transform: translate(10px, 20px) rotate(15deg) scale(1.1); }', '.b { transform: translate3d(0, 0, 0); }') },
          { name: '@keyframes and animation', desc: 'Define multi-step animations and apply them to elements.', params: [['animation-name', 'Keyframes to use.'], ['animation-duration', 'Length of one cycle.'], ['animation-iteration-count', 'Number or infinite.'], ['animation-timing-function', 'Easing.'], ['animation-fill-mode', 'forwards keeps last frame.']], code: c('@keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }', '.toast { animation: fade-in 0.3s ease-out both; }', '.spinner { animation: spin 1s linear infinite; }', '@keyframes spin { to { transform: rotate(360deg); } }') },
        ]
      }
    ]
  },

  /* ============================== JavaScript ============================== */
  js: {
    label: 'JavaScript', color: '#F7DF1E', textOnColor: '#18181B',
    tagline: 'The programming language of the web, now everywhere.',
    about: 'JavaScript is a dynamic, multi-paradigm language that runs in browsers, on servers (Node.js, Deno, Bun) and on devices. It supports first-class functions, prototypes and classes, async programming with promises and async/await, and is standardised as ECMAScript (ES2015+ is called modern JavaScript).',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    facts: [['Paradigm', 'Multi-paradigm'], ['Created', '1995 by Brendan Eich'], ['Standard', 'ECMAScript (TC39)'], ['File ext.', '.js, .mjs']],
    getStarted: c('// Run in the browser console or with Node.js: node hello.js', 'const name = "World";', 'console.log(`Hello, ${name}!`);'),
    sections: [
      {
        title: 'Variables and Data Types',
        items: [
          { name: 'const, let, var', desc: 'const declares a block-scoped binding that cannot be reassigned. let is block-scoped and reassignable. var is function-scoped and hoisted; avoid it in modern code.', code: c('const PI = 3.14;', 'let count = 0;', 'count += 1;', 'var legacy = "avoid";'), tips: ['Default to const; use let only when you must reassign.'], pitfalls: ['const does not make objects immutable, only the binding.', 'Accessing let/const before declaration throws (temporal dead zone).'] },
          { name: 'Primitive types', desc: 'string, number, bigint, boolean, undefined, null, symbol. Everything else is an object.', code: c('typeof "hi";      // "string"', 'typeof 42;        // "number"', 'typeof 10n;       // "bigint"', 'typeof true;      // "boolean"', 'typeof undefined; // "undefined"', 'typeof null;      // "object" (historic quirk)'), pitfalls: ['0.1 + 0.2 !== 0.3 because numbers are IEEE 754 doubles.'] },
          { name: 'Strings and template literals', desc: 'Strings are immutable sequences of UTF-16 code units. Template literals use backticks for interpolation and multi-line text.', code: c('const name = "Ama";', 'const msg = `Hello, ${name}! 2 + 2 = ${2 + 2}`;', '"abc".toUpperCase();', '"a,b,c".split(",");', '"  hi ".trim();', '"hello".includes("ell");', '"abc".padStart(5, "*");') },
          { name: 'Numbers and Math', desc: 'All numbers are 64-bit floats. Use Number methods and the Math object.', code: c('Number("42");           // 42', 'parseInt("42px", 10);   // 42', '(3.14159).toFixed(2);   // "3.14"', 'Math.max(1, 5, 3);', 'Math.round(2.5);        // 3', 'Math.floor(Math.random() * 10);', 'Number.isNaN(NaN);      // true') },
          { name: 'Type coercion and equality', desc: '== converts types before comparing; === does not. Falsy values are false, 0, -0, 0n, "", null, undefined and NaN.', code: c('0 == "0";   // true', '0 === "0";  // false', 'Boolean([]); // true (arrays are truthy)', '!!"text";    // true'), tips: ['Always use === and !==.'] },
          { name: 'Arrays', desc: 'Ordered, zero-indexed, resizable lists. Arrays are objects with many built-in methods.', code: c('const fruits = ["apple", "banana"];', 'fruits.push("orange");     // add to end', 'fruits.pop();              // remove from end', 'fruits.unshift("kiwi");    // add to start', 'fruits.length;', 'fruits.at(-1);             // last item', 'fruits.includes("apple");', 'fruits.indexOf("banana");') },
          { name: 'Objects', desc: 'Collections of key-value pairs. Keys are strings or symbols. Use shorthand, computed keys and spread.', code: c('const user = { name: "Alice", age: 25, greet() { return `Hi ${this.name}`; } };', 'user.name;         // dot access', 'user["age"];       // bracket access', 'Object.keys(user); Object.values(user); Object.entries(user);', 'const copy = { ...user, age: 26 };', 'delete copy.age;') },
          { name: 'Destructuring, spread and rest', desc: 'Unpack arrays and objects into variables, copy or merge with spread, collect arguments with rest.', code: c('const [a, b = 2, ...rest] = [1, undefined, 3, 4];', 'const { name, age: years = 0 } = user;', 'const merged = [...arr1, ...arr2];', 'function sum(...nums) { return nums.reduce((x, y) => x + y, 0); }') },
          { name: 'Map, Set, WeakMap', desc: 'Map holds key-value pairs with any key type and keeps insertion order. Set stores unique values.', code: c('const m = new Map([["a", 1]]);', 'm.set("b", 2); m.get("a"); m.has("b"); m.size;', 'const s = new Set([1, 2, 2, 3]); // {1, 2, 3}', '[...new Set(arr)]; // dedupe an array') },
        ]
      },
      {
        title: 'Operators and Control Flow',
        items: [
          { name: 'Optional chaining and nullish coalescing', desc: '?. short-circuits on null or undefined. ?? returns the right side only for null or undefined (unlike ||).', code: c('const city = user?.address?.city;', 'const first = list?.[0];', 'const fn = obj.method?.();', 'const port = config.port ?? 3000;  // keeps 0', 'config.retries ||= 3;             // assign if falsy', 'config.name ??= "default";        // assign if nullish') },
          { name: 'if, switch, ternary', desc: 'Branch execution based on conditions.', code: c('if (score >= 90) { grade = "A"; } else if (score >= 80) { grade = "B"; } else { grade = "C"; }', 'const label = isAdmin ? "Admin" : "User";', 'switch (day) { case 0: name = "Sun"; break; default: name = "Other"; }'), pitfalls: ['Forgetting break in switch causes fall-through.'] },
          { name: 'Loops', desc: 'for, while, do...while, for...of (iterables), for...in (object keys).', code: c('for (let i = 0; i < 5; i++) { console.log(i); }', 'for (const item of [10, 20]) { console.log(item); }', 'for (const key in obj) { if (Object.hasOwn(obj, key)) console.log(key); }', 'while (n > 0) { n--; }'), pitfalls: ['for...in on arrays iterates keys and inherited properties; use for...of.'] },
          { name: 'try / catch / finally', desc: 'Handle runtime errors. Throw Error objects, not strings.', code: c('try {', '  JSON.parse("{bad");', '} catch (err) {', '  console.error(err.name, err.message);', '} finally {', '  console.log("always runs");', '}', 'throw new Error("Something went wrong");') },
        ]
      },
      {
        title: 'Functions and Scope',
        items: [
          { name: 'Function declarations and expressions', desc: 'Declarations are hoisted; expressions are not. Functions are first-class values.', code: c('function add(a, b = 0) { return a + b; }', 'const mul = function (a, b) { return a * b; };', 'console.log(add(2, 3));') },
          { name: 'Arrow functions', desc: 'Shorter syntax that does not bind its own this, arguments or prototype. Ideal for callbacks.', code: c('const add = (a, b) => a + b;', 'const square = n => n * n;', 'const makeUser = name => ({ name });   // return object literal', 'items.map(i => i.id);'), pitfalls: ['Do not use arrow functions as object methods when you need this.'] },
          { name: 'Closures', desc: 'A function remembers variables from the scope where it was created, even after that scope ends.', code: c('function counter() {', '  let n = 0;', '  return () => ++n;', '}', 'const next = counter();', 'next(); // 1', 'next(); // 2') },
          { name: 'this, call, apply, bind', desc: 'this depends on how a function is called. call/apply invoke with a given this; bind returns a new bound function.', code: c('function hi(greet) { return greet + ", " + this.name; }', 'hi.call({ name: "Ama" }, "Hello");', 'const bound = hi.bind({ name: "Kofi" });') },
          { name: 'Higher-order and pure functions', desc: 'Functions that take or return functions. Pure functions have no side effects and are easier to test.', code: c('const compose = (f, g) => x => f(g(x));', 'const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };') },
        ]
      },
      {
        title: 'Array Methods',
        items: [
          { name: 'map, filter, reduce', desc: 'map transforms each element, filter keeps matches, reduce folds the array into one value. All return new values without mutating the original.', code: c('const nums = [1, 2, 3, 4];', 'nums.map(n => n * 2);            // [2, 4, 6, 8]', 'nums.filter(n => n % 2 === 0);   // [2, 4]', 'nums.reduce((sum, n) => sum + n, 0); // 10'), pitfalls: ['Always pass an initial value to reduce to avoid errors on empty arrays.'] },
          { name: 'find, some, every, findLast', desc: 'Search and test elements.', code: c('users.find(u => u.id === 3);', 'users.some(u => u.admin);', 'users.every(u => u.active);', 'users.findIndex(u => u.id === 3);', 'users.findLast(u => u.active);') },
          { name: 'sort, reverse, toSorted', desc: 'sort mutates the array and sorts as strings by default, so pass a comparator. toSorted, toReversed, toSpliced and with return copies.', code: c('[10, 9, 1].sort();                 // [1, 10, 9]  (string order!)', '[10, 9, 1].sort((a, b) => a - b);  // [1, 9, 10]', 'const sorted = arr.toSorted((a, b) => b - a);'), pitfalls: ['Default sort compares strings, not numbers.'] },
          { name: 'slice, splice, concat, flat, flatMap', desc: 'slice copies a range; splice mutates by removing/inserting; flat flattens nested arrays.', code: c('arr.slice(1, 3);', 'arr.splice(1, 2, "x");', '[1, [2, [3]]].flat(Infinity);', 'sentences.flatMap(s => s.split(" "));', 'Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]') },
          { name: 'Object helpers', desc: 'Utilities for working with objects.', code: c('Object.entries({ a: 1 }).map(([k, v]) => [k, v * 2]);', 'Object.fromEntries([["a", 1]]);', 'Object.assign({}, a, b);', 'structuredClone(deepObj); // deep copy', 'Object.freeze(config);') },
        ]
      },
      {
        title: 'Asynchronous JavaScript',
        items: [
          { name: 'Event loop and timers', desc: 'JavaScript is single-threaded; async work is scheduled through the event loop. Microtasks (promises) run before macrotasks (timers).', code: c('setTimeout(() => console.log("later"), 1000);', 'const id = setInterval(tick, 500); clearInterval(id);', 'queueMicrotask(() => console.log("micro"));') },
          { name: 'Promises', desc: 'An object representing an eventual result. States: pending, fulfilled, rejected. Chain with then/catch/finally.', code: c('fetch("/api/users")', '  .then(res => res.json())', '  .then(data => console.log(data))', '  .catch(err => console.error(err))', '  .finally(() => console.log("done"));', '', 'Promise.all([a(), b()]);        // all succeed', 'Promise.allSettled([a(), b()]); // never rejects', 'Promise.race([a(), b()]);       // first to settle') },
          { name: 'async / await', desc: 'Syntax for writing promise code that reads like synchronous code. await pauses inside an async function.', code: c('async function load() {', '  try {', '    const res = await fetch("/api/users");', '    if (!res.ok) throw new Error(`HTTP ${res.status}`);', '    return await res.json();', '  } catch (e) {', '    console.error(e);', '  }', '}'), pitfalls: ['fetch does not reject on HTTP 404/500; check res.ok.', 'Awaiting in a loop runs sequentially; use Promise.all for parallel work.'] },
          { name: 'Fetch API', desc: 'Make HTTP requests from the browser (and Node 18+).', code: c('const res = await fetch("/api/items", {', '  method: "POST",', '  headers: { "Content-Type": "application/json" },', '  body: JSON.stringify({ name: "Pen" }),', '});', 'const data = await res.json();') },
          { name: 'JSON', desc: 'Text format for data exchange. JSON.stringify serialises; JSON.parse deserialises.', code: c('const text = JSON.stringify({ a: 1, b: [2, 3] }, null, 2);', 'const obj = JSON.parse(text);'), pitfalls: ['JSON.parse throws on invalid JSON; wrap in try/catch.', 'Dates become strings after a round trip.'] },
        ]
      },
      {
        title: 'The DOM and Events',
        items: [
          { name: 'Selecting elements', desc: 'Find elements with querySelector and querySelectorAll (CSS selectors) or getElementById.', code: c('const el = document.querySelector(".card");', 'const all = document.querySelectorAll("li");', 'const byId = document.getElementById("app");', 'el.closest(".container");') },
          { name: 'Modifying elements', desc: 'Change text, HTML, attributes, classes and styles.', code: c('el.textContent = "Hello";', 'el.classList.add("active"); el.classList.toggle("open");', 'el.setAttribute("aria-hidden", "true");', 'el.style.color = "red";', 'const li = document.createElement("li"); list.append(li); li.remove();'), pitfalls: ['innerHTML with untrusted input causes XSS; prefer textContent.'] },
          { name: 'addEventListener', desc: 'Attach event handlers. Use event delegation for dynamic lists.', code: c('btn.addEventListener("click", (e) => {', '  e.preventDefault();', '  console.log(e.target);', '});', '', 'list.addEventListener("click", (e) => {', '  const item = e.target.closest("li");', '  if (item) console.log(item.dataset.id);', '});'), tips: ['Pass { once: true } or { passive: true } options when appropriate.'] },
          { name: 'Web storage', desc: 'localStorage persists across sessions; sessionStorage lasts for the tab. Values are strings.', code: c('localStorage.setItem("theme", "dark");', 'localStorage.getItem("theme");', 'localStorage.setItem("user", JSON.stringify(user));', 'localStorage.removeItem("theme");'), pitfalls: ['Never store secrets or tokens that must stay private.'] },
        ]
      },
      {
        title: 'Classes, Modules and Modern Features',
        items: [
          { name: 'Classes', desc: 'Syntax over prototypes for creating objects, with constructors, inheritance, static members and private fields (#).', code: c('class Animal {', '  #secret = 42;', '  static count = 0;', '  constructor(name) { this.name = name; Animal.count++; }', '  speak() { return `${this.name} makes a sound`; }', '  get secret() { return this.#secret; }', '}', 'class Dog extends Animal {', '  speak() { return `${super.speak()}: woof`; }', '}') },
          { name: 'ES Modules', desc: 'Split code into files with import and export. Use type="module" in browsers.', code: c('// math.js', 'export const add = (a, b) => a + b;', 'export default function mul(a, b) { return a * b; }', '', '// main.js', 'import mul, { add } from "./math.js";', 'const mod = await import("./lazy.js"); // dynamic import') },
          { name: 'Iterators, generators, Symbol', desc: 'Iterables implement Symbol.iterator. Generators (function*) produce values lazily with yield.', code: c('function* range(a, b) { for (let i = a; i < b; i++) yield i; }', '[...range(0, 3)]; // [0, 1, 2]') },
          { name: 'Regular expressions', desc: 'Pattern matching with literals and the RegExp object.', code: c('const re = /(\\d{4})-(\\d{2})-(\\d{2})/;', '"2026-10-28".match(re);', '"a1b2".replace(/\\d/g, "#");', '/^[\\w.+-]+@\\w+\\.\\w+$/.test(email);') },
          { name: 'Dates and Intl', desc: 'Date objects for time, Intl for locale-aware formatting of numbers, dates and lists.', code: c('const now = new Date();', 'now.toISOString();', 'new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(1234.5);', 'new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(now);'), pitfalls: ['Months are zero-based in the Date constructor.'] },
        ]
      }
    ]
  },

  /* ============================== TypeScript ============================== */
  ts: {
    label: 'TypeScript', color: '#3178C6',
    tagline: 'JavaScript with static types.',
    about: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static type checking, interfaces, generics, enums and powerful type-level programming, catching many bugs at build time and enabling better editor tooling.',
    docsUrl: 'https://www.typescriptlang.org/docs/',
    facts: [['Type', 'Typed superset of JS'], ['Created', '2012 by Microsoft'], ['Compiler', 'tsc'], ['File ext.', '.ts, .tsx']],
    getStarted: c('npm install -D typescript', 'npx tsc --init', 'npx tsc          # compile', 'npx tsc --noEmit # type-check only'),
    sections: [
      {
        title: 'Types Basics',
        items: [
          { name: 'Type annotations and inference', desc: 'Annotate variables, parameters and return types with a colon. TypeScript infers many types automatically.', code: c('let age: number = 25;', 'let name = "Ama";           // inferred string', 'const nums: number[] = [1, 2, 3];', 'function add(a: number, b: number): number { return a + b; }'), tips: ['Let inference work for locals; annotate function boundaries.'] },
          { name: 'Primitive and special types', desc: 'string, number, boolean, bigint, symbol, null, undefined, any, unknown, never, void.', code: c('let x: unknown = JSON.parse(text);', 'if (typeof x === "string") x.toUpperCase();', 'function fail(msg: string): never { throw new Error(msg); }'), pitfalls: ['any turns off type checking; prefer unknown and narrow it.'] },
          { name: 'Arrays, tuples, enums', desc: 'Typed arrays, fixed-length tuples and enums. Prefer union literal types over enums in many cases.', code: c('const ids: Array<number> = [1, 2];', 'const pair: [string, number] = ["age", 30];', 'enum Role { Admin, User }', 'type Status = "idle" | "loading" | "error";') },
          { name: 'Union and intersection types', desc: 'A | B means either; A & B means both combined.', code: c('type ID = string | number;', 'type Admin = User & { permissions: string[] };') },
          { name: 'Literal and const assertions', desc: 'Narrow values to exact literals; as const makes object literals readonly with literal types.', code: c('const dirs = ["up", "down"] as const;', 'type Dir = typeof dirs[number]; // "up" | "down"') },
        ]
      },
      {
        title: 'Objects and Functions',
        items: [
          { name: 'interface and type alias', desc: 'Describe object shapes. Interfaces can be extended and merged; type aliases can name any type including unions.', code: c('interface User { id: number; name: string; email?: string; readonly createdAt: Date; }', 'interface Admin extends User { level: number; }', 'type Point = { x: number; y: number };'), tips: ['Use interface for public object shapes and type for unions and utilities.'] },
          { name: 'Function types and overloads', desc: 'Type parameters, optional/default params, rest params and overload signatures.', code: c('type Handler = (e: Event) => void;', 'function greet(name: string, greeting = "Hello", ...extra: string[]): string { return `${greeting}, ${name}`; }', 'function parse(x: string): number;', 'function parse(x: number): string;', 'function parse(x: any) { return x; }') },
          { name: 'Type narrowing and guards', desc: 'Refine a union within a branch using typeof, instanceof, in, equality, discriminated unions and custom type guards.', code: c('function area(s: Shape) {', '  switch (s.kind) {', '    case "circle": return Math.PI * s.r ** 2;', '    case "square": return s.size ** 2;', '  }', '}', 'function isString(x: unknown): x is string { return typeof x === "string"; }') },
          { name: 'Classes', desc: 'Classes with access modifiers (public, private, protected, readonly), parameter properties and abstract classes.', code: c('class Account {', '  constructor(private balance: number, public readonly id: string) {}', '  deposit(n: number) { this.balance += n; }', '}', 'abstract class Shape { abstract area(): number; }') },
        ]
      },
      {
        title: 'Generics and Utility Types',
        items: [
          { name: 'Generics', desc: 'Write reusable code that works over many types while keeping type safety. Constrain with extends.', code: c('function first<T>(arr: T[]): T | undefined { return arr[0]; }', 'function pick<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }', 'interface ApiResponse<T> { data: T; error?: string; }') },
          { name: 'Utility types', desc: 'Built-in helpers: Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, Parameters, Awaited.', code: c('type Update = Partial<User>;', 'type Preview = Pick<User, "id" | "name">;', 'type Public = Omit<User, "email">;', 'type Dict = Record<string, number>;', 'type R = ReturnType<typeof fetchUser>;') },
          { name: 'keyof, typeof, indexed access', desc: 'Type operators for deriving types from values and other types.', code: c('type Keys = keyof User;', 'const cfg = { port: 3000 };', 'type Cfg = typeof cfg;', 'type Name = User["name"];') },
          { name: 'Mapped and conditional types', desc: 'Transform types programmatically.', code: c('type Nullable<T> = { [K in keyof T]: T[K] | null };', 'type IsString<T> = T extends string ? true : false;', 'type ElementOf<T> = T extends (infer U)[] ? U : never;') },
        ]
      },
      {
        title: 'Configuration and Tooling',
        items: [
          { name: 'tsconfig.json', desc: 'Compiler configuration. Turn on strict mode for the best safety.', code: c('{', '  "compilerOptions": {', '    "target": "ES2022",', '    "module": "ESNext",', '    "moduleResolution": "bundler",', '    "strict": true,', '    "noUncheckedIndexedAccess": true,', '    "esModuleInterop": true,', '    "skipLibCheck": true,', '    "jsx": "react-jsx"', '  },', '  "include": ["src"]', '}'), tips: ['Always enable "strict": true in new projects.'] },
          { name: 'Declaration files and type imports', desc: '.d.ts files describe JS libraries; install community types from @types/*. Use import type to erase imports at compile time.', code: c('npm i -D @types/node', 'import type { User } from "./types";', 'declare module "untyped-lib";') },
          { name: 'Type assertions and non-null', desc: 'Tell the compiler you know better. Use sparingly; satisfies validates without widening.', code: c('const el = document.getElementById("x") as HTMLInputElement;', 'const v = maybe!;  // non-null assertion', 'const conf = { port: 80 } satisfies Record<string, number>;'), pitfalls: ['Assertions are not runtime checks and can hide bugs.'] },
        ]
      }
    ]
  },

  /* ============================== React ============================== */
  react: {
    label: 'React', color: '#61DAFB', textOnColor: '#18181B',
    tagline: 'A JavaScript library for building user interfaces from components.',
    about: 'React lets you describe UI as a function of state. You compose small components, pass data with props, manage changing data with state and hooks, and React efficiently updates the DOM. It is typically used with a build tool like Vite or a framework like Next.js.',
    docsUrl: 'https://react.dev',
    facts: [['Type', 'UI library'], ['Created', '2013 by Meta'], ['Model', 'Declarative components'], ['File ext.', '.jsx, .tsx']],
    getStarted: c('npm create vite@latest my-app -- --template react', 'cd my-app', 'npm install', 'npm run dev'),
    sections: [
      {
        title: 'Components and JSX',
        items: [
          { name: 'Function components', desc: 'A component is a function that returns JSX. Component names must start with a capital letter.', code: c('function Welcome({ name }) {', '  return <h1>Hello, {name}!</h1>;', '}', '', 'export default function App() {', '  return <Welcome name="Ama" />;', '}'), tips: ['Keep components small and focused on one job.'] },
          { name: 'JSX rules', desc: 'JSX looks like HTML but is JavaScript. Return a single root (or a fragment), use className instead of class, htmlFor instead of for, camelCase attributes, and curly braces for expressions.', code: c('return (', '  <>', '    <label htmlFor="n" className="lbl">Name</label>', '    <input id="n" style={{ color: "red" }} onChange={handle} />', '  </>', ');'), pitfalls: ['Objects are not valid as a React child; render their fields instead.'] },
          { name: 'Props and children', desc: 'Props are read-only inputs passed from parent to child. The children prop holds nested JSX.', code: c('function Card({ title, children }) {', '  return <div className="card"><h2>{title}</h2>{children}</div>;', '}', '<Card title="Hi"><p>Body</p></Card>'), pitfalls: ['Never mutate props.'] },
          { name: 'Conditional rendering', desc: 'Use ternaries, && or early returns to choose what to render.', code: c('{isLoggedIn ? <Dashboard /> : <Login />}', '{items.length > 0 && <List items={items} />}', 'if (loading) return <Spinner />;'), pitfalls: ['{count && <X />} renders 0 when count is 0; use count > 0 &&.'] },
          { name: 'Lists and keys', desc: 'Render arrays with map. Every item needs a stable, unique key.', code: c('<ul>', '  {todos.map(t => <li key={t.id}>{t.text}</li>)}', '</ul>'), pitfalls: ['Avoid using array index as key when the list can reorder.'] },
          { name: 'Events and forms', desc: 'Attach handlers with camelCase props. Controlled inputs tie their value to state.', code: c('function Form() {', '  const [text, setText] = useState("");', '  const submit = (e) => { e.preventDefault(); console.log(text); };', '  return (', '    <form onSubmit={submit}>', '      <input value={text} onChange={(e) => setText(e.target.value)} />', '      <button>Save</button>', '    </form>', '  );', '}') },
        ]
      },
      {
        title: 'Core Hooks',
        items: [
          { name: 'useState', desc: 'Adds state to a component. The setter triggers a re-render. Use the functional form when the new state depends on the old.', syntax: 'const [state, setState] = useState(initialValue);', code: c('const [count, setCount] = useState(0);', 'setCount(c => c + 1);', 'const [user, setUser] = useState({ name: "" });', 'setUser(u => ({ ...u, name: "Ama" }));'), pitfalls: ['State is a snapshot; setCount(count + 1) three times in a row adds only 1.', 'Never mutate state objects or arrays directly.'] },
          { name: 'useEffect', desc: 'Runs side effects (fetching, subscriptions, timers) after render. The dependency array controls when it re-runs; return a cleanup function.', syntax: 'useEffect(() => { /* effect */ return () => { /* cleanup */ }; }, [deps]);', code: c('useEffect(() => {', '  const id = setInterval(tick, 1000);', '  return () => clearInterval(id);', '}, []);', '', 'useEffect(() => {', '  document.title = `Clicked ${count} times`;', '}, [count]);'), tips: ['You might not need an effect: derive values during render instead.'], pitfalls: ['Missing dependencies cause stale closures.', 'Effects run twice in development StrictMode by design.'] },
          { name: 'useRef', desc: 'Holds a mutable value that persists across renders without triggering a re-render; commonly used for DOM nodes.', code: c('const inputRef = useRef(null);', 'useEffect(() => { inputRef.current?.focus(); }, []);', 'return <input ref={inputRef} />;') },
          { name: 'useMemo and useCallback', desc: 'Cache an expensive calculation or a function identity between renders.', code: c('const sorted = useMemo(() => [...items].sort(cmp), [items]);', 'const onSave = useCallback(() => save(id), [id]);'), tips: ['Measure first; do not memoize everything.'] },
          { name: 'useContext', desc: 'Read a value provided by an ancestor Context without prop drilling.', code: c('const ThemeContext = createContext("light");', '<ThemeContext.Provider value="dark"><Page /></ThemeContext.Provider>', 'const theme = useContext(ThemeContext);') },
          { name: 'useReducer', desc: 'State management with a reducer function, good for complex state transitions.', code: c('function reducer(state, action) {', '  switch (action.type) {', '    case "inc": return { count: state.count + 1 };', '    default: return state;', '  }', '}', 'const [state, dispatch] = useReducer(reducer, { count: 0 });', 'dispatch({ type: "inc" });') },
          { name: 'Other hooks', desc: 'useId (unique ids), useLayoutEffect (sync after DOM updates), useTransition and useDeferredValue (keep UI responsive), useSyncExternalStore (external stores), useOptimistic and useActionState (React 19 actions).', code: c('const id = useId();', 'const [isPending, startTransition] = useTransition();', 'startTransition(() => setFilter(value));') },
          { name: 'Custom hooks', desc: 'Extract reusable stateful logic into a function whose name starts with use.', code: c('function useLocalStorage(key, initial) {', '  const [v, setV] = useState(() => {', '    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }', '  });', '  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v]);', '  return [v, setV];', '}'), tips: ['Only call hooks at the top level of components or other hooks.'] },
        ]
      },
      {
        title: 'Patterns and Performance',
        items: [
          { name: 'Lifting state up', desc: 'Share state between siblings by moving it to their closest common parent and passing it down.', code: c('function Parent() {', '  const [value, setValue] = useState("");', '  return (<><Input value={value} onChange={setValue} /><Preview text={value} /></>);', '}') },
          { name: 'React.memo', desc: 'Skips re-rendering a component when its props have not changed.', code: 'const Row = React.memo(function Row({ item }) { return <li>{item.name}</li>; });' },
          { name: 'Lazy loading and Suspense', desc: 'Code-split with React.lazy and show a fallback while loading.', code: c('const Settings = lazy(() => import("./Settings"));', '<Suspense fallback={<Spinner />}><Settings /></Suspense>') },
          { name: 'Error boundaries', desc: 'Catch rendering errors in a subtree and show fallback UI. Implemented with a class component or a library like react-error-boundary.', code: c('class Boundary extends React.Component {', '  state = { hasError: false };', '  static getDerivedStateFromError() { return { hasError: true }; }', '  render() { return this.state.hasError ? <p>Oops</p> : this.props.children; }', '}') },
          { name: 'Portals and fragments', desc: 'createPortal renders children into a different DOM node (modals, tooltips). Fragments group elements without extra DOM.', code: c('createPortal(<Modal />, document.body);', '<><h1>A</h1><p>B</p></>') },
        ]
      },
      {
        title: 'React Router (react-router-dom)',
        items: [
          { name: 'Routes and Link', desc: 'Declare client-side routes and navigate without full page reloads.', code: c('<BrowserRouter>', '  <nav><Link to="/">Home</Link> <NavLink to="/docs">Docs</NavLink></nav>', '  <Routes>', '    <Route path="/" element={<Home />} />', '    <Route path="/docs" element={<DocsPage />} />', '    <Route path="*" element={<NotFound />} />', '  </Routes>', '</BrowserRouter>') },
          { name: 'useParams, useNavigate, useSearchParams', desc: 'Read URL params, navigate programmatically and read/write query strings.', code: c('const { id } = useParams();', 'const navigate = useNavigate();', 'navigate("/login", { replace: true });', 'const [params, setParams] = useSearchParams();', 'setParams({ lang: "css" });') },
        ]
      }
    ]
  },

  /* ============================== Node.js ============================== */
  node: {
    label: 'Node.js', color: '#339933',
    tagline: 'JavaScript runtime for servers, tools and scripts.',
    about: 'Node.js runs JavaScript outside the browser on the V8 engine. It uses an event-driven, non-blocking I/O model, ships with a standard library (fs, http, path, crypto, streams) and has the npm ecosystem, the largest package registry in the world.',
    docsUrl: 'https://nodejs.org/docs/latest/api/',
    facts: [['Type', 'JS runtime'], ['Created', '2009 by Ryan Dahl'], ['Engine', 'V8'], ['Package manager', 'npm']],
    getStarted: c('node --version', 'npm init -y', 'echo "console.log(\\"Hi\\")" > index.js', 'node index.js'),
    sections: [
      {
        title: 'Core Modules',
        items: [
          { name: 'fs / fs.promises', desc: 'Read and write files. Prefer the promise API and avoid sync methods on servers.', code: c('import { readFile, writeFile } from "node:fs/promises";', 'const text = await readFile("data.txt", "utf8");', 'await writeFile("out.json", JSON.stringify({ ok: true }));'), pitfalls: ['readFileSync blocks the event loop.'] },
          { name: 'path', desc: 'Build and parse file paths portably across operating systems.', code: c('import path from "node:path";', 'path.join("a", "b", "c.txt");', 'path.resolve("src");', 'path.extname("x.png"); // ".png"') },
          { name: 'http', desc: 'Create a basic HTTP server.', code: c('import http from "node:http";', 'http.createServer((req, res) => {', '  res.writeHead(200, { "Content-Type": "application/json" });', '  res.end(JSON.stringify({ hello: "world" }));', '}).listen(3000);') },
          { name: 'events', desc: 'EventEmitter is the base of many Node APIs.', code: c('import { EventEmitter } from "node:events";', 'const bus = new EventEmitter();', 'bus.on("ping", (x) => console.log(x));', 'bus.emit("ping", 1);') },
          { name: 'process and env', desc: 'Access arguments, environment variables, exit codes and signals.', code: c('process.argv.slice(2);', 'process.env.PORT ?? 3000;', 'process.on("SIGINT", () => process.exit(0));', 'process.exitCode = 1;'), tips: ['Keep secrets in environment variables, never in source control.'] },
          { name: 'streams', desc: 'Process large data piece by piece to keep memory low.', code: c('import { createReadStream, createWriteStream } from "node:fs";', 'import { pipeline } from "node:stream/promises";', 'await pipeline(createReadStream("big.txt"), createWriteStream("copy.txt"));') },
          { name: 'crypto, os, url, util', desc: 'Hashing and random values, system info, URL parsing and utilities like promisify.', code: c('import { randomUUID, createHash } from "node:crypto";', 'randomUUID();', 'createHash("sha256").update("text").digest("hex");') },
        ]
      },
      {
        title: 'npm and Project Setup',
        items: [
          { name: 'npm commands', desc: 'Manage dependencies and run scripts.', code: c('npm install express          # add dependency', 'npm install -D vitest         # dev dependency', 'npm run build                # run script', 'npm ci                       # clean install from lockfile', 'npm update && npm audit fix', 'npx create-vite@latest') },
          { name: 'package.json', desc: 'Project manifest: name, scripts, dependencies and module type. Set "type": "module" for ES modules.', code: c('{', '  "name": "my-app",', '  "version": "1.0.0",', '  "type": "module",', '  "scripts": { "start": "node index.js", "dev": "node --watch index.js" },', '  "engines": { "node": ">=20" }', '}'), tips: ['Commit your lockfile.'] },
          { name: 'Express basics', desc: 'The most popular web framework for Node.', code: c('import express from "express";', 'const app = express();', 'app.use(express.json());', 'app.get("/api/users/:id", (req, res) => res.json({ id: req.params.id }));', 'app.post("/api/users", (req, res) => res.status(201).json(req.body));', 'app.listen(3000);'), tips: ['Add helmet, rate limiting and input validation for production.'] },
          { name: 'Testing and watch mode', desc: 'Node ships a built-in test runner and watch mode.', code: c('import test from "node:test";', 'import assert from "node:assert/strict";', 'test("adds", () => assert.equal(1 + 1, 2));', '// run: node --test') },
        ]
      }
    ]
  },

  /* ============================== Python ============================== */
  python: {
    label: 'Python', color: '#3776AB',
    tagline: 'A readable, versatile language for scripting, data, web and AI.',
    about: 'Python is a high-level, dynamically typed language known for clean syntax and a huge ecosystem. It is used for web backends (Django, FastAPI, Flask), data science (NumPy, pandas), machine learning, automation and teaching. Indentation defines blocks.',
    docsUrl: 'https://docs.python.org/3/',
    facts: [['Paradigm', 'Multi-paradigm'], ['Created', '1991 by Guido van Rossum'], ['Typing', 'Dynamic, optional hints'], ['File ext.', '.py']],
    getStarted: c('python3 --version', 'python3 -m venv .venv', 'source .venv/bin/activate      # Windows: .venv\\Scripts\\activate', 'pip install requests', 'python3 hello.py'),
    sections: [
      {
        title: 'Basics',
        items: [
          { name: 'Variables and types', desc: 'No declarations needed. Core types: int, float, str, bool, None, list, tuple, dict, set.', code: c('age = 25', 'pi = 3.14', 'name = "Ama"', 'ok = True', 'nothing = None', 'type(age)   # <class int>', 'x, y = 1, 2', 'x, y = y, x  # swap') },
          { name: 'Strings and f-strings', desc: 'Strings are immutable. f-strings embed expressions directly.', code: c('name = "Ama"', 'print(f"Hello {name}! {2 + 3=}")', '"a,b".split(",")', '"-".join(["a", "b"])', '"hello".title()', '"abc"[::-1]  # reverse', 'name.startswith("A")') },
          { name: 'Input, output and operators', desc: 'print writes output, input reads text. Arithmetic includes // (floor division), ** (power), % (modulo).', code: c('n = int(input("Number: "))', 'print(n // 2, n ** 2, n % 2)', 'print("a", "b", sep="-", end="!\\n")') },
          { name: 'Conditionals', desc: 'if / elif / else. Python has truthiness and chained comparisons.', code: c('if 0 < x < 10:', '    print("small")', 'elif x == 10:', '    print("ten")', 'else:', '    print("big")', 'label = "even" if x % 2 == 0 else "odd"') },
          { name: 'Loops', desc: 'for iterates any iterable; while repeats on a condition. Use break, continue and for/else.', code: c('for i in range(5):', '    print(i)', 'for idx, ch in enumerate("abc"):', '    print(idx, ch)', 'for a, b in zip([1, 2], ["x", "y"]):', '    print(a, b)', 'while n > 0:', '    n -= 1') },
          { name: 'match statement', desc: 'Structural pattern matching (Python 3.10+).', code: c('match command.split():', '    case ["go", direction]:', '        move(direction)', '    case ["quit"]:', '        exit()', '    case _:', '        print("unknown")') },
        ]
      },
      {
        title: 'Data Structures',
        items: [
          { name: 'Lists', desc: 'Ordered, mutable collections.', code: c('fruits = ["apple", "banana"]', 'fruits.append("orange")', 'fruits.insert(0, "kiwi")', 'fruits.remove("apple")', 'fruits.pop()', 'fruits[1:3]', 'sorted(fruits, key=len, reverse=True)', 'len(fruits)'), pitfalls: ['b = a copies the reference, not the list; use a.copy() or a[:].'] },
          { name: 'Tuples', desc: 'Ordered, immutable sequences; hashable if contents are.', code: c('point = (3, 4)', 'x, y = point', 'single = (1,)') },
          { name: 'Dictionaries', desc: 'Key-value mappings that preserve insertion order.', code: c('user = {"name": "Alice", "age": 25}', 'user["email"] = "a@x.com"', 'user.get("phone", "n/a")', 'for k, v in user.items():', '    print(k, v)', 'merged = a | b', 'user.pop("age", None)'), pitfalls: ['user["missing"] raises KeyError; use get().'] },
          { name: 'Sets', desc: 'Unordered collections of unique, hashable items with fast membership tests.', code: c('s = {1, 2, 3}', 's.add(4)', 'a & b   # intersection', 'a | b   # union', 'a - b   # difference', 'list(set(items))  # dedupe') },
          { name: 'Comprehensions', desc: 'Concise way to build lists, dicts and sets. Generator expressions are lazy.', code: c('squares = [n * n for n in range(10) if n % 2 == 0]', 'lookup = {u.id: u for u in users}', 'unique = {c.lower() for c in text}', 'total = sum(n * n for n in range(1000))') },
          { name: 'collections and itertools', desc: 'Specialised containers and iterator tools.', code: c('from collections import Counter, defaultdict, deque', 'Counter("banana").most_common(1)', 'groups = defaultdict(list)', 'groups["a"].append(1)', 'from itertools import chain, groupby, islice, product', 'list(islice(count(), 5))') },
        ]
      },
      {
        title: 'Functions and Classes',
        items: [
          { name: 'Defining functions', desc: 'Use def. Support default, keyword-only and variadic arguments, plus type hints.', code: c('def greet(name: str, greeting: str = "Hello", *args, **kwargs) -> str:', '    return f"{greeting}, {name}"', '', 'greet("Ama", greeting="Hi")'), pitfalls: ['Never use a mutable default like def f(x=[]); use None and create inside.'] },
          { name: 'Lambda, map, filter', desc: 'Small anonymous functions; comprehensions are usually clearer than map/filter.', code: c('sq = lambda x: x * x', 'sorted(users, key=lambda u: u["age"])', 'list(map(str, [1, 2, 3]))') },
          { name: 'Decorators', desc: 'Wrap a function to extend its behaviour.', code: c('import functools, time', 'def timer(fn):', '    @functools.wraps(fn)', '    def wrapper(*a, **kw):', '        t = time.perf_counter()', '        try:', '            return fn(*a, **kw)', '        finally:', '            print(f"{fn.__name__}: {time.perf_counter() - t:.3f}s")', '    return wrapper', '', '@timer', 'def work(): ...') },
          { name: 'Generators', desc: 'Functions that yield values lazily, saving memory.', code: c('def fib():', '    a, b = 0, 1', '    while True:', '        yield a', '        a, b = b, a + b') },
          { name: 'Classes and dataclasses', desc: 'Define types with __init__, methods and inheritance. dataclass removes boilerplate.', code: c('from dataclasses import dataclass', 'class Animal:', '    def __init__(self, name):', '        self.name = name', '    def speak(self):', '        return f"{self.name} makes a sound"', 'class Dog(Animal):', '    def speak(self):', '        return super().speak() + ": woof"', '', '@dataclass', 'class Point:', '    x: float', '    y: float = 0.0') },
          { name: 'Type hints', desc: 'Optional annotations checked by tools like mypy or pyright.', code: c('from typing import Optional', 'def find(id: int) -> Optional[User]: ...', 'def total(xs: list[int]) -> int: ...', 'type Pair = tuple[int, int]') },
        ]
      },
      {
        title: 'Files, Errors and Modules',
        items: [
          { name: 'Files and context managers', desc: 'The with statement guarantees cleanup. Use pathlib for paths.', code: c('from pathlib import Path', 'with open("data.txt", encoding="utf-8") as f:', '    text = f.read()', 'Path("out.txt").write_text("hello", encoding="utf-8")', 'for p in Path(".").glob("*.py"): print(p)') },
          { name: 'Exceptions', desc: 'try/except/else/finally. Catch specific exceptions and raise your own.', code: c('try:', '    n = int(text)', 'except ValueError as e:', '    print("bad", e)', 'else:', '    print("ok")', 'finally:', '    print("done")', 'raise RuntimeError("something failed")'), pitfalls: ['Avoid bare except:, it hides real bugs.'] },
          { name: 'JSON, CSV, datetime', desc: 'Standard-library tools for common data.', code: c('import json, csv, datetime', 'json.loads(\'{"a": 1}\')', 'json.dumps(data, indent=2)', 'datetime.datetime.now().isoformat()') },
          { name: 'Modules, packages, venv', desc: 'Each .py file is a module. Use virtual environments and pip.', code: c('import math', 'from os import path', 'if __name__ == "__main__":', '    main()', '# pip install -r requirements.txt') },
          { name: 'async / await (asyncio)', desc: 'Cooperative concurrency for I/O-bound work.', code: c('import asyncio', 'async def fetch(n):', '    await asyncio.sleep(1)', '    return n', 'async def main():', '    print(await asyncio.gather(fetch(1), fetch(2)))', 'asyncio.run(main())') },
          { name: 'requests (HTTP)', desc: 'Popular third-party HTTP library.', code: c('import requests', 'r = requests.get("https://api.github.com", timeout=10)', 'r.raise_for_status()', 'print(r.json())'), tips: ['Always set a timeout.'] },
        ]
      }
    ]
  },

  /* ============================== SQL ============================== */
  sql: {
    label: 'SQL', color: '#336791',
    tagline: 'The standard language for querying relational databases.',
    about: 'Structured Query Language lets you define, query and manipulate data in relational databases such as PostgreSQL, MySQL, SQLite and SQL Server. Core areas: DDL (schema), DML (data changes), DQL (queries) and TCL (transactions). Syntax is largely portable, with dialect differences.',
    docsUrl: 'https://www.postgresql.org/docs/current/sql.html',
    facts: [['Type', 'Query language'], ['Standard', 'ISO/IEC 9075'], ['Created', '1974 (IBM)'], ['Dialects', 'PostgreSQL, MySQL, SQLite']],
    getStarted: c('-- SQLite: sqlite3 app.db', 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);', 'INSERT INTO users (name) VALUES (\'Ama\');', 'SELECT * FROM users;'),
    sections: [
      {
        title: 'Querying',
        items: [
          { name: 'SELECT', desc: 'Retrieve rows and columns. Select only the columns you need.', syntax: 'SELECT columns FROM table WHERE condition ORDER BY col LIMIT n;', code: c('SELECT id, name, email', 'FROM users', 'WHERE active = TRUE AND age >= 18', 'ORDER BY created_at DESC', 'LIMIT 10 OFFSET 20;'), pitfalls: ['SELECT * is fragile and slow on wide tables.'] },
          { name: 'WHERE and operators', desc: 'Filter rows with comparison, logical, range, set and pattern operators.', code: c('WHERE age BETWEEN 18 AND 30', 'WHERE country IN (\'GH\', \'NG\')', 'WHERE name LIKE \'A%\'', 'WHERE deleted_at IS NULL', 'WHERE NOT (status = \'banned\')'), pitfalls: ['col = NULL is never true; use IS NULL.'] },
          { name: 'DISTINCT, ORDER BY, LIMIT', desc: 'Remove duplicates, sort and paginate results.', code: c('SELECT DISTINCT country FROM users ORDER BY country ASC;', 'SELECT * FROM posts ORDER BY views DESC, id ASC LIMIT 5;') },
          { name: 'Aggregates and GROUP BY', desc: 'COUNT, SUM, AVG, MIN, MAX summarise rows. HAVING filters groups after aggregation.', code: c('SELECT country, COUNT(*) AS users, AVG(age) AS avg_age', 'FROM users', 'GROUP BY country', 'HAVING COUNT(*) > 10', 'ORDER BY users DESC;'), tips: ['WHERE filters rows before grouping; HAVING filters after.'] },
          { name: 'JOINs', desc: 'Combine rows from related tables: INNER, LEFT, RIGHT, FULL and CROSS joins.', code: c('SELECT o.id, u.name, o.total', 'FROM orders o', 'INNER JOIN users u ON u.id = o.user_id', 'LEFT JOIN coupons c ON c.id = o.coupon_id;'), pitfalls: ['A missing ON clause creates a cartesian product.'] },
          { name: 'Subqueries and CTEs', desc: 'Nest queries or name them with WITH for readability. Recursive CTEs traverse hierarchies.', code: c('WITH big AS (', '  SELECT user_id, SUM(total) AS spent FROM orders GROUP BY user_id', ')', 'SELECT u.name, big.spent FROM big JOIN users u ON u.id = big.user_id', 'WHERE big.spent > 1000;') },
          { name: 'Window functions', desc: 'Calculate across related rows without collapsing them: ROW_NUMBER, RANK, LAG, LEAD, running totals.', code: c('SELECT name, dept, salary,', '  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk,', '  SUM(salary) OVER (ORDER BY hired_at) AS running', 'FROM employees;') },
          { name: 'CASE, COALESCE, string and date functions', desc: 'Conditional logic and common scalar functions.', code: c('SELECT CASE WHEN score >= 50 THEN \'pass\' ELSE \'fail\' END AS result,', '       COALESCE(nickname, name) AS display,', '       UPPER(name), LENGTH(name), SUBSTR(name, 1, 3)', 'FROM students;') },
          { name: 'UNION, INTERSECT, EXCEPT', desc: 'Combine result sets. UNION removes duplicates; UNION ALL keeps them and is faster.', code: 'SELECT email FROM customers UNION SELECT email FROM leads;' },
        ]
      },
      {
        title: 'Changing Data and Schema',
        items: [
          { name: 'INSERT, UPDATE, DELETE', desc: 'Modify rows. Always include a WHERE clause on UPDATE and DELETE.', code: c('INSERT INTO users (name, email) VALUES (\'Ama\', \'a@x.com\'), (\'Kofi\', \'k@x.com\');', 'UPDATE users SET active = FALSE WHERE last_login < \'2025-01-01\';', 'DELETE FROM sessions WHERE expires_at < NOW();'), pitfalls: ['UPDATE or DELETE without WHERE changes every row.'], tips: ['Run a SELECT with the same WHERE first.'] },
          { name: 'Upsert', desc: 'Insert or update on conflict (PostgreSQL / SQLite syntax).', code: c('INSERT INTO counters (name, n) VALUES (\'hits\', 1)', 'ON CONFLICT (name) DO UPDATE SET n = counters.n + 1;') },
          { name: 'CREATE TABLE and constraints', desc: 'Define columns, types and constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT.', code: c('CREATE TABLE orders (', '  id BIGSERIAL PRIMARY KEY,', '  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,', '  total NUMERIC(10,2) CHECK (total >= 0),', '  status TEXT NOT NULL DEFAULT \'new\',', '  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()', ');') },
          { name: 'ALTER and DROP', desc: 'Change or remove schema objects.', code: c('ALTER TABLE users ADD COLUMN phone TEXT;', 'ALTER TABLE users DROP COLUMN phone;', 'DROP TABLE IF EXISTS temp_data;', 'TRUNCATE TABLE logs;') },
          { name: 'Indexes', desc: 'Speed up lookups at the cost of storage and slower writes. Index columns used in WHERE, JOIN and ORDER BY.', code: c('CREATE INDEX idx_orders_user ON orders (user_id);', 'CREATE UNIQUE INDEX idx_users_email ON users (email);', 'EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 5;'), tips: ['Use EXPLAIN to verify the index is used.'] },
          { name: 'Transactions', desc: 'Group statements so they all succeed or none do (ACID).', code: c('BEGIN;', 'UPDATE accounts SET balance = balance - 100 WHERE id = 1;', 'UPDATE accounts SET balance = balance + 100 WHERE id = 2;', 'COMMIT;  -- or ROLLBACK;') },
          { name: 'Views', desc: 'Saved queries presented as virtual tables.', code: 'CREATE VIEW active_users AS SELECT * FROM users WHERE active = TRUE;' },
        ]
      },
      {
        title: 'Security and Best Practices',
        items: [
          { name: 'SQL injection and parameters', desc: 'Never concatenate user input into SQL. Use parameterised queries or prepared statements so input is treated as data.', code: c('-- Bad:  "SELECT * FROM users WHERE name = \'" + input + "\'"', '-- Good (placeholder):', 'SELECT * FROM users WHERE name = $1;', '', '// Node (pg)', 'await client.query("SELECT * FROM users WHERE id = $1", [id]);'), pitfalls: ['String-built SQL is the top cause of data breaches in web apps.'] },
          { name: 'Normalization', desc: 'Organise data to reduce duplication: 1NF atomic values, 2NF no partial dependencies, 3NF no transitive dependencies. Denormalise deliberately for performance.', code: c('-- Instead of storing a comma-separated list, use a join table:', 'CREATE TABLE user_roles (user_id INT, role_id INT, PRIMARY KEY (user_id, role_id));') },
        ]
      }
    ]
  },

  /* ============================== Go ============================== */
  go: {
    label: 'Go', color: '#00ADD8',
    tagline: 'Simple, fast, statically typed language built for concurrency.',
    about: 'Go (Golang) is a compiled language from Google with garbage collection, fast builds, a strong standard library and first-class concurrency through goroutines and channels. It is widely used for cloud services, CLIs and infrastructure (Docker and Kubernetes are written in Go).',
    docsUrl: 'https://go.dev/doc/',
    facts: [['Paradigm', 'Concurrent, imperative'], ['Created', '2009 at Google'], ['Typing', 'Static, inferred'], ['File ext.', '.go']],
    getStarted: c('go mod init example.com/hello', 'go run .', 'go build -o app', 'go test ./...', 'go fmt ./...'),
    sections: [
      {
        title: 'Basics',
        items: [
          { name: 'Program structure', desc: 'Every executable starts in package main with a main function. Imports are explicit and unused imports are compile errors.', code: c('package main', '', 'import "fmt"', '', 'func main() {', '    fmt.Println("Hello, Go!")', '}') },
          { name: 'Variables and constants', desc: 'Declare with var, or use := for short declarations inside functions. Unassigned variables get zero values.', code: c('var name string = "Ama"', 'age := 25', 'const Pi = 3.14', 'var a, b int = 1, 2', 'var n int // 0') },
          { name: 'Types', desc: 'bool, string, int/int8..int64, uint, float32/64, byte (uint8), rune (int32, a Unicode code point), complex.', code: c('s := "héllo"', 'len(s)         // bytes', 'len([]rune(s)) // characters', 'x := float64(3) / 2') },
          { name: 'Control flow', desc: 'if, for (the only loop), switch. if and switch can have an init statement.', code: c('if v, err := f(); err != nil {', '    return err', '} else if v > 0 {', '    fmt.Println(v)', '}', 'for i := 0; i < 3; i++ { }', 'for i < 10 { i++ }', 'for _, x := range items { _ = x }', 'switch day { case "sat", "sun": weekend = true; default: weekend = false }') },
          { name: 'Functions', desc: 'Support multiple return values, named returns, variadic parameters and closures.', code: c('func divide(a, b float64) (float64, error) {', '    if b == 0 { return 0, errors.New("divide by zero") }', '    return a / b, nil', '}', 'func sum(nums ...int) int { t := 0; for _, n := range nums { t += n }; return t }') },
        ]
      },
      {
        title: 'Data Structures',
        items: [
          { name: 'Arrays and slices', desc: 'Arrays have fixed size. Slices are dynamic views over arrays and are used far more often. append may reallocate.', code: c('nums := []int{1, 2, 3}', 'nums = append(nums, 4)', 'sub := nums[1:3]', 'buf := make([]int, 0, 10)', 'copy(dst, src)'), pitfalls: ['Slices share underlying memory; modifying a sub-slice can change the original.'] },
          { name: 'Maps', desc: 'Hash maps with comma-ok lookups. Iteration order is random.', code: c('ages := map[string]int{"ama": 25}', 'ages["kofi"] = 30', 'if v, ok := ages["ama"]; ok { fmt.Println(v) }', 'delete(ages, "kofi")', 'for k, v := range ages { fmt.Println(k, v) }'), pitfalls: ['Writing to a nil map panics; create it with make.', 'Maps are not safe for concurrent writes.'] },
          { name: 'Structs and methods', desc: 'Structs group fields. Methods attach with a receiver; use pointer receivers to mutate or avoid copying.', code: c('type User struct {', '    Name string `json:"name"`', '    Age  int    `json:"age,omitempty"`', '}', 'func (u *User) Birthday() { u.Age++ }', 'func (u User) String() string { return u.Name }', 'u := User{Name: "Ama"}', 'u.Birthday()') },
          { name: 'Interfaces', desc: 'Satisfied implicitly by any type with the required methods. Keep interfaces small.', code: c('type Shape interface { Area() float64 }', 'type Circle struct{ R float64 }', 'func (c Circle) Area() float64 { return math.Pi * c.R * c.R }', 'var s Shape = Circle{2}', 'if c, ok := s.(Circle); ok { _ = c }'), tips: ['Accept interfaces, return structs.'] },
          { name: 'Generics', desc: 'Type parameters (Go 1.18+) for reusable functions and types.', code: c('func Map[T, U any](xs []T, f func(T) U) []U {', '    out := make([]U, 0, len(xs))', '    for _, x := range xs { out = append(out, f(x)) }', '    return out', '}', 'type Number interface{ ~int | ~float64 }') },
        ]
      },
      {
        title: 'Concurrency',
        items: [
          { name: 'Goroutines', desc: 'Lightweight threads managed by the Go runtime. Start one with the go keyword.', code: c('go func() { fmt.Println("in goroutine") }()', 'go worker(i)'), pitfalls: ['main exiting ends all goroutines; wait with sync.WaitGroup or channels.'] },
          { name: 'Channels and select', desc: 'Typed pipes for communication between goroutines. select waits on multiple channel operations.', code: c('ch := make(chan int)      // unbuffered', 'buf := make(chan string, 3)', 'go func() { ch <- 42 }()', 'v := <-ch', 'close(ch)', 'select {', 'case m := <-msgs: fmt.Println(m)', 'case <-time.After(time.Second): fmt.Println("timeout")', '}'), pitfalls: ['Sending on a closed channel panics.', 'Unbuffered sends block until someone receives (deadlock risk).'] },
          { name: 'sync: WaitGroup, Mutex, Once', desc: 'Primitives for coordinating goroutines and protecting shared data.', code: c('var wg sync.WaitGroup', 'var mu sync.Mutex', 'for i := 0; i < 5; i++ {', '    wg.Add(1)', '    go func() { defer wg.Done(); mu.Lock(); count++; mu.Unlock() }()', '}', 'wg.Wait()') },
          { name: 'context', desc: 'Carry deadlines, cancellation and request-scoped values across API boundaries.', code: c('ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)', 'defer cancel()', 'req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)') },
        ]
      },
      {
        title: 'Errors, Packages and Tooling',
        items: [
          { name: 'Error handling', desc: 'Errors are values returned explicitly. Wrap with %w and inspect with errors.Is / errors.As.', code: c('f, err := os.Open("x.txt")', 'if err != nil {', '    return fmt.Errorf("open config: %w", err)', '}', 'defer f.Close()', 'if errors.Is(err, os.ErrNotExist) { }'), tips: ['Do not ignore errors with _ unless you are sure.'] },
          { name: 'defer, panic, recover', desc: 'defer runs a call when the function returns. panic and recover are for truly exceptional situations.', code: c('defer mu.Unlock()', 'defer func() { if r := recover(); r != nil { log.Println(r) } }()') },
          { name: 'net/http server', desc: 'The standard library includes a production-grade HTTP server.', code: c('http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {', '    w.Header().Set("Content-Type", "application/json")', '    json.NewEncoder(w).Encode(map[string]string{"msg": "hi"})', '})', 'log.Fatal(http.ListenAndServe(":8080", nil))') },
          { name: 'Testing', desc: 'Built-in testing in _test.go files, with table-driven tests and benchmarks.', code: c('func TestAdd(t *testing.T) {', '    cases := []struct{ a, b, want int }{{1, 2, 3}, {0, 0, 0}}', '    for _, c := range cases {', '        if got := Add(c.a, c.b); got != c.want { t.Errorf("got %d want %d", got, c.want) }', '    }', '}') },
        ]
      }
    ]
  },

  /* ============================== Rust ============================== */
  rust: {
    label: 'Rust', color: '#CE422B',
    tagline: 'Memory-safe systems programming without a garbage collector.',
    about: 'Rust guarantees memory safety and thread safety at compile time through ownership, borrowing and lifetimes, while delivering C/C++ level performance. It has expressive enums, pattern matching, traits and the Cargo build tool. It is used for systems, WebAssembly, CLI tools and backend services.',
    docsUrl: 'https://doc.rust-lang.org/book/',
    facts: [['Paradigm', 'Multi-paradigm'], ['Created', '2010 (1.0 in 2015)'], ['Build tool', 'Cargo'], ['File ext.', '.rs']],
    getStarted: c('curl --proto =https --tlsv1.2 -sSf https://sh.rustup.rs | sh', 'cargo new hello && cd hello', 'cargo run', 'cargo test', 'cargo clippy && cargo fmt'),
    sections: [
      {
        title: 'Basics',
        items: [
          { name: 'Variables and mutability', desc: 'Variables are immutable by default; add mut to change them. Shadowing lets you re-declare a name.', code: c('let x = 5;', 'let mut count = 0;', 'count += 1;', 'let x = x * 2;      // shadowing', 'const MAX: u32 = 100;') },
          { name: 'Types', desc: 'Scalars: i8..i128, u8..u128, isize, usize, f32, f64, bool, char. Compounds: tuples and arrays.', code: c('let a: i32 = -5;', 'let pair: (i32, &str) = (1, "a");', 'let arr = [1, 2, 3];', 'let n = "42".parse::<i32>().unwrap();'), pitfalls: ['Integer overflow panics in debug builds and wraps in release.'] },
          { name: 'Control flow', desc: 'if is an expression. loop, while and for. Ranges are exclusive with .. and inclusive with ..=.', code: c('let label = if n > 0 { "pos" } else { "neg" };', 'for i in 0..5 { println!("{i}"); }', 'while n > 0 { n -= 1; }', 'let v = loop { break 42; };') },
          { name: 'Functions', desc: 'Declared with fn. The last expression without a semicolon is the return value.', code: c('fn add(a: i32, b: i32) -> i32 {', '    a + b', '}') },
          { name: 'Strings: String vs &str', desc: 'String is an owned, growable buffer; &str is a borrowed slice.', code: c('let s = String::from("hello");', 'let slice: &str = &s[0..2];', 'let greeting = format!("{s} world");') },
        ]
      },
      {
        title: 'Ownership and Borrowing',
        items: [
          { name: 'Ownership', desc: 'Each value has one owner. When the owner goes out of scope the value is dropped. Assigning a non-Copy value moves it.', code: c('let a = String::from("hi");', 'let b = a;        // a is moved', '// println!("{a}"); // error: value moved', 'let c = b.clone(); // explicit deep copy'), pitfalls: ['Use of moved value is the most common beginner error.'] },
          { name: 'References and borrowing', desc: 'Borrow with & (shared, many allowed) or &mut (exclusive, only one). You cannot mix them at the same time.', code: c('fn len(s: &String) -> usize { s.len() }', 'fn add_one(v: &mut Vec<i32>) { v.push(1); }', 'let mut v = vec![];', 'add_one(&mut v);') },
          { name: 'Lifetimes', desc: 'Annotations that tell the compiler how long references live relative to each other.', code: c('fn longest<\'a>(a: &\'a str, b: &\'a str) -> &\'a str {', '    if a.len() > b.len() { a } else { b }', '}') },
          { name: 'Box, Rc, Arc, RefCell', desc: 'Smart pointers: Box (heap), Rc (shared, single-thread), Arc (shared, thread-safe), RefCell/Mutex (interior mutability).', code: c('let b = Box::new(5);', 'let shared = Rc::new(vec![1, 2]);', 'let data = Arc::new(Mutex::new(0));') },
        ]
      },
      {
        title: 'Types, Traits and Errors',
        items: [
          { name: 'Structs and impl', desc: 'Group data and attach methods with impl blocks.', code: c('#[derive(Debug, Clone, PartialEq)]', 'struct User { name: String, age: u32 }', 'impl User {', '    fn new(name: &str, age: u32) -> Self { Self { name: name.into(), age } }', '    fn greet(&self) -> String { format!("Hi {}", self.name) }', '}') },
          { name: 'Enums and match', desc: 'Enums can carry data. match must be exhaustive. Option and Result are enums.', code: c('enum Shape { Circle(f64), Rect { w: f64, h: f64 } }', 'let area = match shape {', '    Shape::Circle(r) => 3.14 * r * r,', '    Shape::Rect { w, h } => w * h,', '};', 'if let Some(x) = maybe { println!("{x}"); }') },
          { name: 'Traits and generics', desc: 'Traits define shared behaviour (like interfaces); generics with trait bounds write reusable code.', code: c('trait Speak { fn speak(&self) -> String; }', 'impl Speak for Dog { fn speak(&self) -> String { "woof".into() } }', 'fn talk<T: Speak>(x: &T) { println!("{}", x.speak()); }', 'fn dyn_talk(x: &dyn Speak) {}') },
          { name: 'Error handling', desc: 'Result<T, E> for recoverable errors; the ? operator propagates them. panic! for bugs.', code: c('use std::fs;', 'fn read(path: &str) -> Result<String, std::io::Error> {', '    let s = fs::read_to_string(path)?;', '    Ok(s)', '}'), tips: ['Use anyhow for applications and thiserror for libraries.'], pitfalls: ['unwrap() panics on None/Err; avoid it outside tests and prototypes.'] },
          { name: 'Collections and iterators', desc: 'Vec, HashMap, HashSet, BTreeMap. Iterator adapters are lazy and zero-cost.', code: c('let v: Vec<i32> = (1..=5).collect();', 'let even: Vec<_> = v.iter().filter(|x| *x % 2 == 0).map(|x| x * 10).collect();', 'let mut m = HashMap::new();', 'm.entry("a").or_insert(0);', '*m.get_mut("a").unwrap() += 1;') },
          { name: 'Concurrency', desc: 'Threads, channels and shared state are checked at compile time. async/await with runtimes like Tokio.', code: c('let handle = std::thread::spawn(|| println!("hi"));', 'handle.join().unwrap();', 'let (tx, rx) = std::sync::mpsc::channel();', 'tx.send(1).unwrap();', '// #[tokio::main] async fn main() { }') },
        ]
      }
    ]
  },

  /* ============================== C++ ============================== */
  cpp: {
    label: 'C++', color: '#00599C',
    tagline: 'High-performance systems language with abstractions.',
    about: 'C++ is a compiled, multi-paradigm language giving direct control over memory and hardware plus zero-cost abstractions (templates, RAII, the STL). Modern C++ (C++11 through C++23) favours smart pointers, move semantics, lambdas and ranges over raw pointers and manual memory management.',
    docsUrl: 'https://en.cppreference.com/w/',
    facts: [['Paradigm', 'Multi-paradigm'], ['Created', '1985 by Bjarne Stroustrup'], ['Standard', 'ISO C++ (C++23)'], ['File ext.', '.cpp, .hpp, .h']],
    getStarted: c('g++ -std=c++20 -Wall -Wextra -O2 main.cpp -o app', './app', '# or with CMake: cmake -B build && cmake --build build'),
    sections: [
      {
        title: 'Basics',
        items: [
          { name: 'Program structure', desc: 'Execution begins at main. Headers are included with #include.', code: c('#include <iostream>', '#include <string>', 'int main() {', '    std::cout << "Hello, C++!\\n";', '    return 0;', '}') },
          { name: 'Types and auto', desc: 'Fundamental types: int, long, float, double, char, bool. auto deduces the type.', code: c('int age = 25;', 'double pi = 3.14;', 'auto name = std::string("Ama");', 'const int MAX = 10;', 'constexpr int sq(int x) { return x * x; }') },
          { name: 'References and pointers', desc: 'A pointer stores an address; a reference is an alias that cannot be null or reseated.', code: c('int x = 10;', 'int* p = &x;', '*p = 20;', 'int& r = x;', 'void inc(int& n) { ++n; }', 'int* q = nullptr;'), pitfalls: ['Dereferencing a null or dangling pointer is undefined behaviour.'] },
          { name: 'Control flow', desc: 'if, switch, for, range-based for, while.', code: c('for (int i = 0; i < 5; ++i) {}', 'for (const auto& x : items) { std::cout << x << "\\n"; }', 'if (auto it = m.find(k); it != m.end()) { }') },
        ]
      },
      {
        title: 'Memory and Classes',
        items: [
          { name: 'Smart pointers (RAII)', desc: 'unique_ptr (sole owner), shared_ptr (ref-counted), weak_ptr (non-owning). Prefer them over new/delete.', code: c('#include <memory>', 'auto p = std::make_unique<Widget>(1, 2);', 'auto s = std::make_shared<Widget>();', 'std::weak_ptr<Widget> w = s;'), tips: ['Follow the rule of zero: let RAII types manage resources.'], pitfalls: ['Memory leaks and double frees come from raw new/delete.'] },
          { name: 'Classes', desc: 'Encapsulate data and behaviour with access specifiers, constructors, destructors and inheritance.', code: c('class Account {', 'public:', '    explicit Account(double b) : balance_(b) {}', '    void deposit(double x) { balance_ += x; }', '    double balance() const { return balance_; }', 'private:', '    double balance_;', '};', 'class Base { public: virtual ~Base() = default; virtual void f() = 0; };') },
          { name: 'Move semantics', desc: 'Transfer resources instead of copying with rvalue references and std::move.', code: c('std::vector<int> a = make();', 'std::vector<int> b = std::move(a);   // a is now empty', 'Widget(Widget&&) noexcept = default;') },
          { name: 'Templates', desc: 'Generic programming for functions and classes, with concepts (C++20) to constrain them.', code: c('template <typename T>', 'T maxOf(T a, T b) { return a > b ? a : b; }', 'template <std::integral T> T twice(T x) { return x * 2; }') },
        ]
      },
      {
        title: 'Standard Library',
        items: [
          { name: 'Containers', desc: 'vector, array, string, map, unordered_map, set, deque, list, priority_queue.', code: c('std::vector<int> v = {3, 1, 2};', 'v.push_back(4);', 'std::unordered_map<std::string, int> m;', 'm["a"] = 1;', 'for (auto& [k, val] : m) { }'), tips: ['Default to std::vector.'] },
          { name: 'Algorithms and ranges', desc: 'Generic algorithms operate on iterator ranges; C++20 ranges compose them.', code: c('#include <algorithm>', 'std::sort(v.begin(), v.end());', 'auto it = std::find(v.begin(), v.end(), 3);', 'int total = std::accumulate(v.begin(), v.end(), 0);', 'auto evens = v | std::views::filter([](int x){ return x % 2 == 0; });') },
          { name: 'Lambdas', desc: 'Inline anonymous functions with a capture list.', code: c('int k = 3;', 'auto addK = [k](int x) { return x + k; };', 'auto byRef = [&](int x) { k += x; };', 'std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });') },
          { name: 'Strings, I/O and files', desc: 'std::string, string_view, streams and std::format (C++20).', code: c('std::string s = "hi";', 's += " there";', 'std::ifstream in("data.txt");', 'std::string line;', 'while (std::getline(in, line)) { }', 'std::cout << std::format("{} is {}\\n", "x", 5);') },
          { name: 'Concurrency', desc: 'std::thread, mutex, atomic, async and future.', code: c('std::thread t([]{ work(); });', 't.join();', 'std::mutex m;', '{ std::lock_guard<std::mutex> lock(m); counter++; }', 'auto f = std::async(std::launch::async, compute);') },
        ]
      }
    ]
  },

  /* ============================== C# ============================== */
  csharp: {
    label: 'C#', color: '#239120',
    tagline: 'Modern, type-safe language for the .NET platform.',
    about: 'C# is a statically typed, object-oriented language that also supports functional features. It runs on .NET and is used for web APIs (ASP.NET Core), desktop and mobile apps, cloud services and games (Unity). Features include LINQ, async/await, records, pattern matching and nullable reference types.',
    docsUrl: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    facts: [['Paradigm', 'Object-oriented, functional'], ['Created', '2000 by Microsoft'], ['Runtime', '.NET'], ['File ext.', '.cs']],
    getStarted: c('dotnet new console -n Hello', 'cd Hello', 'dotnet run', 'dotnet test', 'dotnet add package Newtonsoft.Json'),
    sections: [
      {
        title: 'Language Basics',
        items: [
          { name: 'Top-level statements', desc: 'Modern C# lets you write a program without a Main method boilerplate.', code: c('using System;', 'Console.WriteLine("Hello, C#!");') },
          { name: 'Variables and types', desc: 'var infers the type. Value types (int, double, bool, struct) and reference types (string, class). Nullable value types use ?.', code: c('int age = 25;', 'var name = "Ama";', 'double price = 9.99;', 'int? maybe = null;', 'string s = $"Hi {name}, you are {age}";') },
          { name: 'Control flow and pattern matching', desc: 'if, switch expressions and rich patterns.', code: c('string size = n switch { < 10 => "small", < 100 => "medium", _ => "large" };', 'if (obj is string { Length: > 0 } text) Console.WriteLine(text);', 'foreach (var x in items) { }') },
          { name: 'Methods', desc: 'Support optional parameters, named arguments, expression bodies, out and ref.', code: c('static int Add(int a, int b = 0) => a + b;', 'bool ok = int.TryParse(input, out int n);', 'Add(b: 2, a: 1);') },
          { name: 'Nullable reference types', desc: 'Enable with <Nullable>enable</Nullable> so the compiler flags possible null dereferences.', code: c('string? maybe = GetName();', 'int len = maybe?.Length ?? 0;', 'var user = db.Find(id) ?? throw new KeyNotFoundException();') },
        ]
      },
      {
        title: 'Object-Oriented C#',
        items: [
          { name: 'Classes, properties, records', desc: 'Properties wrap fields. Records give immutable value-based types with minimal syntax.', code: c('public class User {', '    public string Name { get; set; } = "";', '    public int Age { get; init; }', '}', 'public record Point(double X, double Y);', 'var p2 = p with { X = 5 };') },
          { name: 'Inheritance, interfaces, abstract', desc: 'Single inheritance of classes plus multiple interfaces. Use virtual/override.', code: c('public interface IShape { double Area(); }', 'public abstract class Base { public abstract void Run(); }', 'public class Circle : IShape { public double R; public double Area() => Math.PI * R * R; }') },
          { name: 'Generics', desc: 'Type-safe reusable code with constraints.', code: c('public class Repo<T> where T : class, new() { public List<T> Items = new(); }', 'static T Max<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) > 0 ? a : b;') },
          { name: 'Dependency injection', desc: 'Built into ASP.NET Core: register services with a lifetime (Singleton, Scoped, Transient).', code: c('builder.Services.AddScoped<IUserService, UserService>();', 'public class Ctrl(IUserService users) : ControllerBase { }') },
        ]
      },
      {
        title: 'LINQ, Async and Collections',
        items: [
          { name: 'LINQ', desc: 'Query collections with a SQL-like or fluent syntax: Where, Select, OrderBy, GroupBy, Any, First, ToList.', code: c('var adults = users.Where(u => u.Age >= 18).OrderBy(u => u.Name).Select(u => u.Name).ToList();', 'var groups = users.GroupBy(u => u.Country).Select(g => new { g.Key, Count = g.Count() });', 'bool any = users.Any(u => u.IsAdmin);'), pitfalls: ['LINQ is lazy; call ToList() to execute and avoid multiple enumeration.'] },
          { name: 'async and await', desc: 'Task-based asynchronous programming that frees threads during I/O.', code: c('public async Task<string> GetAsync(string url) {', '    using var http = new HttpClient();', '    return await http.GetStringAsync(url);', '}', 'await Task.WhenAll(a(), b());'), pitfalls: ['Avoid .Result and .Wait(); they can deadlock.', 'async void is only for event handlers.'] },
          { name: 'Collections', desc: 'List<T>, Dictionary<K,V>, HashSet<T>, Queue<T>, Stack<T>, arrays, Span<T>.', code: c('var list = new List<int> { 1, 2, 3 };', 'var dict = new Dictionary<string, int> { ["a"] = 1 };', 'dict.TryGetValue("a", out var v);', 'int[] nums = [1, 2, 3];') },
          { name: 'Exceptions and using', desc: 'try/catch/finally; using ensures IDisposable cleanup.', code: c('try { Process(); }', 'catch (IOException ex) { Log(ex); }', 'finally { Cleanup(); }', 'using var file = File.OpenRead("x.txt");') },
          { name: 'ASP.NET Core minimal API', desc: 'Create a web API in a few lines.', code: c('var app = WebApplication.CreateBuilder(args).Build();', 'app.MapGet("/hello/{name}", (string name) => Results.Ok(new { greeting = $"Hi {name}" }));', 'app.Run();') },
        ]
      }
    ]
  },

  /* ============================== Java ============================== */
  java: {
    label: 'Java', color: '#E76F00',
    tagline: 'Write once, run anywhere on the JVM.',
    about: 'Java is a statically typed, object-oriented language compiled to bytecode that runs on the Java Virtual Machine. It powers enterprise backends (Spring Boot), Android apps, big-data tools and more. Modern Java (17 and 21 LTS) adds records, sealed classes, pattern matching, text blocks and virtual threads.',
    docsUrl: 'https://docs.oracle.com/en/java/javase/21/docs/api/',
    facts: [['Paradigm', 'Object-oriented'], ['Created', '1995 at Sun Microsystems'], ['Runtime', 'JVM'], ['File ext.', '.java']],
    getStarted: c('java --version', 'javac Main.java', 'java Main', '# or single-file: java Main.java', '# build tools: mvn package | gradle build'),
    sections: [
      {
        title: 'Basics',
        items: [
          { name: 'Program structure', desc: 'Every class lives in a file named after it. Execution starts at public static void main.', code: c('public class Main {', '    public static void main(String[] args) {', '        System.out.println("Hello, Java!");', '    }', '}') },
          { name: 'Types and var', desc: 'Primitives: byte, short, int, long, float, double, char, boolean. Everything else is a reference type. var infers local types.', code: c('int age = 25;', 'double price = 9.99;', 'String name = "Ama";', 'var list = new ArrayList<String>();', 'long big = 10_000_000_000L;'), pitfalls: ['Use .equals() to compare strings, not ==.'] },
          { name: 'Control flow', desc: 'if, switch (with arrow expressions), for, enhanced for, while.', code: c('String size = switch (n) { case 1, 2 -> "small"; case 3 -> "mid"; default -> "large"; };', 'for (String s : names) { System.out.println(s); }', 'for (int i = 0; i < 5; i++) { }') },
          { name: 'Strings and text blocks', desc: 'Strings are immutable. Use StringBuilder for heavy concatenation and text blocks for multi-line.', code: c('String s = "hello";', 's.toUpperCase(); s.substring(1, 3); s.split(",");', 'String msg = String.format("%s is %d", "Ama", 25);', 'String json = """', '    {"name": "Ama"}', '    """;') },
        ]
      },
      {
        title: 'Object-Oriented Java',
        items: [
          { name: 'Classes and constructors', desc: 'Define fields, constructors and methods with access modifiers: public, protected, private, package-private.', code: c('public class User {', '    private final String name;', '    public User(String name) { this.name = name; }', '    public String getName() { return name; }', '}') },
          { name: 'Inheritance, interfaces, abstract', desc: 'extends for single class inheritance, implements for interfaces (which can have default methods).', code: c('interface Shape { double area(); }', 'abstract class Base { abstract void run(); }', 'class Circle implements Shape { double r; public double area() { return Math.PI * r * r; } }') },
          { name: 'Records, enums, sealed types', desc: 'Records are concise immutable data carriers. Sealed interfaces restrict implementors, enabling exhaustive pattern matching.', code: c('record Point(int x, int y) {}', 'enum Level { LOW, MEDIUM, HIGH }', 'sealed interface Shape permits Circle, Square {}', 'String d = switch (shape) { case Circle c -> "circle"; case Square s -> "square"; };') },
          { name: 'Generics', desc: 'Type parameters for reusable, type-safe code, with wildcards.', code: c('class Box<T> { T value; }', 'static <T extends Comparable<T>> T max(T a, T b) { return a.compareTo(b) > 0 ? a : b; }', 'List<? extends Number> nums;') },
          { name: 'Exceptions', desc: 'Checked exceptions must be declared or caught; unchecked (RuntimeException) need not. Use try-with-resources.', code: c('try (var in = new FileInputStream("x.txt")) {', '    in.read();', '} catch (IOException e) {', '    e.printStackTrace();', '}', 'throw new IllegalArgumentException("bad input");') },
        ]
      },
      {
        title: 'Collections, Streams and Concurrency',
        items: [
          { name: 'Collections', desc: 'List (ArrayList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), Queue/Deque. Use immutable factories List.of, Map.of.', code: c('List<Integer> nums = new ArrayList<>(List.of(3, 1, 2));', 'Collections.sort(nums);', 'Map<String, Integer> m = new HashMap<>();', 'm.merge("a", 1, Integer::sum);', 'm.getOrDefault("b", 0);') },
          { name: 'Streams and lambdas', desc: 'Functional-style pipelines: filter, map, collect, reduce, groupingBy.', code: c('List<String> names = users.stream()', '    .filter(u -> u.age() >= 18)', '    .map(User::name)', '    .sorted()', '    .toList();', 'Map<String, Long> byCountry = users.stream().collect(Collectors.groupingBy(User::country, Collectors.counting()));') },
          { name: 'Optional', desc: 'A container that may or may not hold a value, avoiding null.', code: c('Optional<User> u = repo.find(id);', 'String name = u.map(User::name).orElse("unknown");', 'u.ifPresent(System.out::println);') },
          { name: 'Concurrency', desc: 'Threads, ExecutorService, CompletableFuture and virtual threads (Java 21).', code: c('try (var ex = Executors.newVirtualThreadPerTaskExecutor()) {', '    ex.submit(() -> doWork());', '}', 'CompletableFuture.supplyAsync(() -> compute()).thenAccept(System.out::println);'), pitfalls: ['HashMap is not thread-safe; use ConcurrentHashMap.'] },
          { name: 'Spring Boot REST controller', desc: 'The most popular Java web framework.', code: c('@RestController', '@RequestMapping("/api/users")', 'class UserController {', '    @GetMapping("/{id}")', '    User get(@PathVariable long id) { return service.find(id); }', '    @PostMapping', '    ResponseEntity<User> create(@RequestBody @Valid User u) { return ResponseEntity.status(201).body(service.save(u)); }', '}') },
        ]
      }
    ]
  },

  /* ============================== PHP ============================== */
  php: {
    label: 'PHP', color: '#777BB4',
    tagline: 'The server-side language that powers much of the web.',
    about: 'PHP is a dynamically typed scripting language designed for web development. It powers WordPress, Laravel and Symfony. Modern PHP 8 adds union types, attributes, enums, readonly properties, match expressions and named arguments, and is much faster and safer than older versions.',
    docsUrl: 'https://www.php.net/manual/en/',
    facts: [['Paradigm', 'Multi-paradigm'], ['Created', '1995 by Rasmus Lerdorf'], ['Package manager', 'Composer'], ['File ext.', '.php']],
    getStarted: c('php --version', 'php -S localhost:8000          # built-in dev server', 'composer init', 'composer require monolog/monolog'),
    sections: [
      {
        title: 'Basics',
        items: [
          { name: 'Syntax and variables', desc: 'Code lives between <?php tags. Variables start with $. Always enable strict types.', code: c('<?php', 'declare(strict_types=1);', '$name = "Ama";', '$age = 25;', 'echo "Hello, $name! Age: {$age}\\n";', 'define("APP", "demo"); const VERSION = "1.0";') },
          { name: 'Arrays', desc: 'Ordered maps used for both lists and dictionaries.', code: c('$list = [1, 2, 3];', '$user = ["name" => "Ama", "age" => 25];', '$list[] = 4;', 'array_map(fn($n) => $n * 2, $list);', 'array_filter($list, fn($n) => $n > 1);', 'count($list); in_array(2, $list); array_keys($user);') },
          { name: 'Control flow and match', desc: 'if, switch, foreach, while and the stricter match expression.', code: c('foreach ($user as $key => $value) { echo "$key=$value\\n"; }', '$label = match(true) { $n < 10 => "small", $n < 100 => "mid", default => "large" };') },
          { name: 'Functions', desc: 'Support type declarations, default values, named arguments, variadics and arrow functions.', code: c('function greet(string $name, string $greeting = "Hello"): string {', '    return "$greeting, $name";', '}', 'greet(name: "Ama", greeting: "Hi");', '$double = fn(int $x): int => $x * 2;') },
        ]
      },
      {
        title: 'OOP and Modern PHP',
        items: [
          { name: 'Classes and constructor promotion', desc: 'Properties can be declared directly in the constructor. Use readonly for immutability.', code: c('class User {', '    public function __construct(', '        public readonly string $name,', '        private int $age = 0,', '    ) {}', '    public function greet(): string { return "Hi {$this->name}"; }', '}', '$u = new User("Ama");') },
          { name: 'Interfaces, traits, enums', desc: 'Interfaces define contracts, traits reuse code, enums (8.1) model fixed sets of values.', code: c('interface Shape { public function area(): float; }', 'trait Loggable { public function log(string $m): void { error_log($m); } }', 'enum Status: string { case Active = "active"; case Banned = "banned"; }') },
          { name: 'Namespaces and autoloading', desc: 'Organise code with namespaces and let Composer autoload classes (PSR-4).', code: c('namespace App\\Models;', 'use App\\Services\\Mailer;', '// composer.json: "autoload": { "psr-4": { "App\\\\": "src/" } }', 'require __DIR__ . "/vendor/autoload.php";') },
          { name: 'Exceptions', desc: 'try/catch/finally with Throwable types.', code: c('try {', '    throw new InvalidArgumentException("bad");', '} catch (InvalidArgumentException $e) {', '    echo $e->getMessage();', '} finally { }') },
        ]
      },
      {
        title: 'Web, Databases and Security',
        items: [
          { name: 'Superglobals and requests', desc: '$_GET, $_POST, $_SERVER, $_COOKIE, $_FILES. Always validate and sanitise input.', code: c('$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);', '$email = filter_var($_POST["email"] ?? "", FILTER_VALIDATE_EMAIL);', 'header("Content-Type: application/json");', 'echo json_encode(["ok" => true]);') },
          { name: 'PDO and prepared statements', desc: 'Use PDO with bound parameters to prevent SQL injection.', code: c('$pdo = new PDO("mysql:host=localhost;dbname=app;charset=utf8mb4", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);', '$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");', '$stmt->execute(["email" => $email]);', '$row = $stmt->fetch(PDO::FETCH_ASSOC);'), pitfalls: ['Never interpolate user input into SQL.'] },
          { name: 'Passwords and escaping', desc: 'Hash passwords with password_hash and escape output with htmlspecialchars to prevent XSS.', code: c('$hash = password_hash($password, PASSWORD_DEFAULT);', 'password_verify($input, $hash);', 'echo htmlspecialchars($userInput, ENT_QUOTES, "UTF-8");'), pitfalls: ['Never use md5 or sha1 for passwords.'] },
          { name: 'Laravel quick reference', desc: 'The most popular PHP framework: routing, Eloquent ORM, Blade templates, Artisan CLI.', code: c('// routes/web.php', 'Route::get("/users/{id}", [UserController::class, "show"]);', '// Eloquent', '$users = User::where("active", true)->orderBy("name")->paginate(15);', '// php artisan make:model Post -mcr') },
        ]
      }
    ]
  },

  /* ============================== Git ============================== */
  git: {
    label: 'Git', color: '#F05032',
    tagline: 'Distributed version control for tracking changes and collaborating.',
    about: 'Git records snapshots of your project so you can review history, branch to experiment, merge work from teammates and roll back mistakes. Every clone is a full repository. Hosts like GitHub, GitLab and Bitbucket add pull requests, issues and CI on top of Git.',
    docsUrl: 'https://git-scm.com/doc',
    facts: [['Type', 'Version control'], ['Created', '2005 by Linus Torvalds'], ['Model', 'Distributed'], ['Hosts', 'GitHub, GitLab']],
    getStarted: c('git config --global user.name "Your Name"', 'git config --global user.email "you@example.com"', 'git init', 'git add .', 'git commit -m "Initial commit"'),
    sections: [
      {
        title: 'Everyday Workflow',
        items: [
          { name: 'git init / clone', desc: 'Create a new repository or copy an existing one.', code: c('git init', 'git clone https://github.com/user/repo.git', 'git clone --depth 1 <url>   # shallow clone') },
          { name: 'git status and diff', desc: 'See what changed. status summarises; diff shows line-level changes.', code: c('git status -sb', 'git diff               # unstaged changes', 'git diff --staged      # staged changes', 'git diff main..feature') },
          { name: 'git add and commit', desc: 'Stage changes then record them as a commit with a clear message.', code: c('git add file.txt', 'git add -p            # stage interactively, hunk by hunk', 'git commit -m "Add login form validation"', 'git commit --amend     # fix the last commit'), tips: ['Write imperative messages: "Fix bug", not "Fixed bug".', 'Make small, focused commits.'], pitfalls: ['Do not amend commits you have already pushed to a shared branch.'] },
          { name: 'git log', desc: 'Browse history with many formatting and filtering options.', code: c('git log --oneline --graph --decorate --all', 'git log -p file.txt', 'git log --author="Ama" --since="2 weeks ago"', 'git log -S"functionName"   # search code changes', 'git blame file.txt') },
          { name: 'git push and pull', desc: 'Share commits with a remote and fetch others. pull is fetch plus merge (or rebase).', code: c('git remote -v', 'git remote add origin <url>', 'git push -u origin main', 'git fetch --all --prune', 'git pull --rebase'), pitfalls: ['Avoid --force; use --force-with-lease when you must.'] },
          { name: '.gitignore', desc: 'Tell Git which files to never track, such as dependencies, builds and secrets.', code: c('node_modules/', 'dist/', '.env', '*.log', '.DS_Store'), pitfalls: ['A file already committed stays tracked; run git rm --cached <file>.'] },
        ]
      },
      {
        title: 'Branching and Merging',
        items: [
          { name: 'Branches', desc: 'Lightweight pointers to commits for isolating work.', code: c('git branch                     # list', 'git switch -c feature/login     # create and switch', 'git switch main', 'git branch -d feature/login    # delete merged', 'git branch -m new-name') },
          { name: 'git merge', desc: 'Combine another branch into the current one.', code: c('git switch main', 'git merge feature/login', 'git merge --no-ff feature/login', 'git merge --abort            # cancel a conflicted merge'), tips: ['Resolve conflicts by editing the marked files, then git add and git commit.'] },
          { name: 'git rebase', desc: 'Replay your commits on top of another base for a linear history. Interactive rebase can squash, reword and reorder.', code: c('git rebase main', 'git rebase -i HEAD~4', 'git rebase --continue | --abort'), pitfalls: ['Never rebase commits that others have based work on.'] },
          { name: 'git cherry-pick', desc: 'Apply a single commit from another branch.', code: 'git cherry-pick a1b2c3d' },
          { name: 'Conflict markers', desc: 'Git marks conflicting sections in files. Edit to the desired result and remove the markers.', code: c('<<<<<<< HEAD', 'your version', '=======', 'their version', '>>>>>>> feature/login') },
        ]
      },
      {
        title: 'Undoing and Recovering',
        items: [
          { name: 'restore and reset', desc: 'restore discards file changes or unstages. reset moves the branch pointer: --soft keeps changes staged, --mixed (default) unstages, --hard discards.', code: c('git restore file.txt            # discard working changes', 'git restore --staged file.txt   # unstage', 'git reset --soft HEAD~1', 'git reset --hard HEAD~1         # DANGEROUS'), pitfalls: ['reset --hard permanently deletes uncommitted work.'] },
          { name: 'git revert', desc: 'Create a new commit that undoes a previous one; safe for shared branches.', code: 'git revert a1b2c3d' },
          { name: 'git stash', desc: 'Temporarily shelve uncommitted changes.', code: c('git stash push -m "wip"', 'git stash list', 'git stash pop', 'git stash apply stash@{1}') },
          { name: 'git reflog', desc: 'A log of where HEAD has been; lets you recover lost commits.', code: c('git reflog', 'git switch -c rescue a1b2c3d'), tips: ['Almost nothing committed is truly lost for a while.'] },
          { name: 'Tags and releases', desc: 'Mark specific commits, usually releases.', code: c('git tag v1.0.0', 'git tag -a v1.0.0 -m "First release"', 'git push origin v1.0.0') },
        ]
      },
      {
        title: 'Collaboration and Best Practices',
        items: [
          { name: 'Pull request workflow', desc: 'Typical flow on GitHub: branch, commit, push, open a PR, review, merge.', code: c('git switch -c feature/search', '# ...work and commit...', 'git push -u origin feature/search', '# open a Pull Request on GitHub', 'gh pr create --fill') },
          { name: 'Conventional commits', desc: 'A message format that enables changelogs and automated versioning.', code: c('feat(auth): add password reset', 'fix(api): handle null user', 'docs: update README', 'chore: bump dependencies') },
          { name: 'Security tips', desc: 'Never commit secrets. If you do, rotate them immediately; deleting the commit is not enough.', code: c('git secrets --scan        # or use gitleaks / GitHub secret scanning'), pitfalls: ['Secrets stay in history even after you remove the file.'] },
        ]
      }
    ]
  },

  /* ============================== Bash ============================== */
  bash: {
    label: 'Bash', color: '#4EAA25',
    tagline: 'The default shell and scripting language on Linux and macOS.',
    about: 'Bash is both an interactive command line and a scripting language for automating tasks, chaining tools with pipes and managing files and processes. Scripts start with a shebang and run with bash script.sh or after chmod +x.',
    docsUrl: 'https://www.gnu.org/software/bash/manual/bash.html',
    facts: [['Type', 'Shell / scripting'], ['Created', '1989 (GNU)'], ['Platforms', 'Linux, macOS, WSL'], ['File ext.', '.sh']],
    getStarted: c('#!/usr/bin/env bash', 'set -euo pipefail', 'echo "Hello, $USER"', '', '# chmod +x hello.sh && ./hello.sh'),
    sections: [
      {
        title: 'Navigation and Files',
        items: [
          { name: 'ls, cd, pwd', desc: 'List and move through directories.', code: c('pwd', 'ls -lah', 'cd /var/log   # cd - goes back, cd ~ goes home') },
          { name: 'cp, mv, rm, mkdir, touch', desc: 'Copy, move, delete and create files and directories.', code: c('mkdir -p a/b/c', 'touch file.txt', 'cp -r src dst', 'mv old.txt new.txt', 'rm -rf build/   # DANGEROUS, no undo'), pitfalls: ['rm -rf with a wrong variable (e.g. rm -rf "$DIR/") can wipe a lot; quote and verify.'] },
          { name: 'cat, head, tail, less', desc: 'View file contents. tail -f follows a growing log.', code: c('cat file.txt', 'head -n 20 file.txt', 'tail -f app.log', 'less file.txt') },
          { name: 'find and locate', desc: 'Search for files by name, type, size or time.', code: c('find . -name "*.log" -mtime +7', 'find . -type f -size +100M', 'find . -name "*.tmp" -delete') },
          { name: 'chmod and chown', desc: 'Change permissions and ownership. Numbers are read=4, write=2, execute=1.', code: c('chmod 755 script.sh    # rwxr-xr-x', 'chmod +x script.sh', 'chown user:group file'), pitfalls: ['Avoid chmod 777; it grants everyone full access.'] },
        ]
      },
      {
        title: 'Text Processing and Pipes',
        items: [
          { name: 'Pipes and redirection', desc: 'Connect commands with | and redirect streams: > overwrite, >> append, < input, 2> errors, &> both.', code: c('ls | wc -l', 'echo hi > out.txt', 'echo more >> out.txt', 'cmd 2> errors.log', 'cmd > all.log 2>&1', 'cmd < input.txt') },
          { name: 'grep', desc: 'Search text with patterns.', code: c('grep -rn "TODO" src/', 'grep -i error app.log', 'grep -v debug app.log', 'grep -E "^(GET|POST)" access.log') },
          { name: 'sed and awk', desc: 'sed edits streams; awk processes columns.', code: c('sed -i \'s/foo/bar/g\' file.txt', 'awk \'{print $1, $3}\' data.txt', 'awk -F, \'$3 > 100 {sum += $3} END {print sum}\' sales.csv') },
          { name: 'sort, uniq, cut, wc, xargs, tr', desc: 'Small tools that combine powerfully.', code: c('sort file | uniq -c | sort -nr | head', 'cut -d, -f1,3 data.csv', 'find . -name "*.js" | xargs wc -l', 'echo "abc" | tr a-z A-Z') },
          { name: 'curl and jq', desc: 'Call APIs and parse JSON.', code: c('curl -s https://api.github.com/users/octocat | jq \'.login\'', 'curl -X POST -H "Content-Type: application/json" -d \'{"a":1}\' https://example.com/api') },
        ]
      },
      {
        title: 'Scripting',
        items: [
          { name: 'Variables and quoting', desc: 'No spaces around =. Always quote expansions to prevent word splitting.', code: c('name="Ama"', 'echo "Hello, $name"', 'echo "${name:-default}"', 'files=(a.txt b.txt)', 'echo "${files[@]}"', 'now=$(date +%F)'), pitfalls: ['Unquoted $var breaks on spaces and globs.'] },
          { name: 'Conditionals', desc: 'Use [[ ]] for tests: strings, numbers and file checks.', code: c('if [[ -f "$file" && "$n" -gt 5 ]]; then', '  echo "ok"', 'elif [[ "$s" == "yes" ]]; then', '  echo "yes"', 'else', '  echo "no"', 'fi', '# -f file  -d dir  -z empty  -n not empty  -eq -lt -gt numbers') },
          { name: 'Loops', desc: 'for, while and C-style loops.', code: c('for f in *.txt; do echo "$f"; done', 'for i in {1..5}; do echo "$i"; done', 'while read -r line; do echo "$line"; done < file.txt', 'for ((i=0; i<3; i++)); do echo "$i"; done') },
          { name: 'Functions and arguments', desc: 'Scripts and functions read $1, $2, $@, $#; return status with return or exit.', code: c('greet() { local who="$1"; echo "Hi $who"; }', 'greet "Ama"', 'echo "script: $0, args: $#, all: $@"', 'exit 0') },
          { name: 'Safe scripts', desc: 'Use strict mode and traps to fail fast and clean up.', code: c('set -euo pipefail', 'tmp=$(mktemp)', 'trap \'rm -f "$tmp"\' EXIT', 'command -v git >/dev/null || { echo "git required" >&2; exit 1; }'), tips: ['Use shellcheck to lint your scripts.'] },
          { name: 'Processes and cron', desc: 'Manage running programs and schedule jobs.', code: c('ps aux | grep node', 'kill -15 1234', 'cmd &            # background', 'nohup cmd &', 'crontab -e       # 0 2 * * * /path/backup.sh') },
        ]
      }
    ]
  },

  /* ============================== Docker ============================== */
  docker: {
    label: 'Docker', color: '#2496ED',
    tagline: 'Package and run applications in containers.',
    about: 'Docker packages an app with its dependencies into an image that runs identically anywhere. Containers are lightweight, isolated processes created from images. Docker Compose defines multi-container apps, and registries like Docker Hub store images.',
    docsUrl: 'https://docs.docker.com/',
    facts: [['Type', 'Containerisation'], ['Created', '2013'], ['Config', 'Dockerfile, compose.yaml'], ['Registry', 'Docker Hub']],
    getStarted: c('docker --version', 'docker run hello-world', 'docker build -t my-app .', 'docker run -p 3000:3000 my-app'),
    sections: [
      {
        title: 'Images and Containers',
        items: [
          { name: 'docker run', desc: 'Create and start a container from an image.', params: [['-d', 'Run in background.'], ['-p host:container', 'Publish a port.'], ['--name', 'Name the container.'], ['-e KEY=val', 'Set an environment variable.'], ['-v src:dst', 'Mount a volume or bind mount.'], ['--rm', 'Remove the container when it exits.'], ['-it', 'Interactive terminal.']], code: c('docker run -d --name web -p 8080:80 nginx', 'docker run --rm -it ubuntu bash', 'docker run -e NODE_ENV=production -v $(pwd):/app my-app') },
          { name: 'ps, logs, exec, stop', desc: 'Inspect and manage running containers.', code: c('docker ps -a', 'docker logs -f web', 'docker exec -it web sh', 'docker stop web && docker rm web', 'docker stats') },
          { name: 'images and registries', desc: 'List, pull, tag, push and delete images.', code: c('docker images', 'docker pull node:20-alpine', 'docker tag my-app user/my-app:1.0', 'docker push user/my-app:1.0', 'docker rmi my-app') },
          { name: 'Cleaning up', desc: 'Reclaim disk space from unused data.', code: c('docker system df', 'docker system prune -a --volumes'), pitfalls: ['prune -a removes all unused images; make sure you can rebuild them.'] },
        ]
      },
      {
        title: 'Dockerfile',
        items: [
          { name: 'Dockerfile basics', desc: 'Instructions that build an image layer by layer: FROM, WORKDIR, COPY, RUN, ENV, EXPOSE, CMD, ENTRYPOINT, USER.', code: c('FROM node:20-alpine', 'WORKDIR /app', 'COPY package*.json ./', 'RUN npm ci --omit=dev', 'COPY . .', 'ENV NODE_ENV=production', 'EXPOSE 3000', 'USER node', 'CMD ["node", "server.js"]'), tips: ['Copy dependency manifests before source so the install layer is cached.'], pitfalls: ['Do not bake secrets into images; they remain in layers.'] },
          { name: 'Multi-stage builds', desc: 'Build in one stage and copy only artifacts into a small final image.', code: c('FROM node:20 AS build', 'WORKDIR /app', 'COPY . .', 'RUN npm ci && npm run build', '', 'FROM nginx:alpine', 'COPY --from=build /app/dist /usr/share/nginx/html') },
          { name: '.dockerignore', desc: 'Exclude files from the build context to speed builds and avoid leaking secrets.', code: c('node_modules', '.git', '.env', 'dist') },
          { name: 'CMD vs ENTRYPOINT', desc: 'ENTRYPOINT sets the executable; CMD provides default arguments that can be overridden. Prefer the exec (JSON array) form.', code: c('ENTRYPOINT ["python", "app.py"]', 'CMD ["--port", "8000"]') },
        ]
      },
      {
        title: 'Compose, Volumes and Networks',
        items: [
          { name: 'Docker Compose', desc: 'Define and run multi-container applications in a compose.yaml file.', code: c('services:', '  web:', '    build: .', '    ports: ["3000:3000"]', '    environment:', '      DATABASE_URL: postgres://app:secret@db:5432/app', '    depends_on: [db]', '  db:', '    image: postgres:16', '    environment: { POSTGRES_PASSWORD: secret }', '    volumes: [dbdata:/var/lib/postgresql/data]', 'volumes:', '  dbdata:'), tips: ['Run with docker compose up -d --build.'] },
          { name: 'Volumes and bind mounts', desc: 'Persist data outside the container lifecycle. Named volumes are managed by Docker; bind mounts map host folders.', code: c('docker volume create data', 'docker run -v data:/var/lib/mysql mysql', 'docker run -v "$(pwd)":/app node:20') },
          { name: 'Networking', desc: 'Containers on the same user-defined network reach each other by service name.', code: c('docker network create appnet', 'docker run --network appnet --name api my-api', 'docker network ls') },
        ]
      }
    ]
  },

  /* ============================== Tailwind CSS ============================== */
  tailwind: {
    label: 'Tailwind CSS', color: '#06B6D4', textOnColor: '#18181B',
    tagline: 'A utility-first CSS framework.',
    about: 'Tailwind CSS provides small single-purpose utility classes that you compose directly in your markup. It scans your files and generates only the CSS you use, supports responsive and state variants (md:, hover:, dark:) and is configured through a theme of design tokens.',
    docsUrl: 'https://tailwindcss.com/docs',
    facts: [['Type', 'CSS framework'], ['Created', '2017 by Adam Wathan'], ['Approach', 'Utility-first'], ['Works with', 'React, Vue, plain HTML']],
    getStarted: c('npm install tailwindcss @tailwindcss/vite', '# vite.config.js: add the tailwindcss() plugin', '# main.css:', '@import "tailwindcss";'),
    sections: [
      {
        title: 'Core Utilities',
        items: [
          { name: 'Spacing', desc: 'Padding (p), margin (m) and gap use a scale where 1 unit = 0.25rem. Add t, r, b, l, x, y for sides.', code: c('<div class="p-4 mx-auto mt-8 space-y-2 gap-4">...</div>', '<div class="px-6 py-3 -mt-2">...</div>') },
          { name: 'Sizing', desc: 'Width and height utilities: fixed scale, fractions, full, screen, min, max, fit.', code: c('<div class="w-64 h-10 max-w-md min-h-screen w-1/2 size-8">...</div>') },
          { name: 'Typography', desc: 'Font size, weight, color, alignment, leading and tracking.', code: c('<h1 class="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">Title</h1>', '<p class="text-sm text-zinc-500 line-clamp-2 truncate uppercase">...</p>') },
          { name: 'Colors and backgrounds', desc: 'Palette scale 50 to 950, with opacity modifiers. Applies to text, bg, border, ring, fill.', code: c('<div class="bg-indigo-600 text-white border border-zinc-200 bg-black/50">...</div>', '<div class="bg-gradient-to-r from-indigo-500 to-pink-500">...</div>') },
          { name: 'Borders, radius, shadow, ring', desc: 'Style box edges and depth.', code: c('<div class="rounded-xl border shadow-sm ring-1 ring-zinc-200">...</div>', '<img class="rounded-full" />') },
        ]
      },
      {
        title: 'Layout',
        items: [
          { name: 'Flexbox', desc: 'flex, flex-col, items-*, justify-*, gap-*, flex-1, shrink-0, wrap.', code: c('<div class="flex items-center justify-between gap-4 flex-wrap">', '  <span class="flex-1">Left</span>', '  <button class="shrink-0">Right</button>', '</div>') },
          { name: 'Grid', desc: 'grid, grid-cols-*, col-span-*, auto-rows, place-items.', code: c('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">', '  <div class="col-span-2">Wide</div>', '</div>') },
          { name: 'Position and display', desc: 'relative, absolute, fixed, sticky, inset-*, z-*, hidden, block, inline-flex.', code: c('<div class="relative"><span class="absolute top-2 right-2 z-10">Badge</span></div>', '<header class="sticky top-0 z-50">...</header>') },
          { name: 'Container and overflow', desc: 'container sets max-width per breakpoint; overflow-* controls clipping and scrolling.', code: c('<div class="container mx-auto px-4 overflow-x-auto">...</div>') },
        ]
      },
      {
        title: 'Variants and Customization',
        items: [
          { name: 'Responsive prefixes', desc: 'Mobile-first breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px. Unprefixed utilities apply to all sizes.', code: c('<div class="text-sm md:text-base lg:text-lg flex-col md:flex-row">...</div>') },
          { name: 'State variants', desc: 'hover:, focus:, focus-visible:, active:, disabled:, group-hover:, peer-checked:, first:, odd:, placeholder:.', code: c('<button class="bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-2 disabled:opacity-50 transition">Save</button>', '<div class="group"><span class="group-hover:underline">Hover parent</span></div>') },
          { name: 'Dark mode', desc: 'Use the dark: variant, driven by the OS preference or a class/selector strategy.', code: c('<div class="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">...</div>') },
          { name: 'Arbitrary values', desc: 'Use square brackets for one-off values when the scale does not fit.', code: c('<div class="w-[342px] bg-[#1da1f2] top-[117px] grid-cols-[1fr_2fr]">...</div>'), tips: ['If you use an arbitrary value repeatedly, add it to your theme.'] },
          { name: 'Customizing the theme', desc: 'In Tailwind v4 define design tokens in CSS with @theme; in v3 use tailwind.config.js. Use @apply and @layer sparingly.', code: c('@import "tailwindcss";', '@theme {', '  --color-brand: #6366f1;', '  --font-display: "Inter", sans-serif;', '}', '', '/* usage: <div class="bg-brand font-display"> */'), pitfalls: ['Dynamically built class names like `text-${color}-500` are not detected; use full class strings.'] },
        ]
      }
    ]
  },

  /* ============================== Figma ============================== */
  figma: {
    label: 'Figma', color: '#F24E1E',
    tagline: 'Collaborative interface design and prototyping in the browser.',
    about: 'Figma is a browser-based design tool for UI/UX design, prototyping, design systems and developer handoff. It supports real-time multiplayer editing, reusable components with variants, variables for design tokens, Auto Layout for responsive designs and Dev Mode for inspecting code-ready specs.',
    docsUrl: 'https://help.figma.com/hc/en-us',
    facts: [['Type', 'Design tool'], ['Created', '2016'], ['Platform', 'Web and desktop'], ['Extensibility', 'Plugins and REST API']],
    getStarted: c('1. Create a file and press F (or A) to draw a Frame', '2. Use Shift + A to add Auto Layout', '3. Turn repeated elements into Components (Cmd/Ctrl + Alt + K)', '4. Press Shift + 2 to share a prototype or use Dev Mode'),
    sections: [
      {
        title: 'Essential Shortcuts',
        items: [
          { name: 'Tools', desc: 'Quick keys to switch tools. The same keys work on Windows (Ctrl) and Mac (Cmd).', code: c('V   Move          F or A   Frame', 'R   Rectangle     O   Ellipse', 'L   Line          T   Text', 'P   Pen           C   Comment', 'H   Hand          K   Scale') },
          { name: 'Editing and layers', desc: 'Duplicate, group, reorder and organise quickly.', code: c('Cmd/Ctrl + D           Duplicate', 'Cmd/Ctrl + G           Group', 'Cmd/Ctrl + Shift + G   Ungroup', 'Cmd/Ctrl + ] or [      Bring forward / send backward', 'Cmd/Ctrl + Alt + G     Frame selection', 'Cmd/Ctrl + /            Search actions') },
          { name: 'Viewing', desc: 'Zoom and navigate the canvas.', code: c('Shift + 1   Zoom to fit', 'Shift + 2   Zoom to selection', 'Cmd/Ctrl + + or -   Zoom in / out', 'Space + drag        Pan', 'Cmd/Ctrl + Shift + H   Hide/show UI') },
        ]
      },
      {
        title: 'Layout and Components',
        items: [
          { name: 'Auto Layout', desc: 'Makes a frame resize with its contents, with direction, gap, padding and alignment. The basis of responsive components in Figma.', code: c('Shift + A         Add Auto Layout to selection', 'Direction         Horizontal / Vertical / Wrap', 'Resizing          Hug contents | Fill container | Fixed', 'Spacing           Gap between items + padding'), tips: ['Nest Auto Layout frames to build complex responsive layouts.', 'Use Fill container for children that should stretch.'] },
          { name: 'Constraints and layout grids', desc: 'Constraints decide how objects behave when their parent frame resizes. Layout grids (columns, rows, grid) keep alignment consistent.', code: c('Constraints   Left / Right / Left & Right / Center / Scale', 'Layout grid   Ctrl + G (toggle), 12 columns, 24px gutter, 80px margin') },
          { name: 'Components', desc: 'Reusable design elements. Edit the main component and every instance updates. Instances can override text, fills and nested items.', code: c('Cmd/Ctrl + Alt + K   Create component', 'Cmd/Ctrl + Alt + B   Detach instance', 'Alt + drag            Duplicate instance'), tips: ['Name layers meaningfully and use a slash naming convention like Button/Primary.'] },
          { name: 'Variants and component properties', desc: 'Group related states (default, hover, disabled) and sizes into one component set, controlled by properties: variant, boolean, text and instance swap.', code: c('Component set: Button', '  Property "Type": Primary | Secondary | Ghost', '  Property "Size": S | M | L', '  Property "Disabled": true | false', '  Property "Label": text', '  Property "Icon": instance swap') },
        ]
      },
      {
        title: 'Styles, Variables and Prototyping',
        items: [
          { name: 'Styles and variables', desc: 'Styles store reusable color, text, effect and grid settings. Variables store tokens (colors, numbers, strings, booleans) and support modes such as light/dark and multiple brands.', code: c('Collection: Colors', '  Mode: Light | Dark', '  bg/primary   #FFFFFF | #09090B', '  text/primary #18181B | #FAFAFA', 'Collection: Spacing', '  space/4 = 16'), tips: ['Use semantic names (text/primary) rather than raw color names.'] },
          { name: 'Prototyping', desc: 'Connect frames with interactions: triggers (click, hover, drag), actions (navigate, overlay, scroll) and animations (smart animate).', code: c('Trigger:    On click / While hovering / After delay', 'Action:     Navigate to / Open overlay / Scroll to / Back', 'Animation:  Instant / Dissolve / Smart animate / Move in', 'Preview:    Press the Play button or Shift + Space') },
          { name: 'Dev Mode and handoff', desc: 'Inspect spacing, colors and typography as CSS/iOS/Android code, copy assets and view annotations. Use the REST API and plugins for automation.', code: c('Shift + D     Toggle Dev Mode', 'Export         Select a layer > Export > PNG / SVG / PDF / WebP', 'API           GET https://api.figma.com/v1/files/:key  (X-Figma-Token header)'), pitfalls: ['Never commit Figma personal access tokens to a public repository.'] },
          { name: 'Plugins and FigJam', desc: 'Extend Figma with community plugins (Iconify, Stark for contrast, Content Reel). FigJam is the whiteboard for brainstorming and flows.', code: c('Cmd/Ctrl + /  then type "Plugins"', 'Resources: Figma Community for files, UI kits and plugins') },
        ]
      }
    ]
  }
};
