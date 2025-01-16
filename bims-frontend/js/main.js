// const booksTable = document.querySelector('#books-table')
// console.log(booksTable)



let books=[];
let dir=false;

function getBooks() {
    fetch('http://localhost:8080/bims/getAllBooks')
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response data as JSON
            } else {
                throw new Error('API request failed');
            }
        })
        .then(data => {
            const booksTable = document.querySelector('#books-table')
            for (const ele in data) {
                const obj = data[ele];
                books.push(obj);
                const row = booksTable.insertRow(-1);
                const rId = row.insertCell(0);
                const rTitle = row.insertCell(1);
                const rAuthor = row.insertCell(2);
                const rDel = row.insertCell((3))
                const rDelBtn = document.createElement("button");
                rDelBtn.setAttribute("type", "button");
                rDelBtn.setAttribute("class", "btn btn-danger")
                rDelBtn.setAttribute("onclick", `deleteBook(${obj.id})`);
                const rDelIcon = document.createElement("img");
                rDelIcon.setAttribute("src", "../assets/delete-icon.png")
                rDelIcon.setAttribute("width", "16")
                rDelIcon.setAttribute("height", "16")
                row.setAttribute("style", "visibility: visible");
                rId.innerHTML=obj.id;
                rTitle.innerHTML=obj.title;
                rAuthor.innerHTML=obj.author;
                rDelBtn.appendChild(rDelIcon);
                rDel.appendChild(rDelBtn);
            }
        })
        .catch(error => {
            // Handle any errors here
            console.error(error); // Example: Logging the error to the console
        });
}
function clearBooksTable() {
    let books = document.querySelector('#books-table').rows;
    for(let i=1; books.length!=1; i) {
        books[i].remove();
    }
}

function sort(colNum) {
    let booksTable = document.querySelector('#books-table')
    let switching=true;
    let rowSwitch, row1, row2, i;
    console.log(dir);
    if(dir) {
        dir=false;
        while(switching) {
            switching=false;
            let booksRows = booksTable.rows;
            for(i=1; i<(booksRows.length-1); i++) {
                rowSwitch = false;
                row1 = booksRows[i].getElementsByTagName("td")[colNum];
                row2 = booksRows[i + 1].getElementsByTagName("td")[colNum];
                if (row1.innerHTML.toLowerCase() > row2.innerHTML.toLowerCase()) {
                    rowSwitch = true;
                    break;
                }
            }
            if(rowSwitch) {
                booksRows[i].parentNode.insertBefore(booksRows[i+1], booksRows[i]);
                switching=true;
            }
        }

    }
    else {
        dir=true;
        while(switching) {
            switching=false;
            let booksRows = booksTable.rows;
            for(i=1; i<booksRows.length-1; i++) {
                rowSwitch = false;
                row1 = booksRows[i].getElementsByTagName("TD")[colNum];
                row2 = booksRows[i + 1].getElementsByTagName("TD")[colNum];
                if (row1.innerHTML.toLowerCase() < row2.innerHTML.toLowerCase()) {
                    rowSwitch = true;
                    break;
                }
            }
            if(rowSwitch) {
                booksRows[i].parentNode.insertBefore(booksRows[i+1], booksRows[i]);
                switching=true;
            }
        }
    }
}

function filter(category) {
    let booksRows = document.querySelector('#books-table').rows;
    const filt = document.querySelector('#filter-input').value;
    // let booksRows = booksTable.rows;
    for(let i=1; i<booksRows.length; i++) {
        if(!booksRows[i].getElementsByTagName("td")[category].innerHTML.toLowerCase().includes(filt)) {
            booksRows[i].style.visibility="collapse";
        }
        else {
            booksRows[i].style.visibility="visible";
        }
    }

}

function exportTable() {
    let booksRows = document.querySelector('#books-table').rows;
    let books2Export=[];
    for(let i=1; i<booksRows.length; i++) {
        if(booksRows[i].style.visibility.valueOf()=="visible") {
            let bookId = booksRows[i].getElementsByTagName("td")[0].innerHTML;
            let bookTitle = booksRows[i].getElementsByTagName("td")[1].innerHTML;
            let bookAuthor = booksRows[i].getElementsByTagName("td")[2].innerHTML;
            const bookObj = {id:bookId, title:bookTitle, author:bookAuthor};
            books2Export.push(bookObj)
        }
    }
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8, " + encodeURIComponent(JSON.stringify(books2Export)));
    element.setAttribute("download", "booksTable.json");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function openAddBookForm() {
    let element = document.querySelector('#add-book-form');
    element.style.visibility="visible";
}
function closeAddBookForm() {
    document.querySelector('#add-book-form').style.visibility="hidden";
}

function addBook() {
    fetch("http://localhost:8080/bims/addBook", {
        method: "POST",
        body: JSON.stringify({
            title: document.querySelector("#add-title-input").value,
            author: document.querySelector("#add-author-input").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(r => {
        console.log(r);
        clearBooksTable();
        getBooks();
        closeAddBookForm();
    });


}

function deleteBook(bookId) {
    fetch(`http://localhost:8080/bims/deleteBook/${bookId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(r => {
        console.log(r);
        clearBooksTable();
        getBooks();
    });


}

getBooks();
