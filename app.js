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
  return indexOfBook;
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
  // adding status
  const newDivStatus = document.createElement("img");
  newDivStatus.className = "toggle";
  newDivStatus.textContent = "Already read";
  if (book.status === false) {
    newDivStatus.setAttribute("src", "./icons/toggle_off_FILL0_wght400_GRAD0_opsz48.svg");
  } else {
    newDivStatus.setAttribute("src", "./icons/toggle_on_FILL0_wght400_GRAD0_opsz48.svg");
  }

  // appending all newly created items
  tilesCont.appendChild(newDivAuthor);
  tilesCont.appendChild(newDivTitle);
  tilesCont.appendChild(newDivPages);
  tilesCont.appendChild(newDivStatus);

  minHead.appendChild(crossDiv);
  newDiv.appendChild(minHead);
  newDiv.appendChild(tilesCont);

  // select place to put new item
  const mainDiv = document.querySelector(".table");
  mainDiv.appendChild(newDiv);
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
  // eslint-disable-next-line no-restricted-syntax
  for (const item of library) {
    addBookToHtml(item);
  }
  createNewBookTool();
}

// Deleting book from shelve
// 1. Listen for the user choice to remove and update the inner library list
function deleteBookFromHtml(author, title) {
  const bookIndex = findBook(author, title, myLibrary);
  if (bookIndex === -1) {
    console.log("No book found.");
  } else {
    removeBookFromLibrary(myLibrary[bookIndex]);
  }
}

// initial state of the page
const book1 = new Book("Alice in the jungle.", "J S Bakk", 334, false);
const book2 = new Book("Alice in the City.", "J S Bakk", 44, true);
const book3 = new Book("Alibaba is gone.", "Mick Reller", 442, false);
const book4 = new Book("Ain't nothing till there is.", "Bobby Dylon", 432, true);
const book5 = new Book("Alibaba is gone 2", "Mick Reller", 442, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBooksOnShelve(myLibrary);

function createForm() {
  const formDiv = document.querySelector(".formDiv");
  if (formDiv.style.display === "none") {
    formDiv.style.display = "block";
    const submit = document.querySelector("input[type=submit]");
    submit.addEventListener("click", (e) => {
      const author = document.getElementById("author").value;
      const title = document.getElementById("name").value;
      const pages = document.getElementById("page").value;
      const book = new Book(title, author, pages, false);
      console.log(book);
      addBookToLibrary(book);
      addBookToHtml(book);
      e.preventDefault();
      formDiv.style.display = "none";
    });
    submit.removeEventListener("click");
  } else {
    formDiv.style.display = "none";
  }
}

const createBook = document.querySelector(".createElement img");
createBook.addEventListener("click", () => createForm());

// adding the possibility to delete book directly from the page
document.querySelectorAll(".crossDiv").forEach((item) => {
  item.addEventListener("click", (e) => {
    const author = e.target.parentNode.parentNode.children[1].childNodes[0].innerText.replace("Author: ", "");
    // console.log(author);
    const title = e.target.parentNode.parentNode.children[1].childNodes[1].innerText.replace("Title: ", "");
    // console.log(title);
    deleteBookFromHtml(author, title);
    e.target.parentNode.parentNode.remove();
  });
});

// changing the status from read/ not read and the opposite
document.querySelectorAll(".toggle").forEach((item) => {
  item.addEventListener("click", (e) => {
    const author = e.target.parentNode.childNodes[0].innerText.replace("Author: ", "");
    // console.log(author);
    const title = e.target.parentNode.childNodes[1].innerText.replace("Title: ", "");
    // console.log(title);

    const bookIndex = findBook(author, title, myLibrary);
    if (bookIndex === -1) {
      console.log("No book found.");
    } else if (myLibrary[bookIndex].status === false) {
      myLibrary[bookIndex].status = true;
      e.target.setAttribute("src", "./icons/toggle_on_FILL0_wght400_GRAD0_opsz48.svg");
    } else {
      myLibrary[bookIndex].status = false;
      e.target.setAttribute("src", "./icons/toggle_off_FILL0_wght400_GRAD0_opsz48.svg");
    }
  });
});
