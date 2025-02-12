const myBookshelf = [];
const addNewBookDialog = document.getElementById('add-book-dialog');
const addBookBtn = document.getElementById('add-book-btn');

addBookBtn.addEventListener("click", () => {
    addNewBookDialog.showModal();
});


function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
}

function addBookToLibrary(title, author, pageCount, status) {
    let newBook = new Book(title, author, pageCount, status);

    myBookshelf.push(newBook);

    const shelfSection = document.getElementById(`${status}-card-container`);

    let bookCard = document.createElement('div');
    bookCard.classList.add(`${status}-card`);

    let coverArt = document.createElement('img');
    coverArt.classList.add('cover-art');
    
    let bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    let bookTitle = document.createElement('p');
    bookTitle.textContent = `${title}`;
    let bookAuthor = document.createElement('p');
    bookAuthor.textContent = `${author}`;
    let bookPageCount = document.createElement('p');
    bookPageCount.textContent = `${pageCount}`;

    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPageCount);

    bookCard.appendChild(coverArt);
    bookCard.appendChild(bookInfo);

    shelfSection.appendChild(bookCard);
}