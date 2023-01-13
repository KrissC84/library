/* eslint-disable no-use-before-define */
// Storage for all books
const myLibrary = [];

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

// adding to global variable
// eslint-disable-next-line func-names
Book.prototype.addBookToLibrary = function () {
  myLibrary.push(this);
};

// eslint-disable-next-line func-names
Book.prototype.removeBookFromLibrary = function () {
  // finding the index of the book that has to be deleted
  const indexOfBook = myLibrary.findIndex((object) => object === this);
  // In case there is no such a book in the library
  if (indexOfBook === -1) {
    console.log(`There is no ${this.name} in the Library`);
    return myLibrary;
  }
  return myLibrary.splice(indexOfBook, 1);
};

// Putting new book on a shelve.
// Create a new tile with the given book
// eslint-disable-next-line func-names
Book.prototype.addBookToHtml = function () {
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
  newDivAuthor.textContent = "Author:";
  newDivAuthor.className = "label";
  const newDivAuthorInner = document.createElement("h3");
  newDivAuthorInner.textContent = `${this.author}`;

  // adding title
  const newDivTitle = document.createElement("h3");
  newDivTitle.textContent = "Title:";
  newDivTitle.className = "label";
  const newDivTitleInner = document.createElement("h3");
  newDivTitleInner.textContent = `${this.name}`;

  // adding number of pages
  const newDivPages = document.createElement("h3");
  newDivPages.textContent = "Pages:";
  newDivPages.className = "label";
  const newDivPagesInner = document.createElement("h3");
  newDivPagesInner.textContent = `${this.pages}`;

  // adding status
  const newDivStatusInner = document.createElement("div");
  newDivStatusInner.className = "status";
  const newDivStatus = document.createElement("img");

  if (this.status === false) {
    newDivStatusInner.textContent = "Not Read";
    newDivStatus.setAttribute("src", "./icons/toggle_off_FILL0_wght400_GRAD0_opsz48.svg");
    newDivStatus.className = "toggle";
  } else {
    newDivStatusInner.textContent = "Read";
    newDivStatus.setAttribute("src", "./icons/toggle_on_FILL0_wght400_GRAD0_opsz48.svg");
    newDivStatus.className = "toggle";
  }

  // appending all newly created items
  tilesCont.appendChild(newDivAuthor);
  tilesCont.appendChild(newDivAuthorInner);
  tilesCont.appendChild(newDivTitle);
  tilesCont.appendChild(newDivTitleInner);
  tilesCont.appendChild(newDivPages);
  tilesCont.appendChild(newDivPagesInner);
  tilesCont.appendChild(newDivStatusInner);
  tilesCont.appendChild(newDivStatus);
  minHead.appendChild(crossDiv);
  newDiv.appendChild(minHead);
  newDiv.appendChild(tilesCont);

  // select place to put new item
  const mainDiv = document.querySelector(".table");
  mainDiv.appendChild(newDiv);
  // eslint-disable-next-line no-use-before-define
  changeStatus();
  this.deleteDirectly();
};

// adding the possibility to delete book directly from the page
// eslint-disable-next-line func-names
Book.prototype.deleteDirectly = function () {
  let book = document.querySelectorAll(".crossDiv");
  book = book[book.length - 1];
  book.addEventListener("click", (e) => {
    const author = e.target.parentNode.parentNode.children[1].childNodes[0].innerText;
    // console.log(author);
    const title = e.target.parentNode.parentNode.children[1].childNodes[1].innerText;
    // console.log(title);
    deleteBookFromHtml(author, title);
    e.target.parentNode.parentNode.remove();
  });
};

function findBookIndex(author, title, library) {
  // eslint-disable-next-line max-len
  const indexOfBook = library.findIndex((object) => object.name === title
  && object.author === author);
  if (indexOfBook === -1) {
    return -1;
  }
  return indexOfBook;
}
// changing the status from read/ not read and the opposite
function changeStatus() {
  let book = document.querySelectorAll(".toggle");
  book = book[book.length - 1];
  book.addEventListener("click", (e) => {
    const author = e.target.parentNode.childNodes[1].innerText;
    console.log(author);
    const title = e.target.parentNode.childNodes[3].innerText;
    console.log(title);

    const bookIndex = findBookIndex(author, title, myLibrary);
    if (bookIndex === -1) {
      console.log("No book found.");
    } else if (myLibrary[bookIndex].status === false) {
      myLibrary[bookIndex].status = true;
      e.target.setAttribute("src", "./icons/toggle_on_FILL0_wght400_GRAD0_opsz48.svg");
      e.target.classList.toggle("read");
      e.target.previousSibling.textContent = "Read";
    } else {
      myLibrary[bookIndex].status = false;
      e.target.setAttribute("src", "./icons/toggle_off_FILL0_wght400_GRAD0_opsz48.svg");
      e.target.previousSibling.textContent = "Not Read";
    }
  });
}

// Deleting book from shelve
// 1. Listen for the user choice to remove and update the inner library list
function deleteBookFromHtml(author, title) {
  const bookIndex = findBookIndex(author, title, myLibrary);
  if (bookIndex === -1) {
    console.log("No book found.");
  } else {
    myLibrary[bookIndex].removeBookFromLibrary();
  }
}

function createNewBookTool() {
  // adding 'create book' tool
  // creating new book
  const addNewDiv = document.createElement("div");
  addNewDiv.className = "tiles";
  const addTilesCont = document.createElement("div");
  addTilesCont.className = "tilesCont";
  addTilesCont.classList.add("createElement");
  const addButton = document.createElement("img");
  addButton.setAttribute("src", "./icons/add_FILL0_wght400_GRAD0_opsz48.svg");
  const addMinHead = document.createElement("div");
  addMinHead.className = "minHead";

  addTilesCont.appendChild(addButton);
  addNewDiv.appendChild(addMinHead);
  addNewDiv.appendChild(addTilesCont);
  const mainDiv = document.querySelector(".table");
  mainDiv.appendChild(addNewDiv);
}

// Adding every book that is in Library
function addBooksOnShelve(library) {
  // first item is for adding new books
  createNewBookTool();
  // eslint-disable-next-line no-restricted-syntax
  for (const item of library) {
    item.addBookToHtml();
  }
}

// flag to prevent eventListners for acting simultaneously
let protectDiv = 0;
const formDiv = document.querySelector(".formDiv");
formDiv.style.display = "none";
const submit = document.querySelector("input[type=submit]");

function createForm() {
  console.log(formDiv.style.display);
  const controller = new AbortController();
  if (formDiv.style.display === "none") {
    formDiv.style.display = "block";

    if (protectDiv === 0) {
      protectDiv = 1;
      submit.addEventListener("click", (e) => {
        // submit does not reload page
        e.preventDefault();

        const author = document.getElementById("author").value;
        const title = document.getElementById("name").value;
        const pages = document.getElementById("page").value;
        const book = new Book(title, author, pages, false);
        console.log("book");
        book.addBookToLibrary();
        book.addBookToHtml();
        book.deleteDirectly();
        controller.abort();
        protectDiv = 0;
        formDiv.style.display = "none";
      }, { signal: controller.signal });
    }
  } else {
    console.log(formDiv.style.display);
    submit.removeEventListener("click", (e) => {
      const author = document.getElementById("author").value;
      const title = document.getElementById("name").value;
      const pages = document.getElementById("page").value;
      const book = new Book(title, author, pages, false);
      console.log("book");
      book.addBookToLibrary();
      book.addBookToHtml();
      e.preventDefault();
      controller.abort();
      formDiv.style.display = "none";
    }, { signal: controller.signal });
    formDiv.style.display = "none";
  }
}

// initial state of the page
const book1 = new Book("Alice in the jungle.", "J.S. Ballk", 334, false);
const book2 = new Book("Alice in the City.", "J.S. Ballk", 464, true);
const book3 = new Book("Alibaba is gone.", "Mick Reller", 442, false);
const book4 = new Book("Ain't nothing till there is.", "Bobby Dylon", 432, true);
const book5 = new Book("SuperNatural Soup", "Rusty Chicken", 442, false);

book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();
book4.addBookToLibrary();
book5.addBookToLibrary();
addBooksOnShelve(myLibrary);

const createBook = document.querySelector(".createElement img");
createBook.addEventListener("click", () => {
  createForm();
});
