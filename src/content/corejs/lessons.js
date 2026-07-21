export const corejsLessons = [
  {
    id: 'corejs-01-variables-types',
    title: 'Variables, Types & Coercion',
    explanation: `JavaScript gives you three ways to declare a variable: \`var\`, \`let\`, and \`const\`. \`var\` is function-scoped and hoisted, which causes surprising bugs, so modern code prefers \`let\` (reassignable, block-scoped) and \`const\` (block-scoped, cannot be reassigned — though the *contents* of an object or array bound to a \`const\` can still change).

Every value in JS has a type. The primitives are \`number\`, \`string\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`, and \`bigint\`. Everything else — objects, arrays, functions — is an \`object\` from \`typeof\`'s point of view (functions report \`"function"\` as a special case). You can inspect a value's type with the \`typeof\` operator:

\`\`\`js
typeof 42;        // "number"
typeof "hi";       // "string"
typeof undefined;  // "undefined"
typeof null;       // "object" (a famous, ancient bug)
typeof [1, 2, 3];  // "object"
\`\`\`

The trickiest part of JavaScript's type system is *implicit coercion*: operators like \`+\`, \`==\`, and \`if\` conditions silently convert values between types. \`"5" + 1\` produces the string \`"51"\` because \`+\` prefers string concatenation when either side is a string, while \`"5" - 1\` produces the number \`4\` because \`-\` only makes sense numerically. Loose equality (\`==\`) coerces operands before comparing, which is why \`"0" == 0\` and \`null == undefined\` are both \`true\` but \`null === undefined\` is \`false\`. Strict equality (\`===\`) never coerces, which is why experienced JavaScript developers almost always prefer it. Falsy values — \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`, and \`false\` — all coerce to \`false\` in a boolean context; everything else, including \`"0"\` and \`[]\`, is truthy.`,
    example: {
      code: `// var vs let vs const
var oldStyle = 'function scoped';
let counter = 0;
const PI = 3.14159;

counter += 1;
console.log('counter is now', counter);

// typeof on primitives
console.log(typeof 42, typeof 'hi', typeof true, typeof undefined, typeof null);

// implicit coercion
console.log('5' + 1);      // '51' - string concatenation
console.log('5' - 1);      // 4 - numeric subtraction
console.log(1 + 2 + '3');  // '33' - left to right: 3, then '3' + '3'
console.log('3' + 2 + 1);  // '321' - left to right: '32', then '321' + 1 -> '3211'... let's check below

// loose vs strict equality
console.log('0' == 0);   // true (coerced)
console.log('0' === 0);  // false (no coercion)
console.log(null == undefined);   // true
console.log(null === undefined);  // false

// truthy / falsy
const values = [0, '', null, undefined, NaN, false, '0', [], {}];
for (const v of values) {
  console.log(JSON.stringify(v), '->', Boolean(v));
}`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a function safeAdd(a, b) that adds two values numerically,
// even if they arrive as strings, avoiding the "string concatenation" trap.
// safeAdd('5', 3) should return 8, not '53'.
// safeAdd(2, 3) should return 5.

function safeAdd(a, b) {
  // your code here
}

console.log(safeAdd('5', 3));
console.log(safeAdd(2, 3));
console.log(safeAdd('10', '20'));`,
      instructions: 'Implement safeAdd so it always performs numeric addition by explicitly converting both arguments with Number() before adding them, regardless of whether they are passed as strings or numbers.',
    },
    quiz: [
      {
        question: 'Which declaration keyword creates a binding that cannot be reassigned, but whose object contents can still be mutated?',
        choices: ['var', 'let', 'const', 'static'],
        correctIndex: 2,
      },
      {
        question: 'What does typeof null return?',
        choices: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
      },
      {
        question: 'What is the result of the expression 1 + "2"?',
        choices: ['3', '"3"', '"12"', 'NaN'],
        correctIndex: 2,
      },
      {
        question: 'Which of these values is truthy in a boolean context?',
        choices: ['0', '""', '"0"', 'null'],
        correctIndex: 2,
      },
      {
        question: 'What does the strict equality operator (===) do differently from ==?',
        choices: [
          'It compares values after converting both to strings',
          'It never performs type coercion before comparing',
          'It only works on numbers',
          'It always returns true for objects with the same keys',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-02-operators-control-flow',
    title: 'Operators & Control Flow',
    explanation: `Control flow is how a program decides which statements run and in what order. JavaScript's \`if\`/\`else\` executes a block based on a condition's truthiness, and conditions are usually built from comparison operators (\`<\`, \`>\`, \`<=\`, \`>=\`, \`===\`, \`!==\`) combined with logical operators (\`&&\`, \`||\`, \`!\`).

Logical operators in JS don't just return booleans — they return one of their operands. \`a && b\` returns \`a\` if \`a\` is falsy, otherwise it returns \`b\`. \`a || b\` returns \`a\` if \`a\` is truthy, otherwise \`b\`. This is why \`someValue || 'default'\` is a common pattern for supplying fallback values, and why \`user && user.name\` was the classic way to guard against \`null\`/\`undefined\` before optional chaining existed.

For choosing between many discrete cases, \`switch\` compares a value against several \`case\` labels using strict equality, falling through to the next case unless you \`break\`:

\`\`\`js
switch (day) {
  case 'Sat':
  case 'Sun':
    console.log('Weekend');
    break;
  default:
    console.log('Weekday');
}
\`\`\`

When you only need to choose between two *expressions* (not statements), the ternary operator \`condition ? whenTrue : whenFalse\` is more concise than a full \`if\`/\`else\` and can be used inline, such as inside a template or function argument. Nesting ternaries deeply hurts readability, so most style guides limit them to simple, single-level choices. Finally, the nullish coalescing operator \`??\` is a more precise cousin of \`||\`: it only falls back when the left side is \`null\` or \`undefined\`, not for other falsy values like \`0\` or \`""\`, which matters when zero or an empty string is a legitimate value you want to keep.`,
    example: {
      code: `function describeNumber(n) {
  if (n > 0) {
    return 'positive';
  } else if (n < 0) {
    return 'negative';
  } else {
    return 'zero';
  }
}

console.log(describeNumber(5), describeNumber(-3), describeNumber(0));

// switch with fallthrough grouping
function dayType(day) {
  switch (day) {
    case 'Sat':
    case 'Sun':
      return 'Weekend';
    default:
      return 'Weekday';
  }
}
console.log(dayType('Sat'), dayType('Tue'));

// ternary
const age = 20;
const label = age >= 18 ? 'adult' : 'minor';
console.log(label);

// logical operators returning operands, not just booleans
const name = '' || 'Anonymous';
console.log(name);

const count = 0;
console.log(count ?? 'no value given'); // 0, because ?? only falls back on null/undefined
console.log(count || 'no value given'); // falls back, because 0 is falsy for ||`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a function classifyGrade(score) that returns a letter grade:
// 90+ => 'A', 80-89 => 'B', 70-79 => 'C', 60-69 => 'D', below 60 => 'F'.
// Use if/else if chains or a switch on a computed bucket - your choice.

function classifyGrade(score) {
  // your code here
}

console.log(classifyGrade(95)); // 'A'
console.log(classifyGrade(82)); // 'B'
console.log(classifyGrade(58)); // 'F'`,
      instructions: 'Implement classifyGrade using if/else if comparisons (or a switch statement) so it returns the correct letter grade for any numeric score from 0-100.',
    },
    quiz: [
      {
        question: 'What does the expression 0 || "fallback" evaluate to?',
        choices: ['0', '"fallback"', 'false', 'undefined'],
        correctIndex: 1,
      },
      {
        question: 'What does the expression 0 ?? "fallback" evaluate to?',
        choices: ['0', '"fallback"', 'undefined', 'NaN'],
        correctIndex: 0,
      },
      {
        question: 'In a switch statement, what happens if a matching case has no break statement?',
        choices: [
          'A SyntaxError is thrown',
          'Execution stops immediately after that case',
          'Execution falls through and runs the next case\'s statements too',
          'The default case runs instead',
        ],
        correctIndex: 2,
      },
      {
        question: 'Which operator is best suited to choosing between two short expressions inline, such as inside a function call argument?',
        choices: ['switch', 'the ternary operator (?:)', 'for...of', 'try/catch'],
        correctIndex: 1,
      },
      {
        question: 'What does the && operator return when its left operand is truthy?',
        choices: ['true', 'the left operand', 'the right operand', 'false'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'corejs-03-functions-scope',
    title: 'Functions & Scope',
    explanation: `Functions are the primary unit of reusable behavior in JavaScript, and there are three common ways to create one. A **function declaration** (\`function greet() {}\`) is hoisted entirely, so it can be called before its definition appears in the file. A **function expression** (\`const greet = function () {}\`) is only usable after the line where it's assigned. An **arrow function** (\`const greet = () => {}\`) is a compact expression form with two key differences from the others: it has no own \`this\` (it inherits \`this\` from the surrounding scope) and it cannot be used as a constructor.

\`\`\`js
function add(a, b) { return a + b; }       // declaration
const sub = function (a, b) { return a - b; }; // expression
const mul = (a, b) => a * b;                // arrow, implicit return
\`\`\`

Scope determines where a variable is visible. JavaScript uses **lexical scoping**: a function's access to variables is determined by where it is *written* in the source code, not by who calls it. \`let\` and \`const\` are block-scoped, meaning they only exist inside the nearest \`{ }\` that contains them — including \`if\` blocks and \`for\` loops. \`var\`, by contrast, is function-scoped, ignoring block boundaries entirely, which is one of the main reasons modern code avoids it.

Nested functions can see variables from every enclosing scope, forming a chain the engine searches outward through when resolving a name. If a variable isn't found in the current function, JS looks in the function that contains it, and so on, up to the global scope. This chain of nested lexical scopes is also the foundation that makes closures possible, which you'll explore in a later lesson.`,
    example: {
      code: `// function declaration - hoisted
console.log(square(4)); // works even though called before definition below
function square(n) {
  return n * n;
}

// function expression - not hoisted (would throw if called above this line)
const cube = function (n) {
  return n * n * n;
};
console.log(cube(3));

// arrow function - concise, inherits 'this' from enclosing scope
const double = (n) => n * 2;
console.log(double(5));

// lexical scope: nested functions see outer variables
function outer() {
  const outerValue = 'from outer';
  function inner() {
    console.log('inner sees:', outerValue);
  }
  inner();
}
outer();

// block scope with let/const vs function scope with var
if (true) {
  let blockScoped = 'only visible in this block';
  var functionScoped = 'visible in the whole function/script';
  console.log(blockScoped);
}
console.log(functionScoped); // still accessible
// console.log(blockScoped); // would throw ReferenceError if uncommented`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write an arrow function makeGreeting(name) that returns the string
// 'Hello, <name>!' and a regular function declaration shout(text) that
// returns text converted to uppercase with an exclamation mark appended.

const makeGreeting = (name) => {
  // your code here
};

function shout(text) {
  // your code here
}

console.log(makeGreeting('Sofia'));
console.log(shout('watch out'));`,
      instructions: 'Complete makeGreeting so it returns "Hello, <name>!" and shout so it returns the uppercased text followed by "!" (e.g. shout("watch out") returns "WATCH OUT!").',
    },
    quiz: [
      {
        question: 'Which function form is fully hoisted, allowing it to be called before its definition in the source?',
        choices: ['Arrow function', 'Function expression', 'Function declaration', 'None of these are hoisted'],
        correctIndex: 2,
      },
      {
        question: 'What determines a function\'s scope chain in JavaScript (lexical scoping)?',
        choices: [
          'The object the function is called on at runtime',
          'Where the function is physically written in the source code',
          'The order in which functions are called',
          'The number of arguments passed to it',
        ],
        correctIndex: 1,
      },
      {
        question: 'A variable declared with let inside an if block is:',
        choices: [
          'Visible throughout the entire enclosing function',
          'Visible only within that if block',
          'Automatically hoisted to the global scope',
          'Not accessible anywhere',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which of these is true about arrow functions compared to regular functions?',
        choices: [
          'Arrow functions have their own this binding',
          'Arrow functions can be used as constructors with new',
          'Arrow functions inherit this from their surrounding lexical scope',
          'Arrow functions are hoisted like declarations',
        ],
        correctIndex: 2,
      },
      {
        question: 'A variable declared with var inside a for loop block is scoped to:',
        choices: ['Only that loop iteration\'s block', 'The nearest enclosing function (or global scope)', 'The nearest enclosing object', 'It is not accessible at all'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-04-arrays-array-methods',
    title: 'Arrays & Array Methods',
    explanation: `Arrays are ordered lists of values, and JavaScript's built-in array methods let you transform them without writing manual loops. The three you'll use constantly are \`map\`, \`filter\`, and \`reduce\`. \`map\` creates a new array by applying a function to every element; \`filter\` creates a new array containing only the elements that pass a test function; \`reduce\` collapses the whole array down to a single value by repeatedly applying a combining function.

\`\`\`js
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);          // [2, 4, 6, 8, 10]
const evens = nums.filter(n => n % 2 === 0);    // [2, 4]
const sum = nums.reduce((acc, n) => acc + n, 0); // 15
\`\`\`

\`forEach\` is similar to \`map\` but doesn't build a new array — it's for side effects like logging, and its return value is always \`undefined\`. Because \`map\`, \`filter\`, and \`reduce\` all return new data rather than mutating the original array, they're called **non-mutating** methods, and chaining them together (\`arr.filter(...).map(...)\`) is a very common pattern for building small data pipelines.

Not every array method is non-mutating, though — \`push\`, \`pop\`, \`shift\`, \`unshift\`, \`splice\`, and \`sort\` all change the original array in place. Other frequently used methods include \`find\` (returns the first matching element, or \`undefined\`), \`some\` (true if any element passes a test), \`every\` (true if all elements pass), \`includes\` (checks for a value), and \`join\` (combines elements into a string). Knowing which methods mutate and which return a fresh array is essential for avoiding accidental bugs when the same array is used elsewhere in your program.`,
    example: {
      code: `const nums = [1, 2, 3, 4, 5];

const doubled = nums.map((n) => n * 2);
console.log('doubled:', doubled);

const evens = nums.filter((n) => n % 2 === 0);
console.log('evens:', evens);

const sum = nums.reduce((acc, n) => acc + n, 0);
console.log('sum:', sum);

// chaining: sum of squares of even numbers
const sumOfEvenSquares = nums
  .filter((n) => n % 2 === 0)
  .map((n) => n * n)
  .reduce((acc, n) => acc + n, 0);
console.log('sumOfEvenSquares:', sumOfEvenSquares);

// forEach for side effects only
nums.forEach((n) => console.log('visiting', n));

// find / some / every / includes
console.log('first > 3:', nums.find((n) => n > 3));
console.log('has an even number:', nums.some((n) => n % 2 === 0));
console.log('all positive:', nums.every((n) => n > 0));
console.log('includes 3:', nums.includes(3));

// mutating vs non-mutating
const original = [3, 1, 2];
const sorted = [...original].sort((a, b) => a - b); // copy first, then sort
console.log('original untouched:', original);
console.log('sorted copy:', sorted);`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Given an array of order totals, write a function summarizeOrders(orders)
// that returns an object { count, total, average } describing:
// - count: how many orders are over $0
// - total: sum of all order totals
// - average: total / count (0 if count is 0)

const orders = [42.5, 10, 0, 99.99, 15];

function summarizeOrders(orders) {
  // your code here, using filter/reduce
}

console.log(summarizeOrders(orders));`,
      instructions: 'Implement summarizeOrders using filter to keep totals greater than 0, then reduce to compute the sum, and derive count and average from that filtered list. Return { count, total, average }.',
    },
    quiz: [
      {
        question: 'Which array method returns a brand new array without mutating the original?',
        choices: ['sort', 'push', 'map', 'splice'],
        correctIndex: 2,
      },
      {
        question: 'What is the purpose of the second argument passed to reduce, e.g. reduce((acc, n) => acc + n, 0)?',
        choices: [
          'It sets the array length',
          'It provides the initial value of the accumulator',
          'It is the index to start iterating from',
          'It is ignored by reduce',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which method returns true if at least one element passes a test function?',
        choices: ['every', 'some', 'find', 'includes'],
        correctIndex: 1,
      },
      {
        question: 'What does forEach return?',
        choices: ['A new array', 'The last processed element', 'undefined', 'The original array'],
        correctIndex: 2,
      },
      {
        question: 'Which of the following array methods mutates the array it is called on?',
        choices: ['map', 'filter', 'splice', 'reduce'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'corejs-05-objects-object-methods',
    title: 'Objects & Object Methods',
    explanation: `Objects store data as key-value pairs and are the backbone of most JavaScript programs. You create one with an object literal, access properties with dot notation (\`obj.key\`) or bracket notation (\`obj["key"]\`, useful when the key is dynamic or not a valid identifier), and can attach functions as **methods**:

\`\`\`js
const person = {
  name: 'Ada',
  age: 30,
  greet() {
    return 'Hi, I am ' + this.name;
  },
};
person.greet(); // "Hi, I am Ada"
\`\`\`

Three static \`Object\` methods let you inspect an object's own enumerable properties as arrays, which is what makes it possible to loop over an object the same way you'd loop over an array: \`Object.keys(obj)\` returns an array of property names, \`Object.values(obj)\` returns an array of the corresponding values, and \`Object.entries(obj)\` returns an array of \`[key, value]\` pairs — perfect for destructuring in a \`for...of\` loop.

Other useful utilities include \`Object.assign(target, ...sources)\`, which copies properties from one or more source objects into a target (often used to merge configuration objects), and \`Object.freeze(obj)\`, which prevents any further changes to an object's properties. Property shorthand lets you write \`{ name, age }\` instead of \`{ name: name, age: age }\` when a variable's name matches the key you want. You can also check whether a key exists with the \`in\` operator or \`Object.hasOwn(obj, key)\` (the modern replacement for \`obj.hasOwnProperty(key)\`), which matters because \`obj.key\` being \`undefined\` doesn't necessarily mean the key is absent — it might just hold the value \`undefined\`.`,
    example: {
      code: `const person = {
  name: 'Ada',
  age: 30,
  greet() {
    return 'Hi, I am ' + this.name;
  },
};

console.log(person.greet());
console.log(person['name']); // bracket notation

// Object.keys / values / entries
console.log(Object.keys(person));
console.log(Object.values(person));
for (const [key, value] of Object.entries(person)) {
  console.log(key, '=>', value);
}

// property shorthand
const city = 'Boston';
const country = 'USA';
const location = { city, country };
console.log(location);

// Object.assign for merging
const defaults = { theme: 'light', fontSize: 14 };
const overrides = { fontSize: 18 };
const settings = Object.assign({}, defaults, overrides);
console.log(settings);

// checking for keys safely
console.log('name' in person);
console.log(Object.hasOwn(person, 'age'));
console.log(Object.hasOwn(person, 'email'));

// Object.freeze
const frozen = Object.freeze({ locked: true });
frozen.locked = false; // silently ignored (or throws in strict mode)
console.log(frozen.locked);`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a function totalInventoryValue(inventory) where inventory is an
// object mapping item names to { price, quantity }, e.g.
// { apple: { price: 0.5, quantity: 10 }, bread: { price: 2, quantity: 3 } }
// Return the total value: sum of price * quantity across all items.

const inventory = {
  apple: { price: 0.5, quantity: 10 },
  bread: { price: 2, quantity: 3 },
  milk: { price: 1.5, quantity: 4 },
};

function totalInventoryValue(inventory) {
  // your code here, using Object.values or Object.entries
}

console.log(totalInventoryValue(inventory));`,
      instructions: 'Implement totalInventoryValue using Object.values (or Object.entries) plus reduce to sum price * quantity for every item in the inventory object.',
    },
    quiz: [
      {
        question: 'What does Object.entries(obj) return?',
        choices: [
          'An array of property names',
          'An array of property values',
          'An array of [key, value] pairs',
          'A copy of the object',
        ],
        correctIndex: 2,
      },
      {
        question: 'Which notation must you use to access a property whose name is stored in a variable, e.g. a variable key?',
        choices: ['obj.key', 'obj[key]', 'obj->key', 'obj::key'],
        correctIndex: 1,
      },
      {
        question: 'What is property shorthand syntax used for?',
        choices: [
          'Writing { name } instead of { name: name } when the variable name matches the key',
          'Deleting a property from an object',
          'Freezing an object',
          'Converting an object to an array',
        ],
        correctIndex: 0,
      },
      {
        question: 'What does Object.freeze(obj) do?',
        choices: [
          'Deep clones the object',
          'Prevents further changes to the object\'s properties',
          'Converts the object to JSON',
          'Removes all methods from the object',
        ],
        correctIndex: 1,
      },
      {
        question: 'Why might Object.hasOwn(obj, "key") be preferred over checking if obj.key is undefined?',
        choices: [
          'It is faster in every JS engine',
          'A property can exist and legitimately hold the value undefined',
          'obj.key always throws an error',
          'hasOwn works on arrays only',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-06-destructuring-spread-rest',
    title: 'Destructuring & Spread/Rest',
    explanation: `Destructuring lets you unpack values from arrays or properties from objects into individual variables in a single expression, instead of accessing them one at a time. Array destructuring matches by position; object destructuring matches by property name and can rename or provide defaults:

\`\`\`js
const [first, second] = [10, 20];
const { name, age = 18 } = { name: 'Kai' }; // age defaults to 18
const { name: fullName } = { name: 'Kai' }; // renamed to fullName
\`\`\`

The **spread operator** (\`...\`) expands an iterable (array, string, or an object's own properties) into individual elements. It's commonly used to copy arrays or objects without mutating the original (\`const copy = [...original]\`), to merge multiple arrays or objects together, or to pass an array's elements as separate function arguments (\`Math.max(...numbers)\`).

The **rest** pattern looks identical (\`...\`) but does the opposite: it *collects* multiple remaining items into a single array or object, rather than expanding one. You'll see it most often in function parameter lists, where it gathers any number of extra arguments (\`function sum(...nums) {}\`), and in destructuring, where it captures whatever wasn't explicitly pulled out (\`const [first, ...rest] = arr\`).

The key to telling spread and rest apart isn't the syntax — they look the same — but the *position*: spread appears where a value is being provided (inside an array/object literal or a function call), while rest appears where a value is being received (in a parameter list or a destructuring pattern). Both make code more declarative than manually indexing into arrays or looping to build a subset of properties.`,
    example: {
      code: `// array destructuring
const point = [3, 7];
const [x, y] = point;
console.log('x:', x, 'y:', y);

// skipping elements and default values
const [, second, third = 'fallback'] = [1, 2];
console.log('second:', second, 'third:', third);

// object destructuring with rename and default
const user = { name: 'Kai', role: 'admin' };
const { name: userName, permissions = [] } = user;
console.log(userName, permissions);

// spread: copying and merging
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];
console.log('merged array:', merged);

const base = { theme: 'dark' };
const extended = { ...base, fontSize: 16 };
console.log('merged object:', extended);

// spread into a function call
const nums = [4, 9, 1, 7];
console.log('max:', Math.max(...nums));

// rest: gathering remaining items
function sum(...values) {
  return values.reduce((acc, v) => acc + v, 0);
}
console.log('sum of 1,2,3,4:', sum(1, 2, 3, 4));

const [head, ...tail] = [10, 20, 30, 40];
console.log('head:', head, 'tail:', tail);`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a function mergeSettings(base, overrides) that returns a new
// object combining base and overrides, where overrides wins on conflicts,
// WITHOUT mutating either input. Then write splitScores(scores) that
// destructures an array into { first, second, rest } using array
// destructuring and rest syntax.

function mergeSettings(base, overrides) {
  // your code here, using spread
}

function splitScores(scores) {
  // your code here: destructure scores into first, second, and the rest
  // return { first, second, rest }
}

console.log(mergeSettings({ a: 1, b: 2 }, { b: 3, c: 4 }));
console.log(splitScores([100, 95, 80, 70]));`,
      instructions: 'Implement mergeSettings using object spread so overrides properties win. Implement splitScores using array destructuring with a rest element to pull out the first two scores and collect the remainder into rest, then return { first, second, rest }.',
    },
    quiz: [
      {
        question: 'What is the main difference between spread and rest syntax, given they both use "..."?',
        choices: [
          'Spread only works on arrays, rest only works on objects',
          'Spread expands values, rest collects values, distinguished by position',
          'They are exactly the same in every context',
          'Rest can only be used in return statements',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does const { name: fullName } = { name: "Kai" } do?',
        choices: [
          'Creates a variable named "name" with value "Kai"',
          'Creates a variable named fullName with value "Kai"',
          'Throws a SyntaxError',
          'Creates two variables, name and fullName',
        ],
        correctIndex: 1,
      },
      {
        question: 'Given const [, second] = [1, 2, 3], what is the value of second?',
        choices: ['1', '2', '3', 'undefined'],
        correctIndex: 1,
      },
      {
        question: 'Where would you typically use rest syntax in a function definition?',
        choices: [
          'Inside the function body to copy an object',
          'In the parameter list to collect any extra arguments into an array',
          'As the return value only',
          'Only inside a class constructor',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does [...originalArray] produce?',
        choices: [
          'A reference to the same array',
          'A shallow copy of the array',
          'A deep clone including nested objects',
          'undefined',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-07-closures',
    title: 'Closures',
    explanation: `A closure is what you get when a function "remembers" the variables from the scope it was created in, even after that outer scope has finished running. This isn't a special syntax — it's just a natural consequence of lexical scoping: any function has access to the variables in the scopes that enclose it, for as long as that function exists.

\`\`\`js
function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2 - count persisted between calls!
\`\`\`

In the example above, \`makeCounter\` returns an inner function that references \`count\`. Normally you'd expect \`count\` to disappear once \`makeCounter\` finishes executing, but because the returned function still references it, JavaScript keeps that variable alive in memory. Each call to \`makeCounter()\` creates a *fresh* \`count\`, so multiple counters created this way are completely independent of each other.

Closures are the mechanism behind many practical patterns. **Private state**: since the inner function is the only thing with access to \`count\`, outside code cannot reach in and set it directly — this is how JavaScript simulates private variables. **Memoization**: a closure can hold a cache object that persists across calls, so a function can remember previously computed results and skip redundant work. **Function factories**: a function that returns a specialized version of itself, like \`makeMultiplier(3)\` returning a function that always multiplies by 3, each remembering their own configuration.

Because closures keep their captured variables alive, they're also a common source of subtle memory retention if you're not careful — but for the vast majority of everyday JavaScript, they're simply how state gets attached to functions without needing a class.`,
    example: {
      code: `// classic counter closure
function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counterA = makeCounter();
const counterB = makeCounter();
console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterB()); // 1 - independent closure, own 'count'

// function factory
function makeMultiplier(factor) {
  return function (n) {
    return n * factor;
  };
}
const triple = makeMultiplier(3);
console.log(triple(7)); // 21

// memoization using a closure over a cache object
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (n in cache) {
      console.log('cache hit for', n);
      return cache[n];
    }
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

function slowSquare(n) {
  return n * n;
}
const fastSquare = memoize(slowSquare);
console.log(fastSquare(5)); // computes
console.log(fastSquare(5)); // cache hit`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a function createBankAccount(initialBalance) that returns an
// object with two closures: deposit(amount) and getBalance().
// The balance must be private - not directly accessible from outside,
// only through these two functions.

function createBankAccount(initialBalance) {
  // your code here
}

const account = createBankAccount(100);
account.deposit(50);
account.deposit(25);
console.log(account.getBalance()); // should print 175`,
      instructions: 'Implement createBankAccount so it declares a local "balance" variable initialized to initialBalance, then returns { deposit, getBalance } where deposit adds to balance and getBalance returns the current balance, both closing over the same private variable.',
    },
    quiz: [
      {
        question: 'What is a closure in JavaScript?',
        choices: [
          'A function that has no parameters',
          'A function that remembers the variables from the scope where it was created',
          'A way to close a file handle',
          'An object that cannot be modified',
        ],
        correctIndex: 1,
      },
      {
        question: 'In the makeCounter example, why do counterA and counterB return independent sequences of numbers?',
        choices: [
          'Because count is a global variable shared by reference',
          'Because each call to makeCounter() creates a new, separate count variable',
          'Because JavaScript resets closures every second',
          'They actually are not independent - this is a trick question',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is one practical use of closures shown in the lesson?',
        choices: ['Declaring global variables', 'Simulating private state that cannot be accessed directly from outside', 'Making functions run faster automatically', 'Converting arrays to objects'],
        correctIndex: 1,
      },
      {
        question: 'After an outer function finishes executing, what happens to a variable it declared if an inner function (returned from it) still references that variable?',
        choices: [
          'The variable is immediately garbage collected',
          'The variable is reset to undefined',
          'The variable stays alive because the closure keeps a reference to it',
          'A ReferenceError is thrown on next access',
        ],
        correctIndex: 2,
      },
      {
        question: 'What does the memoize function in the example cache?',
        choices: [
          'The function definition itself',
          'Previously computed results, keyed by input',
          'Nothing - it just logs every call',
          'Only the most recent call',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-08-this-and-context',
    title: '"this" & Context',
    explanation: `\`this\` is a special keyword whose value depends entirely on *how* a function is called, not where it's defined (with one important exception: arrow functions). This is confusing at first because the same function can produce different values of \`this\` depending on the call site.

When a function is called as a method (\`obj.method()\`), \`this\` is the object before the dot — \`obj\`. When a function is called plainly (\`someFunction()\`), \`this\` is \`undefined\` in strict mode (or the global object in non-strict "sloppy" mode). When a function is called with \`new\` (\`new Ctor()\`), \`this\` is the freshly created instance.

\`\`\`js
const obj = {
  value: 42,
  getValue() { return this.value; },
};
obj.getValue();              // 42 - this is obj
const detached = obj.getValue;
detached();                  // undefined - this is lost, called plainly
\`\`\`

That "losing this" problem is extremely common — passing a method as a callback detaches it from its object. Three tools fix it explicitly: \`fn.call(thisArg, ...args)\` calls \`fn\` immediately with \`this\` set to \`thisArg\`; \`fn.apply(thisArg, argsArray)\` does the same but takes arguments as an array; \`fn.bind(thisArg)\` doesn't call \`fn\` — it returns a *new* function permanently locked to that \`this\`, which you can call later or pass as a callback safely.

Arrow functions sidestep the whole problem: they don't have their own \`this\` at all. Instead, they capture \`this\` lexically from the scope where they were *written*, just like a regular variable. This makes arrow functions ideal for callbacks nested inside a method, where you want \`this\` to keep referring to the outer object rather than being reset by however the callback happens to be invoked.`,
    example: {
      code: `const obj = {
  value: 42,
  getValue() {
    return this.value;
  },
};
console.log(obj.getValue()); // 42, this = obj

const detached = obj.getValue;
console.log(detached()); // undefined, this is lost when called plainly

// fixing it with bind
const bound = obj.getValue.bind(obj);
console.log(bound()); // 42, this is permanently obj

// call and apply
function introduce(greeting) {
  return greeting + ', I am ' + this.name;
}
const person = { name: 'Nia' };
console.log(introduce.call(person, 'Hello'));
console.log(introduce.apply(person, ['Hi']));

// arrow functions inherit 'this' lexically
const timerLike = {
  label: 'session',
  start() {
    // arrow function captures 'this' from start()'s scope, i.e. timerLike
    const tick = () => {
      console.log('ticking for', this.label);
    };
    tick();
  },
};
timerLike.start();

// a regular function used the same way would lose 'this'
const broken = {
  label: 'broken-session',
  start() {
    function tick() {
      console.log('this.label is:', this && this.label);
    }
    tick();
  },
};
broken.start();`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// The 'user' object has a method whoAmI that uses 'this'. A callback
// version, whoAmICallback, is meant to be called detached (like a
// setTimeout callback) and should still correctly report the user's name.
// Fix whoAmICallback using bind so it always refers to 'user' regardless
// of how it is invoked.

const user = {
  name: 'Marta',
  whoAmI() {
    return 'I am ' + this.name;
  },
};

// This detached call currently loses 'this':
const detached = user.whoAmI;

let whoAmICallback; // your code here: bind user.whoAmI to user

console.log(whoAmICallback());`,
      instructions: 'Assign whoAmICallback = user.whoAmI.bind(user) so that calling whoAmICallback() later, detached from the object, still returns "I am Marta".',
    },
    quiz: [
      {
        question: 'What determines the value of "this" inside a regular (non-arrow) function?',
        choices: [
          'Where the function is defined in the source code',
          'How the function is called (the call site)',
          'The number of arguments passed to it',
          'The function\'s name',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is special about how arrow functions handle "this"?',
        choices: [
          'They always set this to the global object',
          'They throw an error if this is accessed',
          'They inherit this lexically from the enclosing scope, never having their own',
          'They require this to be passed as the first argument',
        ],
        correctIndex: 2,
      },
      {
        question: 'What does fn.bind(obj) return?',
        choices: [
          'The result of calling fn with this set to obj',
          'A new function permanently bound to obj as this',
          'undefined',
          'A copy of obj with fn attached as a method',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the key difference between call() and apply()?',
        choices: [
          'call sets this permanently, apply does not',
          'apply accepts arguments as an array, call accepts them individually',
          'call only works on arrow functions',
          'There is no difference',
        ],
        correctIndex: 1,
      },
      {
        question: 'If obj.method is detached into a plain variable and then called without an object (e.g. const fn = obj.method; fn();), what typically happens to "this" in strict mode?',
        choices: [
          'this stays bound to obj',
          'this becomes undefined',
          'A SyntaxError is thrown',
          'this becomes the global object automatically',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-09-prototypes',
    title: 'Prototypes & Prototypal Inheritance',
    explanation: `Every JavaScript object has an internal link to another object called its **prototype**, which it can delegate property and method lookups to. When you access \`obj.someProperty\` and \`someProperty\` isn't found directly on \`obj\`, the engine automatically checks \`obj\`'s prototype, then that prototype's prototype, and so on, until it either finds the property or reaches the end of the chain (\`null\`). This chain of linked objects is called the **prototype chain**, and it's how JavaScript implements inheritance — objects can share behavior by delegating to a common prototype instead of each copying it.

\`\`\`js
const animal = {
  speak() { return this.name + ' makes a sound'; },
};
const dog = Object.create(animal); // dog's prototype is animal
dog.name = 'Rex';
dog.speak(); // "Rex makes a sound" - found via the prototype chain
\`\`\`

\`Object.create(proto)\` is the most direct way to create a new object with a specific prototype, as shown above. Every object literal you create with \`{}\` automatically gets \`Object.prototype\` as its prototype, which is why methods like \`toString()\` or \`hasOwnProperty()\` work on plain objects even though you never defined them — they live on \`Object.prototype\`, at the end of every chain.

Historically, you could inspect or set an object's prototype directly through the special \`__proto__\` accessor property, though modern code prefers the explicit \`Object.getPrototypeOf(obj)\` and \`Object.setPrototypeOf(obj, proto)\` functions instead. Functions also have a \`.prototype\` property (not to be confused with an object's own hidden prototype link) that becomes the prototype of any object created by calling that function with \`new\` — this is the mechanism that class syntax is built on top of, as you'll see in the next lesson. Understanding prototypes demystifies why JavaScript classes behave differently from classes in languages like Java: under the hood, it's still just objects delegating to other objects.`,
    example: {
      code: `const animal = {
  speak() {
    return this.name + ' makes a sound';
  },
};

// dog's prototype is animal - dog delegates lookups it can't satisfy itself
const dog = Object.create(animal);
dog.name = 'Rex';
console.log(dog.speak()); // found via the prototype chain

// dog does not "own" speak - it's inherited
console.log(Object.hasOwn(dog, 'speak'));   // false
console.log(Object.hasOwn(dog, 'name'));    // true

// inspecting the chain
console.log(Object.getPrototypeOf(dog) === animal); // true

// every plain object inherits from Object.prototype
const plain = {};
console.log(typeof plain.toString); // 'function' - inherited, not own

// constructor functions and .prototype
function Cat(name) {
  this.name = name;
}
Cat.prototype.speak = function () {
  return this.name + ' says meow';
};
const whiskers = new Cat('Whiskers');
console.log(whiskers.speak());
console.log(Object.getPrototypeOf(whiskers) === Cat.prototype); // true

// building a small chain manually
const shape = { describe() { return 'a shape'; } };
const circle = Object.create(shape);
circle.describe = function () {
  return 'a circle, which is also ' + shape.describe.call(this);
};
console.log(circle.describe());`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Using Object.create, build a prototype chain: 'vehicle' has a method
// describe() returning 'a vehicle'. Create 'car', whose prototype is
// vehicle, and give car its own describe() that returns 'a car' (do not
// call vehicle's describe from inside it for this exercise).
// Then create myCar = Object.create(car) with a property make = 'Toyota'.

const vehicle = {
  describe() {
    return 'a vehicle';
  },
};

// your code here: create car with vehicle as its prototype,
// and myCar with car as its prototype

console.log(myCar.describe()); // 'a car'
console.log(myCar.make);       // 'Toyota'
console.log(Object.getPrototypeOf(myCar) === car);       // true
console.log(Object.getPrototypeOf(car) === vehicle);     // true`,
      instructions: 'Create const car = Object.create(vehicle) and override describe on car to return "a car". Then create const myCar = Object.create(car) and set myCar.make = "Toyota".',
    },
    quiz: [
      {
        question: 'What happens when you access a property on an object that is not found directly on that object?',
        choices: [
          'JavaScript throws a ReferenceError immediately',
          'JavaScript returns null automatically',
          'JavaScript looks up the prototype chain for the property',
          'JavaScript creates the property automatically',
        ],
        correctIndex: 2,
      },
      {
        question: 'What does Object.create(proto) do?',
        choices: [
          'Creates a deep clone of proto',
          'Creates a new object whose prototype is proto',
          'Freezes proto',
          'Deletes proto',
        ],
        correctIndex: 1,
      },
      {
        question: 'Why does an empty object literal {} have access to methods like toString()?',
        choices: [
          'toString is copied onto every new object automatically',
          'JavaScript defines it as a global function',
          'It is inherited via the prototype chain from Object.prototype',
          'It is a syntax feature unrelated to prototypes',
        ],
        correctIndex: 2,
      },
      {
        question: 'What is the modern, explicit alternative to using __proto__ for reading an object\'s prototype?',
        choices: ['Object.keys(obj)', 'Object.getPrototypeOf(obj)', 'obj.constructor', 'JSON.parse(obj)'],
        correctIndex: 1,
      },
      {
        question: 'What does a function\'s .prototype property become when the function is called with new?',
        choices: [
          'It is ignored entirely',
          'It becomes the prototype of the newly created instance',
          'It becomes a copy stored on the instance directly',
          'It replaces the function itself',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-10-classes',
    title: 'Classes',
    explanation: `Class syntax, introduced in ES2015, gives JavaScript a cleaner way to create objects that share behavior through the prototype chain — it's largely "syntactic sugar" over the prototype mechanics from the previous lesson, not a fundamentally different inheritance model. A class defines a \`constructor\` (which runs when you create an instance with \`new\`) and any number of methods, which are automatically placed on the class's prototype so every instance shares them without duplicating memory.

\`\`\`js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + ' makes a sound';
  }
}
const rex = new Animal('Rex');
rex.speak(); // "Rex makes a sound"
\`\`\`

The \`extends\` keyword lets one class inherit from another, and \`super\` is used two ways inside the subclass: called as a function (\`super(...)\`) inside the constructor, it invokes the parent's constructor and must run before you can use \`this\`; called as \`super.methodName()\` inside a method, it calls the parent's version of that method, which is useful when you want to extend rather than completely replace inherited behavior.

\`\`\`js
class Dog extends Animal {
  speak() {
    return super.speak() + ' (specifically, a bark)';
  }
}
\`\`\`

Classes also support \`static\` methods and properties, which belong to the class itself rather than to instances (\`Animal.create(...)\` rather than \`rex.create(...)\`), and getter/setter methods (\`get\`/\`set\`) that let a property read like a plain field while running custom logic behind the scenes. Fields can be declared directly in the class body (\`name = 'default'\`) as a shorthand for assigning them in the constructor. Under the hood, every instance created from a class still gets its methods via the prototype chain — \`rex.speak\` is found by walking up to \`Animal.prototype\`, exactly like the manual \`Object.create\` chains from the previous lesson.`,
    example: {
      code: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + ' makes a sound';
  }
  static create(name) {
    return new Animal(name);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // must call before using 'this'
    this.breed = breed;
  }
  speak() {
    return super.speak() + ' (specifically, a bark, ' + this.breed + ')';
  }
}

const rex = new Dog('Rex', 'Labrador');
console.log(rex.speak());
console.log(rex instanceof Dog);
console.log(rex instanceof Animal);

// static method - called on the class, not an instance
const fromStatic = Animal.create('Generic Animal');
console.log(fromStatic.speak());

// class fields and getters/setters
class Temperature {
  celsius = 0;
  get fahrenheit() {
    return this.celsius * 9 / 5 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5 / 9;
  }
}
const temp = new Temperature();
temp.celsius = 100;
console.log(temp.fahrenheit); // computed via getter

temp.fahrenheit = 32;
console.log(Math.round(temp.celsius)); // computed via setter`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Create a class Shape with a constructor(name) and a method area()
// that returns 0 by default. Then create a class Rectangle that extends
// Shape, with a constructor(width, height) that calls super('Rectangle')
// and stores width/height, overriding area() to return width * height.

class Shape {
  // your code here
}

class Rectangle extends Shape {
  // your code here
}

const rect = new Rectangle(4, 5);
console.log(rect.name); // 'Rectangle'
console.log(rect.area()); // 20
console.log(rect instanceof Shape); // true`,
      instructions: 'Implement Shape with a constructor that stores this.name = name and an area() method returning 0. Implement Rectangle extends Shape whose constructor calls super("Rectangle"), stores width and height, and overrides area() to return width * height.',
    },
    quiz: [
      {
        question: 'What must be called before using "this" inside a subclass constructor?',
        choices: ['this.init()', 'super()', 'Object.create()', 'new.target()'],
        correctIndex: 1,
      },
      {
        question: 'What are class methods actually attached to under the hood?',
        choices: [
          'Each individual instance, duplicated per object',
          'The class\'s prototype, shared by all instances',
          'The global object',
          'Nothing - they are recreated on every call',
        ],
        correctIndex: 1,
      },
      {
        question: 'How do you call a static method on a class named Animal?',
        choices: ['new Animal().staticMethod()', 'Animal.staticMethod()', 'Animal.prototype.staticMethod()', 'static Animal.staticMethod()'],
        correctIndex: 1,
      },
      {
        question: 'Inside an overriding method, what does super.methodName() do?',
        choices: [
          'Calls the parent class\'s version of that method',
          'Deletes the method from the current class',
          'Creates a new static method',
          'Throws an error unless overridden',
        ],
        correctIndex: 0,
      },
      {
        question: 'What is the purpose of a getter defined with the "get" keyword in a class?',
        choices: [
          'It makes a property read-only permanently',
          'It lets a property be accessed like a plain field while running custom logic',
          'It converts the class into a static class',
          'It is required for every class property',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-11-higher-order-functions',
    title: 'Higher-Order Functions & Functional Patterns',
    explanation: `In JavaScript, functions are **first-class values**: they can be stored in variables, passed as arguments to other functions, and returned from functions, just like numbers or strings. A **higher-order function** is any function that takes another function as an argument, returns a function, or both. You've already used several without necessarily naming them that way — \`map\`, \`filter\`, and \`reduce\` are all higher-order functions because they accept a function argument that customizes their behavior.

\`\`\`js
function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}
repeat(3, (i) => console.log('iteration', i));
\`\`\`

Treating functions as data enables **function composition**: building a complex operation by chaining together several small, focused functions, each doing one thing well. A simple \`compose\` or \`pipe\` helper takes a list of functions and returns a new function that runs the input through each of them in sequence, similar in spirit to chaining array methods like \`.filter().map()\`, but generalized to any functions.

\`\`\`js
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
const addOne = (n) => n + 1;
const double = (n) => n * 2;
pipe(addOne, double)(3); // (3+1)*2 = 8
\`\`\`

Another common pattern is a **decorator**, or wrapper function: a higher-order function that takes a function and returns a new function with extra behavior layered on, without modifying the original — for example, a function that logs every call to another function, or one that only allows a function to run once. These patterns favor small, composable, reusable pieces of logic over long, monolithic functions, and they're the foundation for utilities like debounce and memoize that you'll build in the capstone lesson.`,
    example: {
      code: `// functions as values
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, (i) => console.log('iteration', i));

// function composition with pipe
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
const addOne = (n) => n + 1;
const double = (n) => n * 2;
const addOneThenDouble = pipe(addOne, double);
console.log(addOneThenDouble(3)); // (3+1)*2 = 8

// a decorator: wraps a function with logging, without changing the original
function withLogging(fn) {
  return function (...args) {
    console.log('calling with', args);
    const result = fn(...args);
    console.log('returned', result);
    return result;
  };
}
function add(a, b) {
  return a + b;
}
const loggedAdd = withLogging(add);
loggedAdd(2, 3);

// a decorator that only allows a function to run once
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}
const initialize = once(() => {
  console.log('initializing...');
  return 'initialized';
});
console.log(initialize());
console.log(initialize()); // runs only the first time, reuses result`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a higher-order function negate(predicate) that takes a predicate
// function (one that returns true/false) and returns a NEW function that
// returns the opposite boolean result for the same inputs.

function negate(predicate) {
  // your code here
}

const isEven = (n) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isOdd(3)); // true
console.log(isOdd(4)); // false

console.log([1, 2, 3, 4, 5].filter(isOdd)); // [1, 3, 5]`,
      instructions: 'Implement negate so it returns a new function that calls predicate with the same arguments and returns the boolean opposite of the result.',
    },
    quiz: [
      {
        question: 'What makes a function "higher-order"?',
        choices: [
          'It runs faster than other functions',
          'It takes a function as an argument, returns a function, or both',
          'It is declared with the function keyword instead of an arrow',
          'It has more than three parameters',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which built-in array methods are examples of higher-order functions?',
        choices: ['length and push', 'map, filter, and reduce', 'typeof and instanceof', 'JSON.stringify and JSON.parse'],
        correctIndex: 1,
      },
      {
        question: 'What does the pipe(...fns) pattern in the example accomplish?',
        choices: [
          'It runs all functions in parallel',
          'It returns a function that passes a value through each function in sequence',
          'It merges multiple objects together',
          'It only calls the first function provided',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does the "once" decorator in the example ensure?',
        choices: [
          'The wrapped function throws an error on the second call',
          'The wrapped function only actually executes its logic on the first call, reusing the cached result afterward',
          'The wrapped function runs exactly once per second',
          'The wrapped function cannot take arguments',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does it mean for functions to be "first-class values" in JavaScript?',
        choices: [
          'Functions can be stored in variables, passed as arguments, and returned from other functions, just like any other value',
          'Functions automatically run faster than loops',
          'Only some functions can be assigned to variables',
          'Functions cannot be nested inside other functions',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'corejs-12-error-handling',
    title: 'Error Handling',
    explanation: `When something goes wrong at runtime, JavaScript can \`throw\` a value — conventionally an \`Error\` object — which immediately stops normal execution and starts unwinding the call stack looking for a handler. A \`try\`/\`catch\` block is that handler: code that might fail goes in \`try\`, and if anything inside it throws, control jumps to \`catch\`, where you receive the thrown value (usually the error) and can decide how to recover or report it.

\`\`\`js
try {
  JSON.parse('not valid json');
} catch (err) {
  console.log('Failed to parse:', err.message);
}
\`\`\`

An optional \`finally\` block runs after \`try\`/\`catch\` regardless of whether an error was thrown or caught — useful for cleanup code, like closing a resource, that must always happen. Built-in \`Error\` objects carry a \`message\` (human-readable description) and a \`name\` (the error type, like \`"TypeError"\` or \`"RangeError"\`). You can throw your own errors with \`throw new Error('something went wrong')\` any time your code detects an invalid state it can't recover from locally.

For richer error handling, you can define **custom error classes** by extending the built-in \`Error\`:

\`\`\`js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
\`\`\`

This lets calling code distinguish between different failure categories using \`instanceof\` (\`if (err instanceof ValidationError)\`) rather than parsing error message strings, which is fragile. A good rule of thumb: throw errors for truly exceptional, programmer-facing situations (invalid arguments, broken invariants), and use ordinary return values (like \`null\`, or a result object) for expected, recoverable outcomes such as "user not found." Wrapping only the specific lines that can fail in \`try\` — rather than an entire large function — also makes it much easier to know exactly what a given \`catch\` block is actually handling.`,
    example: {
      code: `// basic try/catch/finally
function parseConfig(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.log('Failed to parse config:', err.message);
    return null;
  } finally {
    console.log('parseConfig attempt finished');
  }
}
console.log(parseConfig('{"valid": true}'));
console.log(parseConfig('not json at all'));

// throwing your own errors
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}
try {
  divide(10, 0);
} catch (err) {
  console.log('Caught:', err.message, '| name:', err.name);
}

// custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateAge(age) {
  if (typeof age !== 'number' || age < 0) {
    throw new ValidationError('Age must be a non-negative number');
  }
  return age;
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.log('Validation problem:', err.message);
  } else {
    console.log('Unexpected error:', err.message);
  }
}`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a custom error class InsufficientFundsError extending Error,
// setting this.name = 'InsufficientFundsError'. Then write a function
// withdraw(balance, amount) that throws InsufficientFundsError if amount
// is greater than balance, otherwise returns balance - amount.
// Wrap a sample call in try/catch and log a friendly message on failure.

class InsufficientFundsError extends Error {
  // your code here
}

function withdraw(balance, amount) {
  // your code here
}

try {
  console.log(withdraw(100, 150));
} catch (err) {
  // your code here: check instanceof InsufficientFundsError and log a message
}`,
      instructions: 'Implement InsufficientFundsError with a constructor(message) that calls super(message) and sets this.name. Implement withdraw to throw new InsufficientFundsError(...) when amount > balance, otherwise return the new balance. In the catch block, check err instanceof InsufficientFundsError and console.log a friendly message using err.message.',
    },
    quiz: [
      {
        question: 'What happens to code execution immediately after a throw statement runs (if uncaught locally)?',
        choices: [
          'It continues to the next line as normal',
          'It stops and the call stack unwinds looking for a catch block',
          'It logs a warning but keeps running',
          'It restarts the current function',
        ],
        correctIndex: 1,
      },
      {
        question: 'When does code inside a finally block run?',
        choices: [
          'Only if an error was thrown',
          'Only if no error was thrown',
          'Always, whether or not an error was thrown or caught',
          'Only if the catch block is missing',
        ],
        correctIndex: 2,
      },
      {
        question: 'Why would you create a custom error class that extends Error?',
        choices: [
          'It is required for try/catch to work at all',
          'To let calling code distinguish error categories with instanceof rather than parsing message strings',
          'Custom errors run faster than built-in ones',
          'It automatically retries the failed operation',
        ],
        correctIndex: 1,
      },
      {
        question: 'What must a custom error subclass call before setting this.name in its constructor?',
        choices: ['this.name()', 'super(message)', 'Error.init()', 'new Error()'],
        correctIndex: 1,
      },
      {
        question: 'Which is generally better practice: using thrown errors for every possible outcome, including expected ones like "item not found"?',
        choices: [
          'Yes, always throw for any non-success outcome',
          'No - throw for truly exceptional cases, use return values for expected, recoverable outcomes',
          'Errors should never be thrown in JavaScript',
          'It does not matter, they are equivalent in every way',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-13-callbacks-and-promises',
    title: 'Async: Callbacks & Promises',
    explanation: `JavaScript is single-threaded, but it handles operations that take time — like network requests or timers — without blocking, using **asynchronous** patterns. The oldest pattern is the **callback**: you pass a function to an async operation, and it calls that function once the work is done.

\`\`\`js
function loadData(callback) {
  setTimeout(() => {
    callback(null, { id: 1, name: 'Item' });
  }, 0);
}
loadData((err, data) => {
  if (err) return console.log('error:', err);
  console.log('got:', data);
});
\`\`\`

Callbacks work, but chaining many of them (each needing the previous one's result) produces deeply nested code sometimes called "callback hell," and error handling has to be manually threaded through every callback. **Promises** were introduced to fix this. A \`Promise\` represents a value that will be available *eventually* — it starts in a \`pending\` state and settles into either \`fulfilled\` (success, with a value) or \`rejected\` (failure, with a reason), and once settled, it never changes again.

\`\`\`js
const promise = new Promise((resolve, reject) => {
  const ok = true;
  if (ok) resolve('done!');
  else reject(new Error('failed'));
});
promise
  .then((value) => console.log(value))
  .catch((err) => console.log('caught:', err));
\`\`\`

\`.then(onFulfilled, onRejected)\` registers callbacks for success and (optionally) failure; \`.catch(onRejected)\` is shorthand for handling only the rejection case; \`.finally(fn)\` runs regardless of outcome, just like \`try/finally\`. Crucially, \`.then\` always returns a *new* promise, which is what makes chaining work cleanly: \`promise.then(a).then(b).then(c)\` runs each step in order, and a single \`.catch\` at the end catches a failure from any step in the chain. \`Promise.all([p1, p2])\` waits for every promise in an array to fulfill (or rejects as soon as any one does), which is useful for running independent async operations concurrently.`,
    example: {
      code: `// callback style
function loadDataCallback(callback) {
  setTimeout(() => {
    callback(null, { id: 1, name: 'Widget' });
  }, 0);
}
loadDataCallback((err, data) => {
  if (err) {
    console.log('callback error:', err);
  } else {
    console.log('callback got:', data);
  }
});

// creating a promise
function loadDataPromise(shouldSucceed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ id: 2, name: 'Gadget' });
      } else {
        reject(new Error('failed to load'));
      }
    }, 0);
  });
}

loadDataPromise(true)
  .then((data) => {
    console.log('promise got:', data);
    return data.id; // chain: value passed to the next .then
  })
  .then((id) => console.log('chained id:', id))
  .catch((err) => console.log('would catch:', err.message))
  .finally(() => console.log('promise chain finished'));

loadDataPromise(false)
  .then((data) => console.log('never runs:', data))
  .catch((err) => console.log('caught rejection:', err.message));

// Promise.all runs independent promises concurrently
Promise.all([loadDataPromise(true), loadDataPromise(true)]).then((results) => {
  console.log('all results:', results);
});`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a function fetchUser(id) that returns a Promise. It should
// resolve with { id, name: 'User' + id } if id > 0, and reject with
// new Error('Invalid id') if id <= 0. Then chain .then/.catch to log
// the result for fetchUser(3) and the error for fetchUser(-1).

function fetchUser(id) {
  // your code here: return new Promise((resolve, reject) => { ... })
}

fetchUser(3)
  .then((user) => console.log('fetched:', user))
  .catch((err) => console.log('error:', err.message));

fetchUser(-1)
  .then((user) => console.log('fetched:', user))
  .catch((err) => console.log('error:', err.message));`,
      instructions: 'Implement fetchUser to return a new Promise that resolves synchronously (no need for setTimeout) with { id, name: "User" + id } when id > 0, and rejects with new Error("Invalid id") otherwise.',
    },
    quiz: [
      {
        question: 'What are the three possible states of a Promise?',
        choices: [
          'started, running, finished',
          'pending, fulfilled, rejected',
          'open, closed, error',
          'waiting, done, cancelled',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does .then() return?',
        choices: [
          'The resolved value directly',
          'undefined',
          'A new Promise, enabling chaining',
          'The original promise, unchanged',
        ],
        correctIndex: 2,
      },
      {
        question: 'What is a common problem with deeply nested callback-based async code?',
        choices: [
          'It runs faster than promises',
          'It becomes hard to read and error handling must be manually repeated at every level ("callback hell")',
          'It cannot handle asynchronous operations at all',
          'It requires no error handling',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does Promise.all([p1, p2]) do?',
        choices: [
          'Runs p1 and p2 one after another',
          'Waits for all given promises to fulfill (or rejects if any one rejects), running them concurrently',
          'Cancels all but the fastest promise',
          'Only resolves the first promise passed',
        ],
        correctIndex: 1,
      },
      {
        question: 'Inside a Promise executor function, how do you signal that the async operation succeeded?',
        choices: ['return the value', 'call reject(value)', 'call resolve(value)', 'throw the value'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'corejs-14-async-await',
    title: 'Async/Await',
    explanation: `\`async\`/\`await\` is syntax built on top of promises that lets asynchronous code read like ordinary synchronous code, without chains of \`.then()\` calls. Any function marked \`async\` automatically returns a promise, and inside it, the \`await\` keyword pauses execution at that line until the promise it's given settles, then resumes with the resolved value (or throws, if the promise rejected).

\`\`\`js
async function loadUser() {
  const user = await fetchUser(1); // pauses here until resolved
  console.log(user);
  return user;
}
\`\`\`

Because \`await\` only pauses the \`async\` function itself (not the whole program — JavaScript remains single-threaded and non-blocking under the hood), this reads top-to-bottom like synchronous code while still being fully asynchronous. Error handling becomes familiar too: instead of \`.catch()\`, you wrap \`await\` expressions in an ordinary \`try\`/\`catch\` block, and a rejected promise is caught exactly like a thrown exception.

\`\`\`js
async function safeLoad() {
  try {
    const user = await fetchUser(-1);
    console.log(user);
  } catch (err) {
    console.log('failed:', err.message);
  }
}
\`\`\`

A common mistake is awaiting promises one at a time when they don't depend on each other, which serializes work that could run concurrently. If you have several independent promises, start them all first, then await \`Promise.all([...])\` once, so they run in parallel rather than in sequence. \`await\` can only be used inside a function declared \`async\` (or, in modern module contexts, at the top level of a module) — using it in a regular function is a syntax error. Under the hood, \`async\`/\`await\` doesn't replace promises; every \`async\` function still returns one, and \`await\` is really just a more readable way of writing \`.then()\`.`,
    example: {
      code: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id > 0) {
      resolve({ id, name: 'User' + id });
    } else {
      reject(new Error('Invalid id'));
    }
  });
}

// basic async/await
async function loadUser() {
  const user = await fetchUser(1);
  console.log('loaded:', user);
  return user;
}

// error handling with try/catch around await
async function safeLoad(id) {
  try {
    const user = await fetchUser(id);
    console.log('safe load succeeded:', user);
  } catch (err) {
    console.log('safe load failed:', err.message);
  }
}

// running independent awaits sequentially vs concurrently
async function sequential() {
  const a = await fetchUser(1); // waits, then...
  const b = await fetchUser(2); // waits again, even though independent
  console.log('sequential:', a, b);
}

async function concurrent() {
  const [a, b] = await Promise.all([fetchUser(3), fetchUser(4)]); // both start immediately
  console.log('concurrent:', a, b);
}

// top-level async IIFE to run everything and observe output in order
(async () => {
  await loadUser();
  await safeLoad(5);
  await safeLoad(-1);
  await sequential();
  await concurrent();
  console.log('all async work complete');
})();`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write an async function getTotalStock(productIds) that, given an array
// of product ids, awaits fetchStock(id) for each one (they are independent,
// so use Promise.all to run them concurrently) and returns the sum of
// all their stock counts.

function fetchStock(id) {
  return new Promise((resolve) => {
    resolve(id * 10); // pretend stock count
  });
}

async function getTotalStock(productIds) {
  // your code here
}

(async () => {
  const total = await getTotalStock([1, 2, 3]);
  console.log('total stock:', total); // 10 + 20 + 30 = 60
})();`,
      instructions: 'Implement getTotalStock as an async function that maps productIds to an array of fetchStock(id) promises, awaits them all concurrently with Promise.all, and returns the sum of the resulting stock counts using reduce.',
    },
    quiz: [
      {
        question: 'What does the await keyword do inside an async function?',
        choices: [
          'It blocks the entire JavaScript engine until the promise resolves',
          'It pauses the async function until the given promise settles, then resumes with its value',
          'It converts a synchronous function into an asynchronous one permanently',
          'It cancels the promise',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does an async function always return?',
        choices: ['A plain value', 'undefined', 'A Promise', 'An array'],
        correctIndex: 2,
      },
      {
        question: 'How do you handle a rejected promise when using await?',
        choices: [
          'You cannot handle it - the program crashes',
          'Wrap the await expression in a try/catch block',
          'Use .then() instead, await does not support errors',
          'Rejected promises are silently ignored with await',
        ],
        correctIndex: 1,
      },
      {
        question: 'If you have three independent async operations to perform, what is the most efficient approach?',
        choices: [
          'Await each one in sequence, one after another',
          'Start all three, then await Promise.all([...]) so they run concurrently',
          'Only await the first one and ignore the rest',
          'Wrap each in its own separate async function with no relation',
        ],
        correctIndex: 1,
      },
      {
        question: 'Where can the await keyword be legally used?',
        choices: [
          'In any function, async or not',
          'Only inside an async function (or at the top level of a module)',
          'Only inside a class constructor',
          'Only inside a try block',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-15-generators-iterators',
    title: 'Generators & Iterators',
    explanation: `An **iterator** is any object that implements a \`next()\` method returning \`{ value, done }\`, where \`done\` becomes \`true\` once there are no more values. This protocol is what powers \`for...of\` loops, array/object spreading, and destructuring over iterables — anything that follows this shape can be looped over uniformly, whether it's an array, a string, a \`Map\`, or a custom object you write yourself.

**Generator functions**, declared with \`function*\` and using the \`yield\` keyword, are a convenient way to build iterators without manually tracking state. Calling a generator function doesn't run its body immediately — it returns a generator object (which is itself an iterator). Each call to \`.next()\` runs the function until it hits a \`yield\`, pauses there, and returns that yielded value; the next \`.next()\` call resumes exactly where it left off.

\`\`\`js
function* countUpTo(max) {
  let i = 1;
  while (i <= max) {
    yield i;
    i++;
  }
}
for (const n of countUpTo(3)) {
  console.log(n); // 1, 2, 3
}
\`\`\`

Because a generator only computes the next value when asked, generators are ideal for representing **lazy** or even **infinite** sequences — an infinite generator never actually runs forever in practice, because you simply stop calling \`.next()\` (or \`break\` out of the \`for...of\` loop) whenever you have enough values. This is memory-efficient compared to building a full array upfront, especially for sequences that could be very large or unbounded, such as an endless stream of Fibonacci numbers where you only ever need the first handful.

You can also implement the iterator protocol manually on a plain object by giving it a \`[Symbol.iterator]\` method that returns an object with \`next()\` — generators are simply the ergonomic shortcut for writing that method's logic without hand-rolling the \`{ value, done }\` bookkeeping yourself.`,
    example: {
      code: `// a basic generator
function* countUpTo(max) {
  let i = 1;
  while (i <= max) {
    yield i;
    i++;
  }
}

for (const n of countUpTo(3)) {
  console.log('counted:', n);
}

// manually driving an iterator with .next()
const iterator = countUpTo(2);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// an infinite generator - safe because we control how many values we take
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n;
    n++;
  }
}

function takeFirst(gen, count) {
  const results = [];
  const it = gen();
  for (let i = 0; i < count; i++) {
    results.push(it.next().value);
  }
  return results;
}
console.log(takeFirst(naturalNumbers, 5));

// a custom iterable object using Symbol.iterator
const fibonacciRange = {
  [Symbol.iterator]() {
    let [a, b] = [0, 1];
    let count = 0;
    return {
      next() {
        if (count++ >= 6) return { value: undefined, done: true };
        const value = a;
        [a, b] = [b, a + b];
        return { value, done: false };
      },
    };
  },
};
console.log([...fibonacciRange]);`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Write a generator function* evenNumbers(max) that yields every even
// number from 0 up to and including max (if max is even).
// Then collect its output into an array using spread, and log it.

function* evenNumbers(max) {
  // your code here
}

const result = [...evenNumbers(10)];
console.log(result); // [0, 2, 4, 6, 8, 10]`,
      instructions: 'Implement evenNumbers as a generator that loops from 0 to max, yielding only the even values (i % 2 === 0), so spreading it into an array produces [0, 2, 4, 6, 8, 10] for max = 10.',
    },
    quiz: [
      {
        question: 'What does a generator function return when it is called?',
        choices: [
          'The final computed value immediately',
          'A generator object that conforms to the iterator protocol',
          'undefined',
          'An array of all yielded values',
        ],
        correctIndex: 1,
      },
      {
        question: 'What shape does the object returned by calling .next() on an iterator have?',
        choices: [
          '{ result, complete }',
          '{ value, done }',
          'A plain value with no wrapper',
          '{ next, prev }',
        ],
        correctIndex: 1,
      },
      {
        question: 'Why are generators well-suited to representing infinite sequences?',
        choices: [
          'They precompute and store every value in memory ahead of time',
          'They compute values lazily, one at a time, only when .next() is called',
          'JavaScript automatically limits generators to 1000 values',
          'Infinite sequences are not actually possible with generators',
        ],
        correctIndex: 1,
      },
      {
        question: 'What keyword pauses a generator function and produces a value to the caller?',
        choices: ['return', 'await', 'yield', 'pause'],
        correctIndex: 2,
      },
      {
        question: 'What property must an object have to be usable in a for...of loop or spread syntax?',
        choices: [
          'A length property',
          'A [Symbol.iterator] method returning an iterator object',
          'A toString method',
          'It must be an instance of Array',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-16-modules',
    title: 'Modules (import/export)',
    explanation: `As a program grows, keeping everything in one file becomes unmanageable. JavaScript's **module system** lets you split code across multiple files, each with its own scope, and explicitly control what's shared between them. Inside a module file, anything not explicitly exported stays private to that file — there's no risk of accidentally leaking a helper variable into every other file, the way older "just include a bunch of script tags" approaches could.

A module **exports** the values, functions, or classes it wants to make available to others, and other modules **import** exactly what they need:

\`\`\`js
// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14159;
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add, PI } from './math.js';
add(2, 3);       // named import, matched by name
multiply(2, 3);  // default import, can be named anything locally
PI;               // 3.14159
\`\`\`

A module can have any number of **named exports** (each imported by matching name, optionally renamed with \`as\`) but at most one **default export** (imported under whatever local name you choose, without curly braces). Named exports are best for a module that provides several related utilities; a default export suits a module whose entire purpose is exporting one main thing, like a single class or component.

Because this lesson's sandbox runs code through \`new Function(...)\`, which only executes a single self-contained function body and does not support the module-loading machinery browsers and bundlers provide, the runnable example below can't literally use \`import\`/\`export\` syntax without throwing a \`SyntaxError\`. Instead, it shows the *equivalent* idea using plain objects to simulate "module exports," so you can see the shape of the pattern — the same idea you'd write with real \`import\`/\`export\` in an actual project file.`,
    example: {
      code: `// In a real project, this would be two separate files using
// "export" and "import". Since this sandbox executes one function body
// (no module loader available), we simulate two modules with objects
// to demonstrate the same shape without a SyntaxError.

// --- simulating math.js ---
// export function add(a, b) { return a + b; }
// export const PI = 3.14159;
// export default function multiply(a, b) { return a * b; }
const mathModule = {
  add(a, b) {
    return a + b;
  },
  PI: 3.14159,
  default: function multiply(a, b) {
    return a * b;
  },
};

// --- simulating: import multiply, { add, PI } from './math.js'; ---
const { add, PI } = mathModule;
const multiply = mathModule.default;

console.log(add(2, 3));
console.log(multiply(2, 3));
console.log(PI);

// --- simulating a namespace import: import * as MathUtils from './math.js'; ---
const MathUtils = mathModule;
console.log(MathUtils.add(10, 5));

// Real module syntax you would write in an actual .js file looks like this
// (shown as a string here purely for illustration, not executed):
const realModuleExampleSource =
  "export function add(a, b) { return a + b; }\\n" +
  "export const PI = 3.14159;\\n" +
  "export default function multiply(a, b) { return a * b; }\\n" +
  "// in another file:\\n" +
  "import multiply, { add, PI } from './math.js';";
console.log(realModuleExampleSource);`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// This sandbox cannot execute real "import"/"export" syntax, so practice
// the underlying concept: build an object 'stringUtilsModule' that
// simulates a module with named exports capitalize(str) and reverse(str),
// plus a default export function shout(str) that returns str uppercased
// with '!' appended. Then simulate importing and using all three.

const stringUtilsModule = {
  // your code here: capitalize, reverse, default
};

// simulate: import shout, { capitalize, reverse } from './stringUtils.js';
const capitalize = stringUtilsModule.capitalize;
const reverse = stringUtilsModule.reverse;
const shout = stringUtilsModule.default;

console.log(capitalize('hello')); // 'Hello'
console.log(reverse('hello'));    // 'olleh'
console.log(shout('watch out')); // 'WATCH OUT!'`,
      instructions: 'Fill in stringUtilsModule with capitalize(str) returning str with its first letter uppercased, reverse(str) returning the string reversed, and default: a function that returns str uppercased with "!" appended - mirroring how a real file would use export/export default.',
    },
    quiz: [
      {
        question: 'What is true about variables and functions declared inside a module but not exported?',
        choices: [
          'They automatically become global',
          'They remain private to that module file',
          'They cause a SyntaxError',
          'They are exported by default',
        ],
        correctIndex: 1,
      },
      {
        question: 'How many default exports can a single module have?',
        choices: ['Unlimited', 'Exactly one at most', 'Exactly two', 'Zero, default exports are not allowed'],
        correctIndex: 1,
      },
      {
        question: 'How do you import a named export called add from a file math.js?',
        choices: [
          "import add from './math.js';",
          "import { add } from './math.js';",
          "import * as add from './math.js';",
          "require add from './math.js';",
        ],
        correctIndex: 1,
      },
      {
        question: 'Why did the runnable example in this lesson simulate modules with plain objects instead of using real import/export statements?',
        choices: [
          'Because import/export are deprecated in modern JavaScript',
          'Because the sandbox executes code as a single function body without a module loader, so real import/export syntax would throw a SyntaxError',
          'Because objects are always faster than modules',
          'Because named exports are impossible to demonstrate',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is a reasonable guideline for choosing between a default export and named exports?',
        choices: [
          'Always use default exports, never named exports',
          'Use a default export when a module has one clear main thing to export; use named exports for several related utilities',
          'Named exports can only be used with classes',
          'It makes no functional difference, ever, in any tooling',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'corejs-17-capstone',
    title: 'Capstone: Building debounce and memoize',
    explanation: `This capstone combines several ideas from the course — closures, higher-order functions, and array methods — into two small, genuinely useful utilities that show up constantly in real-world JavaScript code: **debounce** and **memoize**.

**Debounce** wraps a function so that no matter how many times it's called in quick succession, the wrapped function only actually runs once, after a pause of at least \`delay\` milliseconds since the *last* call. This is the classic fix for something like a search-as-you-type handler: you don't want to fire a request on every keystroke, only once the user has paused typing.

\`\`\`js
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
\`\`\`

Notice the closure: \`timeoutId\` is declared outside the returned function but captured by it, so every call to the debounced function can see and cancel the *previous* pending timer before scheduling a new one.

**Memoize**, which you saw briefly in the closures lesson, wraps a function so that calling it again with the same arguments returns a cached result instead of recomputing — a huge win for expensive, pure (deterministic, side-effect-free) functions like recursive calculations.

\`\`\`js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
\`\`\`

Both utilities follow the same shape: a higher-order function that accepts a function, closes over some private state (a timer id, or a cache), and returns a new function that layers extra behavior on top — the exact "decorator" pattern from the higher-order functions lesson, applied to solve two problems that show up in almost every real JavaScript codebase.`,
    example: {
      code: `// --- debounce ---
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

let searchCallCount = 0;
const search = debounce((query) => {
  searchCallCount++;
  console.log('searching for:', query, '(call #' + searchCallCount + ')');
}, 20);

// simulate rapid typing - only the LAST call should actually fire
search('h');
search('he');
search('hel');
search('hell');
search('hello');

// --- memoize ---
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('cache hit for', key);
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

let computeCount = 0;
function slowFib(n) {
  computeCount++;
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}
const fastFib = memoize(function (n) {
  if (n <= 1) return n;
  return fastFib(n - 1) + fastFib(n - 2);
});

console.log('fastFib(10):', fastFib(10));
console.log('fastFib(10) again (cached):', fastFib(10));

// give the debounce timer a moment to fire before the script "ends"
setTimeout(() => {
  console.log('total debounced calls that actually ran:', searchCallCount);
}, 50);`,
      language: 'javascript',
    },
    exercise: {
      starterCode: `// Implement throttle(fn, interval): unlike debounce, throttle ensures fn
// runs AT MOST once per 'interval' milliseconds - the first call in a
// burst runs immediately, and further calls within the interval window
// are ignored until the interval has passed.

function throttle(fn, interval) {
  // your code here - use a closure over a boolean or timestamp flag
}

let runCount = 0;
const throttledLog = throttle((msg) => {
  runCount++;
  console.log('ran:', msg, '(run #' + runCount + ')');
}, 30);

// simulate a burst of calls - only the first should run immediately
throttledLog('call 1');
throttledLog('call 2');
throttledLog('call 3');

setTimeout(() => {
  console.log('total runs after burst:', runCount); // should be 1
}, 10);`,
      instructions: 'Implement throttle so it closes over a boolean flag (e.g. "onCooldown") starting false. When the returned function is called: if not on cooldown, call fn immediately with the given args, set the flag true, and use setTimeout(() => { onCooldown = false; }, interval) to reset it after the interval; if already on cooldown, ignore the call.',
    },
    quiz: [
      {
        question: 'What does a debounced function do when called repeatedly in quick succession?',
        choices: [
          'It runs every single time it is called',
          'It only runs once, after a pause since the last call, cancelling any pending scheduled run each time it is called again',
          'It runs exactly twice, first and last',
          'It queues every call to run one after another',
        ],
        correctIndex: 1,
      },
      {
        question: 'In the debounce implementation, what does clearTimeout(timeoutId) accomplish at the start of each call?',
        choices: [
          'It permanently disables the debounce function',
          'It cancels any previously scheduled, not-yet-fired call before scheduling a new one',
          'It clears the cache used by memoize',
          'It has no effect and is unnecessary',
        ],
        correctIndex: 1,
      },
      {
        question: 'What kind of functions benefit most from memoization?',
        choices: [
          'Functions with random or side-effect-based output',
          'Deterministic (pure) functions that are expensive to compute and often called with repeated arguments',
          'Functions that never get called more than once',
          'Functions that take no arguments',
        ],
        correctIndex: 1,
      },
      {
        question: 'What private state does memoize\'s returned function close over?',
        choices: ['A timer id', 'A cache mapping serialized arguments to results', 'A DOM element', 'Nothing - it is stateless'],
        correctIndex: 1,
      },
      {
        question: 'How does throttle differ from debounce?',
        choices: [
          'They are exactly the same thing',
          'Throttle guarantees the function runs at most once per interval, running immediately on the first call in a burst; debounce waits for a pause before running once',
          'Throttle never lets the function run at all',
          'Debounce runs the function immediately every time, throttle waits forever',
        ],
        correctIndex: 1,
      },
    ],
  },
];
