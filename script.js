function add(a, b) {
  return a + b;
}


function subtract(a, b) {
  return a - b;
}


function multiply(a, b) {
  return a * b;
}


function divide(a, b) {
  return a / b;
}


function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
}


let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultDisplayed = false;

const digitButtons = document.querySelectorAll("[data-digit]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]")
const display = document.querySelector("#display");
const clearButton = document.querySelector("[data-clear]");
const decimalButton = document.querySelector("[data-decimal]");
const backspaceButton = document.querySelector("[data-backspace]");

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultDisplayed) {
      firstNumber = button.dataset.digit;
      operator = "";
      secondNumber = "";
      resultDisplayed = false;

      display.textContent = firstNumber;
      return;
    }

    if (operator === "") {
      firstNumber += button.dataset.digit;
      display.textContent = firstNumber;
    } else {
      secondNumber += button.dataset.digit;
      display.textContent = secondNumber;
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (firstNumber !== "" && secondNumber !== "") {
      const result = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber)
      );

      firstNumber = String(
        Math.round(result * 1000000000) / 1000000000
      );

      secondNumber = "";
    }

    operator = button.dataset.operator;
    resultDisplayed = false;
    display.textContent = firstNumber;
  });
});

equalsButton.addEventListener("click", () => {
  if (firstNumber === "" || operator === "" || secondNumber === "") {
    return;
  }
  if (operator === "/" && Number(secondNumber) === 0) {
    display.textContent = "Nope! Can't divide by zero.";
    return;
  }
 
  const result = operate(
    operator,
    Number(firstNumber),
    Number(secondNumber)
  );

  display.textContent = Math.round(result * 1000000000) / 1000000000;
  resultDisplayed = true;
});

clearButton.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  resultDisplayed = false;

  display.textContent = "";
});

decimalButton.addEventListener("click", () => {
  if (resultDisplayed) {
    firstNumber = "0.";
    operator = "";
    secondNumber = "";
    resultDisplayed = false;

    display.textContent = firstNumber;
    return;
  }

  if (operator === "") {
    if (firstNumber.includes(".")) {
      return;
    }

    firstNumber = firstNumber === "" ? "0." : firstNumber + ".";
    display.textContent = firstNumber;
  } else {
    if (secondNumber.includes(".")) {
      return;
    }

    secondNumber = secondNumber === "" ? "0." : secondNumber + ".";
    display.textContent = secondNumber;
  }
});

backspaceButton.addEventListener("click", () => {
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
    display.textContent = firstNumber;
  } else {
    secondNumber = secondNumber.slice(0, -1);
    display.textContent = secondNumber;
  }
});

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  const key = event.key;

  const digitButton = document.querySelector(`[data-digit="${key}"]`);
  const operatorButton = document.querySelector(
    `[data-operator="${key}"]`
  );

  if (digitButton) {
    digitButton.click();
  } else if (operatorButton) {
    operatorButton.click();
  } else if (key === "Enter" || key === "=") {
    equalsButton.click();
  } else if (key === "Backspace") {
    backspaceButton.click();
  } else if (key === "Escape") {
    clearButton.click();
  } else if (key === ".") {
    decimalButton.click();
  }
});