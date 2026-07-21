export const cssLessons = [
  {
    id: 'css-01-selectors-specificity',
    title: 'Selectors & Specificity',
    explanation: `CSS selectors decide *which* elements a rule applies to, and specificity decides *which rule wins* when several rules target the same element.

## Selector types

- **Type selectors** match tag names: \`p\`, \`div\`, \`h1\`.
- **Class selectors** match the \`class\` attribute: \`.card\`, \`.btn-primary\`. You can reuse a class on many elements.
- **ID selectors** match a unique \`id\` attribute: \`#header\`. IDs should appear once per page.
- **Attribute selectors** match elements by attribute presence or value: \`[type="text"]\`, \`[href^="https"]\`.

## Specificity

Specificity is calculated as a tuple of (inline styles, IDs, classes/attributes/pseudo-classes, type selectors/pseudo-elements). Higher wins, and inline styles beat everything except \`!important\`. When two rules have equal specificity, the one that appears later in the stylesheet (the "cascade") wins.

\`\`\`css
p { color: black; }            /* specificity: 0-0-1 */
.intro { color: blue; }         /* specificity: 0-1-0 */
#main p.intro { color: red; }   /* specificity: 1-1-1, wins */
\`\`\`

## The cascade

The cascade combines source order, specificity, and origin (browser default, author, user \`!important\`) to resolve conflicts. A common beginner mistake is reaching for an ID selector or \`!important\` to "win" a fight, which makes future overrides harder. Prefer low-specificity class selectors and let source order do the work — it keeps stylesheets predictable and easy to maintain as a project grows.`,
    example: {
      code: `/* Type selector: applies to every paragraph */
p {
  color: #333;
}

/* Class selector: reusable across many elements */
.highlight {
  background-color: yellow;
}

/* ID selector: unique, high specificity */
#page-title {
  font-size: 2rem;
}

/* Attribute selector: matches inputs of type text */
input[type="text"] {
  border: 1px solid #ccc;
}

/* Higher specificity wins over the plain .highlight rule above */
.card .highlight {
  background-color: orange;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.notice {
  color: gray;
}

/* The paragraph below has class="notice important-notice".
   Add a rule that makes text with BOTH classes red,
   without touching the .notice rule above. */
`,
      instructions: 'Add a compound class selector (e.g. `.notice.important-notice`) that sets `color: red;` so it overrides `.notice` for elements carrying both classes, while leaving the `.notice` rule unchanged.',
      previewHtml: `<div class="card">
  <p class="notice">This is a general notice.</p>
  <p class="notice important-notice">This is an important notice that should stand out in red.</p>
  <p class="notice">Another general notice.</p>
</div>`,
    },
    quiz: [
    { question: 'Which selector has the highest specificity?', choices: ['#main', 'p.intro', '.intro', 'p'], correctIndex: 0 },
    { question: 'If two CSS rules have identical specificity and both target the same element, which one wins?', choices: ['The one with the shorter selector', 'The one defined first in the stylesheet', 'The one defined last in the stylesheet', 'Neither applies'], correctIndex: 2 },
    { question: 'What does the attribute selector `input[type="text"]` match?', choices: ['Every input element regardless of type', 'Only input elements whose type attribute equals "text"', 'Only elements with a class named "text"', 'Only the first input on the page'], correctIndex: 1 },
    { question: 'Which of these generally overrides a normal (non-!important) author stylesheet rule?', choices: ['A rule with lower specificity', 'A browser default (user-agent) style', 'A rule placed earlier in the same file', 'An inline style attribute on the element'], correctIndex: 3 },
    { question: 'Why is relying on `!important` or ID selectors to win specificity fights generally discouraged?', choices: ['They are not supported in modern browsers', 'They make future overrides harder and reduce maintainability', 'They only work on class selectors', 'They slow down page rendering significantly'], correctIndex: 1 },
  ],
  },
  {
    id: 'css-02-box-model',
    title: 'The Box Model',
    explanation: `Every element on a web page is rendered as a rectangular box. The CSS box model describes how the size of that box is calculated from four layers, from the inside out: **content**, **padding**, **border**, and **margin**.

## The four layers

- **Content**: the actual text or child elements, sized by \`width\`/\`height\`.
- **Padding**: transparent space between the content and the border. It is part of the element's own background.
- **Border**: a line (or none) that wraps the padding and content.
- **Margin**: transparent space *outside* the border, separating the element from its neighbors. Margins can collapse vertically between adjacent block elements.

## box-sizing

By default (\`box-sizing: content-box\`), \`width\` and \`height\` only size the content box — padding and border are added on top, which makes total size math awkward:

\`\`\`css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 4px solid black;
  /* total rendered width stays 200px; padding and border
     are subtracted from the content area instead of added */
}
\`\`\`

Most developers reset every element to \`border-box\` at the top of a stylesheet:

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

This makes layout math predictable: a \`width: 100%\` element with padding no longer overflows its parent. Understanding which model you're using — and switching to \`border-box\` deliberately — prevents a huge class of "why doesn't this fit" layout bugs.`,
    example: {
      code: `*, *::before, *::after {
  box-sizing: border-box;
}

.box {
  width: 240px;
  padding: 16px;
  border: 2px solid #444;
  margin: 24px;
  background-color: #eef;
}

.box--content-box {
  box-sizing: content-box;
  width: 240px;
  padding: 16px;
  border: 2px solid #900;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.product-card {
  width: 220px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  /* padding is missing, so text touches the edges */
}

.product-card__price {
  /* add spacing below the price so the button isn't cramped */
}`,
      instructions: 'Add `padding: 16px;` to `.product-card` so its content is not flush against the border, and add `box-sizing: border-box;` to keep the total width at 220px. Then give `.product-card__price` a `margin-bottom: 12px;`.',
      previewHtml: `<div class="product-card">
  <h2 class="product-card__title">Wireless Headphones</h2>
  <p class="product-card__price">$59.99</p>
  <button class="product-card__button">Add to cart</button>
</div>`,
    },
    quiz: [
    { question: 'In order from innermost to outermost, what are the four box model layers?', choices: ['Content, padding, border, margin', 'Margin, border, padding, content', 'Padding, content, margin, border', 'Border, content, padding, margin'], correctIndex: 0 },
    { question: 'With the default `box-sizing: content-box`, what happens when you add padding to an element with a fixed `width`?', choices: ['The padding is subtracted from the width', 'The element automatically shrinks its content', 'The padding is ignored', 'The total rendered width grows beyond the specified width'], correctIndex: 3 },
    { question: 'What does `box-sizing: border-box` change?', choices: ['It removes borders from all elements', 'It makes margins collapse', 'It makes width/height include padding and border instead of adding them on top', 'It disables the padding property'], correctIndex: 2 },
    { question: 'Which box model layer sits outside the border and creates space between elements?', choices: ['Margin', 'Content', 'Padding', 'Outline'], correctIndex: 0 },
    { question: 'Why do many developers apply `box-sizing: border-box` to every element via a universal selector?', choices: ['It is required for CSS to be valid', 'It increases page load speed', 'It makes width/height math predictable and prevents overflow from padding/border', 'It is the only way to use percentage widths'], correctIndex: 2 },
  ],
  },
  {
    id: 'css-03-colors-units-typography',
    title: 'Colors, Units & Typography',
    explanation: `CSS gives you several ways to express color and size, and a set of properties for controlling how text looks and reads.

## Color formats

- Keywords: \`red\`, \`rebeccapurple\`
- Hex: \`#ff0000\`, \`#f00\`
- \`rgb()\` / \`rgba()\`: \`rgb(255, 0, 0)\`, \`rgba(255, 0, 0, 0.5)\`
- \`hsl()\` / \`hsla()\`: \`hsl(0, 100%, 50%)\` — hue, saturation, lightness, often easier to reason about when tweaking a palette.

## Length units

- **Absolute**: \`px\` — a fixed pixel size.
- **Relative to font size**: \`em\` (relative to the *current element's* font size, compounding in nested elements) and \`rem\` (relative to the *root* \`html\` font size, which avoids compounding surprises).
- **Relative to parent/viewport**: \`%\` (relative to the parent's size), \`vw\`/\`vh\` (relative to the viewport).

\`\`\`css
html { font-size: 16px; }
.card { padding: 1.5rem; }   /* always 24px, regardless of nesting */
.card p { font-size: 1.2em; } /* 1.2 x the parent paragraph's font-size */
\`\`\`

## Typography

Key properties: \`font-family\` (with fallbacks), \`font-size\`, \`font-weight\`, \`font-style\`, \`line-height\` (unitless values like \`1.5\` scale with font size and are preferred over fixed units), \`letter-spacing\`, and \`text-align\`.

Using \`rem\` for font sizes and spacing, combined with a comfortable \`line-height\` around 1.4–1.6 for body text, is a reliable baseline for readable, accessible typography that respects a user's browser zoom and font size preferences.`,
    example: {
      code: `html {
  font-size: 16px;
}

body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #1a1a1a;
  line-height: 1.5;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: hsl(210, 80%, 30%);
}

p {
  font-size: 1rem;
  margin-bottom: 1em;
}

.badge {
  background-color: rgba(0, 128, 0, 0.15);
  color: rgb(0, 100, 0);
  padding: 0.25em 0.75em;
  border-radius: 999px;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.article {
  font-family: Georgia, serif;
  font-size: 16px;
  /* line-height is missing; the text below looks cramped */
}

.article__lead {
  color: #555;
  /* make this slightly larger than the body text using rem */
}`,
      instructions: 'Add `line-height: 1.6;` to `.article` for readable spacing between lines, then give `.article__lead` a `font-size: 1.25rem;` so the lead paragraph stands out from the body text.',
      previewHtml: `<article class="article">
  <p class="article__lead">A short introduction that should be a bit larger than the rest of the text.</p>
  <p>The main body of the article continues here with several lines of text so line-height differences are visible when you read down the paragraph.</p>
</article>`,
    },
    quiz: [
    { question: 'What does the `rem` unit measure relative to?', choices: ['The current element\'s own font size', 'The root (html) element\'s font size', 'The parent element\'s width', 'The viewport height'], correctIndex: 1 },
    { question: 'Why can `em` units be tricky in deeply nested elements?', choices: ['They are not supported in most browsers', 'They only apply to colors, not sizes', 'They always equal exactly 16px', 'They compound because each em is relative to its own element\'s font size'], correctIndex: 3 },
    { question: 'Which color notation lets you directly control hue, saturation, and lightness?', choices: ['hex', 'hsl()', 'rgb()', 'keyword'], correctIndex: 1 },
    { question: 'What is a benefit of using a unitless value (e.g. `1.5`) for `line-height`?', choices: ['It scales proportionally with the element\'s own font-size, avoiding fixed-size mismatches', 'It disables text wrapping', 'It forces all text to the same size', 'It only works with rem-based font sizes'], correctIndex: 0 },
    { question: 'Which unit is relative to the size of the browser viewport?', choices: ['em', 'rem', '%', 'vh'], correctIndex: 3 },
  ],
  },
  {
    id: 'css-04-display-positioning',
    title: 'Display & Positioning',
    explanation: `The \`display\` property controls how an element participates in layout, and \`position\` controls how it can be offset from its normal place.

## Display values

- \`block\`: takes the full available width, starts on a new line (\`div\`, \`p\`, \`h1\`).
- \`inline\`: flows within text, ignores \`width\`/\`height\` and vertical margin (\`span\`, \`a\`).
- \`inline-block\`: flows like inline but respects \`width\`/\`height\`/margin.
- \`none\`: removes the element from layout entirely (it takes up no space).
- \`flex\` and \`grid\`: turn the element into a layout container for its children (covered in later lessons).

## Positioning

- \`static\`: the default; the element follows normal document flow and \`top\`/\`left\`/etc. have no effect.
- \`relative\`: stays in normal flow, but \`top\`/\`right\`/\`bottom\`/\`left\` offset it *from where it would otherwise be*, without affecting other elements.
- \`absolute\`: removed from normal flow and positioned relative to the nearest ancestor with a \`position\` other than \`static\` (or the viewport if none exists).
- \`fixed\`: removed from flow and positioned relative to the viewport; stays put during scrolling.
- \`sticky\`: behaves like \`relative\` until a scroll threshold (e.g. \`top: 0\`) is crossed, then behaves like \`fixed\` within its containing block.

\`\`\`css
.dropdown {
  position: relative; /* becomes the positioning context */
}
.dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
}
\`\`\`

A common pattern is a "positioning context": give a parent \`position: relative\` so an absolutely positioned child anchors to it instead of the whole page.`,
    example: {
      code: `.navbar {
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: none;
}

.tooltip-wrapper:hover .tooltip {
  display: block;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
}

.visually-hidden {
  display: none;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.card {
  position: relative;
  padding: 20px;
  border: 1px solid #ddd;
}

.card__ribbon {
  /* should sit in the top-right corner of the card, not the page */
  background-color: crimson;
  color: white;
  padding: 4px 10px;
  font-size: 0.8rem;
}`,
      instructions: 'Give `.card__ribbon` `position: absolute;` along with `top: 0;` and `right: 0;` so it anchors to the top-right corner of `.card` (which is already `position: relative`).',
      previewHtml: `<div class="card">
  <span class="card__ribbon">New</span>
  <h2>Wireless Mouse</h2>
  <p>Ergonomic design with a rechargeable battery.</p>
</div>`,
    },
    quiz: [
    { question: 'Which display value removes an element from the page entirely, including its space?', choices: ['inline', 'block', 'none', 'inline-block'], correctIndex: 2 },
    { question: 'An element with `position: absolute` is positioned relative to what?', choices: ['The nearest ancestor with a position value other than static (or the viewport if none)', 'Its immediate parent, regardless of that parent\'s position value', 'Always the viewport, no exceptions', 'The element\'s own previous position before scrolling'], correctIndex: 0 },
    { question: 'What makes `position: sticky` different from `position: fixed`?', choices: ['Sticky elements are always removed from document flow', 'Fixed elements scroll with the page while sticky elements never move', 'Sticky acts like relative until a scroll threshold is crossed, then like fixed within its container', 'There is no difference; they are aliases'], correctIndex: 2 },
    { question: 'Which display value respects width and height while still flowing inline with surrounding text?', choices: ['block', 'inline-block', 'inline', 'none'], correctIndex: 1 },
    { question: 'Why is `position: relative` often set on a parent before absolutely positioning a child?', choices: ['It is required syntax with no functional effect', 'It disables the child\'s absolute positioning', 'It makes the parent invisible', 'It establishes a positioning context so the child anchors to that parent instead of the page'], correctIndex: 3 },
  ],
  },
  {
    id: 'css-05-flexbox',
    title: 'Flexbox',
    explanation: `Flexbox is a one-dimensional layout model for arranging items in a row or column, distributing space, and aligning content — ideal for navbars, toolbars, and card rows.

## Setting up a flex container

\`\`\`css
.list {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: space-between; /* main-axis alignment */
  align-items: center;            /* cross-axis alignment */
  gap: 12px;
}
\`\`\`

- \`flex-direction\` sets the main axis (\`row\`, \`row-reverse\`, \`column\`, \`column-reverse\`).
- \`justify-content\` distributes space along the main axis: \`flex-start\`, \`center\`, \`space-between\`, \`space-around\`, \`space-evenly\`.
- \`align-items\` aligns items along the cross axis: \`stretch\` (default), \`center\`, \`flex-start\`, \`flex-end\`, \`baseline\`.
- \`gap\` adds spacing between items without needing margin hacks.

## Sizing individual items

Each flex child can control how it grows or shrinks relative to its siblings using the shorthand \`flex: <grow> <shrink> <basis>\`:

\`\`\`css
.sidebar { flex: 0 0 200px; } /* never grow/shrink, fixed 200px basis */
.main    { flex: 1 1 0; }     /* grow and shrink to fill remaining space */
\`\`\`

\`flex-grow\` is a ratio describing how extra space is distributed; \`flex-shrink\` describes how items shrink when space is tight; \`flex-basis\` is the starting size before growing/shrinking. \`flex: 1\` is a very common shorthand meaning "grow to fill available space, ignoring content size." Flexbox items can also wrap onto new lines with \`flex-wrap: wrap\`, turning a strict single row into a responsive, wrapping row of items.`,
    example: {
      code: `.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  background-color: #222;
}

.toolbar__logo {
  flex: 0 0 auto;
  color: white;
  font-weight: bold;
}

.toolbar__links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.toolbar__spacer {
  flex: 1;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.item-list {
  display: flex;
  /* items currently stack awkwardly with no spacing or alignment */
}

.item-list__item {
  padding: 10px 16px;
  background-color: #f0f0f0;
  border-radius: 6px;
}`,
      instructions: 'On `.item-list`, set `justify-content: space-between;` to spread the items across the row, `align-items: center;` to vertically center them, and add `gap: 10px;` between items.',
      previewHtml: `<ul class="item-list">
  <li class="item-list__item">Home</li>
  <li class="item-list__item">Pricing</li>
  <li class="item-list__item">About</li>
  <li class="item-list__item">Contact</li>
</ul>`,
    },
    quiz: [
    { question: 'Which property turns an element into a flex container?', choices: ['flex-direction: row;', 'display: flex;', 'position: flex;', 'layout: flex;'], correctIndex: 1 },
    { question: 'Which property controls alignment of flex items along the main axis?', choices: ['justify-content', 'align-content', 'align-items', 'flex-wrap'], correctIndex: 0 },
    { question: 'In `flex: 1 1 0`, what does the first value (`1`) represent?', choices: ['flex-basis', 'flex-shrink', 'flex-wrap', 'flex-grow'], correctIndex: 3 },
    { question: 'What does `align-items: center;` do on a row-direction flex container?', choices: ['Centers items horizontally along the main axis', 'Adds equal space between items', 'Centers items vertically along the cross axis', 'Reverses the order of items'], correctIndex: 2 },
    { question: 'What is the effect of `flex-wrap: wrap;` on a flex container?', choices: ['It allows items to move onto new lines when they no longer fit in one row', 'It forces all items onto a single line, shrinking them to fit', 'It reverses the direction of the flex items', 'It removes the gap between items'], correctIndex: 0 },
  ],
  },
  {
    id: 'css-06-grid',
    title: 'Grid',
    explanation: `CSS Grid is a two-dimensional layout system: unlike Flexbox, it lets you control rows and columns simultaneously, making it a natural fit for page layouts, image galleries, and dashboards.

## Defining a grid

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 16px;
}
\`\`\`

The \`fr\` unit represents a fraction of the *remaining* free space in the grid container. \`grid-template-columns: 1fr 2fr\` creates two columns where the second is always twice as wide as the first, regardless of container size — far simpler than percentage math.

## Placing items

Grid items are placed automatically in source order, but you can position them explicitly:

\`\`\`css
.sidebar {
  grid-column: 1;
  grid-row: 1 / 3; /* spans from row line 1 to row line 3 */
}
.header {
  grid-column: 2 / 4;
}
\`\`\`

The \`repeat()\` function avoids repetitive declarations, and combined with \`minmax()\` and \`auto-fit\`/\`auto-fill\` it produces layouts that respond to available space without a single media query:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}
\`\`\`

This creates as many 160px-minimum columns as fit, each sharing leftover space equally — a technique impossible to replicate cleanly with Flexbox alone. Use Grid when you need alignment across both axes at once; use Flexbox for simpler one-dimensional rows or columns.`,
    example: {
      code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.gallery__item {
  background-color: #eee;
  border-radius: 8px;
  padding: 16px;
}

.page-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

.page-layout__header { grid-area: header; }
.page-layout__sidebar { grid-area: sidebar; }
.page-layout__main { grid-area: main; }
.page-layout__footer { grid-area: footer; }`,
      language: 'css',
    },
    exercise: {
      starterCode: `.card-grid {
  display: grid;
  /* only one column right now; make three equal columns with a gap */
}

.card-grid__card {
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  padding: 16px;
}`,
      instructions: 'Set `grid-template-columns: repeat(3, 1fr);` on `.card-grid` to create three equal-width columns, and add `gap: 16px;` for spacing between the cards.',
      previewHtml: `<div class="card-grid">
  <div class="card-grid__card">Card One</div>
  <div class="card-grid__card">Card Two</div>
  <div class="card-grid__card">Card Three</div>
  <div class="card-grid__card">Card Four</div>
  <div class="card-grid__card">Card Five</div>
  <div class="card-grid__card">Card Six</div>
</div>`,
    },
    quiz: [
    { question: 'What does the `fr` unit represent in a grid track definition?', choices: ['A fixed number of pixels', 'A percentage of the viewport width', 'A fraction of the remaining free space in the grid container', 'The font-relative size of the largest child'], correctIndex: 2 },
    { question: 'Which property defines an element as a two-dimensional grid container?', choices: ['display: flex;', 'display: grid;', 'grid-template: on;', 'position: grid;'], correctIndex: 1 },
    { question: 'What does `repeat(auto-fit, minmax(160px, 1fr))` achieve for `grid-template-columns`?', choices: ['Exactly one column that is always 160px wide', 'Columns that only appear on hover', 'A fixed grid of 160 columns', 'As many columns as fit, each at least 160px, sharing remaining space equally'], correctIndex: 3 },
    { question: 'When would Grid typically be preferred over Flexbox?', choices: ['When you only need to align items in a single row', 'When you need to control alignment across both rows and columns at once', 'When you need text to wrap inside a paragraph', 'Grid and Flexbox are always interchangeable with identical results'], correctIndex: 1 },
    { question: 'What does `grid-column: 2 / 4;` do to a grid item?', choices: ['Makes it span from column grid line 2 to column grid line 4', 'Places it in row 2 only', 'Hides it in columns 2 through 4', 'Sets its width to 24px'], correctIndex: 0 },
  ],
  },
  {
    id: 'css-07-responsive-media-queries',
    title: 'Responsive Design & Media Queries',
    explanation: `Responsive design means a layout adapts to different screen sizes instead of breaking or requiring horizontal scrolling. The core tool for this is the **media query**.

## Mobile-first approach

Mobile-first means writing your base (unqualified) CSS for small screens, then layering on larger-screen styles with \`min-width\` queries as the viewport grows:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr; /* single column by default (mobile) */
  gap: 16px;
}

@media (min-width: 600px) {
  .grid {
    grid-template-columns: 1fr 1fr; /* two columns on tablets+ */
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* three columns on desktop */
  }
}
\`\`\`

This approach means small-screen users — often on slower connections — only load the styles they need, and larger screens progressively get richer layouts.

## Breakpoints

Common breakpoints cluster around typical device widths (roughly 480px, 768px, 1024px, 1280px), but the best breakpoint is wherever *your* content starts to look cramped or overly sparse — not an arbitrary device width.

## min-width vs max-width

\`min-width\` queries apply styles when the viewport is *at least* that wide (mobile-first, additive). \`max-width\` queries apply when the viewport is *at most* that wide (desktop-first, subtractive). Mixing both approaches in one project usually leads to conflicting overrides, so most modern codebases pick one strategy — mobile-first with \`min-width\` — and stick to it consistently.`,
    example: {
      code: `.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero {
  padding: 24px 16px;
  font-size: 1.5rem;
}

@media (min-width: 600px) {
  .nav {
    flex-direction: row;
    justify-content: space-between;
  }

  .hero {
    padding: 48px 32px;
    font-size: 2rem;
  }
}

@media (min-width: 1024px) {
  .hero {
    padding: 80px 64px;
    font-size: 2.75rem;
  }
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.feature-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.feature-list__item {
  background-color: #f5f5f5;
  padding: 16px;
}

/* Add a media query below so screens at least 700px wide
   show two columns instead of one. */
`,
      instructions: 'Add `@media (min-width: 700px) { .feature-list { grid-template-columns: 1fr 1fr; } }` below the existing rules so the layout switches to two columns on wider screens.',
      previewHtml: `<div class="feature-list">
  <div class="feature-list__item">Fast performance</div>
  <div class="feature-list__item">Secure by default</div>
  <div class="feature-list__item">Easy to customize</div>
  <div class="feature-list__item">Great documentation</div>
</div>`,
    },
    quiz: [
    { question: 'What does "mobile-first" mean in responsive CSS?', choices: ['Only mobile devices are supported', 'The site automatically detects device type via JavaScript', 'Desktop styles are written first, then overridden for mobile', 'Base styles target small screens, with larger-screen styles added via min-width queries'], correctIndex: 3 },
    { question: 'A `@media (min-width: 768px)` block applies its styles when:', choices: ['The viewport is at most 768px wide', 'The viewport is exactly 768px wide', 'The viewport is at least 768px wide', 'The device pixel ratio is 768'], correctIndex: 2 },
    { question: 'What is generally the best way to choose a breakpoint value?', choices: ['Pick the point where your specific content starts to look cramped or sparse', 'Always use exactly 480px, 768px, and 1024px, no exceptions', 'Pick a random number to be unique', 'Breakpoints should never be customized'], correctIndex: 0 },
    { question: 'Why might mixing min-width and max-width queries throughout the same project cause problems?', choices: ['Browsers do not support max-width queries', 'max-width queries are deprecated', 'It can lead to conflicting, hard-to-predict overrides between the two strategies', 'It is not actually a problem at all'], correctIndex: 2 },
    { question: 'In a mobile-first stylesheet, where should the base (unqualified) rules typically live?', choices: ['Inside the largest media query only', 'Outside any media query, representing the smallest-screen styles', 'They should not exist; all styles must be inside media queries', 'At the very end of the file, after all media queries'], correctIndex: 1 },
  ],
  },
  {
    id: 'css-08-pseudo-classes-elements',
    title: 'Pseudo-classes & Pseudo-elements',
    explanation: `Pseudo-classes select elements based on **state or position** that isn't expressed in the HTML itself; pseudo-elements let you style a **part of an element** or generate content that isn't in the markup at all.

## Pseudo-classes (single colon)

- \`:hover\`, \`:focus\`, \`:active\` — interaction states.
- \`:first-child\`, \`:last-child\`, \`:nth-child(n)\` — positional matches within a parent.
- \`:not(selector)\` — excludes elements matching the inner selector.

\`\`\`css
li:nth-child(odd) {
  background-color: #f6f6f6;
}

button:hover {
  background-color: darkblue;
}

button:not(.disabled):focus {
  outline: 2px solid dodgerblue;
}
\`\`\`

\`:nth-child()\` accepts keywords (\`odd\`, \`even\`) or formulas like \`3n+1\` (every third element starting at the first).

## Pseudo-elements (double colon)

- \`::before\` and \`::after\` insert generated content adjacent to an element's actual content, controlled by the required \`content\` property.
- \`::first-line\` and \`::first-letter\` style the beginning of a text block.

\`\`\`css
.quote::before {
  content: open-quote;
}
.quote::after {
  content: close-quote;
}
.required::after {
  content: " *";
  color: red;
}
\`\`\`

The single-colon vs. double-colon distinction (\`:hover\` vs \`::before\`) was formalized in CSS3 to separate "state of a real element" from "a fabricated sub-part of it," though browsers still accept a single colon for the older pseudo-elements for backward compatibility.`,
    example: {
      code: `.list li:nth-child(odd) {
  background-color: #f2f2f2;
}

.list li:first-child {
  font-weight: bold;
}

.link {
  color: dodgerblue;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.link:focus {
  outline: 2px solid dodgerblue;
}

.tooltip-icon::after {
  content: " \\2139";
  color: gray;
}

.required-field::after {
  content: " *";
  color: crimson;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.task-list__item {
  padding: 8px;
}

/* add a rule so odd items get a light gray background */

.task-list__item.done {
  /* add a checkmark before completed items using ::before */
}`,
      instructions: 'Add `.task-list__item:nth-child(odd) { background-color: #f0f0f0; }` for zebra striping, and add `.task-list__item.done::before { content: "\\2713 "; color: green; }` so completed items show a checkmark.',
      previewHtml: `<ul class="task-list">
  <li class="task-list__item done">Write the report</li>
  <li class="task-list__item">Review pull requests</li>
  <li class="task-list__item done">Reply to emails</li>
  <li class="task-list__item">Plan next sprint</li>
</ul>`,
    },
    quiz: [
    { question: 'Which of these is a pseudo-class rather than a pseudo-element?', choices: ['::before', '::after', '::first-letter', ':hover'], correctIndex: 3 },
    { question: 'What CSS property is required to make `::before` or `::after` actually display content?', choices: ['display', 'content', 'visibility', 'position'], correctIndex: 1 },
    { question: 'What does `li:nth-child(odd)` select?', choices: ['li elements that are the 1st, 3rd, 5th, etc. child of their parent', 'Only the first li element', 'Every li element regardless of position', 'li elements with an odd number of characters'], correctIndex: 0 },
    { question: 'What is the main conceptual difference between pseudo-classes and pseudo-elements?', choices: ['Pseudo-classes require JavaScript to function', 'There is no difference; the terms are interchangeable', 'Pseudo-elements only work on links', 'Pseudo-classes select existing elements by state/position; pseudo-elements target a fabricated sub-part of an element'], correctIndex: 3 },
    { question: 'Which selector excludes elements that match an inner selector?', choices: ['::after', ':nth-child()', ':not()', ':first-child'], correctIndex: 2 },
  ],
  },
  {
    id: 'css-09-transitions-animations',
    title: 'Transitions & Animations',
    explanation: `CSS can animate property changes without JavaScript, using two complementary tools: **transitions** for simple state-to-state changes, and **\`@keyframes\` animations** for more complex, multi-step, or looping motion.

## Transitions

A transition smoothly interpolates a property between its old and new value whenever that value changes (e.g. on \`:hover\` or a class toggle):

\`\`\`css
.button {
  background-color: steelblue;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease;
}
.button:hover {
  background-color: darkslateblue;
  transform: translateY(-2px);
}
\`\`\`

The \`transition\` shorthand takes \`property duration timing-function delay\`. Using \`all\` for the property is convenient but can accidentally animate properties you didn't intend to — naming specific properties is usually clearer and better for performance.

## Keyframe animations

\`@keyframes\` defines a named sequence of styles at percentage points along a timeline, then \`animation\` properties apply it to an element:

\`\`\`css
@keyframes pulse {
  0%   { transform: scale(1); opacity: 1; }
  50%  { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.badge {
  animation: pulse 1.5s ease-in-out infinite;
}
\`\`\`

The \`animation\` shorthand accepts \`name duration timing-function delay iteration-count direction fill-mode\`. Unlike transitions, keyframe animations can run automatically on page load, repeat indefinitely (\`infinite\`), and define many intermediate steps — making them suited to loading spinners, attention-drawing pulses, or entrance effects, while transitions remain the simpler choice for hover/focus feedback.`,
    example: {
      code: `.button {
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.button:hover {
  background-color: #1e40af;
  transform: translateY(-2px);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #ddd;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.alert {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 6px;
  opacity: 0;
  /* add a transition so opacity change animates smoothly */
}

.alert.visible {
  opacity: 1;
}`,
      instructions: 'Add `transition: opacity 0.3s ease-in-out;` to `.alert` so that when the `.visible` class toggles opacity from 0 to 1, the change fades in smoothly instead of snapping instantly.',
      previewHtml: `<div class="card">
  <div class="alert visible">Your changes have been saved successfully.</div>
</div>`,
    },
    quiz: [
    { question: 'What triggers a CSS transition to run?', choices: ['A change in the animated property\'s value, such as from a hover or class toggle', 'The page finishing loading, always', 'Only JavaScript can trigger transitions', 'Transitions run continuously regardless of state'], correctIndex: 0 },
    { question: 'Which rule defines the intermediate steps of a multi-stage CSS animation?', choices: ['@transition', '@media', '@keyframes', '@steps'], correctIndex: 2 },
    { question: 'In `transition: background-color 0.2s ease-in-out;`, what does `0.2s` specify?', choices: ['The delay before the transition starts', 'The duration of the transition', 'The number of times it repeats', 'The timing function'], correctIndex: 1 },
    { question: 'What does `animation-iteration-count: infinite;` do?', choices: ['Runs the animation once and stops', 'Reverses the animation direction each time', 'Pauses the animation indefinitely', 'Repeats the animation forever'], correctIndex: 3 },
    { question: 'Why might naming specific properties in a `transition` (e.g. `transform`) be preferred over `transition: all;`?', choices: ['transition: all; is invalid CSS', 'Naming specific properties is clearer intent and avoids accidentally animating unintended properties', 'all only works with @keyframes', 'There is no functional difference ever'], correctIndex: 1 },
  ],
  },
  {
    id: 'css-10-transforms',
    title: 'Transforms',
    explanation: `The \`transform\` property lets you move, resize, and rotate elements visually without affecting the normal document flow — other elements behave as if the transformed element were still in its original position and size.

## Common transform functions

\`\`\`css
.el {
  transform: translate(20px, 10px); /* move right 20px, down 10px */
}
.el {
  transform: scale(1.2); /* 120% size */
}
.el {
  transform: rotate(15deg); /* rotate clockwise */
}
\`\`\`

Multiple functions can be combined in one declaration, applied left to right:

\`\`\`css
.el {
  transform: translateX(10px) rotate(5deg) scale(1.1);
}
\`\`\`

## transform-origin

By default, transforms like \`scale\` and \`rotate\` pivot around the element's center (\`50% 50%\`). \`transform-origin\` changes that pivot point:

\`\`\`css
.el {
  transform-origin: top left;
  transform: rotate(45deg); /* now rotates around the top-left corner */
}
\`\`\`

## Why use transform instead of top/left/width?

Transforms are handled by the browser's compositor and can be GPU-accelerated, making them far smoother for animation than animating \`top\`/\`left\`/\`width\`/\`height\`, which force the browser to recalculate layout on every frame. This is why \`transform\` (along with \`opacity\`) is the standard recommendation for performant hover effects and animations — combine it with \`transition\` or \`@keyframes\` for a lift, scale, or shake effect that stays smooth even on lower-powered devices.`,
    example: {
      code: `.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
}

.icon-button {
  transform-origin: center;
  transition: transform 0.15s ease;
}

.icon-button:active {
  transform: scale(0.9);
}

.ribbon {
  transform: rotate(-8deg);
  transform-origin: top left;
}

.flip-card__back {
  transform: rotateY(180deg);
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.icon-card {
  padding: 16px;
  background-color: #eef2ff;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

/* add a hover rule that lifts and slightly enlarges the card */
`,
      instructions: 'Add `.icon-card:hover { transform: translateY(-4px) scale(1.03); }` so hovering the card lifts it upward and scales it up slightly, using the existing transition for smooth motion.',
      previewHtml: `<div class="grid-of-cards">
  <div class="icon-card">Analytics</div>
  <div class="icon-card">Settings</div>
  <div class="icon-card">Messages</div>
</div>`,
    },
    quiz: [
    { question: 'Does applying `transform: translate(20px, 0);` to an element affect the layout position of surrounding elements?', choices: ['No, other elements behave as if the element never moved', 'Yes, siblings shift to fill the gap', 'Only if position: absolute is also set', 'Only in Grid layouts'], correctIndex: 0 },
    { question: 'What does `transform-origin` control?', choices: ['The color used during a transform', 'Whether the transform is 2D or 3D', 'The duration of a transform animation', 'The pivot point around which scale/rotate transforms are applied'], correctIndex: 3 },
    { question: 'Why is `transform` generally recommended over animating `top`/`left`/`width` for smooth motion?', choices: ['transform is the only property browsers support for motion', 'top/left cannot be combined with transition', 'transform can be GPU-accelerated by the compositor and avoids expensive layout recalculation', 'There is no performance difference'], correctIndex: 2 },
    { question: 'What does `scale(1.2)` do to an element?', choices: ['Enlarges it to 120% of its original size', 'Shrinks it to 12% of its size', 'Rotates it by 1.2 degrees', 'Moves it 1.2px to the right'], correctIndex: 0 },
    { question: 'In `transform: translateX(10px) rotate(5deg) scale(1.1);`, in what order are the functions applied?', choices: ['Right to left only', 'They are applied simultaneously with no defined order', 'Left to right, as written', 'Alphabetically by function name'], correctIndex: 2 },
  ],
  },
  {
    id: 'css-11-custom-properties',
    title: 'Custom Properties (CSS Variables)',
    explanation: `Custom properties, commonly called **CSS variables**, let you store a value once and reuse it throughout a stylesheet — and unlike Sass variables, they are live in the browser and can change at runtime (e.g. via JavaScript or media queries).

## Defining and using variables

A custom property name always starts with \`--\` and is read with \`var()\`:

\`\`\`css
:root {
  --primary-color: #2563eb;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
}
\`\`\`

\`:root\` targets the document's root element, making variables defined there available everywhere — a common place for a global design-token palette.

## var() with a fallback

\`var()\` accepts a second argument used if the custom property is not defined:

\`\`\`css
.badge {
  color: var(--badge-color, black);
}
\`\`\`

## Cascading and scoping

Custom properties follow the normal cascade and inherit down the DOM tree, so redefining one on a more specific selector overrides it only for that subtree:

\`\`\`css
.theme-dark {
  --primary-color: #60a5fa;
  --bg-color: #111827;
}
\`\`\`

Any element inside \`.theme-dark\` that uses \`var(--primary-color)\` picks up the new value automatically — this is the foundation of most CSS-only theme switchers (light/dark mode), since toggling a single class on a container cascades new values to every descendant that references the variable.`,
    example: {
      code: `:root {
  --primary-color: #2563eb;
  --text-color: #1f2937;
  --spacing-unit: 8px;
  --radius: 6px;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  border: none;
  border-radius: var(--radius);
}

.card {
  color: var(--text-color);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--radius);
}

.theme-dark {
  --primary-color: #60a5fa;
  --text-color: #f3f4f6;
  background-color: #111827;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `:root {
  /* define --brand-color and --card-radius here */
}

.callout {
  background-color: var(--brand-color, gray);
  border-radius: var(--card-radius, 4px);
  padding: 16px;
  color: white;
}`,
      instructions: 'Inside `:root`, add `--brand-color: #16a34a;` and `--card-radius: 10px;` so `.callout` picks up a green background with rounded corners instead of falling back to the defaults.',
      previewHtml: `<div class="callout">
  <strong>Success!</strong> Your profile has been updated.
</div>`,
    },
    quiz: [
    { question: 'How must a custom property name be written in CSS?', choices: ['Starting with $', 'Starting with --', 'Starting with @', 'Starting with #'], correctIndex: 1 },
    { question: 'Which function is used to read a custom property\'s value?', choices: ['calc()', 'env()', 'attr()', 'var()'], correctIndex: 3 },
    { question: 'What does the second argument in `var(--badge-color, black)` do?', choices: ['Sets the property name to "black"', 'Provides a fallback value used if --badge-color is not defined', 'Combines two colors together', 'It is invalid syntax'], correctIndex: 1 },
    { question: 'Why is `:root` a common place to define global custom properties?', choices: ['It targets the document root, so variables defined there are inherited everywhere', 'It is the only selector that supports custom properties', 'It disables the cascade for those properties', ':root only works with pseudo-elements'], correctIndex: 0 },
    { question: 'How does redefining a custom property inside `.theme-dark { --primary-color: #60a5fa; }` behave?', choices: ['It changes --primary-color globally for the whole document permanently', 'It has no effect unless JavaScript reads it', 'It causes a CSS syntax error since the variable was already defined', 'It only overrides the value for .theme-dark and its descendants that reference the variable'], correctIndex: 3 },
  ],
  },
  {
    id: 'css-12-advanced-selectors-combinators',
    title: 'Advanced Selectors & Combinators',
    explanation: `Combinators describe *relationships* between elements, letting you target elements based on their position relative to other elements instead of adding extra classes to everything.

## Descendant combinator (space)

Matches any element nested anywhere inside another, at any depth:

\`\`\`css
.card p {
  color: gray; /* every <p>, no matter how deeply nested inside .card */
}
\`\`\`

## Child combinator (>)

Matches only *direct* children, not deeper descendants:

\`\`\`css
.menu > li {
  border-bottom: 1px solid #eee; /* only top-level <li>, not nested submenu items */
}
\`\`\`

## Adjacent sibling combinator (+)

Matches an element immediately following another sibling with the same parent:

\`\`\`css
h2 + p {
  margin-top: 0; /* only the paragraph directly after an h2 */
}
\`\`\`

## General sibling combinator (~)

Matches *any* sibling that comes after another, not just the immediately adjacent one:

\`\`\`css
h2 ~ p {
  color: #444; /* every paragraph after an h2, at any distance */
}
\`\`\`

## Why combinators matter

Combinators let you write structural rules — "the item right after this heading," "only direct list items" — without littering your HTML with extra classes for every relationship. They do increase specificity slightly less than you might expect (combinators themselves add no specificity; only the selectors on either side count), making them a clean way to keep markup free of presentational classes.`,
    example: {
      code: `/* descendant: any .label inside .form, at any depth */
.form .label {
  font-weight: 600;
}

/* child: only direct li children of .menu */
.menu > li {
  padding: 8px 0;
}

/* adjacent sibling: paragraph immediately after a heading */
h2 + p {
  margin-top: 4px;
  color: #555;
}

/* general sibling: every paragraph after the first h2, however far */
h2 ~ p {
  font-size: 0.95rem;
}

/* combining combinators */
.article > h2 + p {
  font-style: italic;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.faq-item {
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}

/* target only the p that comes right after an h3 inside .faq-item,
   and give it a top margin of 0 */
`,
      instructions: 'Add a rule using the adjacent sibling combinator, `.faq-item h3 + p { margin-top: 0; }`, so only the paragraph immediately following an `h3` has its top margin removed.',
      previewHtml: `<div class="faq-item">
  <h3>What is your return policy?</h3>
  <p>You can return any item within 30 days of purchase.</p>
  <p>Refunds are processed within 5 business days.</p>
</div>`,
    },
    quiz: [
    { question: 'What does `.menu > li` select, compared to `.menu li`?', choices: ['They select exactly the same elements', 'Only li elements NOT inside .menu', 'Only direct child li elements of .menu, not deeper nested ones', 'Only the first li inside .menu'], correctIndex: 2 },
    { question: 'Which combinator selects an element immediately following a specific sibling?', choices: ['+ adjacent sibling combinator', '> child combinator', '(space) descendant combinator', '~ general sibling combinator'], correctIndex: 0 },
    { question: 'What does `h2 ~ p` select?', choices: ['Only the paragraph directly after an h2', 'Every paragraph inside an h2', 'Every paragraph that is a sibling appearing anywhere after an h2', 'Only paragraphs before an h2'], correctIndex: 2 },
    { question: 'What does the descendant combinator (a space) match?', choices: ['Only direct children', 'Any matching element nested at any depth inside the ancestor', 'Only siblings', 'Only elements with the same class'], correctIndex: 1 },
    { question: 'Do combinators like `>`, `+`, and `~` themselves add to selector specificity?', choices: ['Yes, each combinator adds one full specificity point', 'Combinators replace specificity entirely', 'Only the > combinator adds specificity', 'No, only the actual selectors on either side of the combinator count toward specificity'], correctIndex: 3 },
  ],
  },
  {
    id: 'css-13-css-architecture-bem',
    title: 'CSS Architecture',
    explanation: `As stylesheets grow, uncontrolled specificity and inconsistent naming turn CSS into a fragile mess where any change risks breaking something unrelated. CSS architecture is about organizing rules and naming classes so the codebase stays predictable as it scales.

## BEM naming

BEM (Block, Element, Modifier) is a naming convention that encodes structure directly into class names, using only class selectors (keeping specificity flat and equal):

\`\`\`css
/* Block: a standalone component */
.card { }

/* Element: a part of the block, separated by __ */
.card__title { }
.card__image { }

/* Modifier: a variant or state, separated by -- */
.card--featured { }
.card__title--large { }
\`\`\`

\`\`\`css
.card { border: 1px solid #ddd; padding: 16px; }
.card__title { font-size: 1.25rem; }
.card--featured { border-color: gold; box-shadow: 0 0 0 2px gold; }
\`\`\`

Because every rule targets a single class, no rule outweighs another through nesting or IDs — conflicts are resolved by source order, which is easy to reason about.

## Organizing stylesheets

Common strategies: group files by component rather than by property type, keep a small shared file of variables/resets at the top of the cascade, and avoid deep selector nesting (which recreates the same specificity problems BEM avoids).

## Avoiding specificity wars

Rules of thumb: prefer single class selectors over IDs or long descendant chains, never use \`!important\` as a first resort, and keep selectors as flat as the BEM examples above so any rule can be safely overridden by one appearing later with equal specificity.`,
    example: {
      code: `/* Block */
.button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-weight: 600;
}

/* Modifiers */
.button--primary {
  background-color: #2563eb;
  color: white;
}

.button--outline {
  background-color: transparent;
  border-color: #2563eb;
  color: #2563eb;
}

/* Element */
.button__icon {
  margin-right: 6px;
}

/* Block */
.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.card__title {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.card--featured {
  border-color: #f59e0b;
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.alert {
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid transparent;
}

/* add a BEM element class .alert__message and a BEM
   modifier class .alert--success following the pattern above */
`,
      instructions: 'Add `.alert__message { font-weight: 500; }` as a BEM element, and `.alert--success { background-color: #dcfce7; border-color: #16a34a; color: #166534; }` as a BEM modifier, matching the block/element/modifier naming pattern.',
      previewHtml: `<div class="alert alert--success">
  <span class="alert__message">Payment received successfully.</span>
</div>`,
    },
    quiz: [
    { question: 'In BEM, what does the double underscore (__) separator denote?', choices: ['A modifier of the block', 'An element that is part of a block', 'A pseudo-class', 'A media query breakpoint'], correctIndex: 1 },
    { question: 'In BEM, what does the double hyphen (--) separator denote?', choices: ['A modifier (variant or state) of a block or element', 'An element', 'A combinator', 'A CSS variable'], correctIndex: 0 },
    { question: 'Why does BEM keep specificity conflicts easy to resolve?', choices: ['Because it uses ID selectors for every rule', 'Because BEM requires !important on every rule', 'Because BEM disables the cascade entirely', 'Because every rule targets a single flat class selector, so conflicts resolve by source order'], correctIndex: 3 },
    { question: 'Which practice is a recommended way to avoid "specificity wars" in a growing codebase?', choices: ['Use ID selectors for all commonly reused components', 'Add !important to any rule that does not apply', 'Prefer flat single-class selectors over deep nesting or IDs', 'Avoid using classes altogether and rely on element tags'], correctIndex: 2 },
    { question: 'What is a benefit of grouping stylesheet organization by component rather than by property type?', choices: ['It keeps related styles for a single UI piece together, making the codebase easier to navigate and change safely', 'It reduces the number of properties CSS supports', 'It automatically minifies the CSS', 'It removes the need for class names entirely'], correctIndex: 0 },
  ],
  },
  {
    id: 'css-14-modern-css',
    title: 'Modern CSS',
    explanation: `Recent CSS features reduce the need for JavaScript or media-query sprawl to build fluid, context-aware layouts.

## clamp()

\`clamp(min, preferred, max)\` picks a value that scales fluidly between a minimum and maximum bound:

\`\`\`css
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}
\`\`\`

This heading never shrinks below \`1.5rem\` or grows past \`3rem\`, but scales smoothly with viewport width in between — a single line replacing several font-size media queries.

## min() and max()

\`min()\` picks the smallest of its arguments, \`max()\` the largest — useful for constraining sizes relative to available space:

\`\`\`css
.container {
  width: min(90%, 1200px); /* never wider than 1200px, but shrinks on small screens */
}
.sidebar {
  width: max(200px, 20%); /* never narrower than 200px */
}
\`\`\`

## Container queries

Media queries respond to the *viewport*; container queries respond to the size of a *containing element*, letting a component adapt regardless of where it's placed on the page:

\`\`\`css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 16px;
  }
}
\`\`\`

An element opts into being a "query container" via \`container-type\`, and descendants can then use \`@container\` instead of \`@media\` — genuinely component-level responsiveness, since the same \`.card\` can lay out differently in a narrow sidebar versus a wide main column without any change to the viewport.`,
    example: {
      code: `h1 {
  font-size: clamp(1.75rem, 5vw, 3.5rem);
}

.container {
  width: min(92%, 1100px);
  margin-inline: auto;
}

.sidebar {
  width: max(220px, 18%);
}

.card-wrapper {
  container-type: inline-size;
}

.card {
  display: block;
  padding: 12px;
}

@container (min-width: 380px) {
  .card {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `.page-title {
  font-size: 2rem;
  /* replace this with a fluid clamp() so it scales between
     1.5rem and 3rem across viewport widths */
}

.container {
  width: 100%;
  /* constrain to at most 960px using min() while staying
     fluid below that width */
}`,
      instructions: 'Change `.page-title` font-size to `clamp(1.5rem, 4vw, 3rem);` and change `.container` width to `min(100%, 960px);` so both scale fluidly but respect sensible bounds.',
      previewHtml: `<div class="container">
  <h1 class="page-title">Welcome to the Dashboard</h1>
  <p>This layout should stay comfortably readable at any screen width.</p>
</div>`,
    },
    quiz: [
    { question: 'What does `clamp(1rem, 3vw, 2rem)` do?', choices: ['Always renders exactly 3vw regardless of bounds', 'Picks whichever value is smallest of the three', 'Picks 3vw but never lets the value go below 1rem or above 2rem', 'Averages the three values'], correctIndex: 2 },
    { question: 'What does `width: min(90%, 1200px);` mean for an element?', choices: ['It is always exactly 1200px wide', 'Its width is the smaller of 90% of its container or 1200px', 'Its width is the larger of 90% of its container or 1200px', 'It ignores the 1200px value entirely'], correctIndex: 1 },
    { question: 'How do container queries differ from media queries?', choices: ['Container queries cannot use min-width conditions', 'Container queries only work on the html element', 'They are exactly the same feature with a different name', 'Container queries respond to the size of a containing element rather than the viewport'], correctIndex: 3 },
    { question: 'What must be set on an element before its descendants can use `@container` queries against it?', choices: ['display: grid;', 'container-type (e.g. inline-size)', 'position: sticky;', 'overflow: hidden;'], correctIndex: 1 },
    { question: 'Why are container queries especially useful for reusable components?', choices: ['They let a component adapt to its own available space, regardless of where it is placed on the page', 'They eliminate the need for CSS entirely', 'They only apply to the largest element on the page', 'They replace the need for the box model'], correctIndex: 0 },
  ],
  },
  {
    id: 'css-15-capstone-responsive-layout',
    title: 'Capstone: Responsive Card Layout',
    explanation: `This capstone combines everything from the course — the box model, Flexbox or Grid, responsive media queries, custom properties, and thoughtful class naming — into one small, realistic project: a responsive pricing layout.

## Putting it together

A typical responsive card layout follows this recipe:

1. **Box model & tokens**: define spacing and color custom properties on \`:root\`, and set \`box-sizing: border-box\` globally so padding never breaks your width math.
2. **Layout container**: use Grid (or Flexbox with \`flex-wrap\`) for the row of cards, so they naturally wrap onto new lines on narrow screens without extra code.
3. **Mobile-first breakpoints**: start with a single column, then use \`min-width\` media queries to introduce more columns as space allows.
4. **Component details**: use BEM-style classes for the card's internal structure (\`.pricing-card__title\`, \`.pricing-card__price\`), and highlight a featured card with a modifier class and a subtle \`transform\`/\`transition\` hover effect.

\`\`\`css
.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 700px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pricing-card--featured {
  border-color: var(--primary-color);
  transform: scale(1.03);
}
\`\`\`

The lesson here isn't any single property — it's that real interfaces are built by layering these tools: tokens for consistency, Grid or Flexbox for structure, media queries for adaptability, and clear naming so the stylesheet stays maintainable as the project grows beyond three cards into a full design system.`,
    example: {
      code: `:root {
  --primary-color: #2563eb;
  --text-muted: #6b7280;
  --radius: 10px;
  --spacing: 16px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing);
  padding: var(--spacing);
}

@media (min-width: 700px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pricing-card {
  border: 1px solid #e5e7eb;
  border-radius: var(--radius);
  padding: calc(var(--spacing) * 1.5);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.pricing-card--featured {
  border-color: var(--primary-color);
  transform: scale(1.03);
}

.pricing-card__title {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.pricing-card__price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 12px;
}

.pricing-card__features {
  list-style: none;
  padding: 0;
  color: var(--text-muted);
  margin-bottom: var(--spacing);
}`,
      language: 'css',
    },
    exercise: {
      starterCode: `:root {
  --primary-color: #2563eb;
  --spacing: 16px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing);
  /* add a media query below (min-width: 720px) that switches
     this to three equal columns */
}

.pricing-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.pricing-card--featured {
  /* highlight the featured card using var(--primary-color)
     for the border, and lift it slightly with transform */
}`,
      instructions: 'Add `@media (min-width: 720px) { .pricing-grid { grid-template-columns: repeat(3, 1fr); } }`, and fill in `.pricing-card--featured` with `border-color: var(--primary-color); transform: scale(1.05);` so the featured plan visually stands out.',
      previewHtml: `<div class="pricing-grid">
  <div class="pricing-card">
    <h3 class="pricing-card__title">Basic</h3>
    <p class="pricing-card__price">$9/mo</p>
    <ul class="pricing-card__features">
      <li>5 projects</li>
      <li>Email support</li>
    </ul>
    <button class="pricing-card__button">Choose plan</button>
  </div>
  <div class="pricing-card pricing-card--featured">
    <h3 class="pricing-card__title">Pro</h3>
    <p class="pricing-card__price">$29/mo</p>
    <ul class="pricing-card__features">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Team collaboration</li>
    </ul>
    <button class="pricing-card__button">Choose plan</button>
  </div>
  <div class="pricing-card">
    <h3 class="pricing-card__title">Enterprise</h3>
    <p class="pricing-card__price">$99/mo</p>
    <ul class="pricing-card__features">
      <li>Unlimited everything</li>
      <li>Dedicated manager</li>
    </ul>
    <button class="pricing-card__button">Choose plan</button>
  </div>
</div>`,
    },
    quiz: [
    { question: 'In a mobile-first responsive pricing grid, what should the base (no media query) column count typically be?', choices: ['Always exactly 3', 'It should be undefined until a media query sets it', 'Always exactly 4', 'A single column, expanding via min-width queries'], correctIndex: 3 },
    { question: 'Why define spacing and colors as custom properties on :root in a layout like this?', choices: ['Custom properties are required for Grid to work', 'It prevents the cascade from applying to child elements', 'It centralizes design values so they stay consistent and are easy to update in one place', 'It disables responsive behavior'], correctIndex: 2 },
    { question: 'Which combination of tools does this capstone layout rely on?', choices: ['Box model + Grid/Flexbox layout + media queries + custom properties + BEM naming', 'Only colors and typography, nothing else', 'Only pseudo-elements and animations', 'Only inline styles'], correctIndex: 0 },
    { question: 'What does `grid-template-columns: repeat(3, 1fr);` produce inside a media query in this layout?', choices: ['Three rows instead of columns', 'A single column three times as wide', 'Three columns of equal width once the breakpoint is reached', 'No visible change to the layout'], correctIndex: 2 },
    { question: 'Why use a `--featured` modifier class rather than duplicating all of `.pricing-card`\'s CSS for the highlighted plan?', choices: ['Duplicating styles is always required in CSS', 'A modifier class lets the featured card inherit shared styles and only override what differs, following BEM practice', 'It is not possible to override styles in CSS', 'Modifier classes disable transitions'], correctIndex: 1 },
  ],
  }
];
