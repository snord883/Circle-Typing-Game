var backgroundCanvas = document.getElementById('backgroundCanvas');

backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

var c = backgroundCanvas.getContext('2d');
var allCircles = [];


function Circle(colorStyle, x, y, r, innerText){
    this.colorStyle=colorStyle;
    this.x=x;
    this.y=y;
    this.r=r;
    this.innerText=innerText;

    this.drawCircle = function() {
        //Start drawing the circle
        c.beginPath();

        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.strokeStyle = this.colorStyle;
        c.stroke();

        this.fillCircleText();
    }

    this.fillCircleText = function(){
        //Add text to the middle of the circle
        c.fillStyle = this.colorStyle;
        //Make the Text proportional to the circle
        c.font= this.r + 'px Georgia';
        c.textAlign = 'Center';
        c.fillText(this.innerText,this.x-this.r/4,this.y+this.r/4);
    }
}

/*
Funtion generates a random int within the
Parameters lower bound(lBound) & upper Bound (ubound)
*/
function randomizeBetween(lBound,uBound){
    // Random number between 0-1 multiplied difference uBound and lBound, rounded to nearest int, and add lBound
    return Math.round(Math.random()*(uBound-lBound))+lBound;
}

/*
Funtion generates three random ints within 0 - 255
Parameters lower bound(lBound) & upper Bound (ubound)
*/
function randomColor(){
    var rgbValues= [0,0,0];

    //Returns the sum of the colors to ensure the color is visually bright enough
    while (rgbValues.reduce(function sum(prev,curr){return prev + curr;},0)<200) {
        //Assign random numbers [0,255] to RGB
        for(var n=0;n<3;n++){
            rgbValues[n]=randomizeBetween(0,255);
        }
    }

    //Create string for the color of the circle and the text
    return 'rgba(' + rgbValues[0] + ', ' + rgbValues[1] + ', ' + rgbValues[2] + ', 1)';

}

function createCirles(n){
    for(var i =0;i<n;i++){
        var circle;
        var colorStyle;
        var r;
        var x;
        var y;
        var innerText;

        colorStyle = randomColor();
        r = randomizeBetween(20,40);
        //r & (window.inner.. - 2*r) ensure the circle does not go off the screen
        x = randomizeBetween(r,window.innerWidth-2*r);
        y = randomizeBetween(r,window.innerHeight-2*r);
        //Keycodes 65-90 are for the alphabet
        innerText = String.fromCharCode(randomizeBetween(65,90)).toLowerCase();

        circle = new Circle(colorStyle,x,y,r,innerText);
        circle.drawCircle();
        allCircles.push(circle);
    }
}

/*
Funtion to create a set number of circles when board is clicked or wrong key is pressed
*/
window.onclick = function (event){
    createCirles(10);
}

window.onkeypress = function (event){

    var keyPressed = String.fromCharCode(event.keyCode);

    console.log(keyPressed);

    handleKeyPressed(keyPressed);
    c.clearRect(0,0, window.innerWidth, window.innerHeight);
    allCircles.forEach(function(circle) {
        circle.drawCircle();
    });
}

function handleKeyPressed(keyPressed){
    var isNotInAllCirles = true;

    //Loop through to see if the keyPressed in the array of allCircles
    for (var i = 0; i < allCircles.length; i++) {
        if (allCircles[i].innerText==keyPressed) {
            allCircles.splice(i,1);
            isNotInAllCirles=false;
            i--;
        }
    }

    //if the keyPressed is not in the array of allCircles then add a circle
    if (isNotInAllCirles) {
            createCirles(1);
            console.log("add to the allCircles");
    }
}
