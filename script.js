const myBookshelf = [];
const addNewBookDialog = document.getElementById('add-book-dialog');
const addBookBtn = document.getElementById('add-book-btn');
const confirmBtn = document.querySelector('#add-book-confirm');
const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#book-author');
const bookPageCountInput = document.querySelector('#book-page-count');
const bookStatusInput = document.querySelector('#book-status');


// When add book button is clicked, shows dialog form
addBookBtn.addEventListener("click", () => {
    addNewBookDialog.showModal();
});

// This is triggered when 'cancel' is clicked, or from the ...
// ... close event when clicking 'confirm'
// If 'cancel' clicked it will not execute the 'if'
// Values reset to original after
addNewBookDialog.addEventListener("close", () => {
    if(bookAuthorInput.value !== "" && bookTitleInput.value !== "") {
        addBookToLibrary(bookTitleInput.value, bookAuthorInput.value, 
            bookPageCountInput.value, bookStatusInput.value);
    }
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookPageCountInput.value = "";
    bookStatusInput.value = "reading";
});

// Prevents the confirm button from submitting the form
// Triggers the 'close' event when cofirm is clicked
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addNewBookDialog.close();
});

function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
}

// Creates new instance of Book and adds it to array
// Creates new card w/ title, author, page # and status
// Adds new card to container
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