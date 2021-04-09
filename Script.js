//Creates the global variables
var treasuremap;
var ctx;
var canvas;
var treasurex;
var treasurey;
var tries;
var treasureChest;

//Waits for window to load

window.onload = function() {
    console.log("loaded")
    //Sets the trie to 0
    tries = 0;
    //Gets the canvas element
    canvas = document.getElementById("canvas");
    //Sets canvas size
    canvas.height = 825;
    canvas.width = 1075;
    //Creates context on canvas, context we draw on
    ctx = canvas.getContext("2d");
    //Loads tresure map in a variable
    treasuremap = new Image();
    treasuremap.src = "img/treasuremap.png";
    treasuremap.onload = function() {
        console.log("loaded")
        drawMap();
    }
    //Loads treasure chest into variable
    treasureChest = new Image();
    treasureChest.src = "img/TreasureChest.png";

    buryTreasure();
    console.log(treasurex + " " + treasurey);
    //Adds click event to canvas
    canvas.addEventListener("click", function(event) {
        //offsets so coordinates is on the picture
        //no matter where picture is on page
        var x = event.pageX - canvas.offsetLeft - canvas.clientLeft;
        var y = event.pageY - canvas.offsetTop - canvas.clientTop;
        //Calls function to check coordinates for tresure
        checkForTreasure(x,y);
    });
}

//Function to draw map
function drawMap() {
    //Clears the canvas of drawn things
    console.log("drawing");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Draws tresuremap on canvas
    ctx.drawImage(treasuremap, 0, 0);
}
//Function to draw chest
function drawChest() {
    ctx.drawImage(treasureChest, treasurex-13, treasurey-13);
}

function checkForTreasure(x, y) {
    console.log(tries);
    //Checks if the tries are used up
    if (tries < 5) {
        //Checks if the tresure is found
        if ((x >= treasurex - 13 && x <= treasurex + 14) && (y >= treasurey - 13 && y <= treasurey + 14)) {
            //treasure found   
            console.log("Treasure found");
            drawChest();

            setTimeout(reset, 15000);
        }
        else {
            //treasure not found
            console.log("Treasure isn't here, look another place");
            tries++;
        }
    }
    else {
        if (tries > 5) {
            console.log("Stop clicking you are out of tries");
            //no more tries
        }
        else {
            tries++;
            console.log("Game over");
            drawChest();
            setTimeout(reset, 15000);
            
            //reveal chest
        }
    }
    
}

function reset() {
    location.reload();
    
}
//Function that creates random coordinates for the tresure
function buryTreasure() {
    treasurex = getRndInteger(0, canvas.width);
    treasurey = getRndInteger(0, canvas.height);
}

//function that always return random number between min(included)
//and max(included). Taken from w3schools in JavaScript Random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min- + 1)) + min;
}


