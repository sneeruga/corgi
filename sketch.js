// Defining Global variables for canvas size
var containerW = 0;
var containerH = 0;
var containerX = 0;
var containerY = 0;


//audio
var play;
var pause;
var playX;
var playY;

var playbtn;
var pausebtn;


// Corgi Variables
var img; // var for image to be loaded
var corgiX; // vars for corgi position
var corgiY;
var corgiObj;

var audio, play, pause;

// Defining list of snowflakes array
var snowflakes = [
	{ x: 10, y: 10, size: 5, v: 5},
	{ x: 30, y: 30, size: 4, v: 5 }
];


// Defining list of bone array
var img3; // var for image to be loaded
var bone = [
	{ x: 10, y: 10, v: 5, size: 100},
];


// Defining list of poop array
var poopImg; // var for image to be loaded
var poop = [
	{ x: 90, y: 50, v: 5, size : 40 },
    { x: 390, y: 50, v: 5, size : 40 },
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
    
    
//
//    // Randomly Generate bone
//	for (var i = 0; i < 100; i++) {
//		var boneX = random(containerW); // where to start on x
//		var boneY = random((containerH * 1)); // where to start on y
//		var boneS = random(3, 8); // how big to be
//		var boneV = random(2, 5); // how fast to move
//
//	}
//    
//     // Add each bone as it is generated to the bones
//		bone.push({ x: boneX, y: boneY, size: boneS, v: boneV });
//    
//    
//    // Randomly Generate poop
//	for (var i = 0; i < 100; i++) {
//		var poopX = random(containerW); // where to start on x
//		var poopY = random((containerH * 1)); // where to start on y
//		var poopS = random(3, 8); // how big to be
//		var poopV = random(2, 5); // how fast to move
//            poop.push({ x: poopX, y: poopY, size: poopS, v: poopV });
//	}
//    
//     // Add each poop as it is generated to the poops
//		
//    
//    
    
    
	// Create new canvas element within section#Display
	var Canvas = createCanvas(containerW, containerH); 
	Canvas.parent('Display');
	frameRate(30);
	noStroke();
    
    //load image of corgi
    img =loadImage("img/corgi.png");

    //load image of bone
    img3 =loadImage("img/BONE3.png");
    
    
    //load pause btn
    pause = loadImage("img/pause.png");
    pauseX = 20;
    pauseY = 40;
    pausebtn = createImg("img/pause.png");
    pausebtn.id('pause');
    pausebtn.position(pauseX, pauseY);
    
   console.log(pausebtn);
    
//    //load play btn
//    //play = loadImage("img/play.png");
//    playX = 20;
//    playY = 40;
//    playbtn = createImg("img/play.png");
//    playbtn.id('play');
//    playbtn.position(playX, playY);
//    
//    console.log(playbtn);
    
      //load image of poop
    poopImg =loadImage("img/poop.png");
    
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
    
    
    
    // Handle Jump Offset if isJumping
    var corgiJumpOffset = 0;
    if ( isJumping ) {
        corgiJumpOffset = getJumpOffset();
    }
    
    corgiObj = {x: corgiX - 100, y: corgiY - corgiJumpOffset, w: img.width/3, h: img.height/3};
    
    

    
    // for each bone
	for (var i = 0; i < bone.length; i++) {
		var treat = bone[i]; // define current bone
		treat.w = treat.size * 1.33;
        treat.h = treat.size;
        
		// update treat y coordinate based on treat velocity
		treat.y = treat.y + treat.v;
        
        if ( detectCollision(corgiObj, treat) ) {
            treat.size = random (75, 125);
            treat.y = treat.size * -1;
            treat.x = random((windowWidth - treat.size));
            // add / subtract points here!!
        }

		// if flake is beyond bottom of the canvas element, start it at the top
		if ( treat.y > containerH ) {
            treat.size = random (75, 125);
            treat.y = treat.size * -1;
            treat.x = random((windowWidth - treat.size));
		}

		// draw bone
		image(img3, treat.x, treat.y, treat.size * 1.33, treat.size);
    }
        
        
        
        // for each poop
	for (var i = 0; i < poop.length; i++) {
		var shit = poop[i]; // define current bone
		shit.h = shit.size;
        shit.w = shit.size;
        
		// update treat y coordinate based on treat velocity
		shit.y = shit.y + shit.v;
        
        if ( detectCollision(corgiObj, shit) ) {
            shit.size = random (30, 60);
            shit.y = shit.size * -1;
            shit.x = random((windowWidth - shit.size));
            
            // add / subtract points here!!
        }

		// if flake is beyond bottom of the canvas element, start it at the top
		if ( shit.y > containerH ) {
			shit.size = random (30, 60);
            shit.y = shit.size * -1;
            shit.x = random((windowWidth - shit.size));
            
		}
        
		// draw bone - image(img, x, y, width, height)
		image(poopImg, shit.x, shit.y, shit.size, shit.size);
	}
<<<<<<< HEAD
    
    
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
=======
>>>>>>> origin/master



    
    
    // Render Corgi
    image(img, corgiX - 100, corgiY - 27 - corgiJumpOffset, img.width/3, img.height/3);
    
    //Audio buttons
////    image(play, playX - 100, playY - 27, img.width/13, img.height/9);
//    image(pause, pauseX - 100, pauseY - 27, img.width/13, img.height/9);
    
}


// Usage => if ( dectectCollision(corgi, poo1) ) => true / false
function detectCollision (objA, objB) {
    if ( !objA || !objB ) { 
        return false;
    }

    if (objA.x < objB.x + objB.w &&
        objA.x + objA.w > objB.x &&
        objA.y < objB.y + objB.h &&
        objA.y + objA.h > objB.y) {
        return true;
    }
    
    return false;
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


// ********** AUDIO ********** //
function initAudioPlayer() {
    audio = new Audio();
    audio.src = "audio/Galaxy.mp3";
    audio.loop = true;
    audio.play(); 
    console.log(audio);

    //Set object references
//    play = document.getElementById("play");
    pause = document.getElementById("pause");
    //Add Event Handling
    pausebtn.elt.addEventListener("click", function(e){
//        console.log(e);
        if (!audio.paused) {
            audio.pause();
        } else {
            audio.play();
        }
    });
//    pause.addEventListener("click", pause);
}
window.addEventListener("load", initAudioPlayer);

