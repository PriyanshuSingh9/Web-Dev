let library = document.querySelector(".library")
console.log(library)
let addbtn = document.querySelector(".addbtn")
let details = document.querySelectorAll(".details")
console.log(details[0].value, details[1], details[2], details[3])

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

addbtn.addEventListener("click", (e) => {
    e.preventDefault();                     // prevent form refresh on button click

    const title = details[0].value.trim();
    const author = details[1].value.trim();
    const pages = details[2].value.trim();
    const status = details[3].value.trim();

    // validation: do not add book if any field is empty
    if (title === "" || author === "" || pages === "" || status === "") {
        alert("All fields are required");
        return;
    }

    addBookToLibrary(title, author, pages, status);

    // clear input fields after submission
    details[0].value = "";
    details[1].value = "";
    details[2].value = "";
    details[3].value = "";
});

function display(book) {
    let card = document.createElement("li")
    card.classList.add("book")
    let name = document.createElement("h3")
    let author = document.createElement("div")
    let pages = document.createElement("div")
    let status = document.createElement("div")

    name.textContent = `${book.title}`
    author.textContent = `Author : ${book.author}`
    pages.textContent = ` Pages : ${book.pages}`
    status.textContent = `Status : ${book.status}`

    card.appendChild(name)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(status)

    library.appendChild(card)
}


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
    display(book)
    myLibrary.push(book);
}

myLibrary.forEach(book => {
    addBookToLibrary(book.title, book.author, book.pages, book.status)
})