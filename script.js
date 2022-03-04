"use strict";

var keys = document.querySelectorAll(
  "#decimal, #number0, #number1, #number2, #number3, #number4, #number5, #number6, #number7, #number8, #number9, #operatorPlus, #operatorMinus, #operatorMultiply, #operatorDivide, #plusMinus, #modulo"
);
var expString = document.getElementById("expressionString");
var expResult = document.getElementById("expressionResult");

//console.log(expString);
var lastNumString = "";
var lastOperator = "";
var numberType;
function lastNumberString(str) {
  let separators = [" ", "\\+", "-", "\\(", "\\)", "\\*", "/", ":", "\\?"];
  // console.log(separators.join("|"));
  let result = str.split(new RegExp(separators.join("|"), "g"));
  //console.log(result[result.length - 1]);
  return result[result.length - 1];
}

function replaceLastCharString(str, char) {
  let finalStr = str.substring(0, str.length - 1);
  console.log(finalStr);
  return finalStr + char;
}

function isLastCharAnOperator(str) {
  var isLastCharOperator = false;
  var lastChar = str.substring(str.length - 1);
  var operators = ["+", "-", "*", "/"];
  // console.log(lastChar);
  for (let x = 0; x < operators.length - 1; x++) {
    if (lastChar == operators[x]) {
      isLastCharOperator = true;
      break;
    }
  }
  return isLastCharOperator;
}
function evaluationExpression(operator, isTemp) {
  //console.log(operator, isTemp);
  if (!isTemp) {
    if (isLastCharAnOperator(expString.innerHTML)) {
      console.log(expString.innerHTML);
      expString.innerHTML = expString.innerHTML.slice(0, -1);
    }
  }
  if (!expString.innerHTML) {
    expResult.innerHTML = "";
  } else {
    // console.log(eval(expString.innerHTML));
    expResult.value = eval(expString.innerHTML);
  }
  if (!isTemp) {
    expString.innerHTML = "";
    lastNumString = "";
  }
}
function removeLastChar() {
  expString.innerHTML = expString.innerHTML.substring(
    0,
    expString.innerHTML.length - 1
  );
  //expResult.innerHTML = (expString.innerHTML == "") ? "0" : evaluationExpression(temp, true);
  //   if (expString.innerHTML == "") {
  //     reset();
  //   } else {
  evaluationExpression(expString.innerHTML, true);
  // }
}
function reset() {
  expResult.value = 0;
  expString.innerHTML = "";
  lastNumString = "";
}
keys.forEach((el) => {
  //console.log(el);
  el.addEventListener("click", (ev) => {
    // console.log(ev.target.value);
    switch (ev.target.value) {
      case "0":
        var keyType = "zero";
        if (lastNumString == "0") {
          // console.log(" 0");
        } else {
          expString.innerHTML += ev.target.value;
        }
        lastNumString = lastNumberString(expString.innerHTML);
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        keyType = "number1-9";
        break;
      case ".":
        keyType = "decimal";
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        keyType = "operator";
        lastOperator = ev.target.value;
        break;
      case "+/-":
        keyType = "plusMinus";
        break;
      default:
        break;
    }
    switch (keyType) {
      case "number1-9":
        if (lastNumString == "0") {
          expString.innerHTML = replaceLastCharString(
            expString.innerHTML,
            ev.target.value
          );
        } else {
          //console.log(expString);
          expString.innerHTML += ev.target.value;
        }
        lastNumString = lastNumberString(expString.innerHTML);
        break;
      case "zero":
        if (lastNumString == "0") {
          // console.log(" 0");
        } else {
          expString.innerHTML += ev.target.value;
        }
        lastNumString = lastNumberString(expString.innerHTML);
        break;
      case "decimal":
        if (lastNumString == "") {
          //console.log(lastNumString);
          expString.innerHTML += "0.";
        } else {
          if (lastNumString.includes(".") && ev.target.value == ".") {
            //console.log(ev.target.value);
          } else {
            expString.innerHTML += ev.target.value;
          }
        }
        lastNumString = lastNumberString(expString.innerHTML);
        break;
      case "operator":
        if (lastNumString == "") {
          expString.innerHTML += "0" + ev.target.value;
        } else {
          if (isLastCharAnOperator(expString.innerHTML)) {
            expString.innerHTML = replaceLastCharString(
              expString.innerHTML,
              ev.target.value
            );
          } else {
            expString.innerHTML += ev.target.value;
          }
        }
        lastNumString = "";
        break;
      case "plusMinus":
        if (
          expString.innerHTML !== "" &&
          !isLastCharAnOperator(expString.innerHTML)
        ) {
          //console.log(isLastCharAnOperator(expString.innerHTML));
          if (lastOperator == "") {
            if (expString.innerHTML == Math.abs(expString.innerHTML)) {
              expString.innerHTML = -expString.innerHTML;
            } else {
              expString.innerHTML = Math.abs(eval(expString.innerHTML));
            }
          } else {
            // console.log(expString.innerHTML);
            var array = expString.innerHTML.split(lastOperator),
              lastIndex = array.length - 1,
              newValue = "",
              oldValue = "";
            //console.log(lastIndex, array, array[lastIndex], lastNumString);
            if (array[lastIndex] == Math.abs(array[lastIndex])) {
              newValue = "(" + -array[lastIndex] + ")";
            } else {
              newValue = Math.abs(eval(array[lastIndex]));
            }
            newValue = "(" + -array[lastIndex] + ")";
            for (var i = 0; i < lastIndex; i++) {
              // console.log(array[i]);
              oldValue += array[i] + lastOperator;
            }
            // console.log(oldValue, newValue);
            expString.innerHTML = oldValue + newValue;
          }
        }
        break;
      default:
        break;
    }
    evaluationExpression(expString.innerHTML, true);
  });
});
