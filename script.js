const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


function showNumber(number){
    if(waitingForSecondNumber){
        display.value = number;
        waitingForSecondNumber = false;
    }
    else if(display.value === "0"){
        display.value = number;
    }else{
        display.value=display.value + number;
    }
   
}

function clearDisplay(){
     display.value = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    console.log("Calculator cleared:", {
        display: display.value,
        firstNumber: firstNumber,
        operator: operator,
        waitingForSecondNumber: waitingForSecondNumber
    });
   }

   
    
function chooseOperator(selectedOperator) {

    // No new number entered yet: change the operator
    if (waitingForSecondNumber && firstNumber !== null) {
        operator = selectedOperator;
        return;
    }

    // Complete the previous operation if needed
    if (firstNumber !== null) {
        calculate();
    }

    // Don't start a new operation after an error
    if (display.value === "Error") {
        return;
    }

    // Store the number and selected operator
    firstNumber = Number(display.value);
    operator = selectedOperator;
    waitingForSecondNumber = true;
}

   



function calculate() {

    if (firstNumber === null || operator === null) {
        return;
    }

    // Wait until the user enters the second number
   if (waitingForSecondNumber || display.value === "Error") {
    return;
}

    const secondNumber = Number(display.value);
    let result;

    
switch (operator) {
    case "+":
        result = firstNumber + secondNumber;
        break;

    case "-":
        result = firstNumber - secondNumber;
        break;

    case "*":
        result = firstNumber * secondNumber;
        break;

    case "/":
        if (secondNumber === 0) {
            display.value = "Error";
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = true;
            return;
        }

        result = firstNumber / secondNumber;
        break;
}


    display.value = result;

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}

function addDecimal(){
    if(waitingForSecondNumber || display.value === "Error"){
        display.value = "0.";
        waitingForSecondNumber = false;
        return;
    }
    if(!display.value.includes(".")){
        display.value += ".";
    }
}
