function addBook(book, author) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.book = book
    this.author = author
}

// we use print as a prototyppe function as we really only need one copy of it
// i.e. no need for separate copy of function for each object
addBook.prototype.print = () => {
    console.log(this.book, this.author)
}

class Player {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}


const sapiens = new addBook("Homo Sapiens", "Yuval Nova Hariri")
sapiens.print()
console.log(Object.getPrototypeOf(sapiens))
console.log(sapiens.prototype)