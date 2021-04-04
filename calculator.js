const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')


const calculate = (firstInput, operator, secondInput) => {
    let sum = ''

    if (operator === 'add') {
        sum = parseFloat(firstInput) + parseFloat(secondInput)
    } else if (operator === 'subtract') {
        sum = parseFloat(firstInput) - parseFloat(secondInput)
    } else if (operator === 'multiply') {
        sum = parseFloat(firstInput) * parseFloat(secondInput)
    } else if (operator === 'divide') {
        sum = parseFloat(firstInput) / parseFloat(secondInput)
    }

    return sum
}

keys.addEventListener('click', (e) => {
    //if was a button i pressed
    if (e.target.matches('button')) {
        const keyPressed = e.target
        const action = keyPressed.dataset.action //if the button has a dataaction
        const keyPressedContent = keyPressed.textContent //the value of the key pressed
        const displayedNum = display.textContent //my screen display
        const previousKeyType = calculator.dataset.previousKeyType

        // if it is a number digit i pressed
        if (!action) {

            (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') ? display.textContent = keyPressedContent : display.textContent = displayedNum + keyPressedContent
            calculator.dataset.previousKeyType = 'number'
        }


        // if it is a decimal point
        if (action === 'decimal') {

            //if what is already on the screen is not a decimal point then add decimal to the existing value
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.' 
            }

            calculator.dataset.previousKeyType = 'decimal'

        }


        
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }

            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action


        }


        if (action === 'clear') {
            console.log('clear key!')
            if (keyPressed.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                keyPressed.textContent = 'AC'
            }

            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }


        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            let operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }

            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }


















    }




















})