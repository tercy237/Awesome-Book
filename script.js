//Get elements by ID from document
const title = document.getElementById("title");
const author =document.getElementById("author");
const summitButton = document.getElementById("submit");
const bookList = document.getElementById("book-list");
const form = document.getElementById("form");

//Create Collection object, inside which will reside an array of book objects
const Collection ={
    books: []
}
//Create method to add to localstorage
function saveBooks(){
    localStorage.setItem("books", JSON.stringify(Collection.books));
}
//create method to retrieve from local storage
function loadBooks(){
 const savedBooks = localStorage.getItem("books");
 if(savedBooks){
    const loadedBooks = JSON.parse(savedBooks)
    //u can access the data stored here
 }
 else{
 console.log('use data not found in the local storage')   
 }
}
//creating and adding book to the books collection
function addBook(title,author){
    const newBook = {
        id: new Date(),
        title:title.value,
        author:author.value
    }
    Collection.books.push(newBook);
    saveBooks();
}
//Display of Added Books from local storage