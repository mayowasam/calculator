const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')


const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

keys.addEventListener('click', (e) => {
    //it was a button i pressed
    if (e.target.matches('button')) {
        const keyPressed = e.target
        const action = keyPressed.dataset.action //if the button has a dataaction
        const keyPressedContent = keyPressed.textContent //the value of the key pressed
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType


        Array.from(keyPressed.parentNode.children)
            .forEach(k => k.classList.remove('operatorkey')
            )

        // the value displaying on the screen
        if (!action) {

            //if the number on the screen is zero then change it to the key pressed
            //if it is not zero then add other number that are pressed
            (displayedNum === '0' || previousKeyType === 'operator') ? display.textContent = keyPressedContent : display.textContent = displayedNum + keyPressedContent

        }

        if (action === 'decimal') display.textContent = displayedNum + '.'
        

        // when i click any operator i want it to show the operator i clicked
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            keyPressed.classList.add('operatorkey')

            console.log(keyPressed.parentNode.children)
            
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action

        }


        if (action === 'clear') console.log('clear key!')
          

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            display.textContent = calculate(firstValue, operator, secondValue)
        }


















    }




















})