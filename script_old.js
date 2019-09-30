/*Things to Do:
1. Create 1 item using DOM
2. Make the item move down
3. Create 1 bin using DOM
4. Make the bin move left and right on keypress
5. Detect when item meets bin or miss bin

6. Specify the number of columns for level 1
7. Loop to create columns for the number specified for each level
8. Loop to create the number of items according to the number of columns created
9. Make the bin move the amount of space for left and right according to each column width

10. Keep track of score
11. Keep track of number of chances
12. Keep track of time

13. Add level*/

// Check if item is in the same column as the bin, if yes considered catch

var lvlColumn = 5;

// var itemArray = [];
/*var gameColumnArray = [];*/

// Create game container
var gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
gameContainer.style.height = 800 + "px";
document.body.appendChild(gameContainer);

// Create game column
for(var i = 0; i < lvlColumn; i++) {
    gameColumn = document.createElement('div');
    /*gameColumnArray.push(gameColumn);*/
    gameColumn.classList.add('game-column');
    // gameColumn[i].innerHTML = "Column " + i;
    gameColumn.style.height = gameContainer.style.height;
    gameContainer.appendChild(gameColumn);

}

var createItem = function() {
    item = document.createElement('div');
    item.classList.add('item');
    /*item.innerHTML = "Item " + j;*/
    item.style.height = "100px";
    item.style.top = "0px";
};

// Create bin
var bin = document.createElement('div');
bin.classList.add('bin');
bin.style.top = "700px";
bin.style.left = "200px";
gameContainer.appendChild(bin);

var binImage = document.createElement('img');
binImage.src = "recycleBin.png";
binImage.style.width = "100px";
binImage.style.height = "100px";

bin.appendChild(binImage);

// Move items from top to bottom
var positionFromTop = 0;
var itemTop;
var itemHeight;

var checkForOverlap = function() {
    var itemDiv = document.querySelector('.item');
    var itemParams = itemDiv.getBoundingClientRect();

    itemTop = itemParams.top;
    itemRight = itemParams.right;
    itemBottom = itemParams.bottom;
    itemLeft = itemParams.left;

    console.log("Item: Top " + itemTop + ", Right " + itemRight + ", Bottom " + itemBottom + ", Left " + itemLeft);

    var binDiv = document.querySelector('.bin');

    var binParams = binDiv.getBoundingClientRect();
    binTop = binParams.top;
    binRight = binParams.right;
    binBottom = binParams.bottom;
    binLeft = binParams.left;

    console.log("Bin: Top " + binTop + ", Right " + binRight + ", Bottom " + binBottom + ", Left " + binLeft);

    // Check if item and bin overlaps
    if(itemBottom < binTop || itemTop > binBottom || itemRight < binLeft || itemLeft > binRight) {

        console.log("Not Overlapping!");

        // Remove child element if passes container
        if(parseInt(item.style.top) > parseInt(gameContainer.style.height) ) {

            console.log("Item passes container!");
            //gameColumn[randomColNum].removeChild(item);
            console.log("Child removed");
            clearInterval(intervalReference);
        }

    } else {
        console.log("Overlapping!");
        //gameColumn[randomColNum].removeChild(item);
        console.log("Child removed");
        clearInterval(intervalReference);
    }
};

var moveDown = function() {

    var singleItemTop = parseInt(item.style.top);

    console.log("Current item is " + i + " Item top is " + singleItemTop);

    singleItemTop += 100;

    // Set final item style top
    item.style.top = singleItemTop + "px";

    checkForOverlap();

};

var randomColNum;

var appendToColumn = function() {

    var selectGameColumn = document.querySelectorAll('.game-column');

    createItem();

    randomColNum = Math.floor(Math.random() * 5);
    console.log("Random Col Num" + randomColNum);

    selectGameColumn[randomColNum].appendChild(item);

    moveDown();

};

var intervalReference = setInterval(moveDown, 1500);
setTimeout(appendToColumn, 1000);


var currentBinLeftPos = parseInt(bin.style.left);

function moveBinLeft() {

    currentBinLeftPos = currentBinLeftPos - 100;
    bin.style.left = currentBinLeftPos + "px";

}

function moveBinRight() {

    currentBinLeftPos = currentBinLeftPos + 100;
    bin.style.left = currentBinLeftPos + "px";

}

// Move bin horizontally and ensure it doesn't go out of the container
var moveSide = function(event) {

    // When user click left arrow
    if(event.which === 37) {

        if(currentBinLeftPos === 0) {
            console.log("You have reached the end");
        }

        else {
            moveBinLeft();
        }

    }

    // When user click right arrow
    if(event.which === 39) {

        if(currentBinLeftPos === 400) {
            console.log("You have reached the end");
        }

        else {
            moveBinRight();
        }
    }

};

// Add event listener to move baseline left and right
document.addEventListener('keydown', moveSide);