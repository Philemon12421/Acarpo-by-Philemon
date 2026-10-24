
export const DOCS = {
  html: {
    label: 'HTML', color: '#E34F26',
    sections: [
      {
        title: 'Document Structure',
        items: [
          { name: '<!DOCTYPE html>', desc: 'Declares the document as HTML5, ensuring browsers render it in standards mode.', code: '<!DOCTYPE html>\n<html lang="en">\n  ...\n</html>' },
          { name: '<html>', desc: 'The root element of an HTML page. All other elements must be descendants of this.', code: '<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>' },
          { name: '<head>', desc: 'Contains metadata about the document (title, scripts, styles) that isn\'t displayed directly.', code: '<head>\n  <meta charset="UTF-8">\n  <title>Page Title</title>\n</head>' },
          { name: '<body>', desc: 'Contains all the visible content of the web page, like text, images, and links.', code: '<body>\n  <h1>Welcome</h1>\n  <p>Hello world!</p>\n</body>' },
        ]
      },
      {
        title: 'Text Formatting',
        items: [
          { name: '<h1> to <h6>', desc: 'Defines HTML headings. <h1> is the most important, <h6> is the least. Only use one <h1> per page.', code: '<h1>Main Title</h1>\n<h2>Subsection</h2>' },
          { name: '<p>', desc: 'Defines a paragraph. Browsers automatically add some space (margin) before and after it.', code: '<p>This is a standard paragraph of text.</p>' },
          { name: '<strong>', desc: 'Defines text with strong importance. Browsers render this as bold text.', code: '<p>This is <strong>important</strong> text.</p>' },
          { name: '<em>', desc: 'Defines emphasized text. Browsers render this as italicized text.', code: '<p>You <em>must</em> read this.</p>' },
        ]
      },
      {
        title: 'Links & Media',
        items: [
          { name: '<a>', desc: 'Defines a hyperlink. The href attribute specifies the URL of the page the link goes to.', code: '<a href="https://example.com" target="_blank">Visit Example</a>' },
          { name: '<img>', desc: 'Embeds an image. Requires the src (source) and alt (alternative text) attributes.', code: '<img src="logo.png" alt="Company Logo" width="200" />' },
          { name: '<ul> & <li>', desc: 'Defines an unordered (bulleted) list and its list items.', code: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>' },
        ]
      }
    ]
  },
  css: {
    label: 'CSS', color: '#1572B6',
    sections: [
      {
        title: 'Layout & Box Model',
        items: [
          { name: 'display: flex', desc: 'Enables Flexbox, a 1D layout model for distributing space along a single row or column.', code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' },
          { name: 'display: grid', desc: 'Enables CSS Grid, a 2D layout model optimized for complex grid-based designs.', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}' },
          { name: 'margin', desc: 'Creates space outside an element\'s border. Can be set for all sides or individually.', code: '.box {\n  margin: 20px; /* all sides */\n  margin-top: 10px;\n}' },
          { name: 'padding', desc: 'Creates space inside an element\'s border, between the border and the content.', code: '.box {\n  padding: 16px;\n}' },
        ]
      },
      {
        title: 'Typography',
        items: [
          { name: 'font-family', desc: 'Specifies the typeface to use. Always provide a generic fallback (like sans-serif).', code: 'body {\n  font-family: "Inter", sans-serif;\n}' },
          { name: 'font-size', desc: 'Sets the size of the text. Often defined in rem units for better accessibility scaling.', code: 'h1 {\n  font-size: 2.5rem;\n}' },
          { name: 'color', desc: 'Sets the color of the text. Accepts hex, rgb, hsl, or named colors.', code: '.danger {\n  color: #ef4444;\n}' },
        ]
      }
    ]
  },
  js: {
    label: 'JavaScript', color: '#F7DF1E',
    sections: [
      {
        title: 'Variables & Data',
        items: [
          { name: 'const & let', desc: 'const declares a variable that cannot be reassigned. let declares a block-scoped variable that can be changed.', code: 'const PI = 3.14;\nlet count = 0;\ncount = 1;' },
          { name: 'Arrays', desc: 'A data structure to store multiple values in a single variable. Zero-indexed.', code: 'const fruits = ["apple", "banana"];\nconsole.log(fruits[0]); // "apple"' },
          { name: 'Objects', desc: 'Collections of key-value pairs. Used to store structured data.', code: 'const user = {\n  name: "Alice",\n  age: 25\n};\nconsole.log(user.name);' },
        ]
      },
      {
        title: 'Functions',
        items: [
          { name: 'Arrow Functions', desc: 'A shorter syntax for writing functions. Does not bind its own `this` context.', code: 'const add = (a, b) => a + b;\nconsole.log(add(2, 3)); // 5' },
          { name: 'Array Map', desc: 'Creates a new array populated with the results of calling a provided function on every element.', code: 'const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\n// [2, 4, 6]' },
          { name: 'Array Filter', desc: 'Creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test.', code: 'const ages = [12, 18, 25];\nconst adults = ages.filter(a => a >= 18);' },
        ]
      }
    ]
  },
  react: {
    label: 'React', color: '#61DAFB',
    sections: [
      {
        title: 'Core Hooks',
        items: [
          { name: 'useState', desc: 'Allows you to add React state to function components.', code: 'const [count, setCount] = useState(0);' },
          { name: 'useEffect', desc: 'Lets you perform side effects in function components.', code: 'useEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);' }
        ]
      }
    ]
  },
  python: {
    label: 'Python', color: '#3776AB',
    sections: [
      {
        title: 'Basics',
        items: [
          { name: 'Lists', desc: 'Ordered, mutable collections of items.', code: 'fruits = ["apple", "banana"]\nfruits.append("orange")' },
          { name: 'Dictionaries', desc: 'Unordered collections of key-value pairs.', code: 'user = {"name": "Alice", "age": 25}\nprint(user["name"])' }
        ]
      }
    ]
  },
  go: {
    label: 'Go', color: '#00ADD8',
    sections: [
      {
        title: 'Concurrency',
        items: [
          { name: 'Goroutines', desc: 'A lightweight thread managed by the Go runtime.', code: 'go f(x, y, z)' },
          { name: 'Channels', desc: 'A typed conduit through which you can send and receive values with the channel operator, <-.', code: 'ch := make(chan int)\nch <- v    // Send v to channel ch.' }
        ]
      }
    ]
  },
  rust: {
    label: 'Rust', color: '#000000',
    sections: [
      {
        title: 'Ownership',
        items: [
          { name: 'Borrowing', desc: 'Accessing data without taking ownership.', code: 'fn calculate_length(s: &String) -> usize {\n    s.len()\n}' }
        ]
      }
    ]
  },
  cpp: {
    label: 'C++', color: '#00599C',
    sections: [
      {
        title: 'Memory',
        items: [
          { name: 'Pointers', desc: 'A variable that stores the memory address of another variable as its value.', code: 'int myAge = 43;\nint* ptr = &myAge;' }
        ]
      }
    ]
  },
  csharp: {
    label: 'C#', color: '#239120',
    sections: [
      {
        title: 'LINQ',
        items: [
          { name: 'Where', desc: 'Filters a sequence of values based on a predicate.', code: 'var adults = users.Where(u => u.Age >= 18);' }
        ]
      }
    ]
  },
  java: {
    label: 'Java', color: '#007396',
    sections: [
      {
        title: 'OOP',
        items: [
          { name: 'Classes', desc: 'A blueprint for creating objects.', code: 'public class Main {\n  int x = 5;\n}' }
        ]
      }
    ]
  },
  figma: {
    label: 'Figma', color: '#F24E1E',
    sections: [
      {
        title: 'Shortcuts',
        items: [
          { name: 'Auto Layout', desc: 'Creates a dynamic frame that resizes to fit its contents.', code: 'Shift + A' },
          { name: 'Components', desc: 'Reusable design elements.', code: 'Option + Cmd + K' }
        ]
      }
    ]
  }
};
