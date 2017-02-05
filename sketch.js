// Defining Global variables for canvas size
var containerW = 0;
var containerH = 0;
var containerX = 0;
var containerY = 0;

var img;
var img3;


//var moveCorgi;
var corgiX;
var corgiY;

// Defining list of snowflakes array
var snowflakes = [
	{ x: 10, y: 10, size: 5, v: 5},
	{ x: 30, y: 30, size: 4, v: 5 }
];

// Defining list of bone array
var bone = [
	{ x: 10, y: 10, size: 5, v: 5},
];


function setup () {
	// Calculating and Updating variables for canvas size		
	containerW = windowWidth;
	containerH = windowHeight;
	containerX = windowWidth;
	containerY = windowHeight;

	// Randomly Generate
	for (var i = 0; i < 100; i++) {
		var newX = random(containerW); // where to start on x
		var newY = random((containerH * 1)); // where to start on y
		var newS = random(3, 8); // how big to be
		var newV = random(2, 5); // how fast to move

		// Add each snowflake as it is generated to the snowflakes
		snowflakes.push({ x: newX, y: newY, size: newS, v: newV });
	}
    
    // Add each snowflake as it is generated to the snowflakes
		snowflakes.push({ x: newX, y: newY, size: newS, v: newV });
    
    

    // Randomly Generate bone
	//for (var i = 0; i < 100; i++) { var boneX = random(containerW); // where to start on x
    //var boneY = random((containerH * 1)); // where to start on y
		//var boneS = random(3, 8); // how big to be
		//var boneV = random(2, 5); // how fast to move

	//}
    
     // Add each bone as it is generated to the bones
//bone.push({ x: boneX, y: boneY, size: boneS, v: boneV });
    
    
	// Create new canvas element within section#Display
	var Canvas = createCanvas(containerW, containerH); 
	Canvas.parent('Display');
	frameRate(30);
	noStroke();
    
    //load image of corgi
    img =loadImage("img/corgi.png");

    //load image of bone
    img3 =loadImage("img/BONE3.png");

    
    //initiating x coordinates for corgi
    //moveCorgi = 0;
    corgiX = 100;
    corgiY = windowHeight - 100;
}



function draw () {
	// erase all pixels on canvas
	background(50);

	// for each snowflake
	for (var i = 0; i < snowflakes.length; i++) {
		var flake = snowflakes[i]; // define current snowflake
		
		// update flake y coordinate based on flake velocity
		flake.y = flake.y + flake.v;

		// if flake is beyond bottom of the canvas element, start it at the top
		if ( flake.y > containerH ) {
			flake.y = 0;
		}

             
        
        
		// draw snowflake
		ellipse(flake.x, flake.y, flake.size, flake.size);
	}
    
    // for each bone
	for (var i = 0; i < bone.length; i++) {
		var treat = bone[i]; // define current bone
		
		// update treat y coordinate based on treat velocity
		treat.y = treat.y + treat.v;

		// if flake is beyond bottom of the canvas element, start it at the top
		if ( treat.y > containerH ) {
			treat.y = 0;
		}

        if ( treat.x > containerW ) {
        treat.x = random(windowWidth);}

		// draw bone
		image(img3, treat.x, treat.y, treat.width/9, treat.height/10);
	}
    
    
    
    
    
    
    
    /*//draw corgi
    image(img, moveCorgi, containerH-190, img.width/2, img.height/2);
    moveCorgi++;
       if (moveCorgi <= windowWidth) {
        moveCorgi++;
         }
         else{
         moveCorgi--;
         } */
    //draw corgi


    // Handle Jump Offset if isJumping
    var corgiJumpOffset = 0;
    if ( isJumping ) {
        corgiJumpOffset = getJumpOffset();
    }
    
    // Render Corgi
    image(img, corgiX - 100, corgiY - 27 - corgiJumpOffset, img.width/3, img.height/3);
}

var corgiV = 0; // Corgi Velocity

function keyPressed () {
    if (!corgiV) corgiV = windowWidth * 0.015; 

    //left arrow
    if (keyCode == 37)
        corgiX -= corgiV;
    
    if (corgiX < -110)
       corgiX = windowWidth - (img.width/3);
    
    // right arrow
    if (keyCode == 39)
        corgiX += corgiV;
    
    if (corgiX > windowWidth)
       corgiX = 0;

    // Up Arrow
    if (keyCode == 38) {
        corgiY -= corgiV; 
    }
    
    if(corgiY < windowHeight/2)
        corgiY = windowHeight/2;

    //down arrow
    if (keyCode == 40)
        corgiY += corgiV;
    
    if(corgiY > windowHeight)
        corgiY = windowHeight;
    
    // Spacebar
    if (keyCode == 32) {
        isJumping = true;
    }
}


// ********** JUMPING ********** //

var offsetArray = [0, 10, 25, 60, 100, 120, 125];
var jumpIndex = -1;
var isJumping = false;
var isMovingUp = true;

function getJumpOffset () {

    // Setting up a strang counter which goes up and down the array
    if (isMovingUp && jumpIndex < offsetArray.length - 1) {
        jumpIndex++;
    } else {
        jumpIndex--;
        isMovingUp = false;
    }

    // Once corgi comes down stop the jump cycle
    if (!isMovingUp && jumpIndex === 1) {
        isMovingUp = true;
        isJumping = false;
        jumpIndex = -1;
        return 0;
    }

    return offsetArray[jumpIndex] * 1.5;
}
