const title = document.getElementById('title');
const author = document.getElementById('author');
const bookList = document.getElementById('book-list');
const form = document.getElementById('form');

const Collection = {
  books: [],
};

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(Collection.books));
}

function loadBooks() {
  const savedBooks = localStorage.getItem('books');
  if (savedBooks) {
    Collection.books = JSON.parse(savedBooks);
  }
}

function addBook() {
  const newBook = {
    id: Date.now(),
    title: title.value,
    author: author.value,
  };
  Collection.books.push(newBook);
  saveBooks();
}

function displayBooks() {
  bookList.innerHTML = '';
  Collection.books.forEach((book) => {
    const bookContainer = document.createElement('div');
    const titleText = document.createElement('p');
    const authorText = document.createElement('p');
    const removeBtn = document.createElement('button');

    titleText.textContent = book.title;
    authorText.textContent = book.author;
    removeBtn.textContent = 'Remove';
    removeBtn.type = 'button';
    removeBtn.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      removeBook(book.id);
    });

    bookContainer.appendChild(titleText);
    bookContainer.appendChild(authorText);
    bookContainer.appendChild(removeBtn);
    bookList.appendChild(bookContainer);
  });
}

// remove book method
function removeBook(id) {
  Collection.books = Collection.books.filter((book) => book.id !== id);
  saveBooks();
  displayBooks();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
  form.reset();
  displayBooks();
});

loadBooks();
displayBooks();