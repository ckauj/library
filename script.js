const myBookshelf = [];
const addNewBookDialog = document.getElementById('add-book-dialog');
const addBookBtn = document.getElementById('add-book-btn');
const confirmBtn = document.querySelector('#add-book-confirm');
const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#book-author');
const bookPageCountInput = document.querySelector('#book-page-count');
const bookStatusInput = document.querySelector('#book-status');
const newBookForm = document.querySelector('form');
let addUpdateState = addBookToLibrary;
let editID = "";

// When add book button is clicked, shows dialog form
addBookBtn.addEventListener("click", () => {
    addNewBookDialog.showModal();
});

// This is triggered when 'cancel' is clicked, or from the ...
// ... close event when clicking 'confirm'
// If 'cancel' clicked it will not execute the 'if'
// Values reset to original after
addNewBookDialog.addEventListener("close", (e) => {
    if(bookAuthorInput.value !== "" 
        && bookTitleInput.value !== "" 
        && addNewBookDialog.returnValue !== 'cancel') {
        
            addUpdateState(bookTitleInput.value, bookAuthorInput.value, 
                            bookPageCountInput.value, bookStatusInput.value);
    }

    newBookForm.reset();
    addNewBookDialog.returnValue = "";
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
    coverArt.src = 'images/google-downasaur.svg';
    coverArt.classList.add('cover-art');
    
    let bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    let bookTitle = document.createElement('p');
    bookTitle.textContent = title;
    bookTitle.classList.add('book-title');

    let bookAuthor = document.createElement('p');
    bookAuthor.textContent = author;
    bookAuthor.classList.add('book-author');

    let bookPageCount = document.createElement('p');
    bookPageCount.textContent = pageCount;
    bookPageCount.classList.add('book-page-count');

    let bookStatus = document.createElement('p');
    bookStatus.textContent = status;
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
        updateModal(editStatusBtn.parentElement.parentElement.id);
        addUpdateState = editBook;
    });

    deleteBookBtn.addEventListener("click", () => {
        deleteBook(deleteBookBtn.parentElement.parentElement.id);
    });
}

function editBook(title, author, pageCount, status) {
    const shelfSection = document.getElementById(`${status}-card-container`);

    let bookCard = document.getElementById(editID);
    bookCard.getElementsByTagName('p')[0].textContent = title;
    bookCard.getElementsByTagName('p')[1].textContent = author;
    bookCard.getElementsByTagName('p')[2].textContent = pageCount;
    bookCard.getElementsByTagName('p')[3].textContent = status;
    bookCard.id = `${title}-${author}`;

    shelfSection.appendChild(bookCard);
    updateMyBookShelfArray(title, author, pageCount, status);
    addUpdateState = addBookToLibrary;
}

function deleteBook(bookID) {
    const bookCard = document.getElementById(bookID);
    bookCard.remove();
    let bookIndex = myBookshelf.findIndex(book => book.bookID === bookID);
    myBookshelf.splice(bookIndex, 1);
}

function updateModal(bookCardID) {
    let bookCard = document.getElementById(bookCardID);
    let title = bookCard.getElementsByTagName('p')[0].textContent;
    let author = bookCard.getElementsByTagName('p')[1].textContent;
    let pageCount = bookCard.getElementsByTagName('p')[2].textContent;
    let status = bookCard.getElementsByTagName('p')[3].textContent;

    bookTitleInput.value = title;
    bookAuthorInput.value = author;
    bookPageCountInput.value = pageCount;
    bookStatusInput.value = status;
    editID = bookCardID;

    addNewBookDialog.showModal();
}

function updateMyBookShelfArray(title, author, pageCount, status) {
        // Edit book in array to new values
        let bookIndex = myBookshelf.findIndex(book => book.bookID === editID);
        myBookshelf[bookIndex] = {title:title, 
                                author:author, 
                                pageCount:pageCount, 
                                status:status, 
                                bookID:`${title}-${author}`};
        editID = "";
}