// set up a shortcut/nickname to the div container in the HTML
let divCheckersBoard = document.getElementById("divCheckersBoard");

let arrPieces = [
    [null, 'i', null, 'i', null, 'i', null, 'i'],
    ['i', null, 'i', null, 'i', null, 'i', null],
    [null, 'i', null, 'i', null, 'i', null, 'i'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['g', null, 'g', null, 'g', null, 'g', null],
    [null, 'g', null, 'g', null, 'g', null, 'g'],
    ['g', null, 'g', null, 'g', null, 'g', null]
];

// loop through 8 rows
for (let i = 0; i < 8; i++) {
    // loop through 8 columns
    for (let j = 0; j < 8; j++) {
        // create a new div for the actual Checkers square
        let divCheckerSquare = document.createElement("div");

        // assign the checkersSquare CSS class to each div
        divCheckerSquare.classList.add("checkerSquare");

        // add an id to the div to help us track piece movement
        divCheckerSquare.setAttribute("id", "div" + i + j);

        // check to see if the row + column is even
        if ((i + j) % 2 == 1) {
            // add the dark background color to the square
            divCheckerSquare.classList.add("checkerSquareAlt");
            // add the event handler to move the piece
            divCheckerSquare.addEventListener("click", movePiece);
        }
        // add the square to the board
        divCheckersBoard.appendChild(divCheckerSquare);

        if (arrPieces[i][j]) {
            //call the function to create a piece
            createPiece("piece" + i + j, "checkerPiece-" + arrPieces[i][j],
                divCheckerSquare);
        }
    }
}

//create the function build a piece
function createPiece(pieceID, pieceClass, divSquare) {
    // create a new div that is a circle
    let divPiece = document.createElement("div");

    // set the id of the div
    divPiece.setAttribute("id", pieceID);

    // add the css class to make the div a circle
    divPiece.classList.add("checkerPiece");

    // add the css class to specify the piece color
    divPiece.classList.add(pieceClass);

    //add click event handler to store piece id in span
    divPiece.addEventListener("click", storePieceId);

    // add the piece to the square
    divSquare.appendChild(divPiece);
}

//create a function to move a piece
function movePiece(event) {
    //shortcut to the secret span
    let spnSecret = document.getElementById("spnSecret");

    //get the id of whatever was clicked on
    let newSquareId = event.target.id;

    // remove both piece and div from the square id so that we get just the number
    newSquareId = newSquareId.replace("div", "").replace("piece", "");

    //get the value of the selected piece from the span
    let selPieceId = spnSecret.dataset.value;

    // make sure that we are moving the piece to a valid new square
    if (typeof selPieceId != "undefined" && newSquareId != selPieceId) {
        //shortcut to the source(orig) div
        let sourceDiv = document.getElementById("div" + selPieceId);

        // shortcut to the selected (orig) piece
        let selPieceDiv = document.getElementById("piece" + selPieceId);

        // grab the piece color class - I know this is the 2nd element in the classlist
        let selPieceColorClass = selPieceDiv.classList[1];

        //remove the piece from the original location
        sourceDiv.removeChild(selPieceDiv);

        //create the shortcut to the target div
        let targetDiv = document.getElementById("div" + newSquareId);

        //call the create piece function to create a piece in the new square
        createPiece("piece" + newSquareId, selPieceColorClass, targetDiv);

        //erase the id from the span
        spnSecret.dataset.value = "";
    }
}

//function to store the selected piece id
function storePieceId(event) {
    //shortcut to the secret span
    let spnSecret = document.getElementById("spnSecret");

    //get the div id that was clicked on
    let selPieceId = event.target.id;

    //remove both piece from the square id so that we get just the number
    selPieceId = selPieceId.replace("piece", "");

    //store the id in the span
    spnSecret.dataset.value = selPieceId;
}
