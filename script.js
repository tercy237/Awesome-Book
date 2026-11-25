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
  loadBook();  
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
  if(!titre && !auteur) return false;
  this.books.push(new Book(titre,auteur));
  this.saveBook();
  return true;
}
//Removing of book method
removeBook(id){
  this.books = this.books.filter((book) => book.id !== id);
  this.saveBook();
}
}

