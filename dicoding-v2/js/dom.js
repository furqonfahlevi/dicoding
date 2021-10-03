const UNCOMPLETED_BOOK_ID = "unread";
const COMPLETED_BOOK_ID = "read";
const BOOK_ID = "itemId";

function addNewBook() {
  const uncompletedBookId = document.getElementById(UNCOMPLETED_BOOK_ID);
  const completedBookId = document.getElementById(COMPLETED_BOOK_ID);

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const checkbox = document.getElementById("checked").checked;

  const book = createBook(title, author, year, checkbox);
  const bookObject = composeBookObject(title, author, year, checkbox);

  book[BOOK_ID] = bookObject.id;
  books.push(bookObject);

  if (checkbox) {
    completedBookId.append(book);
  } else {
    uncompletedBookId.append(book);
  }
  updateDataToStorage();
}

function createBook(title, author, year, isCompleted) {
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("book-detail");
  bookTitle.innerText = title;

  const authorName = document.createElement("p");
  authorName.classList.add("book-detail");
  authorName.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.classList.add("small", "book-detail");
  bookYear.style.fontSize = "0.9rem";
  bookYear.innerText = year;

  const textContainer = document.createElement("article");
  textContainer.append(bookTitle, authorName, bookYear);

  const bookItemsContainer = document.createElement("div");
  bookItemsContainer.classList.add("book-items-container");
  bookItemsContainer.append(textContainer);

  if (isCompleted) {
    bookItemsContainer.append(createUndoButton(), createTrashButton());
  } else {
    bookItemsContainer.append(createCheckButton(), createTrashButton());
  }

  return bookItemsContainer;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addBookToReaded(bookElement) {
  const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);
  const bookTitleReaded = bookElement.querySelector("article > h3").innerText;
  const bookAuthorReaded = bookElement.querySelector("article > p").innerText;
  const bookYearReaded =
    bookElement.querySelector("article > .small").innerText;

  const newBook = createBook(
    bookTitleReaded,
    bookAuthorReaded,
    bookYearReaded,
    true
  );

  const book = findBook(bookElement[BOOK_ID]);
  book.isCompleted = true;
  newBook[BOOK_ID] = book.id;

  bookCompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function removeBookFromReaded(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function undoBookFromReaded(bookElement) {
  const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  const bookTitleReaded = bookElement.querySelector("article > h3").innerText;
  const bookAuthorReaded = bookElement.querySelector("article > p").innerText;
  const bookYearReaded =
    bookElement.querySelector("article > .small").innerText;

  const newBook = createBook(
    bookTitleReaded,
    bookAuthorReaded,
    bookYearReaded,
    false
  );

  const book = findBook(bookElement[BOOK_ID]);
  book.isCompleted = false;
  newBook[BOOK_ID] = book.id;

  bookUncompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addBookToReaded(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeBookFromReaded(event.target.parentElement);
  });
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoBookFromReaded(event.target.parentElement);
  });
}
