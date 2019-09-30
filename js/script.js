// write your code below
var gameColumn = document.createElement('div');
gameColumn.classList.add('game-column');
gameColumn.style.width = "500px";
gameColumn.style.height = "800px";
document.body.appendChild(gameColumn);

var itemImg = ["img/books.png", "img/cardboardBox.png", "img/newspaper.png", "img/paper.png", "img/paperBag.png", "img/earthBomb.png"];

var itemCount = 0;
var createItem = function() {

  var item = document.createElement('div');

  var randomTop = Math.floor(Math.random() * 50);
  var randomLeft = Math.floor(Math.random() * 400);
  var randomImg = itemImg[Math.floor(Math.random()*itemImg.length)];

  itemCount += 1;

  item.classList.add('item');
  item.style.top = randomTop + "px";
  item.style.left = randomLeft + "px";
  /*item.innerHTML = "Item " + itemCount;*/
  console.log("Item count is " + itemCount);
  gameColumn.appendChild(item);

  var itemImage = document.createElement('img');
  itemImage.setAttribute('src', randomImg);
  itemImage.setAttribute('width', '100px');
  itemImage.setAttribute('height', '100px');
  item.appendChild(itemImage);

  setTimeout(createItem, 5000);
  return item;
};

var bin = document.createElement('div');
bin.classList.add('bin');
bin.style.left = "200px";
gameColumn.appendChild(bin);

var binImage = document.createElement('img');
binImage.setAttribute('src', 'img/recycleBin.png');
binImage.setAttribute('width', '100px');
binImage.setAttribute('height', '100px');
bin.appendChild(binImage);

var moveItemDown = function(item) {

  var item = document.querySelector('.item');

  convertedItemTopPos = parseInt(item.style.top);
  convertedItemTopPos = convertedItemTopPos + 100;
  item.style.top = convertedItemTopPos + "px";

  setTimeout(moveItemDown, 8000);
  checkforOverlap();

};

var intervalReference = setInterval(moveItemDown, 3000);

var checkforOverlap = function(item) {
  var item = document.querySelector('.item');
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

  console.log(overlap);

  if(overlap === true) {

      console.log(itemCount + "Overlapping!");
      gameColumn.removeChild(item);
      console.log("Child " + itemCount + " removed");
      clearInterval(intervalReference);

    } else if(overlap === false && parseInt(item.style.top) > parseInt(gameColumn.style.height)) {
            console.log(itemCount + "Not Overlapping!");
            gameColumn.removeChild(item);
            console.log("Child " + itemCount + " removed");
            clearInterval(intervalReference);
        }

};

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

// Add event listener to button
var startGame = document.querySelector('button');
startGame.addEventListener('click', createItem);

