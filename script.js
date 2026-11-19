const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const bookList = document.getElementById('book-list');
const form = document.getElementById('form');

const Collection = {
  books: [],
};

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(Collection.books));
}

function renderBooks() {
  bookList.replaceChildren();

  Collection.books.forEach((book) => {
    const bookElement = document.createElement('article');
    const titleElement = document.createElement('h2');
    const authorElement = document.createElement('p');
    const removeButton = document.createElement('button');

    bookElement.className = 'book';
    titleElement.textContent = book.title;
    authorElement.textContent = book.author;
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      Collection.books = Collection.books.filter((savedBook) => savedBook.id !== book.id);
      saveBooks();
      renderBooks();
    });

    bookElement.append(titleElement, authorElement, removeButton);
    bookList.append(bookElement);
  });
}

function loadBooks() {
  const savedBooks = localStorage.getItem('books');

  if (savedBooks !== null) {
    const parsedBooks = JSON.parse(savedBooks);
    if (!Array.isArray(parsedBooks)) {
      throw new Error('Saved books must be an array.');
    }
    Collection.books = parsedBooks;
  }
}

function addBook(title, author) {
  const newBook = {
    id: `${Date.now()}-${Math.random()}`,
    title: title.trim(),
    author: author.trim(),
  };

  Collection.books.push(newBook);
  saveBooks();
  renderBooks();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) {
    return;
  }

  addBook(titleInput.value, authorInput.value);
  form.reset();
});

loadBooks();
renderBooks();
