const myLibrary = [
    {
        id: crypto.randomUUID(),
        title: "Atomic Habits",
        author: "James Clear",
        pages: 320,
        status: true
    },
    {
        id: crypto.randomUUID(),
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        pages: 352,
        status: false
    },
    {
        id: crypto.randomUUID(),
        title: "Sapiens",
        author: "Yuval Noah Harari",
        pages: 498,
        status: true
    },
    {
        id: crypto.randomUUID(),
        title: "Clean Code",
        author: "Robert C. Martin",
        pages: 464,
        status: false
    }
];


function Book(title, author, pages, status) {
    if (!new.target) {
        error("Use new keyword to create the book object")
    }
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
}