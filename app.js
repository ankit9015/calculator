const screenUpper = document.querySelector(".screen-upper");
const screenLower = document.querySelector(".screen-lower");

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
        z = divide(x, y);
    } else if (operator  === "*") {
        z = multiply(x, y);
    } else if (operator === "+") {
        z = add(x, y)
    } else {
        z = substract(x, y)
    }
    
    console.log("ans", z);
    return z;
}

let operationStack = [];
screenLower.innerText = 0;

// function displayScreenUpper (value) {
//     // console.log(screenUpper.value);
//     if (screenUpper.hasChildNodes()) {
//         screenUpper.innerText += ` ${value}`;
//     } else {
//         screenUpper.innerText = value;
//     }
    
// }

function displayScreenUpper(arr) {
    screenUpper.innerText = arr.join(" ");
    console.log("up", arr.join(" "));
    displayScreenLower(0);
}

function displayScreenLower (value) {
    screenLower.innerText = value;
}

let numStr = ""
function numKeyHandler(keyPressed) {
    if (numStr.length > 0) {
        numStr += keyPressed.value;
    } else {
        numStr = keyPressed.value;
    }
    displayScreenLower(numStr);
}    
          

function symbolKeyHandler(keyPressed) {
    if (numStr.length) {
        operationStack.push(numStr);
        numStr = '';
    }
    console.log()
    console.log("check", operationStack);
    // displayScreenUpper(keyPressed.value);
    if (operationStack.length === 3) {
        if (keyPressed.className === "symbol-keys") {
            console.log("inside");
            operationStack[1] = keyPressed.value;
        } else {
            let currentValue = operate(operationStack[1], operationStack[0], operationStack[2]);
            if (keyPressed.id === "equal") {
                displayScreenUpper(operationStack);            
                operationStack = [currentValue];
                console.log("here");              
            } else {
                operationStack = [currentValue, keyPressed.value];               
            }
            displayScreenLower(currentValue);
        }

        
    } else {
        operationStack.push(keyPressed.value);
        displayScreenUpper(operationStack);
    }

    

    console.log(operationStack);   
}

// add constraints for symbols on 1st and last array position




keyDivide.addEventListener('click', (e) => {
    symbolKeyHandler(e.target);
})

keyMultiply.addEventListener('click', (e) => {
    symbolKeyHandler(e.target);
})

keySubstract.addEventListener('click', (e) => {
    symbolKeyHandler(e.target);
})

keyAdd.addEventListener('click', (e) => {
    symbolKeyHandler(e.target);
})

keyEqual.addEventListener('click', (e) => {
    symbolKeyHandler(e.target);
})



keyNum9.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum8.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum7.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum6.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum5.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum4.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum3.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum2.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum1.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})

keyNum0.addEventListener('click', (e) => {
    numKeyHandler(e.target);
})
