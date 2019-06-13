// Calculator script file for Odin project blah
let lowerDisplay = "1";
let upperDisplay = "";
let theExpression = "";
let pointTriggered = false;
let operatorTriggered = true;
let currentResult = 0;
let operationStore = [];
let operandStore = [];
const topDisplay = document.querySelector("#top-display");
const bottomDisplay = document.querySelector("#bottom-display");

function clearExpression(){
    upperDisplay = ""
    lowerDisplay = "0";
    theExpression = "";
    operatorTriggered = true;
    pointTriggered = false;
    operationStore = [];
    operandStore = [];
    topDisplay.textContent = upperDisplay;
    bottomDisplay.textContent = lowerDisplay;
}

function evaluateExpression() {
    if(operatorTriggered) {
        alert("Please complete expression before pressing equals!");
        return;
    }
    splitExpression();
    reduceExpression("*", "/");
    reduceExpression("+", "-");
    theExpression = "";
    currentResult = operandStore[0];
    currentResult = roundNum(currentResult, 5);
    bottomDisplay.textContent = currentResult;
    return currentResult;
}

function roundNum(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

function reduceExpression(operatorOne, operatorTwo) {
    let result = 0;
    let index;
    while(operationStore.some( operator => operator === operatorOne || operator === operatorTwo)) {
        operationStore.find( (operator, index) => {
            if(operator === operatorOne || operator === operatorTwo){
                switch (operator) {
                    case "*":
                        result = multiplyNumbers(operandStore[index], operandStore[index + 1]);
                        break;
                    case "/":
                        result = divideNumbers(operandStore[index], operandStore[index + 1]);
                        if(result === null) return;
                        break;                
                    case "+":
                        result = addNumbers(operandStore[index], operandStore[index + 1]);
                        break;
                    case "-":
                        result = subtractNumbers(operandStore[index], operandStore[index + 1]);
                        break;  
                }
                operandStore.splice(index, 2, result);
                operationStore.splice(index, 1);
            }
        });
    }
}
function splitExpression() {
    // split out operations into one array
    operationStore = theExpression.replace(/[^+\-*\/]/g,"").split("");
    // split out operands into another array
    operandStore = theExpression.replace(/[+\-*\/]/g,",").split(",");
}

function addNumbers (firstNum, secondNum){
    return parseFloat(firstNum) + parseFloat(secondNum);
}

function subtractNumbers (firstNum, secondNum){
    return firstNum - secondNum;
}

function multiplyNumbers (firstNum, secondNum){
    return firstNum * secondNum;
}

function divideNumbers (firstNum, secondNum){
    if(secondNum === 0) divideByZero();
    return firstNum / secondNum;
}

function divideByZero (){
    alert("You cannot divide by zero! Start again.")
    clearExpression();
    return null;
}

function operate(firstNum, secondNum, operator) {
    let resultOfOperation = 0;
    switch (operator) {
        case "+":
                resultOfOperation = addNumbers(firstNum, secondNum);
            break;
        case "-":
                resultOfOperation = subtractNumbers(firstNum, secondNum);
            break;
        case "*":
                resultOfOperation = multiplyNumbers(firstNum, secondNum);
            break;
        case "/":
                resultOfOperation = divideNumbers(firstNum, secondNum);
            break;                                       
    }
    return resultOfOperation;
}

function buildExpression(e) {
    const thisEvent = e.target.id;
    switch (thisEvent) {
        case "clr-button":
            clearExpression();
            break;
        case "del-button":
            let deletedChar = theExpression[theExpression.length-1];
            theExpression = theExpression.slice(0, theExpression.length-1)
            operatorTriggered? operatorTriggered = false: operatorTriggered;
            deletedChar === "."? pointTriggered = false: pointTriggered;
            break;
        case "one-button":
            theExpression += "1";
            operatorTriggered = false;
            break;
        case "two-button":
            theExpression += "2";
            operatorTriggered = false;
            break;
        case "three-button":
            theExpression += "3";
            operatorTriggered = false;
            break;
        case "four-button":
            theExpression += "4";
            operatorTriggered = false;
            break;
        case "five-button":
            theExpression += "5";
            operatorTriggered = false;
            break;
        case "six-button":
            theExpression += "6";
            operatorTriggered = false;
            break;
        case "seven-button":
            theExpression += "7";
            operatorTriggered = false;
            break;
        case "eight-button":
            theExpression += "8";
            operatorTriggered = false;
            break;
        case "nine-button":
            theExpression += "9";
            operatorTriggered = false;
            break;
        case "zero-button":
            theExpression += "0";
            operatorTriggered = false;
            break;
        case "point-button":
            if(!pointTriggered) {
                theExpression += ".";
                pointTriggered = true;
            }
            break;
        case "add-button":
            if(!operatorTriggered) {
                theExpression += "+";
                operatorTriggered = true;
                pointTriggered = false;
            }
            break;
        case "subtract-button":
            if(!operatorTriggered) {
                theExpression += "-";
                operatorTriggered = true;
                pointTriggered = false;
            }
            break;
        case "divide-button":
            if(!operatorTriggered) {
                theExpression += "/";
                operatorTriggered = true;
                pointTriggered = false;
            }
            break;
        case "multiply-button":
            if(!operatorTriggered) {
                theExpression += "*";
                operatorTriggered = true;
                pointTriggered = false;
            }
            break;
        case "equals-button":
            theExpression = evaluateExpression();
            break;
    }
    topDisplay.textContent = theExpression;
}

// create listeners across all buttons
const buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach( button => {
    button.addEventListener("click", buildExpression);
});
