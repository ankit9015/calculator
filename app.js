const screenUpper = document.querySelector("#screen-upper");
const screenLower = document.querySelector("#screen-lower");

const keyClear = document.querySelector("#clear");
const keyDelete = document.querySelector("#delete");

const keyNum0 = document.querySelector("#num0");
const keyNum1 = document.querySelector("#num1");
const keyNum2 = document.querySelector("#num2");
const keyNum3 = document.querySelector("#num3");
const keyNum4 = document.querySelector("#num4");
const keyNum5 = document.querySelector("#num5");
const keyNum6 = document.querySelector("#num6");
const keyNum7 = document.querySelector("#num7");
const keyNum8 = document.querySelector("#num8");
const keyNum9 = document.querySelector("#num9");

const keyDivide = document.querySelector("#divide");
const keyMultiply = document.querySelector("#multiply");
const keySubstract = document.querySelector("#substract");
const keyAdd = document.querySelector("#add");
const keyEqual = document.querySelector("#equal");
const keyDecimal = document.querySelector("#decimal");

function add(x, y) {
    return Number(x) + Number(y);
}

function substract(x, y) {
    return Number(x) - Number(y);
}

function divide(x, y) {
    return Number(x) / Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function operate(operator, x, y) {
    let z;
    if (operator === "/") {
        if (Number(y) === 0) {
            alert("You can not divide by 0!");
        } else {
            z = divide(x, y);
        }        
    } else if (operator  === "*") {
        z = multiply(x, y);
    } else if (operator === "+") {
        z = add(x, y)
    } else {
        z = substract(x, y)
    }
    z = +z.toFixed(5)
    return z;
}


let operationStack = [];
screenLower.innerText = 0;
let countOperation = 0


function fillOperationStack(value) {
    if (operationStack.length === 0 || operationStack.length === 2) {
        operationStack.push(Number(value));
    } else {
        operationStack.push(String(value));
    }
}

function displayScreenUpper(arr) {
    screenUpper.innerText = arr.join(" ");
    displayScreenLower(0);
}

function displayScreenLower (value) {
    screenLower.innerText = value;
}





let numStr = ""
function numKeyHandler(keyPressed) {
    if (numStr.length > 0 && Number(numStr[0]) !== 0) {
        numStr += keyPressed;
    } else {
        numStr = keyPressed;
    }
    displayScreenLower(numStr);
}    

function decimalHandler() {
    
    if (!numStr.includes(".")) {
        numStr += ".";
    }
}
   
function checkSymbol() {
     if (operationStack.length === 0 && countOperation ===0) {
         return false;
     }
     return true;
}

function symbolKeyHandler(keyPressed) {
        if (numStr.length) {
            console.log(operationStack);
            fillOperationStack(numStr);
            numStr = '';
        }   
    if (operationStack.length === 2) {
        // if (keyPressed.className === "symbol-keys") {
        //     operationStack[1] = keyPressed;
        // } 
        operationStack[1] = keyPressed;
        displayScreenUpper(operationStack);
    } else if (operationStack.length === 3) {
            // console.log(operationStack)
            let currentValue = operate(operationStack[1], operationStack[0], operationStack[2]);
            if (currentValue) {
                if (keyPressed === "=") {
                    displayScreenUpper(operationStack);            
                    operationStack = [currentValue];    
                    displayScreenLower(currentValue);        
                } else {
                    operationStack = [currentValue, keyPressed];      
                    displayScreenUpper(operationStack);         
                }
                countOperation += 1;
            } else {
                clear()
            }
                   
    } else {
        if(checkSymbol()) {
            operationStack.push(keyPressed);
            displayScreenUpper(operationStack);
        }
           

    }

    console.log(operationStack);   
}

// add constraints for symbols on 1st and last array position

function clear() {
    operationStack = [];
    displayScreenUpper(operationStack);
    numStr = "";
    countOperation = 0;
}

function deleteFromStack() {
    numStr = numStr.slice(0, -1);
    displayScreenLower(numStr);
    console.log(operationStack);
}


keyDivide.addEventListener('click', (e) => {
    symbolKeyHandler(e.target.value);
})

keyMultiply.addEventListener('click', (e) => {
    symbolKeyHandler(e.target.value);
})

keySubstract.addEventListener('click', (e) => {
    symbolKeyHandler(e.target.value);
})

keyAdd.addEventListener('click', (e) => {
    symbolKeyHandler(e.target.value);
})

keyEqual.addEventListener('click', (e) => {
    symbolKeyHandler(e.target.value);
})


keyDecimal.addEventListener("click", decimalHandler);

keyNum9.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum8.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum7.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum6.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum5.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum4.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum3.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum2.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum1.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})

keyNum0.addEventListener('click', (e) => {
    numKeyHandler(e.target.value);
})


keyClear.addEventListener("click", clear);
keyDelete.addEventListener("click", deleteFromStack);

symbolsArr = ['+', '-', '*', '/', '='];

document.addEventListener('keypress', (event) => {
    var name = event.key;
    var code = event.code;

    // alert(`key pressed ${name}, code: ${code}`);
    if (Number(name)) {
        numKeyHandler(name);
    } else if (symbolsArr.includes(name)) {
        symbolKeyHandler(name);
    }
})