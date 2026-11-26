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
// Navigation class
class Navigation {
  constructor() {
    this.links = document.querySelectorAll('[data-section]');
    this.sections = document.querySelectorAll('.section');
    this.links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.show(link.dataset.section);
      });
    });
  }

  show(id) {
    this.sections.forEach((section) => {
      section.classList.toggle('active', section.id === id);
    });
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.classList.toggle('active', link.dataset.section === id);
    });
  }
}
// The clock class
class Clock {
  constructor(element) {
    this.element = element;
    this.update();
    setInterval(() => this.update(), 1000);
  }

  static ordinal(day) {
    if (day >= 11 && day <= 13) return `${day}th`;
    const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th';
    return `${day}${suffix}`;
  }

  update() {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const time = now.toLocaleTimeString('en-US',
      {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).toLowerCase();
    this.element.textContent = `${month} ${Clock.ordinal(now.getDate())} ${now.getFullYear()}, ${time}`;
  }
}
window.bookNavigation = new Navigation();
window.bookClock = new Clock(document.getElementById('date'));
window.bookApp = new BookApp();