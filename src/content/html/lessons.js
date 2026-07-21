export const htmlLessons = [
  {
    id: 'html-01-document-structure',
    title: 'Document Structure',
    explanation: `Every HTML page starts from the same skeleton. Before you write a single word of visible content, the browser needs to know three things: what kind of document this is, where the metadata lives, and where the visible content lives.

## The doctype

The very first line of any HTML file should be:

\`\`\`html
<!doctype html>
\`\`\`

This is not a tag — it's a declaration. It tells the browser "render this using the modern HTML5 standards mode." Without it, older browsers (and some modern ones in edge cases) fall back to "quirks mode," an old compatibility mode that mimics buggy behavior from the 1990s so ancient websites don't break. Quirks mode changes how CSS box sizing, table layout, and even some spacing rules are calculated — often in ways that are subtly wrong and hard to debug. Always include the doctype. It costs nothing and saves you from a whole class of invisible bugs.

## The three core elements

After the doctype, every document has one \`<html>\` root element containing exactly one \`<head>\` and one \`<body>\`:

\`\`\`html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Page</title>
  </head>
  <body>
    <p>Hello, world!</p>
  </body>
</html>
\`\`\`

The \`<head>\` holds information *about* the page — its title, character encoding, linked stylesheets, and other metadata. None of it is rendered directly on the page. The \`<body>\` holds everything a visitor actually sees and interacts with: text, images, buttons, forms.

The \`lang\` attribute on \`<html>\` matters more than it looks — screen readers use it to choose pronunciation rules, and browsers use it for translation prompts. Get in the habit of setting it from the start.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a complete, minimal HTML document.</p>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<html>
  <head>
  </head>
  <body>
    <h1>My Page</h1>
  </body>
</html>`,
      instructions: 'Add the missing `<!doctype html>` declaration above the `<html>` tag, add a `lang="en"` attribute to `<html>`, and add a `<title>Welcome</title>` inside the `<head>`.',
    },
    quiz: [
      { question: 'What is the purpose of `<!doctype html>`?', choices: ['It loads the HTML5 JavaScript library', 'It tells the browser to render the page in standards mode instead of quirks mode', 'It defines the page title', 'It links an external stylesheet'], correctIndex: 1 },
      { question: 'Which element contains content that is actually visible to a site visitor?', choices: ['<head>', '<meta>', '<body>', '<title>'], correctIndex: 2 },
      { question: 'What happens if you omit the doctype declaration?', choices: ['The page fails to load entirely', 'The browser may render the page in quirks mode with inconsistent legacy behavior', 'All CSS is ignored', 'JavaScript stops working'], correctIndex: 1 },
      { question: 'What does the `lang` attribute on `<html>` primarily help with?', choices: ['Setting the page background color', 'Screen reader pronunciation and browser translation features', 'Enabling JavaScript modules', 'Choosing the default font'], correctIndex: 1 },
      { question: 'How many `<body>` elements should a valid HTML document have?', choices: ['Zero or more', 'Exactly one', 'Exactly two, for header and footer content', 'As many as there are sections'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-02-text-elements',
    title: 'Text Elements & Semantic Text Markup',
    explanation: `HTML gives you a rich vocabulary for structuring and emphasizing text — far more than just "big text" and "small text." Choosing the right element communicates meaning to browsers, search engines, and assistive technology, not just visual style.

## Headings

Headings \`<h1>\` through \`<h6>\` create a hierarchical outline of your page, like a table of contents. Use exactly one \`<h1>\` per page for the main title, and nest lower levels logically:

\`\`\`html
<h1>Cooking Basics</h1>
<h2>Knife Skills</h2>
<h3>Holding the Knife</h3>
\`\`\`

Never skip levels purely for visual size — if you want smaller text, use CSS, not a lower heading tag.

## Paragraphs and emphasis

\`<p>\` wraps a block of running text. Within a paragraph, \`<strong>\` marks text of strong importance (typically rendered bold) and \`<em>\` marks stressed emphasis (typically rendered italic). These are semantic, not just visual — a screen reader will change its tone for \`<em>\` and \`<strong>\`, while purely visual tags like \`<b>\` and \`<i>\` carry no such meaning.

\`\`\`html
<p>You <strong>must</strong> preheat the oven before baking. It really <em>does</em> matter.</p>
\`\`\`

## Quotations

\`<blockquote>\` marks an extended quotation set off from the main text, often from another source, while \`<q>\` marks a short inline quotation. \`<cite>\` names the source of a quote or work.

\`\`\`html
<blockquote cite="https://example.com/article">
  <p>The best code is the code you never had to write.</p>
</blockquote>
<p>As she put it, <q>simplicity wins</q> — <cite>Ada, Lead Engineer</cite>.</p>
\`\`\`

Using the correct semantic element for text — rather than reaching for generic \`<div>\`s and CSS styling — makes your content more accessible, more consistently styleable, and easier for search engines to understand.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Text Markup Example</title>
  </head>
  <body>
    <h1>Baking Bread</h1>
    <h2>Ingredients</h2>
    <p>You will need flour, water, salt, and <strong>fresh</strong> yeast.</p>
    <h2>A Note on Patience</h2>
    <p>Bread dough needs time to rise; rushing it <em>will</em> ruin the texture.</p>
    <blockquote cite="https://example.com/bread-wisdom">
      <p>Good bread cannot be rushed, only planned for.</p>
    </blockquote>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<article>
  <h1>Why Sleep Matters</h1>
  <p>Sleep is important for the body and the mind.</p>
  <p>Experts recommend getting enough sleep every night.</p>
</article>`,
      instructions: 'Add an `<h2>` subheading before the second paragraph, wrap the word "enough" in `<strong>` to emphasize it, and add a `<blockquote>` containing a short quote about sleep after the second paragraph.',
    },
    quiz: [
      { question: 'How many `<h1>` elements should a typical page have?', choices: ['As many as there are sections', 'Exactly one', 'At least three', 'Zero — h1 is deprecated'], correctIndex: 1 },
      { question: 'What is the key difference between `<strong>` and `<b>`?', choices: ['There is no difference, they are aliases', '<strong> conveys semantic importance while <b> is purely visual styling', '<b> is only for links', '<strong> cannot be nested inside a paragraph'], correctIndex: 1 },
      { question: 'Which element is appropriate for a short quotation embedded within a sentence?', choices: ['<blockquote>', '<cite>', '<q>', '<em>'], correctIndex: 2 },
      { question: 'Why should heading levels not be skipped purely to get smaller visual text?', choices: ['Browsers will refuse to render skipped levels', 'It breaks the logical document outline used by assistive technology and SEO tools', 'Skipped headings are automatically converted to paragraphs', 'It causes JavaScript errors'], correctIndex: 1 },
      { question: 'What does `<em>` typically indicate?', choices: ['A hyperlink target', 'Stressed emphasis, often rendered in italics', 'A table cell', 'An embedded image caption'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-03-links-navigation',
    title: 'Links & Navigation',
    explanation: `Links are what make the web a *web* — without \`<a>\` elements, pages would be isolated islands. This lesson covers how to create links correctly and how to group them into navigation.

## The anchor element

The \`<a>\` (anchor) element creates a hyperlink using the \`href\` attribute:

\`\`\`html
<a href="https://example.com">Visit Example</a>
\`\`\`

## Relative vs. absolute paths

An **absolute** URL includes the full protocol and domain (\`https://example.com/about\`) and always points to the same place regardless of where the link lives. A **relative** path is resolved against the current page's location:

\`\`\`html
<!-- absolute: always points to the same external site -->
<a href="https://example.com/about">About</a>

<!-- relative: resolved against the current page's folder -->
<a href="about.html">About</a>
<a href="../images/logo.png">Logo (one folder up)</a>
<a href="/contact">Contact (root of the site)</a>
\`\`\`

Use relative paths for links within your own site — they keep working when you move the whole site to a new domain (e.g., from a staging server to production). Use absolute URLs for links to other sites.

## The target attribute

\`target="_blank"\` opens a link in a new tab. When you do this, pair it with \`rel="noopener noreferrer"\` to prevent the new page from gaining access to your original page's \`window\` object, which is a real security concern:

\`\`\`html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External site</a>
\`\`\`

## Grouping links with nav

The \`<nav>\` element marks a section of a page whose purpose is primarily navigation — main menus, tables of contents, breadcrumbs. It doesn't change how links look, but it tells assistive technology "this is a navigation landmark," letting screen reader users jump straight to it.

\`\`\`html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
\`\`\``,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Links Example</title>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Resource</a>
    </nav>
    <main>
      <h1>Welcome</h1>
      <p>Read our <a href="/blog/first-post.html">first blog post</a>.</p>
    </main>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<nav>
  <a href="/">Home</a>
  <a href="/products">Products</a>
</nav>
<main>
  <p>Check out our partner site.</p>
</main>`,
      instructions: 'Add a third link to the nav pointing to "/contact", and add a link in the paragraph to "https://partner-example.com" that opens in a new tab safely (include the correct target and rel attributes).',
    },
    quiz: [
      { question: 'Which attribute on `<a>` specifies the link destination?', choices: ['src', 'href', 'link', 'target'], correctIndex: 1 },
      { question: 'Why should `target="_blank"` be paired with `rel="noopener noreferrer"`?', choices: ['It makes the link load faster', 'It prevents the new tab from accessing the original page via window.opener, a security risk', 'It is required for the link to be clickable', 'It changes the link color'], correctIndex: 1 },
      { question: 'What is a key advantage of relative paths over absolute URLs for internal site links?', choices: ['Relative paths load faster over the network', 'Relative paths keep working automatically when the whole site moves to a new domain', 'Relative paths are required for CSS to apply', 'Absolute URLs cannot be used for internal links'], correctIndex: 1 },
      { question: 'What is the primary purpose of the `<nav>` element?', choices: ['To style links with a default blue underline', 'To mark a section of primarily navigational links as a landmark for structure and accessibility', 'To preload linked pages', 'To create a dropdown menu automatically'], correctIndex: 1 },
      { question: 'Given a page at /blog/post.html, which relative href points to /images/logo.png?', choices: ['images/logo.png', '../images/logo.png', './logo.png', '~/images/logo.png'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-04-images-media',
    title: 'Images & Media',
    explanation: `Images bring pages to life, but they must be marked up carefully to remain accessible, fast, and well-organized.

## The img element

\`<img>\` is a self-closing (void) element with two essential attributes: \`src\` (the image location) and \`alt\` (a text alternative):

\`\`\`html
<img src="cat.jpg" alt="A gray tabby cat sleeping on a windowsill" />
\`\`\`

The \`alt\` text is read aloud by screen readers and shown if the image fails to load. It should describe the *content and purpose* of the image, not just repeat "image of...". For purely decorative images that add no information, use \`alt=""\` (an empty but present attribute) so screen readers skip them entirely — never omit \`alt\` altogether.

## Figure and figcaption

When an image needs a visible caption, wrap it in \`<figure>\` with a \`<figcaption>\`. This groups the image and its caption as one semantic unit, useful for diagrams, photos, or code listings:

\`\`\`html
<figure>
  <img src="chart.png" alt="Bar chart showing sales rising from January to June" />
  <figcaption>Fig. 1 — Monthly sales, Jan–Jun 2026</figcaption>
</figure>
\`\`\`

## Responsive image basics

Two attributes help browsers render images efficiently:

- \`width\` and \`height\` (in pixels) let the browser reserve space for the image before it loads, preventing content from jumping around as the page loads (this is called "layout shift").
- \`srcset\` lets you offer multiple resolutions so the browser picks the best one for the device's screen:

\`\`\`html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  width="800"
  height="600"
  alt="Mountain landscape at sunrise"
/>
\`\`\`

Always set explicit \`width\` and \`height\` on images even when using CSS for final sizing — the browser uses them to compute the image's aspect ratio ahead of time.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Image Example</title>
  </head>
  <body>
    <h1>Our Trip</h1>
    <figure>
      <img
        src="mountain.jpg"
        srcset="mountain-400.jpg 400w, mountain-800.jpg 800w"
        sizes="(max-width: 500px) 400px, 800px"
        width="800"
        height="533"
        alt="Snow-capped mountain peak under a clear blue sky"
      />
      <figcaption>The summit at sunrise, June 2026.</figcaption>
    </figure>
    <img src="divider.png" alt="" width="600" height="20" />
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<figure>
  <img src="team-photo.jpg" />
</figure>`,
      instructions: 'Add a descriptive `alt` attribute to the image describing what it shows, add `width` and `height` attributes, and add a `<figcaption>` inside the figure captioning the photo.',
    },
    quiz: [
      { question: 'What should the `alt` attribute of a purely decorative image be set to?', choices: ['A detailed description of the decoration', 'It should be omitted entirely', 'An empty string, alt=""', 'The word "decorative"'], correctIndex: 2 },
      { question: 'What is the main purpose of the `<figcaption>` element?', choices: ['To set alternative text for screen readers', 'To provide a visible caption associated with a figure like an image', 'To define the image source', 'To resize the image responsively'], correctIndex: 1 },
      { question: 'Why should you set explicit `width` and `height` attributes on `<img>` even if CSS controls final display size?', choices: ['They are required for the alt attribute to work', 'They let the browser reserve space and avoid layout shift while the image loads', 'They compress the image file automatically', 'They are ignored by all modern browsers'], correctIndex: 1 },
      { question: 'What does the `srcset` attribute allow a browser to do?', choices: ['Load multiple images simultaneously and display them in a slideshow', 'Choose the most appropriate image resolution for the device from a set of options', 'Apply CSS filters to an image', 'Cache images offline permanently'], correctIndex: 1 },
      { question: 'Good alt text for a photo of a golden retriever catching a frisbee should:', choices: ['Just say "image"', 'Repeat the filename exactly', 'Describe the meaningful content, e.g. "A golden retriever leaping to catch a red frisbee"', 'Be left blank because photos are self-explanatory'], correctIndex: 2 },
    ],
  },
  {
    id: 'html-05-lists',
    title: 'Lists',
    explanation: `Lists organize related items, and HTML gives you three kinds depending on what you're expressing.

## Unordered lists

\`<ul>\` (unordered list) is for items where order doesn't matter — typically rendered with bullet points. Each item goes in an \`<li>\` (list item):

\`\`\`html
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>
\`\`\`

## Ordered lists

\`<ol>\` (ordered list) is for items where sequence matters — steps in a recipe, ranking results — and renders with numbers by default:

\`\`\`html
<ol>
  <li>Preheat the oven to 350°F.</li>
  <li>Mix the dry ingredients.</li>
  <li>Fold in the wet ingredients.</li>
</ol>
\`\`\`

## Nesting lists

Lists can be nested by placing a whole \`<ul>\` or \`<ol>\` inside an \`<li>\`:

\`\`\`html
<ul>
  <li>Fruit
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>
\`\`\`

## Description lists

\`<dl>\` (description list) pairs terms with their definitions or descriptions, using \`<dt>\` (term) and \`<dd>\` (description). It's ideal for glossaries, metadata, or key-value pairs:

\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>The markup language used to structure web pages.</dd>
  <dt>CSS</dt>
  <dd>The language used to style web pages.</dd>
</dl>
\`\`\`

Choosing the right list type is a semantic decision, not just a visual one — screen readers announce "list with 3 items" for \`<ul>\`/\`<ol>\`, helping users understand the structure of the content before they dive in.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Lists Example</title>
  </head>
  <body>
    <h1>Weekend Plan</h1>
    <h2>Shopping List</h2>
    <ul>
      <li>Fruit
        <ul>
          <li>Apples</li>
          <li>Oranges</li>
        </ul>
      </li>
      <li>Bread</li>
    </ul>
    <h2>Steps to Make Pancakes</h2>
    <ol>
      <li>Mix flour, milk, and eggs.</li>
      <li>Heat the pan.</li>
      <li>Pour batter and flip when bubbly.</li>
    </ol>
    <h2>Glossary</h2>
    <dl>
      <dt>Batter</dt>
      <dd>A mixture of flour, liquid, and eggs used in baking.</dd>
    </dl>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<h2>Morning Routine</h2>
<ul>
  <li>Wake up</li>
  <li>Brush teeth</li>
  <li>Eat breakfast</li>
</ul>`,
      instructions: 'Change the `<ul>` to an `<ol>` since these steps happen in a specific order, and add a nested `<ul>` inside the "Eat breakfast" item listing two breakfast options.',
    },
    quiz: [
      { question: 'Which list type should you use for a set of numbered, sequential steps?', choices: ['<ul>', '<ol>', '<dl>', '<nav>'], correctIndex: 1 },
      { question: 'How do you correctly nest a list inside another list?', choices: ['Place the inner <ul> directly as a sibling of the outer <ul>', 'Place the inner <ul> inside one of the outer list\'s <li> elements', 'Use the nested="true" attribute', 'Nested lists are not allowed in HTML'], correctIndex: 1 },
      { question: 'What are `<dt>` and `<dd>` used for?', choices: ['Defining table headers and data cells', 'Pairing a term with its definition inside a description list', 'Marking the start and end of a document', 'Creating dropdown menus'], correctIndex: 1 },
      { question: 'Which element wraps each item within a `<ul>` or `<ol>`?', choices: ['<item>', '<li>', '<dd>', '<td>'], correctIndex: 1 },
      { question: 'What is the best use case for `<dl>`?', choices: ['A numbered set of cooking steps', 'A glossary of terms and their meanings', 'A bulleted shopping list', 'A grid of images'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-06-tables',
    title: 'Tables',
    explanation: `Tables display data organized into rows and columns — think spreadsheets, schedules, or comparison charts. They are a common source of confusion because they were misused for page *layout* in the 1990s and early 2000s; today, tables should be reserved strictly for tabular data.

## Basic structure

A table is built from \`<table>\`, rows (\`<tr>\`), and cells. Cells are either header cells (\`<th>\`) or data cells (\`<td>\`):

\`\`\`html
<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Amina</td>
    <td>92</td>
  </tr>
</table>
\`\`\`

## Grouping with thead and tbody

For anything beyond a trivial table, wrap the header row in \`<thead>\` and the data rows in \`<tbody>\`. This groups related rows semantically and lets you style header and body sections independently:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Amina</td>
      <td>92</td>
    </tr>
    <tr>
      <td>Diego</td>
      <td>88</td>
    </tr>
  </tbody>
</table>
\`\`\`

The \`scope\` attribute on \`<th>\` (\`scope="col"\` or \`scope="row"\`) tells assistive technology which cells a header applies to, which matters a lot for screen reader users navigating data cell by cell.

## When tables are (and aren't) appropriate

Use a table when your data genuinely has rows and columns — a pricing comparison, a sports schedule, exam results. Do **not** use a table to arrange a page's visual layout (navigation bars, multi-column articles) — that is CSS's job (flexbox, grid). Misusing tables for layout confuses screen readers, which announce "table with N rows and columns" and try to navigate it as data, not as a page skeleton.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Table Example</title>
  </head>
  <body>
    <h1>Quarterly Sales</h1>
    <table>
      <thead>
        <tr>
          <th scope="col">Quarter</th>
          <th scope="col">Revenue</th>
          <th scope="col">Growth</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q1</td>
          <td>$120,000</td>
          <td>+4%</td>
        </tr>
        <tr>
          <td>Q2</td>
          <td>$135,000</td>
          <td>+12%</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<table>
  <tr>
    <td>Name</td>
    <td>Age</td>
  </tr>
  <tr>
    <td>Rosa</td>
    <td>34</td>
  </tr>
</table>`,
      instructions: 'Change the first row\'s `<td>` cells to `<th>` cells with `scope="col"` since they are column headers, then wrap the header row in a `<thead>` and the data row in a `<tbody>`.',
    },
    quiz: [
      { question: 'Which element should wrap the header row(s) of a table?', choices: ['<tfoot>', '<thead>', '<theader>', '<th-group>'], correctIndex: 1 },
      { question: 'What does the `scope="col"` attribute on a `<th>` communicate?', choices: ['That the column should be sorted alphabetically', 'That this header cell applies to the entire column beneath it, aiding screen reader navigation', 'That the column is collapsible', 'That the cell contains numeric data'], correctIndex: 1 },
      { question: 'Why is it now discouraged to use `<table>` elements purely for page layout?', choices: ['Tables cannot contain images', 'It confuses assistive technology, which interprets layout tables as tabular data', 'Browsers no longer render <table> elements', 'Tables are slower to parse than divs'], correctIndex: 1 },
      { question: 'Which element represents a single row in a table?', choices: ['<td>', '<tr>', '<th>', '<row>'], correctIndex: 1 },
      { question: 'When is using a `<table>` most appropriate?', choices: ['For arranging a three-column article layout', 'For displaying genuinely tabular data like a comparison chart or schedule', 'For creating a navigation menu', 'For centering a page\'s content'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-07-forms-inputs',
    title: 'Forms & Inputs',
    explanation: `Forms let users send data — search queries, sign-up details, comments — back to a server (or, in a frontend-only app, to JavaScript). Understanding the building blocks is essential for anything interactive.

## The form element

\`<form>\` wraps all the controls of a single submission unit:

\`\`\`html
<form action="/submit" method="post">
  <!-- inputs go here -->
</form>
\`\`\`

## Inputs and their types

\`<input>\` is a versatile, self-closing element whose behavior changes based on its \`type\` attribute:

\`\`\`html
<input type="text" name="username" />
<input type="email" name="email" />
<input type="password" name="password" />
<input type="checkbox" name="subscribe" />
<input type="radio" name="plan" value="basic" />
<input type="date" name="birthday" />
\`\`\`

Using the right type isn't cosmetic: \`type="email"\` triggers built-in browser validation and a suitable mobile keyboard; \`type="date"\` gives a native date picker.

## Labels

Every input needs an associated \`<label>\` so users know what it's for — and so screen readers announce it correctly, and so clicking the label text focuses the input. Connect them with a matching \`for\`/\`id\` pair:

\`\`\`html
<label for="email">Email address</label>
<input type="email" id="email" name="email" />
\`\`\`

## Select, textarea, and button

\`<select>\` creates a dropdown of \`<option>\`s; \`<textarea>\` is a multi-line text box; \`<button>\` triggers form actions (\`type="submit"\` submits the form, \`type="button"\` does nothing on its own and is meant for custom JavaScript behavior):

\`\`\`html
<label for="topic">Topic</label>
<select id="topic" name="topic">
  <option value="support">Support</option>
  <option value="sales">Sales</option>
</select>

<label for="message">Message</label>
<textarea id="message" name="message" rows="4"></textarea>

<button type="submit">Send</button>
\`\`\``,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Contact Form</title>
  </head>
  <body>
    <form action="/submit" method="post">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />

      <label for="topic">Topic</label>
      <select id="topic" name="topic">
        <option value="general">General</option>
        <option value="support">Support</option>
      </select>

      <label for="message">Message</label>
      <textarea id="message" name="message" rows="4"></textarea>

      <button type="submit">Send Message</button>
    </form>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<form action="/subscribe" method="post">
  <input type="text" id="email" name="email" />
  <button type="submit">Subscribe</button>
</form>`,
      instructions: 'Change the input type to "email" since it collects an email address, and add a `<label>` with `for="email"` before the input so it is properly associated.',
    },
    quiz: [
      { question: 'What is the purpose of the `for` attribute on a `<label>`?', choices: ['It sets the default value of the input', 'It associates the label with a specific input via matching id, improving accessibility and click behavior', 'It defines which server processes the form', 'It hides the label visually'], correctIndex: 1 },
      { question: 'Which input type provides built-in email format validation and a mobile-optimized keyboard?', choices: ['type="text"', 'type="email"', 'type="search"', 'type="string"'], correctIndex: 1 },
      { question: 'What does `<button type="submit">` do inside a form?', choices: ['Resets all fields to their default values', 'Submits the form data', 'Deletes the form from the page', 'Opens a new browser tab'], correctIndex: 1 },
      { question: 'Which element is best for collecting multi-line free text like a comment?', choices: ['<input type="text">', '<select>', '<textarea>', '<label>'], correctIndex: 2 },
      { question: 'What does the `action` attribute on a `<form>` specify?', choices: ['The CSS class applied to the form', 'The URL where the form data will be submitted', 'The name of the form for JavaScript', 'The maximum number of fields allowed'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-08-semantic-html5-accessibility',
    title: 'Semantic HTML5 & Accessibility Basics',
    explanation: `HTML5 introduced a set of elements that describe the *role* a section of a page plays, rather than being generic containers. Using them correctly makes pages easier to understand for both machines (search engines, assistive tech) and other developers reading your code.

## The core landmarks

\`\`\`html
<header>...</header>   <!-- introductory content, often a logo and nav -->
<nav>...</nav>         <!-- navigation links -->
<main>...</main>       <!-- the primary, unique content of the page -->
<section>...</section> <!-- a thematic grouping of content, usually with a heading -->
<article>...</article> <!-- self-contained content that could stand alone, e.g. a blog post -->
<aside>...</aside>     <!-- content tangentially related to the main content, e.g. a sidebar -->
<footer>...</footer>   <!-- closing content, often copyright and secondary links -->
\`\`\`

A typical page layout:

\`\`\`html
<body>
  <header>
    <h1>My Blog</h1>
    <nav>...</nav>
  </header>
  <main>
    <article>
      <h2>My First Post</h2>
      <p>...</p>
    </article>
    <aside>
      <h3>Related Posts</h3>
    </aside>
  </main>
  <footer>
    <p>&copy; 2026</p>
  </footer>
</body>
\`\`\`

## Section vs. article

\`<section>\` groups related content under a heading — think of a chapter. \`<article>\` is content that would make sense extracted and republished on its own — a blog post, a news story, a product card. A page can nest an \`<article>\` inside a \`<section>\`, or vice versa, depending on what makes sense.

## Why semantics matter for accessibility

Screen readers build a "landmarks" list from these elements, letting users jump directly to \`<nav>\`, \`<main>\`, or \`<footer>\` without tabbing through every link on the page. Search engines also weight content inside \`<main>\` and \`<article>\` more heavily when determining what a page is "about." Using \`<div>\` everywhere throws all of this away — it's not that divs are wrong, it's that they carry zero meaning.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Semantic Layout</title>
  </head>
  <body>
    <header>
      <h1>Daily Tech News</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/archive">Archive</a>
      </nav>
    </header>
    <main>
      <article>
        <h2>New Browser Release</h2>
        <p>The latest browser update improves rendering speed.</p>
      </article>
      <aside>
        <h3>Trending</h3>
        <p>Read our most popular story this week.</p>
      </aside>
    </main>
    <footer>
      <p>&copy; 2026 Daily Tech News</p>
    </footer>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<div class="top">
  <h1>My Portfolio</h1>
</div>
<div class="content">
  <h2>About Me</h2>
  <p>I build websites.</p>
</div>
<div class="bottom">
  <p>Contact me at hello@example.com</p>
</div>`,
      instructions: 'Replace the three `<div>` wrappers with the appropriate semantic elements: `<header>` for the top, `<main>` for the content, and `<footer>` for the bottom.',
    },
    quiz: [
      { question: 'What distinguishes `<article>` from `<section>`?', choices: ['There is no functional difference', '<article> is content that could stand alone and be redistributed independently, like a blog post', '<section> can only contain images', '<article> cannot contain headings'], correctIndex: 1 },
      { question: 'How do screen readers benefit from semantic elements like <nav>, <main>, and <footer>?', choices: ['They make text render in bold automatically', 'They create a landmarks list letting users jump directly to key sections', 'They disable JavaScript on the page', 'They automatically translate content'], correctIndex: 1 },
      { question: 'Which element should wrap the primary, unique content of a page (excluding repeated headers/footers)?', choices: ['<aside>', '<main>', '<section>', '<div>'], correctIndex: 1 },
      { question: 'What kind of content belongs in `<aside>`?', choices: ['The single most important paragraph on the page', 'Content tangentially related to the main content, like a sidebar', 'The page\'s primary navigation', 'The document\'s metadata'], correctIndex: 1 },
      { question: 'Why might using `<div>` for every section of a page be a missed opportunity?', choices: ['Divs are invalid HTML', 'Divs carry no semantic meaning, so accessibility tools and search engines get no structural information', 'Divs cannot contain text', 'Divs are only allowed inside <body>'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-09-divs-spans-box-concept',
    title: 'Divs, Spans & the Box Concept',
    explanation: `Not everything on a page has an obvious semantic role. Sometimes you just need a generic container to group elements for styling or layout purposes — that's what \`<div>\` and \`<span>\` are for.

## Block vs. inline: the two generic containers

\`<div>\` is a **block-level** generic container — it starts on a new line and takes up the full available width by default. \`<span>\` is an **inline** generic container — it flows within a line of text, only as wide as its content.

\`\`\`html
<div class="card">
  <p>This whole card is a block-level box.</p>
</div>

<p>The price is <span class="highlight">$19.99</span> today only.</p>
\`\`\`

## Why every element is a "box"

Every HTML element — whether it's a \`<p>\`, an \`<img>\`, or a \`<div>\` — is rendered as a rectangular box for layout purposes. This is the foundation of CSS's "box model": each box has content, padding, a border, and margin. \`<div>\` and \`<span>\` are the purest expression of this — boxes with no inherent meaning, existing purely to be styled or positioned via CSS classes.

## When to use div/span vs. a semantic element

Reach for a semantic element first: if you're building navigation, use \`<nav>\`; if it's a self-contained article, use \`<article>\`. Use \`<div>\` or \`<span>\` only when **no semantic element fits** — usually for purely visual grouping like a card layout, a flex/grid wrapper, or wrapping a few words to apply a CSS class:

\`\`\`html
<article>
  <h2>Product Review</h2>
  <div class="rating-badge">4.5 <span class="stars">★★★★☆</span></div>
  <p>Solid build quality for the price.</p>
</article>
\`\`\`

Here, \`<article>\` correctly marks the review as semantic content, while \`<div class="rating-badge">\` and \`<span class="stars">\` are purely presentational groupings with no better semantic fit.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Divs and Spans</title>
  </head>
  <body>
    <div class="page-wrapper">
      <article>
        <h1>Weather Update</h1>
        <p>Today's forecast: <span class="temp">72&deg;F</span>, mostly sunny.</p>
      </article>
      <div class="card">
        <p>Sponsored content goes here.</p>
      </div>
    </div>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<p>Total: $45.00 <!-- highlight this amount --></p>
<!-- wrap the two boxes below together for a flex layout -->
<p class="box-one">Box One</p>
<p class="box-two">Box Two</p>`,
      instructions: 'Wrap the "$45.00" text in a `<span class="amount">` to allow styling it inline, and wrap both `<p>` "box" elements together in a `<div class="flex-row">` for layout purposes.',
    },
    quiz: [
      { question: 'What is the fundamental difference between `<div>` and `<span>`?', choices: ['<div> is inline and <span> is block-level', '<div> is a block-level container and <span> is an inline container', 'They are functionally identical', '<span> can only be used inside forms'], correctIndex: 1 },
      { question: 'When should you reach for `<div>` instead of a semantic element like `<article>` or `<nav>`?', choices: ['Always, since divs are simpler', 'Only when no semantic element fits the content\'s purpose, typically for pure visual/layout grouping', 'Never, div is deprecated', 'Only inside the <head>'], correctIndex: 1 },
      { question: 'In the CSS box model, what does every HTML element get treated as?', choices: ['A circle', 'A rectangular box with content, padding, border, and margin', 'A table cell', 'A form control'], correctIndex: 1 },
      { question: 'Which is a typical, appropriate use of `<span>`?', choices: ['Wrapping an entire page section', 'Wrapping a few words within a paragraph to apply a specific style', 'Defining the page title', 'Creating a new navigation landmark'], correctIndex: 1 },
      { question: 'Does `<span>` start on a new line by default?', choices: ['Yes, always', 'No, it flows inline with surrounding text', 'Only inside a <div>', 'Only if given a class'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-10-metadata-head-seo',
    title: 'Metadata, Head & SEO Basics',
    explanation: `The \`<head>\` is invisible to visitors but critical to how browsers, search engines, and social platforms understand your page.

## Charset and viewport

Two \`<meta>\` tags should appear in nearly every page:

\`\`\`html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\`\`\`

\`charset="UTF-8"\` tells the browser how to decode the bytes of the file into text, supporting virtually every character and emoji in existence. Without it, special characters can render as garbled symbols. The \`viewport\` meta tag tells mobile browsers to use the device's actual width rather than pretending to be a wide desktop screen — without it, your responsive CSS won't behave correctly on phones.

## Title and description

\`<title>\` sets the text shown in the browser tab and, critically, is usually the clickable headline in search results:

\`\`\`html
<title>Fresh Bread Recipes | The Baking Blog</title>
\`\`\`

The description meta tag supplies the short snippet search engines often show beneath the title:

\`\`\`html
<meta name="description" content="Simple, tested bread recipes for beginners, from sourdough to focaccia." />
\`\`\`

Keep titles under about 60 characters and descriptions under about 160 — search engines truncate longer ones.

## Putting it together

\`\`\`html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fresh Bread Recipes | The Baking Blog</title>
  <meta name="description" content="Simple, tested bread recipes for beginners." />
  <link rel="icon" href="/favicon.ico" />
</head>
\`\`\`

Good metadata costs a few lines but has an outsized effect: it determines how your page looks in a Google search result, how it previews when shared, and whether it even renders correctly on a phone.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Baking Blog | Fresh Bread Recipes</title>
    <meta name="description" content="Tested, beginner-friendly bread recipes from sourdough to focaccia." />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <h1>Welcome to the Baking Blog</h1>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<head>
  <title>My Site</title>
</head>
<body>
  <h1>My Site</h1>
</body>`,
      instructions: 'Add a `<meta charset="UTF-8" />` tag and a viewport meta tag for responsive design at the top of `<head>`, and add a `<meta name="description">` tag describing the site in one sentence.',
    },
    quiz: [
      { question: 'What does the viewport meta tag primarily control?', choices: ['The page\'s color scheme', 'How the page scales and sizes itself on mobile device screens', 'The character encoding of the document', 'Which fonts are loaded'], correctIndex: 1 },
      { question: 'Why is `<meta charset="UTF-8" />` important?', choices: ['It compresses images automatically', 'It tells the browser how to correctly decode text characters, avoiding garbled symbols', 'It enables JavaScript modules', 'It sets the page background color'], correctIndex: 1 },
      { question: 'Where is the content of `<title>` typically displayed?', choices: ['Only in the page footer', 'In the browser tab and as the clickable headline in search engine results', 'Nowhere visible, it is purely internal', 'In the body as a heading'], correctIndex: 1 },
      { question: 'What is the purpose of the `<meta name="description">` tag?', choices: ['It sets keyboard shortcuts for the page', 'It provides a short summary often shown beneath the title in search results', 'It links an external stylesheet', 'It defines the page\'s primary language'], correctIndex: 1 },
      { question: 'Roughly how long should a meta description be to avoid truncation in search results?', choices: ['Around 10 characters', 'Around 160 characters', 'Around 2000 characters', 'There is no practical limit'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-11-embedding-media',
    title: 'Embedding Media',
    explanation: `Beyond static images, HTML lets you embed audio, video, and entire external documents directly into a page.

## Video and audio

The \`<video>\` and \`<audio>\` elements support native playback without any plugins. Provide the \`controls\` attribute so users get play/pause/volume controls, and always give a fallback message for browsers that somehow can't render the element:

\`\`\`html
<video controls width="640" height="360" poster="thumbnail.jpg">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>

<audio controls>
  <source src="podcast.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
\`\`\`

Multiple \`<source>\` elements let the browser pick whichever format it supports, falling back in order.

## Embedding other pages with iframe

\`<iframe>\` embeds an entire separate HTML document inside the current page — commonly used for maps, videos hosted on other platforms, or payment widgets:

\`\`\`html
<iframe
  src="https://www.example.com/embed/map"
  width="600"
  height="450"
  title="Map showing office location"
  loading="lazy"
></iframe>
\`\`\`

Always give an \`<iframe>\` a descriptive \`title\` attribute — screen readers announce it so users know what the embedded frame contains before deciding whether to explore it. Use \`loading="lazy"\` so off-screen iframes don't slow down the initial page load.

## A note on third-party embeds

When embedding third-party content (a YouTube video, a tweet, a map), you're trusting that external site's code and behavior runs inside your page. Only embed sources you trust, and be aware iframes can carry their own cookies and tracking — that's why sensitive pages sometimes restrict iframe permissions with the \`sandbox\` attribute.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Embedded Media</title>
  </head>
  <body>
    <h1>Trip Recap</h1>
    <video controls width="640" height="360" poster="thumb.jpg">
      <source src="trip.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <h2>Podcast Episode</h2>
    <audio controls>
      <source src="episode1.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <h2>Location</h2>
    <iframe
      src="https://www.example.com/embed/map"
      width="600"
      height="400"
      title="Map of the campsite location"
      loading="lazy"
    ></iframe>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<h2>Watch Our Demo</h2>
<video width="640" height="360">
  <source src="demo.mp4" type="video/mp4" />
</video>

<h2>Live Chat Widget</h2>
<iframe src="https://chat.example.com/widget" width="400" height="500"></iframe>`,
      instructions: 'Add the `controls` attribute to the video so users can play/pause it, add a fallback text message inside the video element, and add a descriptive `title` attribute to the iframe.',
    },
    quiz: [
      { question: 'What does the `controls` attribute on `<video>` and `<audio>` do?', choices: ['It restricts who can view the media', 'It displays native play/pause/volume UI controls', 'It compresses the media file', 'It hides the media until clicked'], correctIndex: 1 },
      { question: 'Why should an `<iframe>` always include a `title` attribute?', choices: ['It is required for the iframe to load', 'It lets screen readers announce what the embedded content is before the user explores it', 'It sets the width of the frame', 'It disables scripts inside the frame'], correctIndex: 1 },
      { question: 'What is the purpose of providing multiple `<source>` elements inside a `<video>`?', choices: ['To play multiple videos simultaneously', 'To let the browser choose whichever format it supports, in order', 'To create a video playlist automatically', 'To increase video resolution'], correctIndex: 1 },
      { question: 'What does `loading="lazy"` on an `<iframe>` accomplish?', choices: ['It slows down video playback intentionally', 'It defers loading the iframe until it is near the viewport, improving initial page load', 'It disables the iframe entirely', 'It forces the iframe to reload every second'], correctIndex: 1 },
      { question: 'What should appear between the opening and closing `<video>` tags as a fallback?', choices: ['A duplicate <source> element only', 'Text or markup shown to browsers that cannot play the video', 'Nothing, the tags must be empty', 'A <script> tag only'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-12-data-attributes-canvas',
    title: 'HTML5 Data Attributes & Canvas Intro',
    explanation: `HTML5 added two powerful tools for going beyond static markup: custom data attributes for attaching your own information to elements, and the \`<canvas>\` element for drawing graphics programmatically.

## Custom data attributes

Any HTML element can carry custom attributes prefixed with \`data-\`. These let you attach information for JavaScript to read, without inventing non-standard attributes or hiding data in classes:

\`\`\`html
<button data-product-id="482" data-in-stock="true">Add to Cart</button>
<li data-user-id="17" data-role="admin">Priya</li>
\`\`\`

In JavaScript, these are readable through the \`dataset\` property:

\`\`\`js
const button = document.querySelector('button');
console.log(button.dataset.productId); // "482"
console.log(button.dataset.inStock);   // "true"
\`\`\`

Note the naming convention: \`data-product-id\` in HTML (kebab-case) becomes \`dataset.productId\` in JavaScript (camelCase). Data attributes are great for things like storing an ID to look up later, a state flag for CSS/JS to react to, or configuration for a small widget — without needing a database or external state.

## Introducing canvas

\`<canvas>\` is a blank rectangular drawing surface that JavaScript can paint onto pixel by pixel — used for games, charts, image editors, and animations. On its own it does nothing; you need JavaScript to get its 2D drawing context and issue drawing commands:

\`\`\`html
<canvas id="myCanvas" width="300" height="150"></canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#3776ab';
  ctx.fillRect(20, 20, 100, 80);
</script>
\`\`\`

This draws a solid blue-ish rectangle at position (20, 20) sized 100×80 pixels. Always set \`width\`/\`height\` as attributes on the \`<canvas>\` tag itself (not via CSS) to avoid blurry, stretched drawings — CSS sizing scales the already-rendered pixels, while the HTML attributes define the actual drawing resolution.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Data Attributes and Canvas</title>
  </head>
  <body>
    <ul>
      <li data-user-id="1" data-role="admin">Priya</li>
      <li data-user-id="2" data-role="member">Tomas</li>
    </ul>

    <canvas id="demoCanvas" width="200" height="100"></canvas>

    <script>
      const canvas = document.getElementById('demoCanvas');
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#e34c26';
      ctx.fillRect(10, 10, 80, 60);
    </script>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<div class="product">
  <h3>Wireless Mouse</h3>
  <button>Add to Cart</button>
</div>
<canvas></canvas>`,
      instructions: 'Add `data-product-id="205"` and `data-in-stock="true"` attributes to the button, and add `id="preview"`, `width="150"` and `height="150"` attributes to the canvas element.',
    },
    quiz: [
      { question: 'What naming convention do `data-*` attributes use in HTML versus how they appear in the JavaScript `dataset` property?', choices: ['Both use camelCase', 'HTML uses kebab-case (data-user-id), JavaScript exposes it as camelCase (dataset.userId)', 'Both use snake_case', 'HTML uses camelCase and JavaScript uses kebab-case'], correctIndex: 1 },
      { question: 'What is the main purpose of custom `data-*` attributes?', choices: ['To apply CSS styles directly', 'To attach custom information to elements that JavaScript can read via the dataset property', 'To validate form inputs automatically', 'To define a new HTML element type'], correctIndex: 1 },
      { question: 'On its own, without any JavaScript, what does a `<canvas>` element display?', choices: ['A default grid pattern', 'A blank area — canvas requires JavaScript to draw anything onto it', 'A random image', 'An error message'], correctIndex: 1 },
      { question: 'Why should canvas dimensions be set via the `width`/`height` HTML attributes rather than only CSS?', choices: ['CSS sizing is not supported on canvas at all', 'Setting only CSS size scales the rendered pixels and can cause blurry or stretched drawings', 'Attributes are required for the <canvas> tag to be valid HTML', 'JavaScript cannot access canvas without HTML-set dimensions'], correctIndex: 1 },
      { question: 'Which JavaScript call retrieves the drawing context needed to paint on a canvas?', choices: ['canvas.draw()', 'canvas.getContext("2d")', 'canvas.paint()', 'canvas.render("2d")'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-13-aria-accessibility-deep-dive',
    title: 'ARIA & Accessibility Deep Dive',
    explanation: `Semantic HTML gets you most of the way to an accessible page, but sometimes you need to go further — especially for custom interactive widgets or to clarify content when semantics alone are ambiguous. That's where ARIA (Accessible Rich Internet Applications) comes in.

## The first rule of ARIA

The golden rule: **use a native HTML element with built-in semantics before reaching for ARIA.** A real \`<button>\` already has the correct role, is keyboard-focusable, and responds to Enter/Space out of the box. A \`<div>\` styled to look like a button has none of that unless you manually add it back with ARIA and JavaScript. Only use ARIA when there's no native element that does what you need.

## aria-label and aria-labelledby

When visible text doesn't fully describe an element's purpose — like an icon-only button — \`aria-label\` supplies an accessible name that screen readers announce:

\`\`\`html
<button aria-label="Close dialog">✕</button>

<nav aria-label="Breadcrumb">
  <a href="/">Home</a> / <a href="/blog">Blog</a>
</nav>
\`\`\`

\`aria-labelledby\` instead points to the \`id\` of an existing visible element to reuse as the label.

## Roles

The \`role\` attribute tells assistive tech what an element behaves as, mainly useful for custom widgets built from generic elements:

\`\`\`html
<div role="alert">Your changes were saved.</div>
\`\`\`

\`role="alert"\` causes screen readers to announce the content immediately, useful for status messages that appear dynamically.

## Focus order and accessible forms

Keyboard users navigate with Tab, moving through focusable elements in DOM order — so your HTML's source order should match the logical reading/interaction order. Avoid positive \`tabindex\` values (like \`tabindex="5"\`) since they override natural order and create confusing jumps; \`tabindex="0"\` makes a normally non-focusable element focusable in natural order, and \`tabindex="-1"\` allows programmatic focus without adding it to the Tab sequence.

For forms, always pair inputs with \`<label>\`, and use \`aria-describedby\` to associate helper or error text:

\`\`\`html
<label for="pw">Password</label>
<input type="password" id="pw" aria-describedby="pw-hint" />
<p id="pw-hint">Must be at least 8 characters.</p>
\`\`\``,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Accessible Widget Example</title>
  </head>
  <body>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>

    <button aria-label="Close notification">✕</button>

    <div role="alert">Your profile was updated successfully.</div>

    <form>
      <label for="pw">Password</label>
      <input type="password" id="pw" aria-describedby="pw-hint" />
      <p id="pw-hint">Must be at least 8 characters.</p>
    </form>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<button>&#9776;</button>
<div>Item successfully added to cart.</div>
<label for="qty">Quantity</label>
<input type="number" id="qty" />`,
      instructions: 'Add `aria-label="Open menu"` to the icon-only button, add `role="alert"` to the confirmation div so it is announced immediately, and add `aria-describedby="qty-hint"` to the input with a matching `<p id="qty-hint">` explaining the field just after it.',
    },
    quiz: [
      { question: 'What is the golden rule of ARIA usage?', choices: ['Add ARIA attributes to every element for maximum accessibility', 'Prefer a native HTML element with built-in semantics before reaching for ARIA', 'ARIA should replace all semantic HTML', 'ARIA only works with <div> elements'], correctIndex: 1 },
      { question: 'When is `aria-label` most useful?', choices: ['On every paragraph in the document', 'When visible text does not fully describe an element\'s purpose, such as an icon-only button', 'Only on <img> elements', 'When you want to hide content from screen readers'], correctIndex: 1 },
      { question: 'What does `role="alert"` cause a screen reader to do?', choices: ['Ignore the element completely', 'Announce the element\'s content immediately when it appears', 'Play a warning sound only', 'Disable keyboard navigation'], correctIndex: 1 },
      { question: 'Why are positive `tabindex` values (like tabindex="5") generally discouraged?', choices: ['They are invalid HTML syntax', 'They override the natural DOM-order tab sequence, creating confusing jumps for keyboard users', 'They make elements invisible', 'They are only supported in Internet Explorer'], correctIndex: 1 },
      { question: 'What does `aria-describedby` do when applied to a form input?', choices: ['It submits the form automatically', 'It associates the input with additional descriptive or hint text elsewhere on the page', 'It sets the input\'s default value', 'It validates the input format'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-14-validation-best-practices',
    title: 'Validation & Best Practices',
    explanation: `Writing HTML that merely "looks right" in one browser isn't the same as writing correct, maintainable HTML. This lesson covers common mistakes and how to catch them.

## Common mistakes

**Unclosed or mismatched tags.** Browsers are forgiving and will try to auto-correct broken markup, but the result is unpredictable and can break layout in subtle ways:

\`\`\`html
<!-- Wrong: <p> never closed, <div> closed out of order -->
<div><p>Some text</div></p>

<!-- Right -->
<div><p>Some text</p></div>
\`\`\`

**Missing required attributes**, like \`alt\` on images or \`href\` on anchors meant to be links (an \`<a>\` without \`href\` isn't keyboard-focusable and isn't really a link).

**Using the wrong element for the job**, such as a \`<div>\` with a click handler instead of a real \`<button>\`, or nested \`<h1>\`s that break the document outline.

**Invalid nesting**, such as putting block-level elements like \`<div>\` inside inline elements like \`<span>\`, or placing a \`<p>\` inside another \`<p>\` (not allowed — the parser will silently close the first one for you, often not where you expect).

## Using a validator

The W3C Markup Validator (validator.w3.org) checks a page against the HTML specification and reports errors and warnings — unclosed tags, invalid attribute values, duplicate IDs, and more. Running your HTML through a validator periodically catches mistakes before they become invisible bugs that only show up in certain browsers.

## Best practices checklist

- Always include \`<!doctype html>\` and a \`lang\` attribute.
- Close all non-void elements; self-close void elements like \`<img />\` and \`<br />\` for clarity.
- Use one \`<h1>\` per page and don't skip heading levels.
- Give every \`<img>\` an \`alt\`.
- Keep IDs unique across the whole page — duplicate IDs break both CSS selectors and JavaScript's \`getElementById\`.
- Indent nested elements consistently so the structure is readable at a glance.
- Prefer semantic elements over generic \`<div>\`s wherever one fits.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Valid, Clean HTML</title>
  </head>
  <body>
    <header>
      <h1>Clean Code Matters</h1>
    </header>
    <main>
      <article>
        <h2>Why Validation Helps</h2>
        <p>
          Consistent, valid markup renders the same way across browsers
          and is far easier for teammates to maintain.
        </p>
        <img src="checklist.png" alt="A hand-drawn checklist with three checked boxes" width="300" height="200" />
      </article>
    </main>
    <footer>
      <p>&copy; 2026 Clean Code Blog</p>
    </footer>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<div>
<h1>Blog</h1>
<h3>Latest Post</h3>
<p>Check out our newest article<div>Read more</div></p>
<img src="cover.jpg">
</div>`,
      instructions: 'Fix the invalid nesting by moving the inner `<div>` outside the `<p>` (a div cannot be nested inside a p), change the `<h3>` to `<h2>` so heading levels are not skipped, and add an `alt` attribute to the image.',
    },
    quiz: [
      { question: 'What is a key risk of using mismatched or unclosed HTML tags?', choices: ['The page will never load', 'Browsers auto-correct in unpredictable ways, which can break layout inconsistently across browsers', 'CSS stops working entirely', 'JavaScript files fail to download'], correctIndex: 1 },
      { question: 'What does the W3C Markup Validator do?', choices: ['Automatically fixes all HTML errors', 'Checks a page against the HTML specification and reports errors and warnings', 'Optimizes images for faster loading', 'Converts HTML into React components'], correctIndex: 1 },
      { question: 'Why is placing a `<div>` inside a `<p>` invalid?', choices: ['<div> is a deprecated element', '<p> can only contain phrasing (inline) content, not block-level elements like <div>', 'It is actually valid and commonly used', '<p> elements cannot have any children'], correctIndex: 1 },
      { question: 'Why should IDs be unique across a page?', choices: ['Duplicate IDs are automatically renamed by the browser', 'Duplicate IDs break CSS selectors and JavaScript methods like getElementById which expect one match', 'IDs are purely decorative and have no functional impact', 'Only the last ID on the page is ever used'], correctIndex: 1 },
      { question: 'Which of these is a recommended best practice?', choices: ['Use a <div> with a click handler instead of <button> whenever convenient', 'Give every meaningful <img> a descriptive alt attribute', 'Skip heading levels to control visual size', 'Nest <h1> elements inside each other for emphasis'], correctIndex: 1 },
    ],
  },
  {
    id: 'html-15-capstone-project',
    title: 'Capstone Project — Building a Recipe Page',
    explanation: `This capstone pulls together everything from the course — document structure, semantic sectioning, text markup, lists, tables, images, forms, and accessibility — into one realistic page: a recipe page.

## Planning the structure

A well-organized recipe page typically needs:

- A \`<header>\` with the site name and \`<nav>\`.
- A \`<main>\` containing a single \`<article>\` for the recipe itself.
- A hero \`<figure>\` with an \`<img>\` and \`<figcaption>\` of the finished dish.
- An ingredients \`<ul>\` (order doesn't matter) and instructions \`<ol>\` (order matters).
- Optionally, a small \`<table>\` for nutrition facts, since that's genuinely tabular data.
- A comment or rating \`<form>\` at the bottom.
- A \`<footer>\` with copyright info.

## Combining the pieces

\`\`\`html
<article>
  <h1>Classic Tomato Soup</h1>
  <figure>
    <img src="soup.jpg" alt="A bowl of creamy tomato soup garnished with basil" width="600" height="400" />
    <figcaption>Ready in 30 minutes.</figcaption>
  </figure>

  <h2>Ingredients</h2>
  <ul>
    <li>4 ripe tomatoes</li>
    <li>1 onion, chopped</li>
  </ul>

  <h2>Instructions</h2>
  <ol>
    <li>Sauté the onion until translucent.</li>
    <li>Add tomatoes and simmer for 20 minutes.</li>
  </ol>
</article>
\`\`\`

## Why this matters

Real pages are never just one concept in isolation — a recipe page needs semantic sectioning *and* accessible images *and* well-chosen lists *and* a form, all working together without invalid nesting or missing attributes. Building one complete page is the best way to prove you can combine everything you've learned into something a real user would actually visit.`,
    example: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Classic Tomato Soup | The Baking Blog</title>
    <meta name="description" content="A simple, creamy tomato soup recipe ready in 30 minutes." />
  </head>
  <body>
    <header>
      <h1>The Baking Blog</h1>
      <nav aria-label="Primary">
        <a href="/">Home</a>
        <a href="/recipes">Recipes</a>
      </nav>
    </header>

    <main>
      <article>
        <h2>Classic Tomato Soup</h2>
        <figure>
          <img
            src="soup.jpg"
            alt="A bowl of creamy tomato soup garnished with fresh basil"
            width="600"
            height="400"
          />
          <figcaption>Ready in 30 minutes, serves 4.</figcaption>
        </figure>

        <h3>Ingredients</h3>
        <ul>
          <li>4 ripe tomatoes, chopped</li>
          <li>1 onion, diced</li>
          <li>2 cloves garlic, minced</li>
          <li>1 cup vegetable broth</li>
        </ul>

        <h3>Instructions</h3>
        <ol>
          <li>Sauté the onion and garlic until soft.</li>
          <li>Add the tomatoes and broth, then simmer for 20 minutes.</li>
          <li>Blend until smooth and season to taste.</li>
        </ol>

        <h3>Nutrition Facts (per serving)</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">Calories</th>
              <th scope="col">Protein</th>
              <th scope="col">Carbs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>120</td>
              <td>3g</td>
              <td>18g</td>
            </tr>
          </tbody>
        </table>
      </article>

      <section>
        <h3>Leave a Rating</h3>
        <form action="/reviews" method="post">
          <label for="rating">Rating (1-5)</label>
          <input type="number" id="rating" name="rating" min="1" max="5" required />

          <label for="comment">Comment</label>
          <textarea id="comment" name="comment" rows="3"></textarea>

          <button type="submit">Submit Review</button>
        </form>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 The Baking Blog</p>
    </footer>
  </body>
</html>`,
      language: 'html',
    },
    exercise: {
      starterCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Profile</title>
  </head>
  <body>
    <div>
      <h1>Alex Rivera</h1>
    </div>
    <div>
      <p>Software developer based in Denver.</p>
      <img src="avatar.jpg">
    </div>
    <div>
      <p>Contact: hello@example.com</p>
    </div>
  </body>
</html>`,
      instructions: 'Turn this into a proper semantic profile page: replace the three `<div>` wrappers with `<header>`, `<main>` (containing the bio inside an `<article>`), and `<footer>`; add an `alt` attribute to the image describing it; and add a `<ul>` inside main listing at least two skills.',
    },
    quiz: [
      { question: 'In a well-structured recipe page, which list type should hold the ingredients, and which should hold the numbered steps?', choices: ['Both should be <ol>', 'Ingredients in <ol>, steps in <ul>', 'Ingredients in <ul>, steps in <ol>', 'Both should be <dl>'], correctIndex: 2 },
      { question: 'Where should the small nutrition facts breakdown be marked up?', choices: ['As a <table>, since it is genuinely tabular data', 'As a nested <ul>', 'As a <blockquote>', 'As plain text with line breaks'], correctIndex: 0 },
      { question: 'What is the benefit of wrapping the recipe hero image in `<figure>` with a `<figcaption>`?', choices: ['It automatically compresses the image', 'It semantically groups the image with a visible caption describing it', 'It is required for images to display', 'It replaces the need for an alt attribute'], correctIndex: 1 },
      { question: 'Which element should wrap the single, self-contained recipe content within `<main>`?', choices: ['<span>', '<article>', '<aside>', '<nav>'], correctIndex: 1 },
      { question: 'Why does this capstone page include a `<form>` for ratings rather than a plain list of static text?', choices: ['Forms are required on every HTML page', 'It lets users submit new interactive input, which is exactly what form controls are designed for', 'Forms load faster than paragraphs', 'It is purely a stylistic choice with no functional reason'], correctIndex: 1 },
    ],
  },
];
