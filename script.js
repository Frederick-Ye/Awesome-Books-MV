let books = [];
let bookSection = document.getElementById('bookList');
let titleInput = document.getElementById('title');
let authorInput = document.getElementById('author');
let addBtn = document.getElementById('openBtn');

window.addEventListener('load', () => {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks();
  }
});

function addBook() {
  const title = titleInput.value;
  const author = authorInput.value;

  const bookHtml = `<div class="book">
                      <p>${title}</p>
                      <p>${author}</p>
                      <button class="closeBtn">Remove</button>
                    </div>`;

  bookSection.innerHTML += bookHtml;

  books.push({ title, author });

  titleInput.value = '';
  authorInput.value = '';
  saveBooks();
}

function removeBook(event) {
  if (event.target.classList.contains('closeBtn')) {

    const bookContainer = event.target.closest('.book');
    const bookIndex = Array.from(bookSection.children).indexOf(bookContainer);

    bookContainer.remove();

    books.splice(bookIndex, 1);

    saveBooks();
  }
}

function renderBooks() {
  bookSection.innerHTML = '';

  books.forEach(book => {
    const bookHtml = `<div class="book">
                        <p>${book.title}</p>
                        <p>${book.author}</p>
                        <button class="closeBtn">Remove</button>
                      </div>`;
    bookSection.innerHTML += bookHtml;
  });
}

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}


addBtn.addEventListener('click', addBook);
bookSection.addEventListener('click', removeBook);