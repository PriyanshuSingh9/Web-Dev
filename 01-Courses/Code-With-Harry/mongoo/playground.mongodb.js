/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('sigma');

// Insert a few documents into the sales collection.
db.getCollection('courses').insertMany([
    {
        "language": "java",
        "price": 30000,
        "instructor": "harry"
    },
    {
        "language": "python",
        "price": 25000,
        "instructor": "aniket"
    },
    {
        "language": "javascript",
        "price": 18000,
        "instructor": "vishal"
    },
    {
        "language": "c",
        "price": 15000,
        "instructor": "nikita"
    },
    {
        "language": "golang",
        "price": 28000,
        "instructor": "rohan"
    },
    {
        "language": "rust",
        "price": 35000,
        "instructor": "aditya"
    },
    {
        "language": "typescript",
        "price": 22000,
        "instructor": "ishita"
    },
    {
        "language": "swift",
        "price": 32000,
        "instructor": "mira"
    },
    {
        "language": "kotlin",
        "price": 29000,
        "instructor": "suresh"
    },
    {
        "language": "php",
        "price": 14000,
        "instructor": "arjun"
    },
    {
        "language": "sql",
        "price": 17000,
        "instructor": "mehul"
    },
    {
        "language": "ruby",
        "price": 20000,
        "instructor": "riya"
    },
    {
        "language": "perl",
        "price": 16000,
        "instructor": "kabir"
    },
    {
        "language": "dart",
        "price": 23000,
        "instructor": "navya"
    }
]
);

console.log("Insertion completed successfully")