/* eslint-disable max-classes-per-file */

class Books {
  constructor(title, author) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor(storagekey = 'books') {
    this.storagekey = storagekey;
    this.books = [];
  }

  saveBook() {
    localStorage.setItem(this.storagekey, JSON.stringify(this.books));
  }

  loadBook() {
    const savedBooks = localStorage.getItem(this.storagekey);

    if (savedBooks) {
      this.books = JSON.parse(savedBooks);
    } else {
      this.books = [
        new Books('Animal Farm', 'George Orwell'),
        new Books('Crown of Thorns', 'Unknown'),
        new Books('Macbeth', 'William Shakespeare'),
      ];
      this.saveBook();
    }
  }

  addBook(title, author) {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedTitle || !trimmedAuthor) return false;

    this.books.push(new Books(trimmedTitle, trimmedAuthor));
    this.saveBook();
    return true;
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.saveBook();
  }
}

class BookApp {
  constructor() {
    this.collection = new BookCollection();
    this.collection.loadBook();
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.list = document.getElementById('book-list');
    this.form = document.getElementById('form');

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.collection.addBook(
        this.titleInput.value,
        this.authorInput.value,
      )) {
        this.form.reset();
        this.render();
      }
    });

    this.render();
  }

  removeBook(id) {
    this.collection.removeBook(id);
    this.render();
  }

  render() {
    this.list.innerHTML = '';
    const greyTitles = ['animal farm', 'crown of thorns', 'macbeth'];

    this.collection.books.forEach((book) => {
      const row = document.createElement('div');
      row.className = 'book';

      if (greyTitles.includes(book.title.trim().toLowerCase())) {
        row.classList.add('grey-book');
      }

      const text = document.createElement('p');
      text.textContent = `"${book.title}" by ${book.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => this.removeBook(book.id));

      row.append(text, removeBtn);
      this.list.appendChild(row);
    });
  }
}

window.bookApp = new BookApp();