export const webjsLessons = [
  {
    "id": "webjs-01-intro-dom",
    "title": "Intro to the DOM",
    "explanation": "When a browser loads an HTML page, it does not just keep the raw text around. It parses\nthe markup and builds a live, in-memory tree of objects called the **Document Object Model**,\nor DOM. Every tag becomes a node in that tree, and JavaScript can read and change those nodes\nwhile the page is running. This is what makes pages interactive: HTML describes the initial\nstructure, and the DOM is the thing your scripts actually talk to afterward.\n\nThe entry point into this tree is the global `document` object. From `document` you can walk\ndown to any element, read its properties, or create brand new nodes and insert them. The tree\nshape mirrors the nesting of your HTML: `document.documentElement` is the `<html>` node, it\ncontains `<head>` and `<body>`, and those contain everything else.\n\n```js\nconsole.log(document.title);\nconst app = document.getElementById('app');\nconsole.log(app.nodeName); // 'DIV'\nconsole.log(app.nodeType); // 1 (an element node)\n```\n\nNodes have a `nodeType` (1 for elements, 3 for text, 9 for the document itself) and a\n`nodeName` telling you what kind of node it is. Elements additionally expose things like\n`children` (only element children), `childNodes` (every node, including whitespace text\nnodes), and `parentNode`. Understanding that the page is a tree you can navigate — not just a\nblock of text — is the foundation for everything else in this course: selecting elements,\nlistening for events, and building or removing nodes all start from this same tree.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst heading = document.createElement('h2');\nheading.textContent = 'DOM Tree Explorer';\napp.appendChild(heading);\n\nconst info = document.createElement('p');\ninfo.textContent =\n  'document.body currently has ' + document.body.children.length + ' direct child element(s).';\napp.appendChild(info);\n\nconsole.log('app node name:', app.nodeName);\nconsole.log('app node type:', app.nodeType);\nconsole.log('app parent node name:', app.parentNode.nodeName);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "// The #app container already exists on the page.\n// 1. Get a reference to it with document.getElementById.\n// 2. Create a new <p> element.\n// 3. Set its textContent to a short welcome message.\n// 4. Append it inside #app.\n\nconst app = document.getElementById('app');\n\n// your code here",
      "instructions": "Get the #app element, create a new paragraph with the text 'Hello, DOM!', and append it inside #app.",
      "previewHtml": "<div id='app'>\n  <h1>Welcome</h1>\n</div>"
    },
    "quiz": [
      {
        "question": "What does the DOM represent?",
        "choices": [
          "The CSS rules applied to a page",
          "A live, in-memory tree of objects representing the page's structure",
          "The raw HTML text as it was written in the file",
          "A snapshot of the page taken at build time that never changes"
        ],
        "correctIndex": 1
      },
      {
        "question": "Which global object is the entry point for accessing the DOM?",
        "choices": [
          "window",
          "navigator",
          "document",
          "screen"
        ],
        "correctIndex": 2
      },
      {
        "question": "What does document.getElementById('missing') return if no element with that id exists?",
        "choices": [
          "An empty object",
          "undefined",
          "It throws an error",
          "null"
        ],
        "correctIndex": 3
      },
      {
        "question": "What nodeType value does a regular element node have?",
        "choices": [
          "1",
          "0",
          "3",
          "9"
        ],
        "correctIndex": 0
      },
      {
        "question": "Which property gives only the element children of a node (skipping text nodes)?",
        "choices": [
          "childNodes",
          "children",
          "descendants",
          "innerHTML"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "webjs-02-selecting-elements",
    "title": "Selecting & Manipulating Elements",
    "explanation": "Before you can change anything on a page, you need to find it. The two workhorse methods for\nthat are `document.querySelector(selector)`, which returns the first matching element (or\n`null`), and `document.querySelectorAll(selector)`, which returns a static `NodeList` of every\nmatch. Both accept any CSS selector you already know: `.card`, `#app`, `ul > li`, `[data-id]`,\nand so on. You can also call these methods on an element itself to search only inside it.\n\n```js\nconst app = document.getElementById('app');\nconst firstItem = app.querySelector('.item');\nconst allItems = app.querySelectorAll('.item');\nallItems.forEach((item) => item.classList.add('seen'));\n```\n\nOnce you have a reference, there are two common ways to change what is shown: `textContent`\nsets or reads plain text (safe, and it escapes anything that looks like markup), while\n`innerHTML` sets or reads a chunk of HTML that the browser will parse and insert. Prefer\n`textContent` for plain text and only use `innerHTML` when you actually need to insert markup\nand you trust the source of that markup — inserting untrusted HTML is a common security bug.\n\nFor styling, `classList` is the modern way to toggle CSS classes: `classList.add('active')`,\n`classList.remove('active')`, `classList.toggle('active')`, and `classList.contains('active')`\nall work without you having to manually split and join a string of class names. Together,\n`querySelector(All)`, `textContent`/`innerHTML`, and `classList` cover the vast majority of\nday-to-day DOM reading and writing you will do.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst list = document.createElement('ul');\nlist.innerHTML = '<li>Apples</li><li>Bananas</li><li>Cherries</li>';\napp.appendChild(list);\n\nconst items = list.querySelectorAll('li');\nitems.forEach((item, index) => {\n  item.classList.add('fruit-item');\n  if (index === 1) {\n    item.classList.add('highlight');\n  }\n});\n\nconst firstItem = list.querySelector('li');\nfirstItem.textContent = firstItem.textContent + ' (fresh)';\n\nconsole.log('found', items.length, 'list items');\nconsole.log('second item highlighted:', items[1].classList.contains('highlight'));",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const taskList = document.getElementById('task-list');\nconst tasks = taskList.querySelectorAll('.task');\n\n// your code here: add the class 'done' to every task element,\n// and change the text of the first task to include ' (done)'",
      "instructions": "Select every element with class 'task' inside #task-list, add the class 'done' to each one, and update the first task's text so it ends with ' (done)'.",
      "previewHtml": "<div id='app'>\n  <ul id='task-list'>\n    <li class='task'>Buy milk</li>\n    <li class='task'>Walk dog</li>\n    <li class='task'>Read book</li>\n  </ul>\n</div>"
    },
    "quiz": [
      {
        "question": "What does document.querySelectorAll('.item') return?",
        "choices": [
          "The first matching element only",
          "A live HTMLCollection that updates automatically",
          "A static NodeList of all matching elements",
          "A single boolean indicating if any match exists"
        ],
        "correctIndex": 2
      },
      {
        "question": "Why is textContent generally safer than innerHTML for inserting plain text?",
        "choices": [
          "textContent is faster to type",
          "textContent does not parse its input as HTML, so markup-like text is not turned into elements",
          "innerHTML cannot be read, only written",
          "There is no difference between them"
        ],
        "correctIndex": 1
      },
      {
        "question": "Which classList method switches a class on if it's absent and off if it's present?",
        "choices": [
          "classList.switch()",
          "classList.flip()",
          "classList.set()",
          "classList.toggle()"
        ],
        "correctIndex": 3
      },
      {
        "question": "What does querySelector('.card') return when no element matches?",
        "choices": [
          "null",
          "An empty array",
          "undefined",
          "It throws a TypeError"
        ],
        "correctIndex": 0
      },
      {
        "question": "Calling .querySelectorAll('li') on a <ul> element (instead of on document) does what?",
        "choices": [
          "It throws, because querySelectorAll only exists on document",
          "It searches only within that <ul>'s descendants",
          "It searches the entire document regardless of the element it was called on",
          "It returns only direct children, never deeper descendants"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "webjs-03-events",
    "title": "Events & Event Listeners",
    "explanation": "Pages come alive through events: the browser fires a notification whenever something happens —\na click, a key press, a page load, a form submit — and your code can react by attaching a\n**listener**. The standard way to do this is `element.addEventListener(type, handler)`, where\n`type` is a string like `'click'`, `'input'`, `'keydown'`, or `'submit'`, and `handler` is a\nfunction that runs when the event fires.\n\n```js\nconst button = document.querySelector('#save');\nbutton.addEventListener('click', (event) => {\n  console.log('clicked!', event.type, event.target);\n});\n```\n\nThe handler receives an **event object** describing what happened. `event.type` is the event\nname, `event.target` is the exact element the event originated from, and for form-related or\ncancelable events, `event.preventDefault()` stops the browser's default behavior (like a form\nactually navigating away on submit). You can attach as many listeners as you want to the same\nelement and event type — they all run.\n\n`addEventListener` is preferred over old-style `onclick = function(){}` properties because it\nlets you register multiple handlers for the same event without overwriting each other, and it\nsupports a third options argument for things like `{ once: true }` (auto-remove after firing)\nor capturing versus bubbling phases. Removing a listener later requires\n`removeEventListener` with a reference to the *same* function you originally passed in — an\ninline arrow function you never saved a reference to cannot be removed this way.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst button = document.createElement('button');\nbutton.textContent = 'Click me';\nbutton.id = 'demo-button';\napp.appendChild(button);\n\nconst output = document.createElement('p');\noutput.id = 'demo-output';\noutput.textContent = 'Not clicked yet';\napp.appendChild(output);\n\nlet clicks = 0;\nbutton.addEventListener('click', (event) => {\n  clicks += 1;\n  output.textContent = 'Clicked ' + clicks + ' time(s). Target tag: ' + event.target.tagName;\n});\n\nbutton.dispatchEvent(new Event('click'));\nconsole.log(output.textContent);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const button = document.getElementById('increment');\nconst display = document.getElementById('count');\nlet count = 0;\n\n// your code here: add a click listener to the button that\n// increases count by 1 and updates display.textContent",
      "instructions": "Add a click event listener to the #increment button that increments the count variable by 1 and updates #count's text to show the new value.",
      "previewHtml": "<div id='app'>\n  <p id='count'>0</p>\n  <button id='increment'>+1</button>\n</div>"
    },
    "quiz": [
      {
        "question": "Which method attaches a handler function to run when an element is clicked?",
        "choices": [
          "element.addEventListener('click', fn)",
          "element.onEvent('click', fn)",
          "element.listen('click', fn)",
          "element.click(fn)"
        ],
        "correctIndex": 0
      },
      {
        "question": "What does event.target refer to inside a click handler?",
        "choices": [
          "The element the listener was attached to, always",
          "The window object",
          "The exact element that the event originated from",
          "The event type as a string"
        ],
        "correctIndex": 2
      },
      {
        "question": "What is the main advantage of addEventListener over an onclick property?",
        "choices": [
          "It runs faster in every browser",
          "It only works for click events",
          "It automatically prevents default behavior",
          "It can register multiple handlers for the same event without overwriting each other"
        ],
        "correctIndex": 3
      },
      {
        "question": "To later remove a listener with removeEventListener, what do you need?",
        "choices": [
          "Nothing, all listeners can be removed by event type alone",
          "A reference to the exact same handler function that was passed to addEventListener",
          "The element's id attribute",
          "It is not possible to remove a listener once added"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "webjs-04-event-delegation",
    "title": "Event Delegation & Bubbling",
    "explanation": "When an event fires on an element, it does not just run listeners on that element — it then\n**bubbles** upward through every ancestor, firing the same event type on each one in turn (the\ndefault 'bubbling phase'). A click on a `<li>` inside a `<ul>` inside `<body>` will trigger\nclick listeners on the `<li>`, then the `<ul>`, then `<body>`, and so on, unless something\ncalls `event.stopPropagation()` along the way.\n\nThis behavior enables a very useful pattern called **event delegation**: instead of attaching\na listener to every individual child element (which is wasteful and breaks for children added\nlater), you attach a single listener to a stable parent and inspect `event.target` to figure\nout which child was actually interacted with.\n\n```js\nconst list = document.querySelector('#todo-list');\nlist.addEventListener('click', (event) => {\n  const item = event.target.closest('.todo');\n  if (!item) return; // click landed somewhere else inside the list\n  item.remove();\n});\n```\n\n`event.target.closest(selector)` walks up from the clicked element (inclusive) looking for the\nnearest ancestor matching `selector`, which is exactly what you want when the actual click\nmight land on a nested icon or span inside a bigger clickable row. Contrast this with\n`event.currentTarget`, which is always the element the listener is attached to — useful when\nyou need to know 'whose handler is this', as opposed to 'what exactly got clicked'.\nDelegation means new children added later automatically work too, since the listener lives on\nthe parent, not on each child.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst list = document.createElement('ul');\nlist.id = 'color-list';\n['Red', 'Green', 'Blue'].forEach((color) => {\n  const li = document.createElement('li');\n  li.textContent = color;\n  li.className = 'color-item';\n  list.appendChild(li);\n});\napp.appendChild(list);\n\nconst log = document.createElement('p');\nlog.id = 'click-log';\nlog.textContent = 'No color selected';\napp.appendChild(log);\n\nlist.addEventListener('click', (event) => {\n  const item = event.target.closest('.color-item');\n  if (!item) return;\n  log.textContent = 'Selected: ' + item.textContent;\n});\n\nlist.children[1].dispatchEvent(new Event('click', { bubbles: true }));\nconsole.log(log.textContent);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const list = document.getElementById('todo-list');\n\n// your code here: add a single click listener on #todo-list that\n// checks if event.target has the class 'remove', and if so,\n// removes the closest '.todo' list item from the DOM",
      "instructions": "Attach one click listener to #todo-list. When a click lands on a '.remove' button, remove that button's closest '.todo' ancestor from the list (use event delegation, not a listener per button).",
      "previewHtml": "<div id='app'>\n  <ul id='todo-list'>\n    <li class='todo'>Read <button class='remove'>x</button></li>\n    <li class='todo'>Write <button class='remove'>x</button></li>\n    <li class='todo'>Code <button class='remove'>x</button></li>\n  </ul>\n</div>"
    },
    "quiz": [
      {
        "question": "During the default bubbling phase, how does an event travel through the DOM?",
        "choices": [
          "From the target element upward through its ancestors",
          "From document downward to the target element",
          "It only fires on the exact element clicked, never elsewhere",
          "It fires simultaneously on every element in the document"
        ],
        "correctIndex": 0
      },
      {
        "question": "What is the main benefit of event delegation?",
        "choices": [
          "It makes events fire faster",
          "One listener on a parent can handle events from many children, including ones added later",
          "It prevents all events from bubbling",
          "It removes the need for event objects"
        ],
        "correctIndex": 1
      },
      {
        "question": "What does event.target.closest('.item') return if the clicked element is a <span> nested inside a matching '.item' <li>?",
        "choices": [
          "null, because the span itself does not have the class",
          "The <span> element unchanged",
          "The nearest ancestor (including itself) that matches '.item', i.e. the <li>",
          "It throws an error since closest only works on the exact target"
        ],
        "correctIndex": 2
      },
      {
        "question": "Which method stops an event from continuing to bubble to ancestor elements?",
        "choices": [
          "event.preventDefault()",
          "event.cancel()",
          "event.remove()",
          "event.stopPropagation()"
        ],
        "correctIndex": 3
      },
      {
        "question": "In a delegated click handler on a parent element, what does event.currentTarget refer to?",
        "choices": [
          "The exact child element that was clicked",
          "Always the document object",
          "The parent element the listener is attached to",
          "Nothing, currentTarget is undefined during bubbling"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "webjs-05-forms-validation",
    "title": "Forms & Validation in JS",
    "explanation": "Forms are how pages collect input, and JavaScript typically steps in at the `submit` event to\ncheck that input before it goes anywhere. By default, submitting a `<form>` reloads or\nnavigates the page — calling `event.preventDefault()` inside a `submit` listener stops that,\nletting you handle the data yourself (validate it, send it with `fetch`, update the page, etc.)\nwithout a full page reload.\n\n```js\nconst form = document.querySelector('#signup');\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const email = form.querySelector('#email').value.trim();\n  if (!email.includes('@')) {\n    console.log('invalid email');\n    return;\n  }\n  console.log('submitting', email);\n});\n```\n\nReading input values is done through the `.value` property on the input element (a string,\neven for `type='number'` inputs — you convert it yourself with `Number()` if you need a\nnumber). Checkboxes use `.checked` (a boolean) instead of `.value`. `.value.trim()` is a common\nhabit since stray leading/trailing whitespace should rarely count as valid input.\n\nSimple validation is just regular JavaScript: check string length, use `.includes()` for a\nquick shape check, or a regular expression for something stricter. There's no requirement to\nuse any special 'validation library' — the point of this lesson is that form validation is\njust reading `.value`, writing some conditionals, and updating the page (usually by showing an\nerror message element) based on the result. Real-world forms often pair this with HTML's own\nbuilt-in validation attributes like `required` and `pattern`, but JS validation gives you full\ncontrol over the message and the exact rules.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst form = document.createElement('form');\nform.innerHTML =\n  \"<label for='email-input'>Email</label>\" +\n  \"<input id='email-input' name='email' type='text' />\" +\n  \"<button type='submit'>Sign up</button>\";\napp.appendChild(form);\n\nconst message = document.createElement('p');\nmessage.id = 'form-message';\napp.appendChild(message);\n\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const emailInput = form.querySelector('#email-input');\n  const value = emailInput.value.trim();\n  if (value.includes('@') && value.length > 3) {\n    message.textContent = 'Thanks, ' + value + '!';\n  } else {\n    message.textContent = 'Please enter a valid email.';\n  }\n});\n\nform.querySelector('#email-input').value = 'test@example.com';\nform.dispatchEvent(new Event('submit', { cancelable: true }));\nconsole.log(message.textContent);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const form = document.getElementById('signup-form');\nconst status = document.getElementById('status');\n\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const username = document.getElementById('username').value.trim();\n\n  // your code here: if username is shorter than 3 characters,\n  // set status.textContent to an error message; otherwise set it\n  // to 'Welcome, ' + username + '!'\n});",
      "instructions": "Inside the submit handler, validate that the username is at least 3 characters long. Show an error message in #status if it is too short, otherwise show a welcome message.",
      "previewHtml": "<div id='app'>\n  <form id='signup-form'>\n    <label for='username'>Username</label>\n    <input id='username' type='text' />\n    <button type='submit'>Create account</button>\n  </form>\n  <p id='status'></p>\n</div>"
    },
    "quiz": [
      {
        "question": "What does calling event.preventDefault() inside a submit handler do?",
        "choices": [
          "It stops the browser's default action, such as navigating/reloading the page",
          "It removes the form from the page",
          "It clears all input values",
          "It cancels every other event listener on the page"
        ],
        "correctIndex": 0
      },
      {
        "question": "What type is emailInput.value for a text input, regardless of what the user typed?",
        "choices": [
          "A number",
          "A string",
          "A boolean",
          "An HTMLElement"
        ],
        "correctIndex": 1
      },
      {
        "question": "Which property should you read to get a checkbox's checked/unchecked state?",
        "choices": [
          ".value",
          ".selected",
          ".checked",
          ".state"
        ],
        "correctIndex": 2
      },
      {
        "question": "Why call .trim() on a form value before validating it?",
        "choices": [
          "trim() converts the string to a number",
          "trim() is required syntax and has no functional effect",
          "It permanently changes the input element's displayed value",
          "It removes stray leading/trailing whitespace that shouldn't count as valid content"
        ],
        "correctIndex": 3
      },
      {
        "question": "If you forget to call preventDefault() in a submit handler, what typically happens?",
        "choices": [
          "Nothing, forms never submit by default",
          "The handler simply does not run",
          "The browser proceeds with its default submit behavior, such as reloading the page",
          "The page throws a JavaScript error"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "webjs-06-dom-nodes-templates",
    "title": "Creating & Removing DOM Nodes",
    "explanation": "So far you've selected and edited elements that already exist. Just as often, you need to\nbuild new ones from scratch. `document.createElement(tagName)` makes a brand-new, detached\nelement; it doesn't appear anywhere until you insert it with a method like\n`parent.appendChild(node)` (adds it as the last child) or the newer `parent.append(...)`\n(accepts multiple nodes and even plain strings). Removing a node is just as direct:\n`node.remove()` takes it out of the tree.\n\n```js\nconst item = document.createElement('li');\nitem.textContent = 'New item';\ndocument.querySelector('ul').appendChild(item);\n// later...\nitem.remove();\n```\n\nWhen you need to stamp out the same chunk of markup repeatedly (say, one row per item in a\nlist), typing out `createElement` calls for every child element gets tedious. The `<template>`\nelement helps here: its contents are parsed but never rendered directly on the page, and you\nclone them on demand with `template.content.cloneNode(true)`. The `true` means 'deep clone' —\ncopy the template's descendants too, not just the top node.\n\n```js\nconst template = document.querySelector('#row-template');\nconst clone = template.content.cloneNode(true);\nclone.querySelector('.name').textContent = 'Ada';\nlist.appendChild(clone);\n```\n\nThis pattern — clone a template, fill in the blanks, append it — scales much better than\nhand-building the same structure with `createElement` every time, and it keeps your markup\nstructure visible in the HTML rather than buried in string concatenation.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst template = document.createElement('template');\ntemplate.innerHTML = \"<li class='fruit'></li>\";\n\nconst fruits = ['Mango', 'Kiwi', 'Pear'];\nconst list = document.createElement('ul');\napp.appendChild(list);\n\nfruits.forEach((fruit) => {\n  const clone = template.content.cloneNode(true);\n  clone.querySelector('.fruit').textContent = fruit;\n  list.appendChild(clone);\n});\n\nconsole.log('list now has', list.children.length, 'items');\n\nconst firstItem = list.firstElementChild;\nfirstItem.remove();\nconsole.log('after removal:', list.children.length, 'items');",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const button = document.getElementById('add-item');\nconst list = document.getElementById('items');\nlet counter = 0;\n\nbutton.addEventListener('click', () => {\n  counter += 1;\n  // your code here: create a new <li>, set its text to\n  // 'Item ' + counter, and append it to #items\n});",
      "instructions": "In the click handler, create a new <li> element, set its text to 'Item N' (where N is the current counter), and append it to #items.",
      "previewHtml": "<div id='app'>\n  <button id='add-item'>Add item</button>\n  <ul id='items'></ul>\n</div>"
    },
    "quiz": [
      {
        "question": "What does document.createElement('li') produce?",
        "choices": [
          "A new <li> element already inserted at the end of the page",
          "A new, detached <li> element that exists only in memory until inserted",
          "A string of HTML markup",
          "An error, because elements can't be created without a parent"
        ],
        "correctIndex": 1
      },
      {
        "question": "Which method removes a node from the DOM directly, without needing a reference to its parent?",
        "choices": [
          "node.delete()",
          "node.detach()",
          "node.remove()",
          "node.destroy()"
        ],
        "correctIndex": 2
      },
      {
        "question": "What is special about the content inside a <template> element?",
        "choices": [
          "It is rendered on the page exactly like normal markup",
          "It can only contain text, no elements",
          "It automatically duplicates itself once per second",
          "It is parsed but not rendered, and is meant to be cloned via .content.cloneNode()"
        ],
        "correctIndex": 3
      },
      {
        "question": "Why pass true to cloneNode(true) when cloning a template's content?",
        "choices": [
          "true enables deep cloning, copying descendant nodes too, not just the top-level node",
          "true makes the clone editable",
          "It has no effect; cloneNode always deep clones",
          "true converts the clone into a string"
        ],
        "correctIndex": 0
      },
      {
        "question": "Which method inserts a node as the last child of a parent element?",
        "choices": [
          "parent.insertBefore(node)",
          "parent.prepend(node)",
          "parent.appendChild(node)",
          "parent.replaceChild(node)"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "webjs-07-fetch-apis",
    "title": "Fetch & Working with APIs",
    "explanation": "The `fetch(url)` function is the browser's built-in way to make HTTP requests, and it returns\na **Promise** — an object representing a value that isn't ready yet but will resolve later.\nYou react to it with `.then(callback)`, or with `async`/`await` syntax which reads more like\nregular synchronous code. A typical real-world call looks like this:\n\n```js\nfetch('/api/user')\n  .then((response) => response.json())\n  .then((user) => console.log(user.name))\n  .catch((error) => console.error('request failed', error));\n```\n\n`fetch` resolves as soon as the server sends *any* response — even a 404 or 500 — so\n`response.ok` (true for 2xx statuses) is worth checking before trusting the body.\n`response.json()` itself also returns a Promise, since reading and parsing the response body\nis an asynchronous step of its own.\n\nBecause this course's examples run without real network access, the runnable example below\nuses a small stand-in function that returns a Promise shaped just like a real fetch response\n(`{ ok, json() }`) — the `.then()` chain around it is written exactly the way you'd write it\naround real `fetch()`. Swap the stand-in for an actual `fetch(url)` call and the rest of the\ncode is unchanged. This separation — 'get a promise, then use it' — is the core skill; where\nthe promise comes from (fetch, a timer, a file read) is a separate concern.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst output = document.createElement('p');\noutput.id = 'user-name';\noutput.textContent = 'Loading...';\napp.appendChild(output);\n\n// A small stand-in for a real network response, shaped just like\n// what fetch() would give you, so this runs without the network.\nfunction fetchUser() {\n  const fakeResponse = {\n    ok: true,\n    json: () => Promise.resolve({ id: 1, name: 'Ada Lovelace' }),\n  };\n  return Promise.resolve(fakeResponse);\n}\n\nfetchUser()\n  .then((response) => {\n    if (!response.ok) {\n      throw new Error('Request failed');\n    }\n    return response.json();\n  })\n  .then((user) => {\n    output.textContent = 'Loaded user: ' + user.name;\n  })\n  .catch((error) => {\n    output.textContent = 'Error: ' + error.message;\n  });\n\nconsole.log('initial text before the promise resolves:', output.textContent);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const button = document.getElementById('load-btn');\nconst nameDisplay = document.getElementById('profile-name');\n\nfunction fetchProfile() {\n  // Pretend network request; resolves like a real fetch() response.\n  return Promise.resolve({\n    ok: true,\n    json: () => Promise.resolve({ name: 'Grace Hopper' }),\n  });\n}\n\nbutton.addEventListener('click', () => {\n  // your code here: call fetchProfile(), then get the JSON body,\n  // and set nameDisplay.textContent to 'Profile: ' + data.name\n  // (use a .then() chain or async/await)\n});",
      "instructions": "In the click handler, call fetchProfile(), unwrap the JSON response, and set #profile-name's text to 'Profile: ' plus the returned name.",
      "previewHtml": "<div id='app'>\n  <button id='load-btn'>Load profile</button>\n  <p id='profile-name'>No data yet</p>\n</div>"
    },
    "quiz": [
      {
        "question": "What does fetch(url) return?",
        "choices": [
          "A Promise that resolves to a Response object",
          "The parsed response body directly",
          "A synchronous string of HTML",
          "Nothing; fetch works only with callbacks"
        ],
        "correctIndex": 0
      },
      {
        "question": "Why check response.ok before trusting the response body?",
        "choices": [
          "response.ok converts the body from text to JSON",
          "fetch's promise resolves for any completed HTTP response, including error statuses like 404 or 500",
          "response.ok is required syntax with no real effect",
          "fetch throws automatically on any non-200 status, so the check is redundant"
        ],
        "correctIndex": 1
      },
      {
        "question": "What does response.json() return?",
        "choices": [
          "The parsed JSON value, immediately, with no waiting",
          "A string containing the raw response text",
          "undefined, since json() is only for debugging",
          "A Promise that resolves to the parsed JSON value"
        ],
        "correctIndex": 3
      },
      {
        "question": "Which .then() chain method is used to handle a rejected promise (e.g. a network failure)?",
        "choices": [
          ".error()",
          ".fail()",
          ".catch()",
          ".reject()"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "webjs-08-async-ui-patterns",
    "title": "Async UI Patterns",
    "explanation": "A request that returns instantly is rare in the real world, so a good UI needs to show\nsomething *while* it's waiting, not just before and after. The common pattern is: set a\nloading state immediately, kick off the async work, then update the UI again once it settles\n— whether it succeeded or failed.\n\n```js\nbutton.addEventListener('click', () => {\n  button.disabled = true;\n  status.textContent = 'Saving...';\n  saveData()\n    .then((result) => { status.textContent = 'Saved!'; })\n    .catch((error) => { status.textContent = 'Error: ' + error.message; })\n    .finally(() => { button.disabled = false; });\n});\n```\n\nDisabling the triggering button while a request is in flight prevents duplicate submissions —\na very common bug where a slow network lets a user click 'Save' three times and create three\nrecords. `.finally(callback)` runs regardless of whether the promise resolved or rejected,\nwhich makes it the natural place to re-enable the button or hide a spinner, since you always\nwant that cleanup to happen exactly once, on either path.\n\nThe three UI states worth naming explicitly are: idle (nothing happening yet), loading\n(request in flight, often shown with disabled controls or a spinner), and settled — which\nsplits into success and error, each usually needing different visible feedback. Structuring\ncode around these named states, rather than ad hoc flags, makes async UI logic far easier to\nreason about and debug.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst button = document.createElement('button');\nbutton.textContent = 'Save';\napp.appendChild(button);\n\nconst status = document.createElement('p');\nstatus.id = 'save-status';\nstatus.textContent = '';\napp.appendChild(status);\n\nfunction saveData() {\n  return new Promise((resolve) => {\n    resolve({ success: true });\n  });\n}\n\nfunction handleSave() {\n  button.disabled = true;\n  status.textContent = 'Saving...';\n\n  saveData()\n    .then((result) => {\n      status.textContent = result.success ? 'Saved!' : 'Save failed.';\n    })\n    .catch(() => {\n      status.textContent = 'Something went wrong.';\n    })\n    .finally(() => {\n      button.disabled = false;\n    });\n}\n\nbutton.addEventListener('click', handleSave);\nbutton.dispatchEvent(new Event('click'));\nconsole.log('button disabled right after the synchronous part of the click:', button.disabled);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const button = document.getElementById('fetch-btn');\nconst state = document.getElementById('state');\n\nfunction loadData() {\n  return new Promise((resolve, reject) => {\n    resolve(['a', 'b', 'c']);\n  });\n}\n\nbutton.addEventListener('click', () => {\n  // your code here:\n  // 1. disable the button and set state.textContent to 'Loading...'\n  // 2. call loadData(); on success set state.textContent to\n  //    'Loaded ' + data.length + ' item(s)'\n  // 3. on error set state.textContent to 'Error loading data'\n  // 4. either way, re-enable the button when the request finishes\n});",
      "instructions": "Implement the click handler so it disables the button and shows a loading state before calling loadData(), updates the state text based on success or failure, and always re-enables the button afterward (use .finally()).",
      "previewHtml": "<div id='app'>\n  <button id='fetch-btn'>Load data</button>\n  <p id='state'>Idle</p>\n</div>"
    },
    "quiz": [
      {
        "question": "Why disable a submit button while its async request is in flight?",
        "choices": [
          "To prevent duplicate submissions from repeated clicks during a slow request",
          "Disabling buttons is required by HTML validation rules",
          "It makes the request resolve faster",
          "It has no practical purpose, it's purely cosmetic"
        ],
        "correctIndex": 0
      },
      {
        "question": "When does a .finally() callback in a promise chain run?",
        "choices": [
          "Only if the promise resolves successfully",
          "Only if the promise rejects",
          "Regardless of whether the promise resolved or rejected",
          "Immediately, before the promise settles at all"
        ],
        "correctIndex": 2
      },
      {
        "question": "In a well-structured async UI, what are the typical named states to handle?",
        "choices": [
          "Only success and failure",
          "Only loading, nothing else matters",
          "Rendered and unrendered",
          "Idle, loading, and settled (success or error)"
        ],
        "correctIndex": 3
      },
      {
        "question": "What is a good place to re-enable a disabled button after an async save, regardless of outcome?",
        "choices": [
          "Inside .then() only",
          "Inside .finally()",
          "Inside .catch() only",
          "Immediately before calling the async function"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "webjs-09-storage",
    "title": "localStorage & sessionStorage",
    "explanation": "Browsers give JavaScript two simple key-value storage areas that persist without any server:\n`localStorage` and `sessionStorage`. Both share the same API — `setItem(key, value)`,\n`getItem(key)`, `removeItem(key)`, and `clear()` — and both only store **strings**. The\ndifference is lifetime: `localStorage` persists until explicitly cleared, even after closing\nthe browser and reopening the site; `sessionStorage` is wiped when the tab is closed and is\nnot shared between tabs, even for the same site.\n\n```js\nlocalStorage.setItem('username', 'nova');\nconsole.log(localStorage.getItem('username')); // 'nova'\nlocalStorage.removeItem('username');\nconsole.log(localStorage.getItem('username')); // null\n```\n\nSince both APIs only store strings, saving anything more structured — an object, an array —\nmeans converting it yourself with `JSON.stringify()` before writing, and `JSON.parse()` after\nreading it back:\n\n```js\nlocalStorage.setItem('prefs', JSON.stringify({ theme: 'dark' }));\nconst prefs = JSON.parse(localStorage.getItem('prefs'));\n```\n\nA common gotcha: `getItem` returns `null` (not `undefined`, and not `'{}'`) for a missing key,\nso calling `JSON.parse(null)` will throw — guard with something like\n`JSON.parse(localStorage.getItem('prefs') || '{}')`. Because storage is per-origin (scoped to\nprotocol + domain + port) and synchronous, it's well suited for small amounts of client-side\nstate like preferences, drafts, or a to-do list — not for large data sets or anything\nsensitive, since it's readable by any script running on the page.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nlocalStorage.setItem('username', 'nova');\nconst savedName = localStorage.getItem('username');\n\nconst greeting = document.createElement('p');\ngreeting.textContent = 'Welcome back, ' + savedName + '!';\napp.appendChild(greeting);\n\nconst preferences = { theme: 'dark', notifications: true };\nlocalStorage.setItem('preferences', JSON.stringify(preferences));\n\nconst restored = JSON.parse(localStorage.getItem('preferences'));\nconsole.log('theme:', restored.theme);\n\nlocalStorage.removeItem('username');\nconsole.log('username after removal:', localStorage.getItem('username'));",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const textarea = document.getElementById('note');\nconst saveButton = document.getElementById('save-note');\nconst savedDisplay = document.getElementById('saved-note');\n\nsaveButton.addEventListener('click', () => {\n  // your code here: save textarea.value to localStorage under the\n  // key 'my-note', then update savedDisplay.textContent to\n  // 'Saved: ' + the note text\n});",
      "instructions": "In the click handler, store the textarea's value in localStorage under the key 'my-note', then update #saved-note to show 'Saved: ' followed by that text.",
      "previewHtml": "<div id='app'>\n  <textarea id='note' placeholder='Write a note...'></textarea>\n  <button id='save-note'>Save</button>\n  <p id='saved-note'></p>\n</div>"
    },
    "quiz": [
      {
        "question": "What is the key difference between localStorage and sessionStorage?",
        "choices": [
          "localStorage persists until explicitly cleared; sessionStorage is cleared when the tab closes",
          "localStorage can store objects directly, sessionStorage cannot",
          "sessionStorage persists forever, localStorage is cleared on tab close",
          "There is no difference, they are aliases for the same storage"
        ],
        "correctIndex": 0
      },
      {
        "question": "What data type can localStorage.setItem store as a value?",
        "choices": [
          "Any JavaScript value, including functions",
          "Only strings",
          "Only numbers",
          "Only JSON objects, automatically serialized"
        ],
        "correctIndex": 1
      },
      {
        "question": "What does localStorage.getItem('missing-key') return if the key was never set?",
        "choices": [
          "undefined",
          "An empty string",
          "It throws an error",
          "null"
        ],
        "correctIndex": 3
      },
      {
        "question": "How should you store a plain JavaScript object in localStorage?",
        "choices": [
          "Pass the object directly to setItem, it is stored automatically",
          "Convert it with JSON.stringify() before storing, and JSON.parse() after reading it back",
          "Objects cannot be stored in localStorage under any circumstances",
          "Use localStorage.setObject() instead of setItem()"
        ],
        "correctIndex": 1
      },
      {
        "question": "Which method removes a single key from localStorage without clearing everything else?",
        "choices": [
          "localStorage.clear('key')",
          "localStorage.delete('key')",
          "localStorage.removeItem('key')",
          "localStorage.unset('key')"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "webjs-10-timers",
    "title": "Timers: setTimeout, setInterval, and Debouncing",
    "explanation": "Two built-in functions schedule code to run later: `setTimeout(callback, delay)` runs\n`callback` once, after at least `delay` milliseconds, and `setInterval(callback, delay)` runs\nit repeatedly, every `delay` milliseconds, until stopped. Both return an id you can pass to\n`clearTimeout(id)` or `clearInterval(id)` to cancel the schedule before it fires (or before it\nfires again).\n\n```js\nconst id = setTimeout(() => console.log('fired once'), 1000);\nclearTimeout(id); // cancels it before it ever runs\n\nconst tickId = setInterval(() => console.log('tick'), 500);\n// later: clearInterval(tickId);\n```\n\nA very common real-world use is **debouncing**: an input event can fire on every keystroke,\nwhich is too often to run something expensive like a search request. Debouncing delays the\nactual work until the user pauses typing, by clearing and rescheduling a timer on every\nkeystroke — only the *last* scheduled call in a burst actually survives long enough to run.\n\n```js\nlet timer = null;\ninput.addEventListener('input', () => {\n  clearTimeout(timer);\n  timer = setTimeout(() => runSearch(input.value), 300);\n});\n```\n\nIt's worth remembering that `setTimeout(fn, 0)` does not run `fn` immediately — it still\nqueues `fn` to run after the current synchronous code finishes, because timers, like promises,\nexecute as part of the event loop rather than in the middle of whatever code scheduled them.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst status = document.createElement('p');\nstatus.id = 'timer-status';\nstatus.textContent = 'Waiting...';\napp.appendChild(status);\n\nconst timeoutId = setTimeout(() => {\n  status.textContent = 'Timeout fired!';\n}, 1000);\n\nlet ticks = 0;\nconst intervalId = setInterval(() => {\n  ticks += 1;\n  if (ticks >= 3) {\n    clearInterval(intervalId);\n  }\n}, 500);\n\nclearTimeout(timeoutId);\nconsole.log('scheduled a timeout and an interval, then cancelled the timeout');\n\nfunction debounce(fn, delay) {\n  let timer = null;\n  return function debounced(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst logSearch = debounce((term) => console.log('searching for', term), 300);\nlogSearch('a');\nlogSearch('ab');\nlogSearch('abc');\nclearInterval(intervalId);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const input = document.getElementById('search');\nconst results = document.getElementById('results');\nlet debounceTimer = null;\n\ninput.addEventListener('input', () => {\n  // your code here: clear any pending debounceTimer, then set a new\n  // setTimeout (around 300ms) that updates results.textContent to\n  // 'Results for: ' + input.value\n});",
      "instructions": "Debounce the input handler: clear the previous timer on every keystroke and schedule a new setTimeout (around 300ms) that updates #results with 'Results for: ' plus the current input value.",
      "previewHtml": "<div id='app'>\n  <input id='search' type='text' placeholder='Search...' />\n  <p id='results'>Type to search</p>\n</div>"
    },
    "quiz": [
      {
        "question": "What is the difference between setTimeout and setInterval?",
        "choices": [
          "setTimeout runs a callback once after a delay; setInterval runs it repeatedly until cleared",
          "setInterval runs a callback once; setTimeout runs it repeatedly",
          "They are identical, just different names for the same behavior",
          "setTimeout can only be used with 0ms delay"
        ],
        "correctIndex": 0
      },
      {
        "question": "How do you stop a setInterval from firing again?",
        "choices": [
          "Call stopInterval(id)",
          "Call setInterval(id, 0)",
          "Call clearInterval(id) with the id it returned",
          "Intervals cannot be stopped once started"
        ],
        "correctIndex": 2
      },
      {
        "question": "What is the purpose of debouncing an input event handler?",
        "choices": [
          "To make every keystroke trigger extra work",
          "To permanently disable the input field",
          "To guarantee the handler never runs",
          "To delay expensive work (like a search request) until the user pauses typing, instead of running it on every keystroke"
        ],
        "correctIndex": 3
      },
      {
        "question": "Does setTimeout(fn, 0) run fn synchronously, in the middle of the current code?",
        "choices": [
          "Yes, a 0ms delay means it runs immediately and synchronously",
          "No, it still queues fn to run after the current synchronous code finishes",
          "It depends on the browser, with no consistent behavior",
          "setTimeout(fn, 0) is invalid and throws an error"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "webjs-11-browser-apis",
    "title": "Browser APIs: Geolocation & Canvas",
    "explanation": "Beyond the DOM, browsers expose a large collection of additional JavaScript APIs for talking\nto the device and drawing graphics. Two commonly used ones are the **Geolocation API** and the\n**Canvas API**.\n\n`navigator.geolocation.getCurrentPosition(onSuccess, onError)` asks the user for permission\nand, if granted, calls `onSuccess` with a position object containing\n`position.coords.latitude` and `position.coords.longitude`. Because this requires user\npermission and real hardware, it's asynchronous and callback-based, and every real usage\nshould feature-detect first and handle the case where the user denies access or the API isn't\navailable at all:\n\n```js\nif ('geolocation' in navigator) {\n  navigator.geolocation.getCurrentPosition(\n    (position) => console.log(position.coords.latitude, position.coords.longitude),\n    (error) => console.log('permission denied or unavailable:', error.message)\n  );\n}\n```\n\nThe Canvas API gives you a `<canvas>` element you can draw on pixel-by-pixel using a drawing\ncontext, most commonly the 2D context from `canvas.getContext('2d')`. Once you have that\ncontext object, you draw with methods like `fillRect(x, y, width, height)` for rectangles, or\n`beginPath()` / `arc(x, y, radius, startAngle, endAngle)` / `fill()` for circles and curves,\nsetting `fillStyle` beforehand to choose a color. Canvas drawing is immediate-mode: nothing is\nkept as separate DOM nodes you can inspect later, unlike regular HTML elements — if you want to\nchange what's drawn, you clear and redraw.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst locationText = document.createElement('p');\nlocationText.id = 'location-text';\napp.appendChild(locationText);\n\n// Geolocation is permission-based and async, so real code always\n// feature-detects and provides a fallback path.\nfunction showLocation(position) {\n  locationText.textContent = 'Lat: ' + position.coords.latitude + ', Lng: ' + position.coords.longitude;\n}\n\nif ('geolocation' in navigator && typeof navigator.geolocation.getCurrentPosition === 'function') {\n  navigator.geolocation.getCurrentPosition(showLocation, () => {\n    locationText.textContent = 'Location unavailable';\n  });\n} else {\n  // Simulate what a successful callback would receive, since this\n  // environment has no real geolocation hardware.\n  showLocation({ coords: { latitude: 51.5074, longitude: -0.1278 } });\n}\n\nconst canvas = document.createElement('canvas');\ncanvas.width = 100;\ncanvas.height = 100;\napp.appendChild(canvas);\n\nconst ctx = canvas.getContext('2d');\nif (ctx) {\n  ctx.fillStyle = 'steelblue';\n  ctx.fillRect(10, 10, 50, 50);\n  ctx.beginPath();\n  ctx.arc(70, 70, 20, 0, Math.PI * 2);\n  ctx.fillStyle = 'orange';\n  ctx.fill();\n}\n\nconsole.log('canvas context available:', Boolean(ctx));",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const canvas = document.getElementById('board');\nconst button = document.getElementById('draw-btn');\n\nbutton.addEventListener('click', () => {\n  const ctx = canvas.getContext('2d');\n  if (!ctx) return;\n\n  // your code here: draw a filled circle roughly centered on the\n  // canvas using ctx.beginPath(), ctx.arc(), and ctx.fill()\n});",
      "instructions": "In the click handler, use the 2D canvas context to draw a filled circle roughly centered on the canvas (beginPath, arc, fill).",
      "previewHtml": "<div id='app'>\n  <canvas id='board' width='150' height='150'></canvas>\n  <button id='draw-btn'>Draw circle</button>\n</div>"
    },
    "quiz": [
      {
        "question": "Why should code always feature-detect before using navigator.geolocation?",
        "choices": [
          "It requires user permission and isn't guaranteed to be available, so real code needs a fallback",
          "Geolocation is deprecated and no longer works anywhere",
          "Feature detection makes the API run synchronously",
          "It is purely a stylistic convention with no functional reason"
        ],
        "correctIndex": 0
      },
      {
        "question": "What does navigator.geolocation.getCurrentPosition's success callback receive?",
        "choices": [
          "A string with the address",
          "A position object containing coords.latitude and coords.longitude",
          "Nothing, it just signals success",
          "A Promise that must be awaited separately"
        ],
        "correctIndex": 1
      },
      {
        "question": "What must you call on a <canvas> element before you can draw on it?",
        "choices": [
          "canvas.draw()",
          "canvas.enable()",
          "canvas.render()",
          "canvas.getContext('2d')"
        ],
        "correctIndex": 3
      },
      {
        "question": "Which sequence of calls draws a filled circle using the 2D canvas context?",
        "choices": [
          "ctx.fillRect(), ctx.stroke()",
          "ctx.rect(), ctx.close()",
          "ctx.beginPath(), ctx.arc(...), ctx.fill()",
          "ctx.circle(), ctx.paint()"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "webjs-12-json",
    "title": "Working with JSON",
    "explanation": "JSON (JavaScript Object Notation) is a text format for representing structured data, and it's\nthe format most web APIs use to send and receive data. Two built-in functions convert between\nJSON text and real JavaScript values: `JSON.stringify(value)` turns a JS value into a JSON\nstring, and `JSON.parse(text)` turns a JSON string back into a JS value.\n\n```js\nconst data = { name: 'Ada', skills: ['math', 'programming'] };\nconst json = JSON.stringify(data);\nconsole.log(json); // '{\"name\":\"Ada\",\"skills\":[\"math\",\"programming\"]}'\nconst parsed = JSON.parse(json);\nconsole.log(parsed.name); // 'Ada'\n```\n\nThis pair shows up constantly when rendering data into the DOM: an API response arrives as\nJSON text, you `JSON.parse()` it into objects and arrays you can loop over, then build DOM\nelements from that data with `createElement`/`textContent`. Going the other way,\n`JSON.stringify()` is how you prepare data for `localStorage` (which only stores strings) or\nfor the body of a `fetch` POST request.\n\nA few pitfalls worth knowing: `JSON.stringify` silently drops object properties whose value is\n`undefined` or a function, `NaN` and `Infinity` become `null`, and `Date` objects are converted\nto ISO date strings (so parsing them back gives you a string, not a `Date`, unless you convert\nit yourself). JSON strings must use double quotes for keys and string values — JSON is a data\nformat, not JavaScript, so JavaScript's more relaxed object literal syntax (single quotes,\ntrailing commas, unquoted keys) is not valid JSON.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst data = {\n  products: [\n    { id: 1, name: 'Notebook', price: 4.5 },\n    { id: 2, name: 'Pen', price: 1.2 },\n  ],\n};\n\nconst json = JSON.stringify(data);\nconsole.log('serialized:', json);\n\nconst parsed = JSON.parse(json);\n\nconst list = document.createElement('ul');\napp.appendChild(list);\n\nparsed.products.forEach((product) => {\n  const li = document.createElement('li');\n  li.textContent = product.name + ' - $' + product.price.toFixed(2);\n  list.appendChild(li);\n});\n\nconsole.log('rendered', parsed.products.length, 'products');",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const raw = document.getElementById('raw-json').textContent;\nconst renderedList = document.getElementById('rendered-list');\n\n// your code here:\n// 1. Parse `raw` into an object with JSON.parse\n// 2. For each item in data.items, create an <li> with the item's label\n// 3. Append each <li> to renderedList",
      "instructions": "Parse the JSON text inside #raw-json, then render each item's label as an <li> appended to #rendered-list.",
      "previewHtml": "<div id='app'><pre id='raw-json'>{\"items\":[{\"id\":1,\"label\":\"Milk\"},{\"id\":2,\"label\":\"Eggs\"}]}</pre><ul id='rendered-list'></ul></div>"
    },
    "quiz": [
      {
        "question": "What does JSON.stringify(value) produce?",
        "choices": [
          "A JavaScript object identical to value",
          "A JSON-formatted string representing value",
          "A DOM element rendering value",
          "A Promise that resolves to value"
        ],
        "correctIndex": 1
      },
      {
        "question": "What does JSON.parse(text) do if text is not valid JSON?",
        "choices": [
          "It returns undefined silently",
          "It returns null",
          "It throws a SyntaxError",
          "It returns an empty object"
        ],
        "correctIndex": 2
      },
      {
        "question": "What happens to an object property whose value is undefined when passed to JSON.stringify?",
        "choices": [
          "It is kept and shows up as \"undefined\" in the output",
          "It is converted to null",
          "JSON.stringify throws an error",
          "It is dropped entirely from the output"
        ],
        "correctIndex": 3
      },
      {
        "question": "Which of these is valid JSON text?",
        "choices": [
          "{name: 'Ada'}",
          "{'name': 'Ada'}",
          "{\"name\": \"Ada\"}",
          "{name: \"Ada\",}"
        ],
        "correctIndex": 2
      },
      {
        "question": "Why is JSON.stringify commonly used before calling localStorage.setItem with an object?",
        "choices": [
          "localStorage.setItem only accepts strings, so objects must be serialized first",
          "It compresses the data to save space",
          "It is not actually necessary, setItem accepts objects directly",
          "It converts the object into a DOM element"
        ],
        "correctIndex": 0
      }
    ]
  },
  {
    "id": "webjs-13-debugging",
    "title": "Debugging in DevTools",
    "explanation": "Browser DevTools are where most real JavaScript debugging happens, and `console.log` is only\nthe beginning of what the Console panel can do. `console.table(data)` renders an array of\nobjects as an actual sortable table, which is far easier to scan than a wall of nested\nobjects. `console.group(label)` / `console.groupEnd()` visually indent and collapse a block of\nrelated log lines, which helps a lot once a page logs dozens of messages. `console.warn` and\n`console.error` behave like `console.log` but are styled distinctly (and `console.error`\nincludes a stack trace), making real problems easier to spot in a busy console.\n\n```js\nconsole.group('Loading users');\nconsole.table(users);\nconsole.log('done loading');\nconsole.groupEnd();\n```\n\nBeyond logging, the Sources panel lets you set **breakpoints** — click a line number and the\nbrowser pauses execution exactly there the next time that line runs, letting you inspect every\nvariable in scope, step line-by-line, and watch how state changes over time. You can also\ntrigger this from code itself with the `debugger;` statement, which pauses execution right\nthere whenever DevTools is open (and is simply ignored, with no effect, when DevTools is\nclosed).\n\nThe Elements panel lets you inspect the live DOM tree and computed styles for any element on\nthe page, and edit them experimentally without touching your source files. The Network panel\nshows every `fetch`/XHR request, its status code, timing, and response body — usually the\nfirst place to look when an API call isn't returning what you expect.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconsole.group('App startup');\nconsole.log('Initializing app...');\nconsole.table([\n  { id: 1, name: 'Ada', role: 'Engineer' },\n  { id: 2, name: 'Grace', role: 'Admiral' },\n]);\nconsole.groupEnd();\n\nfunction computeTotal(items) {\n  console.log('computeTotal called with', items.length, 'items');\n  const total = items.reduce((sum, item) => sum + item.price, 0);\n  console.assert(total >= 0, 'Total should never be negative');\n  return total;\n}\n\nconst cart = [{ price: 9.99 }, { price: 4.5 }];\nconst total = computeTotal(cart);\n\nconst summary = document.createElement('p');\nsummary.textContent = 'Total: $' + total.toFixed(2);\napp.appendChild(summary);\n\nconsole.warn('This is a sample warning, not a real problem');",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const button = document.getElementById('debug-btn');\nconst logList = document.getElementById('log-list');\n\nconst users = [\n  { id: 1, name: 'Ada', active: true },\n  { id: 2, name: 'Linus', active: false },\n];\n\nbutton.addEventListener('click', () => {\n  // your code here:\n  // 1. console.group('Diagnostics')\n  // 2. console.table(users)\n  // 3. for each user, append an <li> to logList with their name\n  //    and 'active' or 'inactive'\n  // 4. console.groupEnd()\n});",
      "instructions": "In the click handler, group related logs with console.group/console.groupEnd, print the users array with console.table, and render each user's status into #log-list as an <li>.",
      "previewHtml": "<div id='app'>\n  <button id='debug-btn'>Run diagnostics</button>\n  <ul id='log-list'></ul>\n</div>"
    },
    "quiz": [
      {
        "question": "What does console.table(data) do with an array of objects?",
        "choices": [
          "Renders the array as a sortable table in the console",
          "Nothing different from console.log",
          "Deletes the data from memory after logging",
          "Sends the data to the Network panel"
        ],
        "correctIndex": 0
      },
      {
        "question": "What is the effect of a debugger; statement in your code?",
        "choices": [
          "It always throws an error",
          "It pauses execution there when DevTools is open; it has no effect when DevTools is closed",
          "It permanently disables the rest of the script",
          "It logs the current stack trace and continues without pausing"
        ],
        "correctIndex": 1
      },
      {
        "question": "Which DevTools panel would you check first to see the status code and response body of a failed fetch request?",
        "choices": [
          "Elements panel",
          "Sources panel",
          "Network panel",
          "Application panel"
        ],
        "correctIndex": 2
      },
      {
        "question": "What do console.group() and console.groupEnd() do together?",
        "choices": [
          "They measure how long code takes to run",
          "They pause script execution until manually resumed",
          "They clear all previous console output",
          "They visually indent and collapse a block of related console messages"
        ],
        "correctIndex": 3
      },
      {
        "question": "How does console.error differ from console.log in the browser console?",
        "choices": [
          "There is no difference at all",
          "console.error only works inside try/catch blocks",
          "console.error is styled distinctly and includes a stack trace, making real problems easier to spot",
          "console.error stops the entire script from continuing"
        ],
        "correctIndex": 2
      }
    ]
  },
  {
    "id": "webjs-14-interactive-widget",
    "title": "Building an Interactive Widget: Tab Switcher",
    "explanation": "Real UI features are usually a combination of everything covered so far: select some\nelements, listen for an event, and update classes/content/visibility in response. A tab\nswitcher is a great small example. The markup is a row of tab buttons and a set of content\npanels, one per tab. Clicking a tab should mark it as the active one and show only its\nmatching panel, hiding the rest.\n\n```js\ntabs.addEventListener('click', (event) => {\n  const tabButton = event.target.closest('.tab');\n  if (!tabButton) return;\n\n  tabs.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));\n  tabButton.classList.add('active');\n\n  const targetId = tabButton.dataset.target;\n  panels.querySelectorAll('.panel').forEach((panel) => {\n    panel.hidden = panel.id !== targetId;\n  });\n});\n```\n\nA few things make this idiomatic: a single delegated listener on the tab container (rather\nthan one per button) handles clicks on any tab, including ones added later; `dataset.target`\nreads a `data-target='panel-2'` HTML attribute to connect each button to its panel without\nhardcoding indexes; and the built-in `hidden` boolean property (equivalent to toggling a CSS\nclass like `display: none`) shows/hides each panel.\n\nWidgets like this — toggles, accordions, dropdowns, tab bars — all follow the same shape:\none small piece of state (which tab is active, whether an item is done), a listener that\nupdates that state in response to an event, and DOM updates that make the current state\nvisible. Once that pattern feels natural, most small interactive UI features become a matter of\npicking the right state and the right DOM changes to reflect it.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst tabs = document.createElement('div');\ntabs.className = 'tabs';\ntabs.innerHTML =\n  \"<button class='tab active' data-target='panel-1'>One</button>\" +\n  \"<button class='tab' data-target='panel-2'>Two</button>\" +\n  \"<button class='tab' data-target='panel-3'>Three</button>\";\napp.appendChild(tabs);\n\nconst panels = document.createElement('div');\npanels.className = 'panels';\npanels.innerHTML =\n  \"<div id='panel-1' class='panel'>Content one</div>\" +\n  \"<div id='panel-2' class='panel' hidden>Content two</div>\" +\n  \"<div id='panel-3' class='panel' hidden>Content three</div>\";\napp.appendChild(panels);\n\ntabs.addEventListener('click', (event) => {\n  const tabButton = event.target.closest('.tab');\n  if (!tabButton) return;\n\n  tabs.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));\n  tabButton.classList.add('active');\n\n  const targetId = tabButton.dataset.target;\n  panels.querySelectorAll('.panel').forEach((panel) => {\n    panel.hidden = panel.id !== targetId;\n  });\n});\n\ntabs.children[1].dispatchEvent(new Event('click', { bubbles: true }));\nconsole.log('panel-2 hidden:', document.getElementById('panel-2').hidden);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const list = document.getElementById('todo-widget');\n\n// your code here: add a single click listener on the list (event\n// delegation) that toggles the 'done' class on the clicked\n// '.todo-item', so clicking an item marks it done, and clicking\n// it again un-marks it",
      "instructions": "Using event delegation on #todo-widget, toggle the class 'done' on whichever '.todo-item' was clicked so items can be marked complete and un-marked by clicking again.",
      "previewHtml": "<div id='app'>\n  <ul id='todo-widget'>\n    <li class='todo-item'><span>Buy groceries</span></li>\n    <li class='todo-item'><span>Finish report</span></li>\n    <li class='todo-item'><span>Call dentist</span></li>\n  </ul>\n</div>"
    },
    "quiz": [
      {
        "question": "In the tab switcher example, what does tabButton.dataset.target read?",
        "choices": [
          "A data-target='...' HTML attribute value on that button",
          "The button's textContent",
          "The button's CSS class list",
          "The index of the button among its siblings"
        ],
        "correctIndex": 0
      },
      {
        "question": "Why is a single delegated click listener on the tabs container preferred over one listener per tab button?",
        "choices": [
          "Delegated listeners run faster on every single click",
          "Individual button listeners are not supported in modern browsers",
          "It automatically handles tabs added later and avoids attaching many separate listeners",
          "There is no real difference, it's purely a style preference"
        ],
        "correctIndex": 2
      },
      {
        "question": "Setting an element's `hidden` property to true does what?",
        "choices": [
          "Removes the element permanently from the DOM",
          "Makes the element non-interactive but still visible",
          "Has no visible effect without additional CSS",
          "Hides the element from rendering, similar to display: none"
        ],
        "correctIndex": 3
      },
      {
        "question": "What general pattern do widgets like tab switchers, toggles, and accordions share?",
        "choices": [
          "They all require a server round-trip to update",
          "A small piece of state, an event listener that updates it, and DOM changes that reflect it",
          "They must all be built with the <template> element",
          "They cannot use event delegation"
        ],
        "correctIndex": 1
      }
    ]
  },
  {
    "id": "webjs-15-capstone",
    "title": "Capstone: A Persistent Task List",
    "explanation": "This capstone combines everything from the course into one small app: a task list you can add\nto, remove from, and that remembers its contents across page reloads. The pieces are all\nfamiliar individually — creating DOM nodes, delegated click handling, reading input values, and\nreading/writing `localStorage` with JSON — the new skill is wiring them together around a\nsingle source of truth.\n\nThe typical shape is: keep the real data in a plain JavaScript array (`tasks`), write a\n`render()` function that clears the list container and rebuilds it from that array, and call\n`render()` again any time the array changes. Every mutation (`addTask`, `removeTaskAt`) also\npersists the updated array to `localStorage` immediately, so a page reload can restore it.\n\n```js\nfunction render() {\n  list.innerHTML = '';\n  tasks.forEach((task, index) => {\n    const li = document.createElement('li');\n    li.textContent = task;\n    li.dataset.index = String(index);\n    list.appendChild(li);\n  });\n}\n\nfunction addTask(text) {\n  tasks.push(text);\n  localStorage.setItem('tasks', JSON.stringify(tasks));\n  render();\n}\n```\n\nThis 'array of data, plus a render function that rebuilds the DOM from it' pattern is worth\ninternalizing: instead of manually patching individual DOM nodes every time something changes\n(easy to get subtly wrong once an app grows), you keep one array as the single source of truth\nand always re-derive the visible list from it. It's a small-scale preview of how UI frameworks\nlike React model updates, built here with nothing but plain DOM APIs.",
    "example": {
      "code": "const app = document.getElementById('app');\n\nconst wrapper = document.createElement('div');\nwrapper.innerHTML =\n  '<h2>My Tasks</h2>' +\n  \"<input id='task-input' type='text' placeholder='New task' />\" +\n  \"<button id='add-task'>Add</button>\" +\n  \"<ul id='task-list'></ul>\" +\n  \"<p id='task-count'></p>\";\napp.appendChild(wrapper);\n\nconst input = wrapper.querySelector('#task-input');\nconst addButton = wrapper.querySelector('#add-task');\nconst list = wrapper.querySelector('#task-list');\nconst countLabel = wrapper.querySelector('#task-count');\n\nconst STORAGE_KEY = 'capstone-tasks';\n\nfunction loadTasks() {\n  const raw = localStorage.getItem(STORAGE_KEY);\n  return raw ? JSON.parse(raw) : [];\n}\n\nfunction saveTasks(list) {\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));\n}\n\nlet tasks = loadTasks();\n\nfunction render() {\n  list.innerHTML = '';\n  tasks.forEach((task, index) => {\n    const li = document.createElement('li');\n    li.textContent = task;\n    li.dataset.index = String(index);\n\n    const removeBtn = document.createElement('button');\n    removeBtn.textContent = 'Remove';\n    removeBtn.className = 'remove-task';\n    li.appendChild(removeBtn);\n\n    list.appendChild(li);\n  });\n  countLabel.textContent = tasks.length + ' task(s)';\n}\n\nfunction addTask(text) {\n  const trimmed = text.trim();\n  if (!trimmed) return;\n  tasks.push(trimmed);\n  saveTasks(tasks);\n  render();\n}\n\nfunction removeTaskAt(index) {\n  tasks.splice(index, 1);\n  saveTasks(tasks);\n  render();\n}\n\naddButton.addEventListener('click', () => {\n  addTask(input.value);\n  input.value = '';\n});\n\nlist.addEventListener('click', (event) => {\n  if (!event.target.classList.contains('remove-task')) return;\n  const li = event.target.closest('li');\n  removeTaskAt(Number(li.dataset.index));\n});\n\naddTask('Learn the DOM');\naddTask('Ship a widget');\nconsole.log('tasks after setup:', tasks.length);",
      "language": "javascript"
    },
    "exercise": {
      "starterCode": "const STORAGE_KEY = 'capstone-items';\nconst input = document.getElementById('new-item');\nconst addButton = document.getElementById('add-item-btn');\nconst list = document.getElementById('item-list');\nconst countLabel = document.getElementById('item-count');\n\nlet items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');\n\nfunction render() {\n  list.innerHTML = '';\n  items.forEach((item, index) => {\n    const li = document.createElement('li');\n    li.textContent = item;\n    li.dataset.index = String(index);\n    list.appendChild(li);\n  });\n  countLabel.textContent = items.length + ' item(s)';\n}\n\n// your code here:\n// 1. Add a click listener on addButton that reads input.value,\n//    trims it, and if not empty pushes it into `items`\n// 2. Save `items` to localStorage under STORAGE_KEY using\n//    JSON.stringify, then clear input.value\n// 3. Call render() after adding, and also call render() once here\n//    at startup so any previously saved items appear immediately",
      "instructions": "Wire up the add button so it appends the trimmed input value to the items array, persists items to localStorage as JSON under STORAGE_KEY, clears the input, and re-renders the list. Also call render() once at load time so previously saved items appear immediately.",
      "previewHtml": "<div id='app'>\n  <input id='new-item' type='text' placeholder='Add an item' />\n  <button id='add-item-btn'>Add</button>\n  <ul id='item-list'></ul>\n  <p id='item-count'>0 item(s)</p>\n</div>"
    },
    "quiz": [
      {
        "question": "In the 'array of data plus a render function' pattern, what does render() do?",
        "choices": [
          "It clears the list container and rebuilds its contents from the current data array",
          "It permanently deletes the underlying data array",
          "It sends the data to a server",
          "It only runs once, when the page first loads"
        ],
        "correctIndex": 0
      },
      {
        "question": "Why call saveTasks(tasks) inside both addTask and removeTaskAt?",
        "choices": [
          "It is unnecessary and only included for style",
          "So the persisted localStorage copy always reflects the latest in-memory state after any change",
          "It re-renders the DOM directly, replacing the need for render()",
          "It resets the tasks array to empty"
        ],
        "correctIndex": 1
      },
      {
        "question": "What does loadTasks() need to do if localStorage.getItem(STORAGE_KEY) returns null (no saved data yet)?",
        "choices": [
          "Call JSON.parse(null) directly, which works fine",
          "Throw an error to signal there is no data",
          "Fall back to a default value, such as an empty array, instead of parsing null",
          "Return the string 'null'"
        ],
        "correctIndex": 2
      },
      {
        "question": "Why use event delegation on the task list for the remove button clicks, instead of a listener per item?",
        "choices": [
          "Delegation is required by the localStorage API",
          "It has no benefit here since render() is only called once",
          "Per-item listeners are not supported on <li> elements",
          "So newly rendered items (created fresh on every render()) are automatically handled without re-attaching listeners"
        ],
        "correctIndex": 3
      },
      {
        "question": "What combination of concepts does this capstone bring together?",
        "choices": [
          "Only localStorage, nothing else",
          "DOM creation, event delegation, reading input values, and JSON-backed localStorage persistence",
          "Only canvas drawing and geolocation",
          "Only form validation"
        ],
        "correctIndex": 1
      }
    ]
  }
];
