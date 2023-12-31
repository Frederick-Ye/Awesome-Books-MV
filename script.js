const bookList = document.querySelector('#bookList');
const bookTemplate = document.getElementById('bookTemplate');
const bookForm = document.getElementById('bookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

class BookCollection {
  constructor() {
    this.books = this.loadBooks();
    this.bookId = this.books.length + 1;
  }

  /* eslint-disable class-methods-use-this */
  loadBooks() {
    return JSON.parse(localStorage.getItem('Books')) || [];
  }
  /* eslint-enable class-methods-use-this */

  saveBooks() {
    localStorage.setItem('Books', JSON.stringify(this.books));
  }

  deleteBook(bookId) {
    const confirmed = window.confirm('Are you sure you want to remove this book?');
    if (!confirmed) {
      return;
    }

    this.books = this.books.filter((book) => book.id !== bookId);
    this.saveBooks();

    window.alert('Book removed!');
  }

  displayBook(book) {
    const templateClone = bookTemplate.content.cloneNode(true);
    const bookTitle = templateClone.querySelector('#book-title');
    const bookAuthor = templateClone.querySelector('#book-author');
    const bookContainer = templateClone.querySelector('#bookContainer');
    bookContainer.dataset.bookId = book.id;
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    if (this.books.indexOf(book) % 2 === 0) bookContainer.classList.add('bg-gray');
    bookList.appendChild(templateClone);
  }

  addBook(title, author) {
    const newBook = {
      id: this.bookId,
      title: `"${title}"`,
      author,
    };
    this.books.push(newBook);
    this.displayBook(newBook);
    this.saveBooks();
    this.bookId += 1;
  }
}

const bookCollection = new BookCollection();

bookCollection.books.forEach((book) => bookCollection.displayBook(book));

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = titleInput.value;
  const bookAuthor = authorInput.value;
  if (!bookTitle || !bookAuthor) return;
  bookCollection.addBook(bookTitle, bookAuthor);
  titleInput.value = '';
  authorInput.value = '';
});

bookList.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('[data-button-delete]');
  if (!deleteButton) return;

  const parent = deleteButton.closest('#bookContainer');
  if (!parent) return;

  const bookId = parent.getAttribute('data-book-id');
  parent.remove();
  bookCollection.deleteBook(parseInt(bookId, 10));
});

const list = document.querySelector('.list');
const addNew = document.querySelector('.add-new');
const contactNav = document.querySelector('.contact-nav');
const displaySection = document.querySelector('.display-books');
const addBookSection = document.querySelector('.add-book');
const contactSection = document.querySelector('.contact-section');

list.addEventListener('click', () => {
  displaySection.classList.remove('hidden');
  addBookSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

addNew.addEventListener('click', () => {
  displaySection.classList.add('hidden');
  addBookSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
});

contactNav.addEventListener('click', () => {
  displaySection.classList.add('hidden');
  addBookSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
});