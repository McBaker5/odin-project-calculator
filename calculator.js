let displayValue = 0;
let term1 = 0;
let term2 = null;
let operator = '';
let afterAnswer = false;

const display = document.querySelector('.display');
const clearButton = document.getElementById('clear');
const operatorButtonParent = document.querySelector('.operators');
const numberButtons = document.querySelectorAll('.number');
const equalButton = document.getElementById('equals');
clearButton.addEventListener('click', Clear);
equalButton.addEventListener('click', EqualButtonPressed);
operatorButtonParent.childNodes.forEach(child => {
    child.addEventListener('click', () => ChangeOperator(child.textContent));
});
numberButtons.forEach(child => {
    child.addEventListener('click', () => AddDigitToDisplayNumber(+child.textContent));
});

const Add = (a, b) => {
    return a + b;
}
const Subtract = (a, b) => {
    return a - b;
}
const Multiply = (a, b) => {
    return a * b;
}
const Divide = (a, b) => {
    if (b === 0 && a != 0) {
        return 'DIVISION OVER ZERO';
    }
    return a / b;
}

const Operate = (operator, num1, num2) => {
    let ret;
    if (operator === '+') {
        ret = Add(num1, num2)
    } else if (operator === '-') {
        ret = Subtract(num1, num2)
    } else if (operator === '*') {
        ret = Multiply(num1, num2)
    } else if (operator === '/') {
        ret = Divide(num1, num2)
    } else {
        return "ERROR";
    }

    return (Math.round(ret * 100))/100;
}

function EqualButtonPressed() {
    if (operator === '') {
        term1 = displayValue;
        displayValue = Operate('+', term1, 0);
    } else if (displayValue === null) {
        displayValue = 'SYNTAX ERROR'
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