let displayValue = 0;
let term1 = 0;
let term2 = 0;
let operator = '';

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
    return a / b;
}

const Operate = (operator, num1, num2) => {
    return operator === '+' ? Add(num1, num2)
        : operator === '-' ? Subtract(num1, num2)
        : operator === '*' ? Multiply(num1, num2)
        : operator === '/' ? Divide(num1, num2)
        : "ERROR";
}

function EqualButtonPressed() { //// print out the first term if there is no operator or second term
                                //// syntax error if dividing by 0 (put this in operate)
                                //// syntax error if pressed after operator button without second term
    term2 = displayValue;
    displayValue = Operate(operator, term1, term2);
    DisplayDisplayNumber();
    operator = '';
    term1 = 0;
    term2 = 0;
    displayValue = 0;
}

function Clear() {
    displayValue = 0;
    term1 = 0;
    term2 = 0;
    operator = '';
    DisplayDisplayNumber();
}

function ChangeOperator(op) {
    if (operator != '') {
        EqualButtonPressed();
    }
    term1 = displayValue;
    displayValue = 0;
    operator = op;
    console.log(operator);
}

const AddDigitToDisplayNumber = (num) => {
    displayValue *= 10;
    displayValue += num;
    DisplayDisplayNumber();
}

const DisplayDisplayNumber = () => {
    display.textContent = displayValue;
}