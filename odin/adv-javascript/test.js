function addBook(book, author) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.book = book
    this.author = author
    this.print = () => {
        console.log(this.book, this.author)
    }
}

const sapiens = new addBook("Homo Sapiens", "Yuval Nova Hariri")
sapiens.print()
console.log(Object.getPrototypeOf(sapiens))
console.log(sapiens.prototype)