//Books class
class Books{
  constructor(title, author){
    this.id = Date.now();
    this.title = title;
    this.author = author;
  }
}
//BookCollection class
class BookCollection{
  constructor(storagekey = "books"){
  this.storagekey = storagekey;
  this.books = []; 
  }
  //Save book to local storage
 saveBook(){
  localStorage.setItem(this.storagekey,JSON.stringify(this.books));
}
//Loadbook for local storage
loadBook(){
const savedBooks = localStorage.getItem(this.storagekey);
if (savedBooks){
this.books = JSON.parse(savedBooks)
}
}
//Adding of book method
addBook(title,author){
  const titre = title.trim();
  const auteur = author.trim();
  if(!titre || !auteur) return false;
  this.books.push(new Books(titre,auteur));
  this.saveBook();
  return true;
}
//Removing of book method
removeBook(id){
  this.books = this.books.filter((book) => book.id !== id);
  this.saveBook();
}
}
//BookApp class
class BookApp {
  constructor() {
    this.collection = new BookCollection();
    this.collection.loadBook();
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.list = document.getElementById("book-list");
    this.form = document.getElementById("form");

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.collection.addBook(this.titleInput.value, this.authorInput.value)) {
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
    this.list.innerHTML = "";

    this.collection.books.forEach((book) => {
      const row = document.createElement("div");
      row.className = "book";

      const text = document.createElement("p");
      text.textContent = `"${book.title}" by ${book.author}`;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => this.removeBook(book.id));

      row.append(text, removeBtn);
      this.list.appendChild(row);
    });
  }
}

new BookApp();