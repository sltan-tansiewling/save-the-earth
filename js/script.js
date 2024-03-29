// Create game column
var gameColumn = document.createElement('div');
gameColumn.classList.add('game-column');
gameColumn.style.width = "500px";
gameColumn.style.height = "800px";
gameColumn.style.backgroundImage = "url('img/background-image.png')";
gameColumn.style.backgroundRepeat = "no-repeat";
gameColumn.style.backgroundSize = "cover";

var gameContainer = document.querySelector('.game-container');
gameContainer.appendChild(gameColumn);

// Create bin
var bin = document.createElement('div');
bin.classList.add('bin');
bin.style.left = "200px";
gameColumn.appendChild(bin);

// Create bin image
var binImage = document.createElement('img');
binImage.setAttribute('src', 'img/recycleBin.png');
binImage.setAttribute('width', '100px');
binImage.setAttribute('height', 'auto');
bin.appendChild(binImage);

// Create score
var score = 0;

var scoreLoc = document.createElement('h2');
scoreLoc.classList.add('score');
scoreLoc.innerHTML = "Score: " + score;

var panelScore = document.querySelector('.score');
panelScore.appendChild(scoreLoc);

// Array of item images
var recycleItems = [
    {
        name: "books",
        src: "img/books.png",
        recyclable: true,
        score: 1
    },
    {
        name: "cardboardBox",
        src: "img/cardboardBox.png",
        recyclable: true,
        score: 1
    },
    {
        name: "newspaper",
        src: "img/newspaper.png",
        recyclable: true,
        score: 1
    },
    {
        name: "paper",
        src: "img/paper.png",
        recyclable: true,
        score: 1
    },
    {
        name: "paperBag",
        src: "img/paperBag.png",
        recyclable: true,
        score: 1
    },
    {
        name: "earthBomb",
        src: "img/earth-bomb.png",
        recyclable: false,
        score: 0
    },
    {
        name: "styrofoamContainer",
        src: "img/styrofoam-container.png",
        recyclable: false,
        score: 0
    }
];

var itemCount = 0;

// Function to create item
var createItem = function() {

    var item = document.createElement('div');

    var randomTop = Math.floor(Math.random() * 50);
    var randomLeft = Math.floor(Math.random() * 400);
    var randomImg = recycleItems[Math.floor(Math.random() * recycleItems.length)].src;
    console.log(randomImg);

    var currentImg = recycleItems["randomImg"];
    console.log(currentImg);

    itemCount += 1;

    item.classList.add('item');
    item.style.top = randomTop + "px";
    item.style.left = randomLeft + "px";
    item.id = itemCount;
    // console.log("Item count is " + itemCount);
    gameColumn.appendChild(item);

    var itemImage = document.createElement('img');
    itemImage.setAttribute('src', randomImg);
    itemImage.setAttribute('width', '100px');
    itemImage.setAttribute('height', 'auto');
    item.appendChild(itemImage);

    moveItemDownInterval = setInterval(moveItemDown(item, moveItemDownInterval), 1000);

    return item;
};

// Function to move item down
var moveItemDown = function(item, ref) {

    return function() {

        convertedItemTopPos = parseInt(item.style.top);
        convertedItemTopPos = convertedItemTopPos + 100;
        item.style.top = convertedItemTopPos + "px";

        checkforOverlap(item, ref);
    }
};

// Function to track score
var trackScore = function() {
    var yourScore = 0;

};

// Function to check for overlap
var checkforOverlap = function(item, ref) {

    var test = ref;
    var itemParams = item.getBoundingClientRect();

    itemTop = itemParams.top;
    itemRight = itemParams.right;
    itemBottom = itemParams.bottom;
    itemLeft = itemParams.left;

    var binParams = bin.getBoundingClientRect();

    binTop = binParams.top;
    binRight = binParams.right;
    binBottom = binParams.bottom;
    binLeft = binParams.left;

    var overlap = !(itemRight < binLeft || itemLeft > binRight || itemBottom < binTop || itemTop > binBottom);

    if (overlap === true) {

        console.log(item.id + " Overlapping!");
        score = score + 1;
        scoreLoc.innerHTML = "Your Score: " + score;
        gameColumn.removeChild(item);
        console.log("Child " + item.id + " removed");
        clearInterval(test);

    } else if (overlap === false && parseInt(item.style.top) > parseInt(gameColumn.style.height)) {

        console.log(item.id + " Not Overlapping!");
        gameColumn.removeChild(item);
        console.log("Child " + item.id + " removed");
        clearInterval(test);
    }
};

var currentBinLeftPos = parseInt(bin.style.left);

// Function to move bin left
function moveBinLeft() {

    currentBinLeftPos = currentBinLeftPos - 100;
    bin.style.left = currentBinLeftPos + "px";

}

// Function to move bin right
function moveBinRight() {

    currentBinLeftPos = currentBinLeftPos + 100;
    bin.style.left = currentBinLeftPos + "px";

}

// Move bin horizontally and ensure it doesn't go out of the container
var moveSide = function(event) {

    // When user click left arrow
    if (event.which === 37) {

        if (currentBinLeftPos === 0) {
            console.log("You have reached the end");
        } else {
            moveBinLeft();
        }

    }

    // When user click right arrow
    if (event.which === 39) {

        if (currentBinLeftPos === 400) {
            console.log("You have reached the end");
        } else {
            moveBinRight();
        }
    }

};

// Add event listener to move baseline left and right
document.addEventListener('keydown', moveSide);
var createItemInterval;
var moveItemDownInterval;

var startEndGame = function() {

    if (btnStartEndGame.classList.contains('start')) {
        // Start to create item
        createItem();
        createItemInterval = setInterval(createItem, 5000);

        // Update start game to end game
        btnStartEndGame.classList.remove('start');
        btnStartEndGame.classList.add('end');
        btnStartEndGame.innerHTML = "End";

    } else {

        /*if(score > highestScore) {
            highestScore = score;
            console.log("The highest score is " + highestScore);
        }*/

        // Update end game to start game
        btnStartEndGame.classList.remove('end');
        btnStartEndGame.classList.add('start');
        btnStartEndGame.innerHTML = "Start";

        // Clear timeout for create and move items
        clearInterval(createItemInterval);
        console.log("Create item interval cleared!");

        clearInterval(moveItemDownInterval);
        console.log("Move item interval cleared!");

        alert("You have ended the game.");

    }

};

// Add event listener to button
var btnStartEndGame = document.querySelector('button');
btnStartEndGame.addEventListener('click', startEndGame);