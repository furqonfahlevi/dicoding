const STORAGE_KEY = "BOOK_APPS";

let books = [];

function checkStorageExist() {
  if (typeof storage === undefined) {
    alert("Your browser doesn't support local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parseData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parseData);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (checkStorageExist()) saveData();
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;
    index++;
  }
  return -1;
}

function refreshDataFromBooks() {
  const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  let bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

  for (book of books) {
    const newBook = createBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ID] = book.id;

    if (book.isCompleted) {
      bookCompleted.append(newBook);
    } else {
      bookUncompleted.append(newBook);
    }
  }
}
