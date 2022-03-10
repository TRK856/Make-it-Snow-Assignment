// code needed to activate certain funtions
// bubbles {
    // document.addEventListener("keydown", keydownHandler)

    // let bubbles = [];

    // requestAnimationFrame(drawBubbles);

    // setInterval(addBubble, 1000)
// }

// walk through functions (basic draw functions)
function stroke(style, lineWidth) {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth
}

function fill(style) {
ctx.fillStyle = style;
}

function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function rect(x, y, w, h, mode) {
    if (mode === "fill") {
        ctx.fillRect(x, y, w, h);
    } else if (mode === "stroke") {
        ctx.filstrokeRect(x, y, w, h);
    }
}

function circle(x, y, r, mode) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (mode === "fill") {
        ctx.fill();
    } else if (mode === "stroke") {
        ctx.stroke();
    }
}

function text(message, x, y, mode) {
    if (mode === "fill") {
        ctx.fillText(message, x, y);
    } else if (mode === "stroke") {
        ctx.strokeText(message, x, y);
    }
}

function triangle(x1, y1, x2, y2, x3, y3, mode) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    if (mode === "fill") {
        ctx.fill();
    } else if (mode === "stroke") {
        ctx.closePath();
        ctx.stroke();
    }
}

// walthrough functions (random libary)
function randomDec(low, high){
    return Math.random() * (high - low) + low
}

function randomInt(low, high){
    return Math.floor(Math.random() * (high - low) + low);
}

function randomRGB(){
    let r = randomInt(0, 256), g = randomInt(0, 256), b = randomInt(0, 256);
    return "rgb("+ r +", "+ g +", "+ b +")";
}

// walkthrough functions (bubbles functions)
function createRandomBubbleArray(total){
    let temp = [];
    for(let n = 1; n <= total; n++){
        temp.push(newRandomBubble());
    }
    return temp;
}

function newBubble(initX, initY, initR, initColor){
    return{
        x:initX,
        y:initY,
        r:initR,
        color:initColor
    }
}

function drawBubble(aBubble){
    stroke(aBubble.color)
    circle(aBubble.x, aBubble.y, aBubble.r, "stroke")
}

function moveBubble(aBubble){
    aBubble.x += randomInt(-2, 3);
    aBubble.y += randomInt(-2, 3);
}

function newRandomBubble(initX, initY, initR, initColor){
    return{
        x:randomInt(0, cnv.width),
        y:randomInt(0, cnv.height),
        r:randomInt(5, 35),
        color:randomRGB()
    }
}

function keydownHandler(event) {
    if (event.keyCode === 39) {
        addBubble()
    } else if (event.keyCode === 37) {
        bubbles.pop();
    }
}

function background(color){
    fill(color);
    rect(0, 0, cnv.width, cnv.height, "fill")
}

function drawBubbles(){
    background("pink")

    for(let i = 0; i < bubbles.length; i++){
        moveBubble(bubbles[i]);
        drawBubble(bubbles[i]);
    }
    requestAnimationFrame(drawBubbles);
}

function addBubble() {
    bubbles.push(newRandomBubble());
}

// my functions (draw functions assginment)
function drawAStar(starCenterX, starCenterY, numberOfSpikes, outerDepth, innerDepth, [fill, stroke]) {
    // define our varibles that need to remain constant
    let
        angle = 0,
        step = Math.PI / numberOfSpikes;
    // begin path
    ctx.beginPath();

    // loop to draw stars
    for (let i = 0; i < numberOfSpikes; i++) {
        // adds to the angle the more the loop is repeated
        angle += step;

        // decides where the line is drawn to useing cos and sin
        // remeber soh cah toa
        // outer depth used to difine how far out the points of the star go to
        x = starCenterX + Math.cos(angle) * outerDepth;
        y = starCenterY + Math.sin(angle) * outerDepth;

        // draws the calculated line
        ctx.lineTo(x, y);

        // adds to the angle we are goint hrough the loop again
        angle += step;

        // same but this time the number is multipled by the inner depth in order to mak the "spikes" in stars
        // innerdepth has to be less than outer depth in order to make a star
        // if it is greater than outer depth, a ring is created or a circle if outerDepth = 0
        x = starCenterX + Math.cos(angle) * innerDepth;
        y = starCenterY + Math.sin(angle) * innerDepth;

        // draws the calculated line
        ctx.lineTo(x, y);
    }

    // gives the abilty to have both "stroke" and "fill" activated on the same time
    if (fill === true && stroke === true){
        ctx.fill();
        ctx.closePath();
        ctx.stroke()
    } else if (stroke === true) {
        ctx.closePath();
        ctx.stroke();
    } else if (fill === true) {
        ctx.fill();
    }
}

function drawRealisticTriangle(x1, y1, x2, y2, x3, y3, [drawThirdLine]) {    
    // center triangle
    triangle(x1, y1, x2, y2, x3, y3, "stroke")

    //small line on each side of the triangle 
    line(x1, y1, x1 - 20, y1 - 15)
    line(x2, y2, x2 - 20, y2 - 15)
    line(x3, y3, x3 - 20, y3 - 15)

    // draw lines to make it realistic
    line(x2 - 20, y2 - 15,  x1 - 20, y1 - 15)
    line(x3 - 20, y3 - 15,  x1 - 20, y1 - 15)

    // check if to draw thrid line
    if (drawThirdLine === true) {
        line(x3 - 20, y3 - 15,  x2 - 20, y2 - 15)
    }
}

function drawAnyShape(shapeCenterX, shapeCenterY, numberOfSides, size, [fill, stroke]) {
    ctx.save();
    ctx.translate(shapeCenterX,shapeCenterY);
    ctx.rotate(0.8); //Rotate the canvas by 90 degrees

    // define our varibles that need to remain constant
    let
        angle = 0,
        step = Math.PI * 2 / numberOfSides;
    // begin path
    ctx.beginPath();

    // loop to draw stars
    for (let i = 0; i < numberOfSides; i++) {
        // adds to the angle the more the loop is repeated
        angle += step;

        x = shapeCenterX + Math.cos(angle) * size;
        y = shapeCenterY + Math.sin(angle) * size;

        // draws the calculated line
        ctx.lineTo(x, y);
    }

    // gives the abilty to have both "stroke" and "fill" activated on the same time
    if (fill === true && stroke === true){
        ctx.fill();
        ctx.closePath();
        ctx.stroke()
    } else if (stroke === true) {
        ctx.closePath();
        ctx.stroke();
    } else if (fill === true) {
        ctx.fill();
    }
    ctx.restore(); // to reset the canvas rotation
}

// my functions (make it snow assignments)