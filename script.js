const bookList = document.querySelector('#bookList');
const bookTemplate = document.getElementById('bookTemplate');
const bookForm = document.getElementById('bookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

function loadBooks() {
  return JSON.parse(localStorage.getItem('Books')) || [];
}
let books = loadBooks();
let bookId = parseInt(books.length + 1, 10);

function saveBooks() {
  localStorage.setItem('Books', JSON.stringify(books));
}
function deleteBook(bookId) {
  books = books.filter((book) => book.id !== bookId);
  saveBooks();
}

function displayBook(book) {
  const templateClone = bookTemplate.content.cloneNode(true);
  const bookTitle = templateClone.querySelector('#book-title');
  const bookAuthor = templateClone.querySelector('#book-author');
  const bookContainer = templateClone.querySelector('#bookContainer');
  bookContainer.dataset.bookId = book.id;
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  if (books.indexOf(book) % 2 == 0) bookContainer.classList.add('bg-gray');
  bookList.appendChild(templateClone);
}

books.forEach(displayBook);
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = titleInput.value;
  const bookAuthor = authorInput.value;
  if (!bookTitle || !bookAuthor) return;
  const newBook = {
    id: bookId,
    title: `"${bookTitle}"`,
    author: bookAuthor,
  };
  books.push(newBook);
  displayBook(newBook);
  saveBooks();
  titleInput.value = '';
  authorInput.value = '';
  bookId += 1;
});

bookList.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('[data-button-delete]');
  if (!deleteButton) return;

  const parent = deleteButton.closest('#bookContainer');
  if (!parent) return;

  const bookId = parent.getAttribute('data-book-id');
  parent.remove();
  deleteBook(parseInt(bookId, 10));
});