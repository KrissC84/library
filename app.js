class Book {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
// adding method to the prototype
// eslint-disable-next-line func-names
Book.prototype.info = function () {
  return (`${this.name}, ${this.author}, ${this.pages} pages, ${this.status}`);
};

// Storage for all books
const myLibrary = [];

// adding to global variable
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(book) {
  // finding the index of the book that has to be deleted
  const indexOfBook = myLibrary.findIndex((object) => object === book);
  // In case there is no such a book in the library
  if (indexOfBook === -1) {
    console.log(`There is no ${book.name} in the Library`);
    return myLibrary;
  }
  return myLibrary.splice(indexOfBook, 1);
}

function findBook(author, title, library) {
  // eslint-disable-next-line max-len
  const indexOfBook = library.findIndex((object) => object.name === title
  && object.author === author);
  if (indexOfBook === -1) {
    return -1;
  }
  return library[indexOfBook];
}

// Putting new book on a shelve.
// Create a new tile with the given book
function addBookToHtml(book) {
  // new book
  const newDiv = document.createElement("div");
  newDiv.className = "tiles";
  const tilesCont = document.createElement("div");
  tilesCont.className = "tilesCont";
  const minHead = document.createElement("div");
  minHead.className = "minHead";
  const crossDiv = document.createElement("div");
  crossDiv.className = "crossDiv";
  // adding author
  const newDivAuthor = document.createElement("h3");
  newDivAuthor.textContent = `Author: ${book.author}`;
  // adding title
  const newDivTitle = document.createElement("h3");
  newDivTitle.textContent = `Title: ${book.name}`;
  // adding number of pages
  const newDivPages = document.createElement("h3");
  newDivPages.textContent = `Pages: ${book.pages}`;

  // appending all newly created items
  tilesCont.appendChild(newDivAuthor);
  tilesCont.appendChild(newDivTitle);
  tilesCont.appendChild(newDivPages);
  minHead.appendChild(crossDiv);
  newDiv.appendChild(minHead);
  newDiv.appendChild(tilesCont);

  // select place to put new item
  const mainDiv = document.querySelector(".table");
  mainDiv.appendChild(newDiv);
}

// Adding every book that is in Library
function addBooksOnShelve(library) {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of library) {
    addBookToHtml(item);
  }
}
// Deleting book from shelve
// 1. Listen for the user choice to remove and update the inner library list
function deleteBookfromHtml(author, tile) {
  const book = findBook(author, tile, myLibrary);
  if (book === -1) {
    console.log("No book found.");
  } else {
    removeBookFromLibrary(book);
  }
}

const book1 = new Book("Alice in the jungle.", "J S Bakk", 334, "not read yet.");
const book2 = new Book("Alice in the City.", "J S Bakk", 44, "read.");
const book3 = new Book("Alibaba is gone.", "Mick Reller", 442, "not read yet.");
const book4 = new Book("Ain't nothing till there is.", "Bobby Dylon", 432, "read.");
const book5 = new Book("Alibaba is gone 2", "Mick Reller", 442, "not read yet.");
const book6 = new Book("Abc", "Abc", 55, "not");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);

console.log(findBook("Abc", "Abc", myLibrary));

addBooksOnShelve(myLibrary);

document.querySelectorAll(".crossDiv").forEach((item) => {
  item.addEventListener("click", (e) => {
    const author = e.target.parentNode.parentNode.children[1].childNodes[0].innerText.replace("Author: ", "");
    // console.log(author);
    const title = e.target.parentNode.parentNode.children[1].childNodes[1].innerText.replace("Title: ", "");
    // console.log(title);
    deleteBookfromHtml(author, title);
    e.target.parentNode.parentNode.remove();
  });
});
