export const pythonLessons = [
  {
    id: 'python-01-variables-types',
    title: 'Variables & Types',
    explanation: `Python is dynamically typed: a variable is just a name bound to an object, and that name can be rebound to an object of a different type at any time. There's no need to declare a type up front the way you would in Java or C. The types you'll use constantly when starting out are \`int\` (whole numbers), \`float\` (decimal numbers), \`str\` (text), \`bool\` (True/False), and \`None\` (the deliberate absence of a value, similar to null in other languages).

Every value in Python carries its type with it, and you can inspect that type at any time with the built-in \`type()\` function. This is useful for debugging and for understanding what operations are valid on a given value — you can add two \`int\`s, but adding an \`int\` to a \`str\` raises a \`TypeError\`.

\`\`\`python
age = 30
age = "thirty"  # perfectly legal: the name now points to a str
print(type(age))  # <class 'str'>
\`\`\`

Because assignment just rebinds a name, it never "changes the type" of anything — it just points the name somewhere new. Booleans deserve a special mention: \`bool\` is technically a subclass of \`int\`, so \`True == 1\` and \`False == 0\` both evaluate to \`True\`. \`None\` is its own unique type, \`NoneType\`, and is commonly used as a default or "not set yet" placeholder.

For now, keep this mental model: values have types, names do not. As you write more Python, \`type()\` and its cousin \`isinstance()\` become everyday debugging tools for answering "what exactly am I holding right now?"`,
    example: {
      code: `# Variables and dynamic typing in Python
age = 29
price = 19.99
name = "Ada"
is_active = True
nothing = None

print(age, type(age))
print(price, type(price))
print(name, type(name))
print(is_active, type(is_active))
print(nothing, type(nothing))

# Dynamic typing: the same name can point to different types over time
value = 10
print(value, type(value))
value = "now a string"
print(value, type(value))

# isinstance checks
print(isinstance(age, int))
print(isinstance(price, float))
print(isinstance(True, int))  # bool is a subclass of int
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Create four variables describing a city, then print each one
# together with its type.

city = "Lisbon"       # a string
population = 0        # TODO: replace with a real int, e.g. 545000
area_km2 = 0.0         # TODO: replace with a real float, e.g. 100.05
is_capital = False     # TODO: set to True or False correctly

print(city, type(city))
# TODO: add a print(...) line for population, area_km2, and is_capital too
`,
      instructions:
        'Assign realistic values to population (an int), area_km2 (a float), and is_capital (a bool), then add print(...) calls so every variable is printed alongside its type().',
    },
    quiz: [
      {
        question: "What does type(3.0) return?",
        choices: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
        correctIndex: 1,
      },
      {
        question: "Which value represents 'no value at all' in Python?",
        choices: ['0', '""', 'False', 'None'],
        correctIndex: 3,
      },
      {
        question: "What best describes Python's approach to variable types?",
        choices: [
          'Variables must be declared with a fixed type before use',
          'A name is bound to an object and can be rebound to a different type',
          'Types are inferred once and never change',
          'Python has no concept of types',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is type(True)?',
        choices: ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "<class 'NoneType'>"],
        correctIndex: 0,
      },
      {
        question: 'Which line raises a TypeError?',
        choices: ["'5' + '5'", '5 + 5', "5 + '5'", '5.0 + 5'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-02-operators-control-flow',
    title: 'Operators & Control Flow',
    explanation: `Python has the arithmetic operators you'd expect (\`+ - * /\`), plus a few extras: \`//\` for floor division, \`%\` for the remainder (modulo), and \`**\` for exponents. Comparison operators (\`== != < > <= >=\`) always produce a \`bool\`. Logical operators are spelled out as words — \`and\`, \`or\`, \`not\` — rather than symbols.

Python also has a concept of "truthiness": in an \`if\` or \`while\` condition, values like \`0\`, \`0.0\`, \`""\`, \`[]\`, \`{}\`, and \`None\` all count as false, and everything else counts as true. This lets you write \`if my_list:\` instead of \`if len(my_list) > 0:\`.

Control flow uses indentation instead of braces to mark blocks, which is why consistent whitespace matters in Python:

\`\`\`python
score = 82
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
\`\`\`

\`while\` loops repeat as long as a condition stays true; \`for\` loops iterate directly over the elements of any iterable — a string, a list, or (very commonly) a \`range()\` of numbers. Inside a loop, \`break\` exits it immediately and \`continue\` skips to the next iteration. Unlike C-style languages, there's no separate "for(i=0; i<n; i++)" syntax — \`for item in range(n):\` covers that case cleanly, and \`for item in some_collection:\` covers iterating any container directly.`,
    example: {
      code: `# Arithmetic, comparison, and logical operators
a, b = 17, 5
print(a + b, a - b, a * b, a / b, a // b, a % b, a ** 2)

print(a > b, a == b, a != b)
print(a > 10 and b < 10)
print(a > 100 or b < 10)
print(not (a > 100))

# if / elif / else
temperature = 21
if temperature >= 30:
    weather = "hot"
elif temperature >= 15:
    weather = "mild"
else:
    weather = "cold"
print(weather)

# while loop
count = 0
total = 0
while count < 5:
    total += count
    count += 1
print("while total:", total)

# for loop over range()
squares = []
for n in range(1, 6):
    squares.append(n ** 2)
print("squares:", squares)

# for loop with break/continue
found = None
for n in range(1, 100):
    if n % 7 == 0 and n % 5 == 0:
        found = n
        break
print("first multiple of 5 and 7:", found)
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# FizzBuzz: for numbers 1 through 20, print "Fizz" if divisible by 3,
# "Buzz" if divisible by 5, "FizzBuzz" if divisible by both, and the
# number itself otherwise.

for n in range(1, 21):
    # TODO: add the if/elif/else logic here
    print(n)
`,
      instructions:
        'Replace the placeholder print(n) with if/elif/else logic that implements FizzBuzz as described in the comment.',
    },
    quiz: [
      {
        question: 'What does 17 // 5 evaluate to?',
        choices: ['3.4', '3', '4', '2'],
        correctIndex: 1,
      },
      {
        question: 'Which values are considered falsy in a boolean context?',
        choices: [
          'Only False and None',
          'Only empty strings',
          "0, 0.0, '', [], {}, None, and False",
          'Every number equal to 0.0 only',
        ],
        correctIndex: 2,
      },
      {
        question: 'What keyword immediately exits the nearest enclosing loop?',
        choices: ['continue', 'pass', 'break', 'return'],
        correctIndex: 2,
      },
      {
        question: "What does the expression 3 and 5 evaluate to?",
        choices: ['False', '3', '5', 'True'],
        correctIndex: 2,
      },
      {
        question: 'How many times does the body run in: count = 0; while count < 3: count += 1?',
        choices: ['2', '3', '4', 'Infinite loop'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'python-03-strings',
    title: 'Strings & String Methods',
    explanation: `Strings in Python are immutable sequences of characters, which means every "modification" you make (like \`.upper()\` or \`.replace()\`) actually returns a brand-new string rather than changing the original in place.

You can index into a string with \`s[i]\` and slice it with \`s[start:stop:step]\`. Negative indices count from the end, so \`s[-1]\` is the last character. Slicing never raises an error even for out-of-range indices — it just clamps to what's available.

\`\`\`python
name = "Ada Lovelace"
print(name[:3], name[-8:], name.upper())
# 'Ada' 'Lovelace' 'ADA LOVELACE'
\`\`\`

For building strings from variables, f-strings (\`f"..."\`) are the modern, readable way to embed expressions directly inside a string literal, e.g. \`f"{name} is {age}"\`. The older \`str.format()\` method and \`%\`-formatting still work but f-strings are preferred in new code.

A handful of \`str\` methods cover most day-to-day text processing: \`.strip()\` removes leading/trailing whitespace, \`.split()\` breaks a string into a list of pieces on whitespace (or a given separator), \`.join()\` does the reverse — gluing a list of strings back together with a separator between each — and \`.replace()\`, \`.lower()\`, \`.upper()\`, and \`.count()\` do exactly what their names suggest. Because these methods return new strings instead of mutating anything, they chain naturally: \`text.strip().lower().replace("a", "@")\`.`,
    example: {
      code: `text = "  Hello, Python World!  "
print(repr(text.strip()))
print(text.strip().lower())
print(text.strip().replace("Python", "Wasm"))

sentence = "the quick brown fox jumps over the lazy dog"
words = sentence.split()
print(words)
print(len(words), "words")
print("-".join(words[:4]))

s = "Programming"
print(s[0], s[-1], s[0:4], s[::-1], s[::2])

name = "Ada"
age = 36
print(f"{name} is {age} years old")
print(f"{name!r} in ten years will be {age + 10}")
print("{} is {} years old".format(name, age))

template = "Name: {name}, Score: {score:.2f}"
print(template.format(name="Grace", score=97.5))

csv_line = "id,name,score"
fields = csv_line.split(",")
print(fields)

count = "mississippi".count("s")
print(count)
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Given a messy sentence, produce a clean, title-cased version with
# single spaces between words, and print the word count.

raw = "  the   Quick BROWN fox   jumps over   the lazy DOG  "

# TODO: strip leading/trailing whitespace, collapse internal whitespace
# to single spaces, convert to title case, and store the result in
# \`cleaned\`. Then print \`cleaned\` and the number of words it contains.
cleaned = raw
print(cleaned)
`,
      instructions:
        'Use string methods (strip, split, join, title) to normalize `raw` into `cleaned`: no leading/trailing spaces, single spaces between words, and Title Case. Then print `cleaned` followed by its word count.',
    },
    quiz: [
      {
        question: "What is the result of 'Python'[1:4]?",
        choices: ["'Pyt'", "'yth'", "'ytho'", "'thon'"],
        correctIndex: 1,
      },
      {
        question: "Why can't you write s[0] = 'X' to modify a string in place?",
        choices: [
          'Strings must be declared mutable first',
          'Strings are immutable in Python',
          'Only lists support indexing',
          'It actually works fine',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which method splits a string into a list using whitespace by default?',
        choices: ['.join()', '.strip()', '.split()', '.replace()'],
        correctIndex: 2,
      },
      {
        question: "What does f'{3 + 4}' evaluate to?",
        choices: ["'3 + 4'", "'{3 + 4}'", "'7'", 'SyntaxError'],
        correctIndex: 2,
      },
      {
        question: "What does '-'.join(['a', 'b', 'c']) return?",
        choices: ["'a-b-c'", "'-a-b-c'", "['a-b-c']", "'abc'"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'python-04-lists-tuples',
    title: 'Lists & Tuples',
    explanation: `Lists and tuples both hold ordered collections of items, and both support the same indexing and slicing syntax as strings. The key difference is mutability: a \`list\` (\`[1, 2, 3]\`) can be changed after creation — items added, removed, or reassigned — while a \`tuple\` (\`(1, 2, 3)\`) is fixed once created.

\`\`\`python
point = (3, 4)
x, y = point
print(x, y)  # 3 4
\`\`\`

Because lists are mutable, they come with a rich set of in-place methods: \`.append()\` adds one item to the end, \`.extend()\` adds all items from another iterable, \`.insert(i, item)\` places an item at a specific position, \`.remove(item)\` deletes the first matching value, \`.pop()\` removes and returns the last item (or one at a given index), and \`.sort()\` reorders the list in place (returning \`None\`, which trips up beginners who expect it to return the sorted list).

Tuples don't have any of those mutating methods — once built, a tuple's contents can't change, though the objects it *contains* might still be mutable themselves. This makes tuples a good fit for fixed-shape records (like a coordinate pair or an RGB triple) where accidentally changing a value would be a bug, and for use as dictionary keys, which requires immutability. Lists are the right choice when you have a growing or shrinking homogeneous collection — items in a shopping cart, rows read from a file, and so on. "Tuple unpacking" (\`x, y = point\`) works for lists too, and is one of Python's most useful everyday idioms.`,
    example: {
      code: `fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.insert(1, "apricot")
print(fruits)

fruits.remove("banana")
last = fruits.pop()
print(fruits, "removed:", last)

numbers = [5, 3, 8, 1, 9, 2]
numbers.sort()
print(numbers)
numbers.sort(reverse=True)
print(numbers)

matrix = [[1, 2], [3, 4], [5, 6]]
print(matrix[1][0])
print(matrix[0:2])

# Tuples are immutable
point = (10, 20)
x, y = point
print(x, y)

try:
    point[0] = 99
except TypeError as e:
    print("can't modify a tuple:", e)

# tuple packing/unpacking with functions
def min_max(values):
    return min(values), max(values)

lo, hi = min_max(numbers)
print("min:", lo, "max:", hi)

# a list of tuples, a common pattern
pairs = [("a", 1), ("b", 2), ("c", 3)]
for letter, number in pairs:
    print(letter, "->", number)

combined = fruits + ["elderberry"]
print(combined)
print(len(combined), "apple" in combined)
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Given a list of temperature readings (floats), compute the average,
# the minimum, and the maximum, then store them as a tuple named
# \`summary\` in the order (average, minimum, maximum).

readings = [21.5, 19.8, 23.1, 20.0, 22.4, 18.9]

# TODO: compute average, minimum, and maximum from \`readings\`
summary = ()
print(summary)
`,
      instructions:
        'Compute the average, minimum, and maximum of `readings` and assign a 3-tuple `(average, minimum, maximum)` to `summary`, then print it.',
    },
    quiz: [
      {
        question: 'Which of these is immutable?',
        choices: ['list', 'dict', 'tuple', 'set'],
        correctIndex: 2,
      },
      {
        question: 'What does fruits.pop() do with no arguments?',
        choices: [
          'Removes and returns the first item',
          'Removes and returns the last item',
          'Removes all items',
          'Raises an error',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does list.sort() return?',
        choices: [
          'A new sorted list',
          'None (it sorts in place)',
          'The original unsorted list',
          'The number of items sorted',
        ],
        correctIndex: 1,
      },
      {
        question: 'How do you unpack a tuple (1, 2) into two variables a and b?',
        choices: ['a, b = (1, 2)', 'a = b = (1, 2)', 'unpack(a, b, (1, 2))', 'a, b := (1, 2)'],
        correctIndex: 0,
      },
      {
        question: 'What happens when you try to assign to a tuple element, e.g. t[0] = 5?',
        choices: [
          'It silently succeeds',
          'It raises IndexError',
          'It raises TypeError',
          'It converts the tuple to a list first',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-05-dicts-sets',
    title: 'Dictionaries & Sets',
    explanation: `A \`dict\` stores key-value pairs and gives you fast lookup by key: \`{"apples": 10, "pears": 4}\`. You read a value with \`d["apples"]\` (raises \`KeyError\` if missing) or the safer \`d.get("apples", 0)\` (returns a default instead of raising). Adding or updating a key is just assignment: \`d["bananas"] = 7\`.

\`\`\`python
inventory = {"apples": 10, "pears": 4}
inventory["bananas"] = 7
print(inventory.get("kiwi", 0))  # 0
\`\`\`

\`.keys()\`, \`.values()\`, and \`.items()\` give you views over a dict's keys, values, and \`(key, value)\` pairs respectively — \`.items()\` is what you loop over most often: \`for key, value in d.items():\`. Checking \`"apples" in d\` tests membership against the *keys*.

A \`set\` is an unordered collection of unique values, written \`{1, 2, 3}\` or built from another iterable with \`set(some_list)\` — a common trick for deduplicating a list. Sets support the mathematical operations you'd expect: \`|\` for union, \`&\` for intersection, \`-\` for difference, and \`^\` for symmetric difference (items in exactly one of the two sets). Because sets (and dict keys) rely on hashing, their elements must be hashable — so you can put strings, numbers, and tuples in a set, but not lists or other dicts. Both dicts and sets test membership in roughly constant time, which makes them much faster than scanning a list with \`in\` when you're doing lots of lookups.`,
    example: {
      code: `person = {"name": "Grace", "age": 36, "role": "engineer"}
print(person["name"])
print(person.get("email", "not provided"))

person["email"] = "grace@example.com"
person.update({"age": 37, "location": "London"})
print(person)

for key, value in person.items():
    print(key, "->", value)

print(list(person.keys()))
print(list(person.values()))
print("role" in person)

removed = person.pop("location")
print("removed:", removed)

# Sets: unordered collections of unique items
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)   # union
print(a & b)   # intersection
print(a - b)   # difference
print(a ^ b)   # symmetric difference

a.add(10)
a.discard(1)
print(a)

names = ["Ada", "Grace", "Ada", "Alan", "Grace"]
unique_names = set(names)
print(sorted(unique_names))
print(len(unique_names), "unique names out of", len(names))
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Given two lists of user IDs who liked two different posts, find the
# IDs who liked BOTH posts and the IDs who liked ONLY the first post.

liked_post_a = [101, 102, 103, 104, 105]
liked_post_b = [103, 104, 106, 107]

# TODO: build sets from the two lists, then compute:
#   both -> IDs present in both lists
#   only_a -> IDs present in liked_post_a but not liked_post_b
both = None
only_a = None
print(both, only_a)
`,
      instructions:
        'Convert the two lists to sets and use set operations to compute `both` (the intersection) and `only_a` (the difference of set A minus set B), then print both results.',
    },
    quiz: [
      {
        question: "What does person.get('email', 'n/a') return if 'email' is not a key in person?",
        choices: ['None', 'KeyError is raised', "'n/a'", "''"],
        correctIndex: 2,
      },
      {
        question: 'Which data structure enforces that all elements are unique?',
        choices: ['list', 'tuple', 'dict values', 'set'],
        correctIndex: 3,
      },
      {
        question: "What does the '&' operator do when used on two sets?",
        choices: ['Union', 'Intersection', 'Symmetric difference', 'Difference'],
        correctIndex: 1,
      },
      {
        question: "Accessing a missing key with square brackets, e.g. d['missing'], does what?",
        choices: [
          'Returns None',
          'Returns an empty string',
          'Raises a KeyError',
          'Creates the key automatically with value None',
        ],
        correctIndex: 2,
      },
      {
        question: 'What does dict.items() give you when iterating?',
        choices: ['Just the keys', 'Just the values', '(key, value) tuples', 'A sorted list of keys'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-06-functions-scope',
    title: 'Functions & Scope',
    explanation: `Functions are defined with \`def\`, and parameters can have default values, making them optional at the call site:

\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Ada"))
print(greet("Ada", greeting="Hi"))
\`\`\`

Arguments can be passed positionally (matched by order) or by keyword (matched by name, e.g. \`greeting="Hi"\`), and keyword arguments can be given in any order. A parameter written \`*args\` collects any extra positional arguments into a tuple; \`**kwargs\` collects any extra keyword arguments into a dict. These are commonly used together in functions that need to accept a flexible, unknown number of inputs.

Scope determines where a name is visible. Variables assigned inside a function are *local* by default and disappear when the function returns — they don't leak into or overwrite anything outside. If a function needs to modify a variable defined outside it, it must say so explicitly with the \`global\` keyword; otherwise, assigning to a name inside a function always creates a new local variable, even if a global with the same name exists (reading a global without reassigning it works fine without any keyword). Nested functions can "close over" variables from an enclosing function — this is how closures work, and it's the mechanism behind function factories like \`make_multiplier\` in the example. Keeping most variables local, and using \`global\` sparingly, tends to produce code that's much easier to reason about.`,
    example: {
      code: `def describe_pet(name, species="dog", *, age=None):
    text = f"{name} is a {species}"
    if age is not None:
        text += f" who is {age} years old"
    return text

print(describe_pet("Rex"))
print(describe_pet("Milo", species="cat", age=3))
print(describe_pet(name="Coco", age=1, species="rabbit"))

def total(*args, **kwargs):
    print("positional:", args)
    print("keyword:", kwargs)
    return sum(args)

print(total(1, 2, 3, label="sum"))

counter = 0

def increment():
    global counter
    counter += 1

increment()
increment()
print("counter:", counter)

def make_multiplier(factor):
    def multiplier(x):
        return x * factor
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5), triple(5))

def local_scope_demo():
    counter = "I'm local, not the global one"
    return counter

print(local_scope_demo())
print(counter)
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Write a function \`apply_discount\` that takes a price, an optional
# discount percentage (default 10), and returns the discounted price
# rounded to 2 decimal places.

def apply_discount(price, percent=10):
    # TODO: return price reduced by percent%, rounded to 2 decimals
    pass

print(apply_discount(200))
print(apply_discount(200, percent=25))
`,
      instructions:
        'Implement `apply_discount` so it returns `price` reduced by `percent` percent, rounded to two decimal places using `round()`.',
    },
    quiz: [
      {
        question: 'What does a function without an explicit return statement return?',
        choices: ['An empty string', '0', 'None', 'It raises an error'],
        correctIndex: 2,
      },
      {
        question: 'In def f(a, b=5): pass, what kind of parameter is b?',
        choices: ['Keyword-only', 'Required positional', 'Default/optional', '*args'],
        correctIndex: 2,
      },
      {
        question: 'What does **kwargs collect inside a function definition?',
        choices: [
          'Extra positional arguments as a tuple',
          'Nothing unless explicitly called',
          'Extra keyword arguments as a dict',
          'Only the first keyword argument',
        ],
        correctIndex: 2,
      },
      {
        question: 'To modify a global variable from inside a function, what must you do first?',
        choices: [
          'Nothing special is needed',
          'Declare it with the global keyword',
          'Import it with from __main__ import',
          'Pass it as *args',
        ],
        correctIndex: 1,
      },
      {
        question:
          'If a function defines its own local `counter` and returns it, what does printing the global `counter` afterward show?',
        choices: [
          "The function's local value, not the unrelated global value",
          'Both print the same local value',
          'A NameError on the second print',
          'A NameError on the first print',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'python-07-comprehensions',
    title: 'Comprehensions',
    explanation: `Comprehensions are a compact syntax for building a new collection from an existing iterable, often replacing a multi-line \`for\` loop with a single expression.

\`\`\`python
squares = [n * n for n in range(10) if n % 2 == 0]
print(squares)  # [0, 4, 16, 36, 64]
\`\`\`

A list comprehension \`[expr for item in iterable if condition]\` builds a list; swap the brackets for \`{...}\` with a colon (\`{key: value for ...}\`) to build a dict, or \`{...}\` without a colon to build a set. The optional \`if\` clause filters which items get included, and comprehensions can be nested to flatten or transform multi-dimensional data, e.g. \`[value for row in matrix for value in row]\`.

A generator expression looks almost identical but uses parentheses: \`(n ** 2 for n in range(1000))\`. The crucial difference is laziness — a list comprehension builds the entire list in memory immediately, while a generator expression produces values one at a time, on demand, as something iterates over it. This matters a lot for large or infinite sequences, or when you're just going to feed the values into something like \`sum()\` or \`max()\` and never need the whole collection at once. Comprehensions are idiomatic Python and usually both more concise and faster than the equivalent hand-written loop, but for complex logic with multiple steps, a regular loop is often more readable — comprehensions are best kept to one clear transformation.`,
    example: {
      code: `numbers = range(1, 11)

squares = [n ** 2 for n in numbers]
print(squares)

evens = [n for n in numbers if n % 2 == 0]
print(evens)

labeled = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labeled)

word_lengths = {word: len(word) for word in ["python", "wasm", "pyodide"]}
print(word_lengths)

unique_lengths = {len(word) for word in ["cat", "dog", "cow", "ox", "fox"]}
print(unique_lengths)

matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [value for row in matrix for value in row]
print(flattened)

# Generator expression: lazy, doesn't build the whole list in memory
sum_of_squares = sum(n ** 2 for n in range(1, 1001))
print(sum_of_squares)

gen = (n for n in range(5))
print(next(gen), next(gen))
print(list(gen))
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Given a list of words, build a dict comprehension mapping each word
# (lowercased) to its length, but only include words longer than 3
# characters.

words = ["Sun", "Moon", "Star", "Sky", "Galaxy", "Comet"]

# TODO: replace this with a dict comprehension
result = {}
print(result)
`,
      instructions:
        'Replace `result` with a dict comprehension that maps each word.lower() to len(word), including only words with more than 3 characters.',
    },
    quiz: [
      {
        question: 'What does [n for n in range(5)] produce?',
        choices: ['A generator object', '[0, 1, 2, 3, 4]', '[1, 2, 3, 4, 5]', 'range(5)'],
        correctIndex: 1,
      },
      {
        question:
          "What's the main advantage of a generator expression over a list comprehension for large sequences?",
        choices: [
          'It runs faster on every CPU',
          'It produces items lazily instead of building the whole sequence in memory',
          'It automatically sorts the results',
          'It can only be used once, which is a feature',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which syntax creates a set comprehension?',
        choices: ['[x for x in y]', '(x for x in y)', '{x for x in y}', '{x: x for x in y}'],
        correctIndex: 2,
      },
      {
        question: 'What does {x: x**2 for x in range(3)} evaluate to?',
        choices: ['{0: 0, 1: 1, 2: 4}', '[0, 1, 4]', '{0, 1, 4}', '(0, 1, 4)'],
        correctIndex: 0,
      },
      {
        question: 'In [value for row in matrix for value in row], what is this an example of?',
        choices: [
          'A syntax error',
          'A nested/flattening comprehension',
          'A dict comprehension',
          'A generator expression',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'python-08-modules-stdlib',
    title: 'Modules & the Standard Library',
    explanation: `A module is simply a file of Python code that can be imported and reused elsewhere. The \`import\` statement has a few common forms: \`import math\` gives you access via \`math.sqrt(...)\`; \`from math import sqrt\` pulls a specific name into your own namespace so you can call \`sqrt(...)\` directly; and \`import numpy as np\`-style aliasing lets you give a module a shorter local name.

\`\`\`python
import math
print(math.sqrt(16), math.pi)
\`\`\`

Python ships with a huge "batteries included" standard library, so a lot of everyday tasks don't need any third-party packages at all. \`math\` provides numeric functions and constants (\`sqrt\`, \`floor\`, \`ceil\`, \`pi\`, \`factorial\`, and more). \`random\` provides pseudo-random number generation — \`random.randint(a, b)\` for a random integer in a range, \`random.choice(seq)\` to pick one item from a sequence, and \`random.shuffle(list)\` to shuffle a list in place; calling \`random.seed(n)\` makes a sequence of "random" calls reproducible, which is handy for testing. Other modules worth knowing about early include \`statistics\` (mean, median, stdev), \`sys\` (interpreter and runtime info), and \`os\` (filesystem and environment interaction). You'll meet several more — \`json\`, \`datetime\`, \`re\` — in a later lesson. Knowing the standard library well is often what separates "found a package for that" from "wrote three lines with something already built in."`,
    example: {
      code: `import math
import random
from math import floor, ceil

print(math.sqrt(49))
print(math.pi)
print(math.factorial(5))
print(floor(4.7), ceil(4.2))

random.seed(42)
print(random.randint(1, 6))
print(random.choice(["rock", "paper", "scissors"]))

sample_deck = list(range(1, 11))
random.shuffle(sample_deck)
print(sample_deck)

import statistics as stats
data = [4, 8, 15, 16, 23, 42]
print("mean:", stats.mean(data))
print("median:", stats.median(data))

import sys
print(sys.version_info[0])
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Use the math and random modules to write a function that simulates
# rolling \`n\` six-sided dice and returns the sum, plus a function that
# reports whether that sum's square root is a whole number.

import math
import random

def roll_dice(n):
    # TODO: return the sum of n random dice rolls (1-6 each)
    pass

def is_perfect_square(number):
    # TODO: return True if number is a perfect square, False otherwise
    pass

total = roll_dice(4)
print(total, is_perfect_square(total))
`,
      instructions:
        'Implement `roll_dice` using `random.randint(1, 6)` in a loop or comprehension, and `is_perfect_square` using `math.isqrt` to check whether `number` is a perfect square.',
    },
    quiz: [
      {
        question: 'Which import form lets you write sqrt(16) instead of math.sqrt(16)?',
        choices: ['from math import sqrt', 'import math', 'import math as sqrt', 'require math'],
        correctIndex: 0,
      },
      {
        question: 'What does random.seed(42) do?',
        choices: [
          'Generates a truly random number',
          'Makes subsequent random calls produce a reproducible sequence',
          "Deletes the random module's state",
          'Nothing, it is ignored',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which module would you reach for to compute the median of a list of numbers?',
        choices: ['math', 'random', 'statistics', 'sys'],
        correctIndex: 2,
      },
      {
        question: 'What does math.floor(4.7) return?',
        choices: ['5', '4.7', '5.0', '4'],
        correctIndex: 3,
      },
      {
        question: "What is a Python 'module'?",
        choices: [
          'A special kind of loop',
          'A built-in data type like list or dict',
          'A file containing Python definitions and statements that can be imported',
          'A compiled binary only',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-09-virtual-file-io',
    title: "File I/O with Pyodide's Virtual Filesystem",
    explanation: `In this course, your Python code runs via Pyodide — a full build of CPython compiled to WebAssembly that executes inside a worker in your browser tab. It's real Python, but it does not have access to your actual computer's disk. Instead, Pyodide sets up an in-memory virtual filesystem, so calls like \`open()\`, \`.read()\`, \`.write()\`, and the \`os\` module all work exactly like they would on a normal machine — they just operate against memory that lives only for the current page session.

\`\`\`python
with open("scratch.txt", "w") as f:
    f.write("hello\\n")
\`\`\`

That means anything you write with \`open(path, "w")\` is completely sandboxed: it never touches your real hard drive, never leaves the browser tab, and disappears the moment the page reloads or the worker restarts. This is genuinely useful for practicing file I/O safely — you can write, append, and read files, iterate over lines, check existence with \`os.path.exists\`, and delete files with \`os.remove\`, all without any risk to your actual machine and without needing a server.

The file modes work as usual: \`"w"\` opens for writing and truncates any existing content, \`"a"\` opens for appending without erasing what's already there, and \`"r"\` (the default) opens for reading, raising \`FileNotFoundError\` if the file doesn't exist yet. Using the \`with\` statement (covered in more depth in a later lesson) ensures the file is properly closed as soon as the block finishes, even if something goes wrong inside it.`,
    example: {
      code: `# Pyodide runs CPython compiled to WebAssembly inside your browser tab.
# There is no real hard drive here: open(), read(), and write() operate
# against an in-memory virtual filesystem that Pyodide sets up for you.
# Anything you write disappears the moment the page reloads, and it can
# never touch your actual computer's files.

path = "notes.txt"

with open(path, "w") as f:
    f.write("Shopping list\\n")
    f.write("- Milk\\n")
    f.write("- Eggs\\n")

with open(path, "a") as f:
    f.write("- Bread\\n")

with open(path, "r") as f:
    contents = f.read()
print(contents)

with open(path, "r") as f:
    lines = f.readlines()
print(len(lines), "lines")

with open(path, "r") as f:
    for line_number, line in enumerate(f, start=1):
        print(line_number, line.rstrip())

import os
print(os.path.exists(path))
print(os.path.getsize(path), "bytes")
os.remove(path)
print(os.path.exists(path))
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Write three lines of a haiku to "haiku.txt" using open() in write
# mode, then read the file back and print each line with its line
# number (starting at 1).

path = "haiku.txt"

# TODO: open path in write mode and write three lines, each ending in \\n


# TODO: open path in read mode and print each line prefixed with its
# 1-based line number
`,
      instructions:
        "Use `with open(path, 'w') as f:` to write three haiku lines (each ending in \\n), then reopen the file for reading and print each line preceded by its 1-based line number.",
    },
    quiz: [
      {
        question: 'In Pyodide, what does open() actually read from and write to?',
        choices: [
          "Your computer's real hard drive",
          'An in-memory virtual filesystem inside the browser tab',
          'A remote server',
          'Browser localStorage directly',
        ],
        correctIndex: 1,
      },
      {
        question: 'What file mode appends to an existing file instead of overwriting it?',
        choices: ["'w'", "'r'", "'a'", "'x'"],
        correctIndex: 2,
      },
      {
        question: "What happens to files written via Pyodide's virtual filesystem when the page reloads?",
        choices: [
          'They are saved permanently to disk',
          'They sync to the cloud',
          'They are lost, since the virtual filesystem is in memory',
          'They become read-only',
        ],
        correctIndex: 2,
      },
      {
        question: 'What does f.readlines() return?',
        choices: [
          'A single string with all the content',
          'A list of lines, each including its trailing newline',
          'A generator that must be iterated once',
          'A tuple of characters',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which mode would you use to open a file for reading only?',
        choices: ["'w'", "'a'", "'x'", "'r'"],
        correctIndex: 3,
      },
    ],
  },
  {
    id: 'python-10-error-handling',
    title: 'Error Handling',
    explanation: `When something goes wrong, Python raises an exception — an object describing what happened — which, if uncaught, stops the program and prints a traceback. You catch exceptions with \`try\`/\`except\`:

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print("caught:", e)
\`\`\`

A full \`try\` statement can have four parts: \`try\` (the risky code), \`except\` (runs if a matching exception occurs — you can list multiple types or use several \`except\` clauses to handle different errors differently), \`else\` (runs only if the \`try\` block completed with *no* exception), and \`finally\` (always runs, whether or not an exception occurred — perfect for cleanup work).

You can trigger an exception yourself with \`raise\`, either raising a built-in type like \`ValueError\` or a custom one. Defining a custom exception is just subclassing \`Exception\` (or a more specific built-in exception):

\`\`\`python
class InsufficientFundsError(Exception):
    pass
\`\`\`

Custom exceptions make error handling far more precise and readable than checking string messages: calling code can \`except InsufficientFundsError:\` and know exactly what went wrong, and the exception class itself can carry extra data (like the shortfall amount) as attributes. Catching narrow, specific exception types instead of a bare \`except:\` is good practice — a bare \`except\` silently swallows *everything*, including bugs you'd want to know about, like a mistyped variable name raising \`NameError\`.`,
    example: {
      code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError as e:
        print("error:", e)
        return None
    else:
        print("division succeeded")
        return result
    finally:
        print("safe_divide finished")

print(safe_divide(10, 2))
print(safe_divide(10, 0))

class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the account balance."""
    def __init__(self, balance, amount):
        super().__init__(f"cannot withdraw {amount}, only {balance} available")
        self.balance = balance
        self.amount = amount

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    withdraw(50, 100)
except InsufficientFundsError as e:
    print("withdrawal failed:", e)
    print("shortfall:", e.amount - e.balance)

# Catching multiple exception types
def parse_number(text):
    try:
        return int(text)
    except (ValueError, TypeError) as e:
        print(f"could not parse {text!r}: {e}")
        return None

print(parse_number("42"))
print(parse_number("not a number"))
print(parse_number(None))
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Write a function \`average\` that returns the average of a list of
# numbers, but raises a custom EmptyListError (defined below) if the
# list is empty, instead of letting ZeroDivisionError happen.

class EmptyListError(Exception):
    pass

def average(numbers):
    # TODO: raise EmptyListError if \`numbers\` is empty, otherwise
    # return sum(numbers) / len(numbers)
    pass

try:
    print(average([]))
except EmptyListError:
    print("caught expected error")
`,
      instructions:
        'Implement `average` so it raises `EmptyListError` when `numbers` is empty, and otherwise returns the arithmetic mean of `numbers`.',
    },
    quiz: [
      {
        question: 'Which block runs no matter whether an exception occurred or not?',
        choices: ['else', 'except', 'finally', 'try'],
        correctIndex: 2,
      },
      {
        question: "When does the 'else' clause of a try statement run?",
        choices: [
          'Only if an exception was raised',
          'Only if no exception was raised in the try block',
          'Always, after finally',
          "Never, it's not valid Python",
        ],
        correctIndex: 1,
      },
      {
        question: 'How do you define a custom exception type?',
        choices: [
          "Custom exceptions aren't supported in Python",
          'By writing def MyError(): raise',
          'By subclassing Exception (or a subclass of it)',
          "By using the 'error' keyword",
        ],
        correctIndex: 2,
      },
      {
        question: 'What keyword do you use to trigger an exception yourself?',
        choices: ['except', 'throw', 'error', 'raise'],
        correctIndex: 3,
      },
      {
        question: 'except (ValueError, TypeError) as e: catches what?',
        choices: [
          'Only ValueError',
          'Only TypeError',
          'Either a ValueError or a TypeError',
          'Neither, this is invalid syntax',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-11-classes-oop',
    title: 'Classes & OOP',
    explanation: `A class is a blueprint for creating objects that bundle data (attributes) and behavior (methods) together. You define one with the \`class\` keyword, and \`__init__\` is the special method that runs automatically when a new instance is created, typically used to set up initial attributes:

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p.x, p.y)
\`\`\`

Every method defined inside a class takes \`self\` as its first parameter — it's how the method refers to "the specific instance this call is operating on." You never pass \`self\` explicitly; Python fills it in automatically when you call \`p.some_method()\`. Attributes set with \`self.name = value\` inside \`__init__\` (or any method) are *instance attributes*, unique to each object. Attributes defined directly in the class body (outside any method) are *class attributes*, shared by every instance unless a particular instance overrides its own copy.

Defining the \`__repr__\` method lets you control how an instance looks when printed or inspected in a REPL — instead of the default \`<__main__.BankAccount object at 0x...>\`, you can return something informative like \`BankAccount(owner='Grace', balance=120)\`. Classes are the foundation for the two topics that follow this one: inheritance (building new classes from existing ones) and the broader object-oriented style of organizing related data and behavior together instead of passing loose dictionaries and standalone functions around.`,
    example: {
      code: `class BankAccount:
    """A simple bank account with a balance and an owner name."""

    bank_name = "Pyodide Federal"  # class attribute, shared by all instances

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        self.balance += amount
        self.history.append(f"deposit {amount}")
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("insufficient funds")
        self.balance -= amount
        self.history.append(f"withdraw {amount}")
        return self.balance

    def __repr__(self):
        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"

account = BankAccount("Grace", balance=100)
account.deposit(50)
account.withdraw(30)
print(account)
print(account.balance)
print(account.history)
print(account.bank_name, BankAccount.bank_name)

second = BankAccount("Ada")
print(second.balance)
print(account.balance == second.balance)
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Define a Rectangle class with width and height attributes, an
# area() method, and a perimeter() method.

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    # TODO: define area() returning width * height
    # TODO: define perimeter() returning 2 * (width + height)

r = Rectangle(4, 6)
print(r.area(), r.perimeter())
`,
      instructions:
        'Add `area` and `perimeter` instance methods to `Rectangle` that use `self.width` and `self.height` to compute and return the correct values.',
    },
    quiz: [
      {
        question: 'What is `self` in an instance method?',
        choices: [
          'A reference to the instance the method is being called on',
          'A reserved keyword like `this` in other languages, hardcoded by Python',
          'The class itself',
          'An optional parameter you can omit',
        ],
        correctIndex: 0,
      },
      {
        question: 'When is __init__ called?',
        choices: [
          'Every time you access an attribute',
          'Automatically when a new instance is created',
          'Only when you call it manually',
          'Only for subclasses',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the difference between an instance attribute and a class attribute?',
        choices: [
          'There is no difference',
          'Class attributes can only be integers',
          'Instance attributes must be set in __repr__',
          'Instance attributes belong to one object; class attributes are shared across all instances',
        ],
        correctIndex: 3,
      },
      {
        question: 'What does defining __repr__ on a class let you do?',
        choices: [
          'Control how instances look when printed or shown in a REPL',
          'Nothing observable',
          'Prevent the class from being instantiated',
          'Make the class immutable',
        ],
        correctIndex: 0,
      },
      {
        question: "Given class C: pass and c = C(), what is type(c)?",
        choices: ["<class 'object'>", "'C'", "<class '__main__.C'>", 'None'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-12-inheritance-polymorphism',
    title: 'Inheritance & Polymorphism',
    explanation: `Inheritance lets you define a new class based on an existing one, reusing its attributes and methods while adding or changing what's needed:

\`\`\`python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"
\`\`\`

\`Dog\` here is a *subclass* of \`Animal\`, and \`Animal\` is its *base class* (or *parent* / *superclass*). \`Dog\` automatically gets everything \`Animal\` defines, and \`speak\` is *overridden* — \`Dog\` provides its own version that replaces the parent's. Inside a subclass's \`__init__\`, calling \`super().__init__(...)\` runs the parent class's constructor, letting you reuse its setup logic instead of duplicating it.

Polymorphism is what makes this powerful in practice: you can call the *same* method name — \`shape.area()\`, say — on objects of different classes (a \`Circle\`, a \`Rectangle\`, a \`Square\`) and each one runs its own correct implementation, without the calling code needing to know or check which specific class it's dealing with. This is the essence of "duck typing" applied through class hierarchies: code that loops over a list of \`Shape\` objects and calls \`.describe()\` on each one doesn't care exactly which subclass each item is.

\`isinstance(obj, SomeClass)\` checks whether an object belongs to a class or any of its subclasses (so a \`Square\` that inherits from \`Rectangle\` which inherits from \`Shape\` is an instance of all three). \`issubclass(ClassA, ClassB)\` checks the same relationship between two classes directly, without needing an instance.`,
    example: {
      code: `class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        raise NotImplementedError("subclasses must implement area()")

    def describe(self):
        return f"{self.name} has area {self.area():.2f}"


class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2


class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
        self.name = "Square"


shapes = [Circle(3), Rectangle(4, 5), Square(2)]
for shape in shapes:
    print(shape.describe())

print(isinstance(shapes[2], Rectangle))
print(isinstance(shapes[2], Shape))
print(issubclass(Square, Shape))

for shape in shapes:
    print(type(shape).__name__, "is a Shape:", isinstance(shape, Shape))
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Create a Vehicle base class and an ElectricCar subclass that adds
# a battery_range attribute and overrides describe() to mention it.

class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        return f"{self.make} {self.model}"


class ElectricCar(Vehicle):
    def __init__(self, make, model, battery_range):
        # TODO: call the parent constructor with super()
        # TODO: store battery_range on self
        pass

    def describe(self):
        # TODO: return the parent's describe() text plus range info,
        # e.g. "Tesla Model 3 with 350km range"
        pass


car = ElectricCar("Tesla", "Model 3", 350)
print(car.describe())
`,
      instructions:
        "In ElectricCar.__init__, call `super().__init__(make, model)` and store `battery_range`. In `describe`, call `super().describe()` and append the battery range, e.g. f'{base} with {self.battery_range}km range'.",
    },
    quiz: [
      {
        question: "What does super().__init__(...) do in a subclass's __init__?",
        choices: [
          'Creates a brand-new unrelated object',
          'Is only needed if the parent has no __init__',
          "Calls the parent class's __init__ to reuse its setup logic",
          'Deletes the parent class',
        ],
        correctIndex: 2,
      },
      {
        question: 'What is polymorphism, as demonstrated by shape.describe() behaving differently per shape?',
        choices: [
          'Having many unrelated classes with the same name',
          "Calling the same method name on different objects and getting behavior appropriate to each object's class",
          'A synonym for inheritance with no distinct meaning',
          'A Python-specific keyword',
        ],
        correctIndex: 1,
      },
      {
        question:
          'If Square inherits from Rectangle, which inherits from Shape, what does isinstance(square_instance, Shape) return?',
        choices: [
          'True, isinstance checks the whole inheritance chain',
          'False, isinstance only checks the immediate class',
          'A TypeError',
          'None',
        ],
        correctIndex: 0,
      },
      {
        question: "What happens if a subclass doesn't override a method defined on its parent?",
        choices: [
          'Calling that method raises an AttributeError',
          "The subclass inherits and uses the parent's implementation",
          'The subclass loses the method entirely',
          'Python raises a SyntaxError at class definition time',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does issubclass(Square, Shape) check?',
        choices: [
          'Whether a Square instance exists in memory',
          "Whether Square is Shape's parent",
          "Whether Square is Shape itself or one of its descendants in the class hierarchy",
          "Nothing, this function doesn't exist",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-13-decorators',
    title: 'Decorators',
    explanation: `Functions in Python are first-class objects: they can be assigned to variables, passed as arguments, and returned from other functions. A decorator takes advantage of this — it's a function that accepts another function, wraps it with some extra behavior, and returns the wrapper. The \`@\` syntax is just shorthand for reassigning the function to the decorator's result:

\`\`\`python
def shout(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

print(greet("ada"))  # HELLO, ADA
\`\`\`

Writing \`@shout\` above \`def greet(...)\` is exactly equivalent to writing \`greet = shout(greet)\` right after the function is defined. Because the wrapper doesn't know in advance what arguments the decorated function takes, it almost always accepts \`*args, **kwargs\` and forwards them straight through to the original function.

One common gotcha: after decorating, \`greet.__name__\` would normally become \`"wrapper"\` instead of \`"greet"\`, losing the original function's identity. \`functools.wraps(func)\`, applied to the wrapper, fixes this by copying over the original's \`__name__\`, \`__doc__\`, and other metadata.

Decorators that need their own configuration — like \`@repeat(3)\` — are "decorator factories": a function that takes arguments and *returns* a decorator, which then wraps the target function. Real-world uses include logging, timing, caching (\`functools.lru_cache\`), access control, and retry logic — anywhere you want to add the same behavior around many different functions without repeating yourself.`,
    example: {
      code: `import functools
import time

def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__} with args={args} kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result
    return wrapper


@log_calls
def add(a, b):
    return a + b


print(add(3, 4))
print(add.__name__)  # functools.wraps preserved the original name


def timed(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.6f}s")
        return result
    return wrapper


@timed
def slow_square(n):
    total = 0
    for i in range(n):
        total += i * i
    return total


print(slow_square(1000))


def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator


@repeat(3)
def roll():
    import random
    return random.randint(1, 6)


print(roll())
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Write a decorator \`uppercase_result\` that converts a function's
# string return value to uppercase.

def uppercase_result(func):
    # TODO: define and return a wrapper that calls func(*args, **kwargs)
    # and returns the result converted to uppercase
    pass

@uppercase_result
def greeting(name):
    return f"hello, {name}"

print(greeting("world"))
`,
      instructions:
        'Implement `uppercase_result` as a decorator: define an inner `wrapper(*args, **kwargs)` that calls `func`, uppercases the returned string, and returns it; have `uppercase_result` return `wrapper`.',
    },
    quiz: [
      {
        question: 'What does @my_decorator above a function definition actually do?',
        choices: [
          'It is shorthand for `func = my_decorator(func)`',
          "Nothing, it's just a comment",
          'It renames the function to my_decorator',
          "It only works on classes, not functions",
        ],
        correctIndex: 0,
      },
      {
        question: 'Why do decorator wrappers commonly accept *args, **kwargs?',
        choices: [
          'To make the code look more advanced',
          'So the wrapper can accept and forward any arguments the original function accepts',
          'Because Python requires it syntactically',
          'To disable keyword arguments',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does functools.wraps(func) preserve on the wrapper function?',
        choices: [
          "The function's runtime speed",
          'Nothing observable',
          'Metadata like __name__ and __doc__ from the original function',
          "The original function's local variables",
        ],
        correctIndex: 2,
      },
      {
        question: 'In `def repeat(times): def decorator(func): ...`, what is `repeat` an example of?',
        choices: [
          'A syntax error',
          'A class method',
          'An infinite loop',
          'A decorator factory: a function that returns a decorator, configured by an argument',
        ],
        correctIndex: 3,
      },
      {
        question: 'For a function to be usable as a decorator, what must it return?',
        choices: [
          'A string describing the function',
          'A callable (typically the wrapper function)',
          "The original function's docstring",
          'True or False',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'python-14-generators-iterators',
    title: 'Generators & Iterators',
    explanation: `A \`for\` loop works on anything that follows the *iterator protocol*: an object with an \`__iter__\` method (returning an iterator) and \`__next__\` (returning the next value, or raising \`StopIteration\` when exhausted). You can build such an object yourself as a class, but Python gives you a far shorter way: generator functions.

\`\`\`python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for i in countdown(3):
    print(i)
\`\`\`

Any function containing \`yield\` becomes a generator function. Calling it doesn't run the body immediately — it returns a generator object, paused before the first line. Each call to \`next()\` (or each step of a \`for\` loop) resumes execution until the next \`yield\`, hands back that value, and pauses again, remembering exactly where it left off, including all local variables. When the function finally returns (falls off the end), the generator raises \`StopIteration\` to signal it's done.

This lazy, paused-and-resumed execution is what makes generators memory-efficient for large or even infinite sequences — like the Fibonacci sequence up to some limit — since only one value needs to exist in memory at a time, rather than a whole precomputed list. Writing a generator function is almost always simpler than hand-writing a class with \`__iter__\`/\`__next__\`, but understanding that protocol underneath explains *why* \`for\` loops, generator expressions, and functions like \`list()\` and \`sum()\` all work seamlessly with both.`,
    example: {
      code: `def countdown(n):
    print("starting countdown")
    while n > 0:
        yield n
        n -= 1
    print("done")

gen = countdown(3)
print(next(gen))
print(next(gen))
print(next(gen))
try:
    next(gen)
except StopIteration:
    print("generator exhausted")

for value in countdown(3):
    print("loop:", value)


def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

print(list(fibonacci(50)))


class CountUp:
    """A custom iterator implementing __iter__ and __next__."""

    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value


for n in CountUp(1, 5):
    print("custom iterator:", n)

total = sum(x * x for x in fibonacci(30))
print("sum of squares of small fib numbers:", total)
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Write a generator function \`evens_up_to\` that yields even numbers
# from 0 up to (and including) \`limit\`.

def evens_up_to(limit):
    # TODO: yield each even number from 0 to limit inclusive
    pass

print(list(evens_up_to(10)))
`,
      instructions:
        'Implement `evens_up_to` as a generator function using `yield` inside a loop, producing 0, 2, 4, ... up to and including `limit` when it is even.',
    },
    quiz: [
      {
        question: 'What keyword turns an ordinary function into a generator function?',
        choices: ['return', 'async', 'yield', 'gen'],
        correctIndex: 2,
      },
      {
        question: 'What exception signals that an iterator has no more values?',
        choices: ['IterationError', 'EOFError', 'StopIteration', 'IndexError'],
        correctIndex: 2,
      },
      {
        question: 'What two dunder methods does a custom iterator class need to implement?',
        choices: ['__init__ and __del__', '__iter__ and __next__', '__enter__ and __exit__', '__get__ and __set__'],
        correctIndex: 1,
      },
      {
        question: "Compared to building a full list, what's the main benefit of a generator?",
        choices: [
          "It's always shorter to type",
          'It automatically sorts values',
          'It can be indexed like a list',
          'It produces values lazily, one at a time, without holding them all in memory at once',
        ],
        correctIndex: 3,
      },
      {
        question: 'After a generator raises StopIteration once, what happens if you call next() on it again?',
        choices: [
          'It restarts from the beginning',
          'It keeps raising StopIteration',
          'It raises a different, unrelated error',
          'It returns None',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'python-15-context-managers',
    title: 'Context Managers',
    explanation: `The \`with\` statement guarantees that setup and cleanup code run around a block, even if an exception happens inside it — you've already seen this with files: \`with open(path) as f:\` always closes the file afterward, whether reading succeeded or an error occurred halfway through.

Any object can support \`with\` by implementing two dunder methods: \`__enter__\`, called at the start of the block (its return value becomes whatever \`as\` binds to), and \`__exit__\`, called at the end — always, even on an exception.

\`\`\`python
class Timer:
    def __enter__(self):
        import time
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"elapsed: {time.perf_counter() - self.start:.6f}s")
\`\`\`

\`__exit__\` receives information about any exception that occurred (\`exc_type\`, \`exc_val\`, \`exc_tb\`, all \`None\` if nothing went wrong). If \`__exit__\` returns a truthy value, the exception is considered "handled" and swallowed; returning \`False\` (or nothing) lets it propagate normally after cleanup runs — which is almost always what you want, so cleanup doesn't silently hide real bugs.

Writing a full class just for a simple context manager can feel heavy, so \`contextlib.contextmanager\` lets you write one as a generator function instead: the code before \`yield\` acts as \`__enter__\`, whatever is yielded becomes the \`as\` value, and the code after \`yield\` (typically inside a \`try\`/\`finally\`) acts as \`__exit__\`. Both approaches are common in real code — favor the decorator-based one for something short and simple, and a class when you need more state or reusability.`,
    example: {
      code: `import time
from contextlib import contextmanager


class Timer:
    """Class-based context manager that reports elapsed time."""

    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"Timer: elapsed {self.elapsed:.6f}s")
        return False  # don't suppress exceptions


with Timer() as t:
    total = sum(range(100000))
print("total:", total)


@contextmanager
def temporary_value(d, key, value):
    """Generator-based context manager using contextlib."""
    had_key = key in d
    old_value = d.get(key)
    d[key] = value
    try:
        yield d
    finally:
        if had_key:
            d[key] = old_value
        else:
            del d[key]


settings = {"debug": False}
with temporary_value(settings, "debug", True):
    print("inside with block:", settings)
print("after with block:", settings)


class SuppressErrors:
    """Context manager that swallows a chosen exception type."""

    def __init__(self, exc_type):
        self.exc_type = exc_type

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        return exc_type is not None and issubclass(exc_type, self.exc_type)


with SuppressErrors(ZeroDivisionError):
    print(1 / 0)
print("execution continues after the suppressed error")
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Write a class-based context manager \`Indent\` that prints "BEGIN" on
# entry and "END" on exit, regardless of whether an exception occurred.

class Indent:
    def __enter__(self):
        # TODO: print "BEGIN" and return self
        pass

    def __exit__(self, exc_type, exc_val, exc_tb):
        # TODO: print "END" and return False so exceptions still propagate
        pass

with Indent():
    print("doing work inside the block")
`,
      instructions:
        "Implement `__enter__` to print 'BEGIN' and return self, and `__exit__` to print 'END' and return False so any exception inside the block is not suppressed.",
    },
    quiz: [
      {
        question: 'What does the `with` statement guarantee?',
        choices: [
          'Nothing extra beyond a normal function call',
          'That the code inside never raises exceptions',
          'That __exit__ (or cleanup logic) runs even if an exception occurs inside the block',
          'That variables inside the block are global',
        ],
        correctIndex: 2,
      },
      {
        question: 'Which two dunder methods make a class usable with `with`?',
        choices: ['__init__ and __del__', '__enter__ and __exit__', '__with__ and __end__', '__start__ and __stop__'],
        correctIndex: 1,
      },
      {
        question: 'What does returning True from __exit__ do?',
        choices: [
          'Nothing special',
          'Re-raises the exception with more detail',
          'Cancels the with block before it runs',
          'Suppresses any exception that occurred in the with block',
        ],
        correctIndex: 3,
      },
      {
        question:
          'Which decorator from contextlib lets you write a context manager as a generator function with a single yield?',
        choices: ['@contextmanager', '@wraps', '@generator', '@with_statement'],
        correctIndex: 0,
      },
      {
        question: "In `with open('f.txt') as file:`, what is guaranteed when the block ends, even on error?",
        choices: [
          'The file contents are printed',
          'The file is automatically closed',
          'The file is deleted',
          'Nothing is guaranteed',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'python-16-stdlib-json-datetime-re',
    title: 'Common Stdlib: json, datetime, re',
    explanation: `Three standard library modules cover an enormous share of everyday programming tasks. \`json\` converts between Python objects and JSON text: \`json.dumps(obj)\` serializes a dict/list/etc. into a JSON string, and \`json.loads(text)\` parses JSON text back into Python objects (dicts, lists, strings, numbers, booleans, and \`None\`).

\`\`\`python
import json
data = {"name": "Ada", "active": True}
text = json.dumps(data)
print(text)
\`\`\`

\`datetime\` represents points in time and durations. \`datetime.datetime(year, month, day, ...)\` builds a specific moment; \`datetime.now()\` gets the current one. \`timedelta\` represents a duration or a difference between two datetimes — you can add or subtract a \`timedelta\` from a \`datetime\` directly (\`today + timedelta(days=7)\`), and subtracting two datetimes gives you back a \`timedelta\`. \`.strftime(fmt)\` formats a datetime as a string using format codes like \`%Y\`, \`%B\`, \`%A\`.

\`re\` handles regular expressions for pattern matching in text. \`re.search(pattern, text)\` finds the first match anywhere in the string (or \`None\`); \`re.findall(pattern, text)\` returns every non-overlapping match as a list; \`re.sub(pattern, replacement, text)\` returns a new string with matches replaced; and \`re.compile(pattern)\` pre-compiles a pattern for reuse, useful when checking many strings against the same regex. Raw strings (\`r"..."\`) are conventional for regex patterns since they avoid Python interpreting backslashes (like \`\\d\` or \`\\w\`) as escape sequences before \`re\` ever sees them.`,
    example: {
      code: `import json
from datetime import datetime, timedelta
import re

# json: converting between Python objects and JSON text
profile = {"name": "Grace Hopper", "born": 1906, "languages": ["COBOL", "FLOW-MATIC"]}
json_text = json.dumps(profile, indent=2)
print(json_text)

parsed = json.loads(json_text)
print(parsed["name"], parsed["languages"][0])
print(type(parsed))

# datetime: working with dates and times
today = datetime(2024, 1, 15, 9, 30)
print(today)
print(today.year, today.month, today.day)

one_week_later = today + timedelta(days=7)
print(one_week_later)

print(today.strftime("%A, %B %d, %Y"))

delta = one_week_later - today
print(delta.days, "days apart")

# re: regular expressions
text = "Contact: ada@example.com or grace.hopper@navy.mil"
emails = re.findall(r"[\\w.]+@[\\w.]+", text)
print(emails)

match = re.search(r"(\\w+)@(\\w+)\\.(\\w+)", emails[0])
if match:
    print(match.group(0), match.group(1), match.group(3))

cleaned = re.sub(r"\\s+", " ", "too      many     spaces")
print(cleaned)

pattern = re.compile(r"^\\d{3}-\\d{4}$")
print(bool(pattern.match("555-1234")))
print(bool(pattern.match("not-a-phone")))
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Given a list of log lines, extract all lines that contain an ERROR
# level using re, then build a JSON string summarizing the count.

import json
import re

logs = [
    "INFO: server started",
    "ERROR: connection refused",
    "DEBUG: cache warmed",
    "ERROR: timeout after 30s",
]

# TODO: use re (or simple string matching) to find lines containing
# "ERROR", store them in \`error_lines\`, then build \`summary\` as a dict
# like {"error_count": <n>, "errors": error_lines} and print
# json.dumps(summary)
error_lines = []
summary = {}
print(json.dumps(summary))
`,
      instructions:
        "Populate `error_lines` with the log entries containing 'ERROR' (using re.search or the `in` operator), build `summary = {'error_count': len(error_lines), 'errors': error_lines}`, and print `json.dumps(summary)`.",
    },
    quiz: [
      {
        question: 'What does json.dumps() do?',
        choices: [
          'Reads JSON from a file',
          'Deletes JSON data',
          'Converts a JSON string into a Python object',
          'Converts a Python object into a JSON-formatted string',
        ],
        correctIndex: 3,
      },
      {
        question: 'What does json.loads() do?',
        choices: [
          'Converts a Python object into a JSON string',
          'Loads a Python module',
          'Parses a JSON string into a Python object',
          'Writes JSON to disk',
        ],
        correctIndex: 2,
      },
      {
        question: 'What does timedelta represent in the datetime module?',
        choices: [
          'A duration or difference between two dates/times',
          'A specific point in time',
          'A time zone',
          'A formatted string',
        ],
        correctIndex: 0,
      },
      {
        question: "What does re.findall(r'[\\\\w.]+@[\\\\w.]+', text) return?",
        choices: [
          'The first match only, as a string',
          'A list of all non-overlapping matches in text',
          'A boolean indicating whether a match exists',
          'A compiled pattern object',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does re.sub(pattern, replacement, text) do?',
        choices: [
          'Searches for the pattern and returns a boolean',
          'Splits text on the pattern',
          'Returns a new string with all pattern matches replaced',
          'Deletes text entirely',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'python-17-capstone',
    title: 'Capstone: Word Frequency Analyzer',
    explanation: `This capstone pulls together most of what the course has covered — classes, string and regex processing, dict-based counting, comprehensions, and file I/O — into one small but complete program: a word-frequency analyzer.

\`\`\`python
from collections import Counter
words = "the cat sat on the mat".split()
print(Counter(words).most_common(2))
\`\`\`

\`collections.Counter\` is a dict subclass purpose-built for counting: pass it any iterable and it tallies how many times each item appears, then \`.most_common(n)\` gives you the \`n\` most frequent items as \`(item, count)\` pairs, sorted highest first. Building a \`WordFrequencyCounter\` class around it means the tokenizing logic (splitting raw text into lowercase words with a regex) lives in one place, and the object exposes a clean set of methods — \`total_words()\`, \`unique_words()\`, \`most_common()\`, \`frequency_of()\` — instead of forcing every caller to reach into a raw dict.

Notice how the pieces compose: \`re.findall\` tokenizes the text into words, \`Counter\` counts them, a comprehension filters for words that appear exactly once (the linguistic term for these is "hapax legomena"), and the file-I/O skills from earlier let the class's report be saved to Pyodide's virtual filesystem and read back. None of these techniques is new by this point in the course — what's new is seeing them work together inside a single, realistic class, which is exactly what real Python projects look like: a handful of well-named methods, each built from a few lines of the fundamentals you've already learned.`,
    example: {
      code: `import re
from collections import Counter


class WordFrequencyCounter:
    """Counts word frequency in a block of text, ignoring case and
    punctuation, and reports the most common words."""

    def __init__(self, text):
        self.text = text
        self.words = self._tokenize(text)
        self.counts = Counter(self.words)

    @staticmethod
    def _tokenize(text):
        return re.findall(r"[a-z']+", text.lower())

    def total_words(self):
        return len(self.words)

    def unique_words(self):
        return len(self.counts)

    def most_common(self, n=5):
        return self.counts.most_common(n)

    def frequency_of(self, word):
        return self.counts.get(word.lower(), 0)

    def report(self, n=5):
        lines = [
            f"Total words: {self.total_words()}",
            f"Unique words: {self.unique_words()}",
            f"Top {n} words:",
        ]
        for rank, (word, count) in enumerate(self.most_common(n), start=1):
            lines.append(f"  {rank}. {word} ({count})")
        return "\\n".join(lines)


sample_text = """
Python is a language. Python is readable, and Python is fun.
A language that is readable is a language people enjoy learning.
"""

counter = WordFrequencyCounter(sample_text)
print(counter.report(n=3))

print()
print("frequency of 'python':", counter.frequency_of("Python"))
print("frequency of 'missing':", counter.frequency_of("missing"))

# combine with a comprehension: words used only once
hapax_legomena = [word for word, count in counter.counts.items() if count == 1]
print("words used exactly once:", sorted(hapax_legomena))

# save the report to Pyodide's in-memory virtual filesystem
with open("report.txt", "w") as f:
    f.write(counter.report(n=3))

with open("report.txt", "r") as f:
    print(f.read())
`,
      language: 'python',
    },
    exercise: {
      starterCode: `# Extend a simple ContactBook class: it should support adding a
# contact (name -> email), looking one up case-insensitively, and
# listing all contacts sorted alphabetically by name.

class ContactBook:
    def __init__(self):
        self.contacts = {}

    def add(self, name, email):
        # TODO: store email under the lowercased name as the key,
        # but keep the original-case name and email together, e.g.
        # self.contacts[name.lower()] = (name, email)
        pass

    def lookup(self, name):
        # TODO: return the email for \`name\` (case-insensitive), or
        # None if the contact isn't found
        pass

    def all_sorted(self):
        # TODO: return a list of (name, email) tuples sorted
        # alphabetically by name
        pass


book = ContactBook()
book.add("Grace Hopper", "grace@navy.mil")
book.add("Ada Lovelace", "ada@example.com")

print(book.lookup("ADA lovelace"))
print(book.all_sorted())
`,
      instructions:
        'Implement `add` to store contacts keyed by lowercased name (value: a (name, email) tuple), `lookup` to case-insensitively return the email or None, and `all_sorted` to return all (name, email) pairs sorted alphabetically by name.',
    },
    quiz: [
      {
        question: 'What does collections.Counter(words) produce?',
        choices: [
          'A sorted list of words',
          'A single integer total',
          'A dict-like object mapping each word to how many times it appears',
          'A set of unique words',
        ],
        correctIndex: 2,
      },
      {
        question: 'What does Counter.most_common(3) return?',
        choices: [
          'The 3 least common items',
          'A list of the 3 most frequent (item, count) pairs, highest first',
          'A dict of all items',
          'Nothing, most_common takes no arguments',
        ],
        correctIndex: 1,
      },
      {
        question: "In the capstone's WordFrequencyCounter, why is _tokenize marked with @staticmethod?",
        choices: [
          'It is required syntax for all methods',
          'It makes the method run faster',
          'It hides the method from being called at all',
          'It doesn’t need access to self/instance state — it only operates on its input text',
        ],
        correctIndex: 3,
      },
      {
        question: 'What does re.findall(r"[a-z\']+", text.lower()) approximately extract?',
        choices: [
          'Only capitalized words',
          'Runs of lowercase letters and apostrophes, effectively words, after lowercasing the text',
          'Only numbers',
          'Every character individually',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which concepts does this capstone combine?',
        choices: [
          'Classes, string/regex processing, dict-based counting (Counter), comprehensions, and file I/O',
          'Only functions, nothing else',
          'Only comprehensions',
          'Only file I/O',
        ],
        correctIndex: 0,
      },
    ],
  },
];
