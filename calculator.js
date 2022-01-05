let displayValue = 0;
let term1 = 0;
let term2 = null;
let operator = '';
let afterAnswer = false;

const display = document.querySelector('.display');
const clearButton = document.getElementById('clear');
const operatorButtonParent = document.querySelector('.operators');
const numberButtonParent = document.querySelector('.numbers');
const equalButton = document.getElementById('equals');
clearButton.addEventListener('click', Clear);
equalButton.addEventListener('click', EqualButtonPressed);
operatorButtonParent.childNodes.forEach(child => {
    child.addEventListener('click', () => ChangeOperator(child.textContent));
});
numberButtonParent.childNodes.forEach(child => {
    child.addEventListener('click', () => AddDigitToDisplayNumber(+child.textContent));
});

const Add = (a, b) => {
    console.log(a + "  +  " + b);
    return a + b;
}
const Subtract = (a, b) => {
    console.log(a + "  -  " + b);
    return a - b;
}
const Multiply = (a, b) => {
    console.log(a + "  *  " + b);
    return a * b;
}
const Divide = (a, b) => {
    console.log(a + "  /  " + b);
    if (b === 0 && a != 0) {
        return 'ERROR: CANNOT DIVIDE BY ZERO';
    }
    return (Math.round((a / b) * 100))/100;
}

const Operate = (operator, num1, num2) => {
    return operator === '+' ? Add(num1, num2)
        : operator === '-' ? Subtract(num1, num2)
        : operator === '*' ? Multiply(num1, num2)
        : operator === '/' ? Divide(num1, num2)
        : "ERROR";
}

function EqualButtonPressed() {
    if (operator === '') {
        term1 = displayValue;
        displayValue = Operate('+', term1, 0);
    } else if (displayValue === null) {
        displayValue = 'SYNTAX ERROR: NO SECOND TERM'
    } else {
        term2 = displayValue;
        displayValue = Operate(operator, term1, term2);
    }
    DisplayDisplayNumber();
    operator = '';
    term2 = null;
    afterAnswer = true;
}

function Clear() {
    displayValue = 0;
    term1 = 0;
    term2 = null;
    operator = '';
    afterAnswer = false;
    DisplayDisplayNumber();
}

function ChangeOperator(op) {
    if (operator != '') {
        EqualButtonPressed();
    }
    term1 = displayValue;
    displayValue = null;
    operator = op;
    console.log(operator);
}

const AddDigitToDisplayNumber = (num) => {
    if (afterAnswer || displayValue === null) {
        displayValue = 0;
        afterAnswer = false;
    }
    displayValue *= 10;
    displayValue += num;
    DisplayDisplayNumber();
}

const DisplayDisplayNumber = () => {
    display.textContent = displayValue;
}