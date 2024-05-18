//Active elements

const numberButtons = document.querySelectorAll('.calcButton');
const opButtons = document.querySelectorAll('.opButton');
const resultButton = document.getElementById('resultButton');
const themeButton = document.getElementById('blue_theme');
const display = document.getElementById("display");

//Div elements

const calculatorBox = document.getElementById('calculatorBox');
const keyBox = document.getElementById('keyBox')
const displayText = document.getElementById('displayText');
const background = document.getElementById('background');
const themeMenu = document.getElementById('themeMenu');




let previousNum = "";
let currentNum=""; 
let secondPart=false;
let leftNumber;
let rightNumber;
let operation;
let primaryTheme = true;

let blueTheme = [181, 200, 230];
let purpleTheme = [61, 85, 122];

//set initial theme at start
window.onload = function(){
    updateTheme(purpleTheme);
}

function updateDisplay(currentNumber){
    displayText.innerText = currentNumber;
}
numberButtons.forEach(function(button){
    button.addEventListener("click",function() {
            
            previousNum=currentNum;
            currentNum=previousNum + String(button.value); 
            console.log(currentNum);  
            if (secondPart){
                updateDisplay(leftNumber + " " + operation + " " + currentNum);
            }
            else{
                updateDisplay(currentNum);
            }
            
    });
});

opButtons.forEach(function(button){
    button.addEventListener("click", function() {
        if (secondPart == false){
            leftNumber = currentNum;
            currentNum = "";
            operation = button.innerText;
            console.log(operation);
            updateDisplay(leftNumber + " " + operation);
            secondPart = true;
        }
        
    });
});

resultButton.addEventListener("click", function() {
    if (operation !== undefined) {
        rightNumber = currentNum;
        updateDisplay(leftNumber +" " + operation + " " +rightNumber)
        const expression = leftNumber + operation + rightNumber;
        const result = eval(expression);
     
        if (isNaN(result)) {
          console.log("Syntax Error :)");
        } else {
          console.log(result);
          updateDisplay(result);
        }
    } else {
        console.log("escribe el segundo numero, puto");
        reset();
    }
    reset();
});

function reset(){
    currentNum = "";
    previousNum = "";
    leftNumber = "";
    rightNumber = "";
    operation = undefined;
    secondPart=false;
}

themeButton.addEventListener("click", function(){

    
    if(primaryTheme == true){
        themeButton.style.animation = "enableButton 0.3s ease forwards";
        primaryTheme = false;
    }
    else{
        themeButton.style.animation = "disableButton 0.3s ease forwards"
        primaryTheme = true;
    }

    if(themeButton.style.backgroundColor == rgbToString(blueTheme)){
        updateTheme(purpleTheme);
    }
    else {
        updateTheme(blueTheme);
    }
    console.log();
})  

function updateTheme(colorTheme){
    themeButton.style.backgroundColor=rgbToString(colorTheme);
    themeMenu.style.backgroundColor = rgbToString(sumColorArray(colorTheme, [10,10,10]))
    background.style.backgroundColor=rgbToString(sumColorArray(colorTheme, [30,30,30]));


    //Calculator Box

    calculatorBox.style.backgroundColor = rgbToString(colorTheme);
    calculatorBox.style.boxShadow = "5px 5px 2px 0px " +  rgbToString(restColorArray(colorTheme,[20,20,20]));

    //Display

    display.style.backgroundColor = rgbToString(sumColorArray(colorTheme, [30,30,30]));
    displayText.style.color = rgbToString(colorTheme);

    //number and operation buttons

    numberButtons.forEach((numButton)=>{
        numButton.style.backgroundColor = rgbToString(sumColorArray(colorTheme, [20,20,20]));
        numButton.style.color = rgbToString(restColorArray(colorTheme, [10,10,10]));
            
    });

    opButtons.forEach((opButton)=>{
        opButton.style.backgroundColor = rgbToString(sumColorArray(colorTheme, [20,20,20]));
        opButton.style.color = rgbToString(restColorArray(colorTheme, [10,10,10]));

    });
    resultButton.style.backgroundColor = rgbToString(sumColorArray(colorTheme, [20,20,20]));
    resultButton.style.color = rgbToString(restColorArray(colorTheme, [10,10,10]));
}

function rgbToString( rgbArray ){
    return "rgb(" + rgbArray[0] + ", " + rgbArray[1] + ", " + rgbArray[2] + ")"
}

function sumColorArray(rgbArray,adjust){
    let resultArray=[0,0,0];

    for (i=0; i<3; i++){
        resultArray[i] = rgbArray[i] + adjust[i];
    }
    return resultArray;
}

function restColorArray(rgbArray, adjust){
    let resultArray=[0,0,0];

    for (i=0; i<3; i++){
        resultArray[i] = rgbArray[i] - adjust[i];
    }
    return resultArray;
}
