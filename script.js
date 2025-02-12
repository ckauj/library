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
    this.bookID = `${title}-${author}`;
}

// Creates new instance of Book and adds it to array
// Creates new card w/ title, author, page # and status
// Adds new card to container
function addBookToLibrary(title, author, pageCount, status) {
    if(myBookshelf.find(book => book.bookID === `${title}-${author}`)) return;

    let newBook = new Book(title, author, pageCount, status);

    myBookshelf.push(newBook);

    const shelfSection = document.getElementById(`${status}-card-container`);

    let bookCard = document.createElement('div');
    bookCard.classList.add(`${status}-card`);
    bookCard.id = `${title}-${author}`;

    let coverArt = document.createElement('img');
    coverArt.classList.add('cover-art');
    
    let bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    let bookTitle = document.createElement('p');
    bookTitle.textContent = `${title}`;
    bookTitle.classList.add('book-title');
    let bookAuthor = document.createElement('p');
    bookAuthor.textContent = `${author}`;
    bookAuthor.classList.add('book-author');
    let bookPageCount = document.createElement('p');
    bookPageCount.textContent = `${pageCount}`;
    bookPageCount.classList.add('book-page-count');
    let bookStatus = document.createElement('p');
    bookStatus.textContent = `${status}`;
    bookStatus.classList.add('book-status');
    bookStatus.style.display = 'none';

    let bookButtonContainer = document.createElement('div');
    bookButtonContainer.classList.add('book-options');
    let editStatusBtn = document.createElement('button');
    let editStatusImg = document.createElement('img');
    editStatusImg.src = 'images/pencil-box-outline.svg';
    editStatusBtn.appendChild(editStatusImg);

    bookButtonContainer.appendChild(editStatusBtn);
    
    bookButtonContainer.appendChild(editStatusBtn);
    let deleteBookBtn = document.createElement('button');
    let deleteBookImg = document.createElement('img');
    deleteBookImg.src = 'images/trash-can.svg';
    deleteBookBtn.appendChild(deleteBookImg);

    bookButtonContainer.appendChild(deleteBookBtn);
    
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPageCount);
    bookInfo.appendChild(bookStatus);

    bookCard.appendChild(coverArt);
    bookCard.appendChild(bookInfo);
    bookCard.appendChild(bookButtonContainer);

    shelfSection.appendChild(bookCard);

    editStatusBtn.addEventListener("click", () => {
        editBook(bookCard.id);
    });

    deleteBookBtn.addEventListener("click", () => {
        deleteBook(bookCard.id);
    });
}

function editBook(bookID) {
    const bookCard = document.getElementById(bookID);

    bookTitle = bookCard.getElementsByTagName('p')[0].textContent;
    bookAuthor = bookCard.getElementsByTagName('p')[1].textContent;
    bookPageCount = bookCard.getElementsByTagName('p')[2].textContent;
    bookStatus = bookCard.getElementsByTagName('p')[3].textContent;

    deleteBook(bookCard.id);

    bookTitleInput.value = bookTitle;
    bookAuthorInput.value = bookAuthor;
    bookPageCountInput.value = bookPageCount;
    bookStatusInput.value = bookStatus;
    addNewBookDialog.showModal();
    
    bookCard.id = `${bookTitle}-${bookAuthor}`;
}

function deleteBook(bookID) {
    const bookCard = document.getElementById(bookID);
    bookCard.remove();
}