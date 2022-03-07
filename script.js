"use strict";

var keys = document.querySelectorAll(
  "#decimal, #number0, #number1, #number2, #number3, #number4, #number5, #number6, #number7, #number8, #number9, #operatorPlus, #operatorMinus, #operatorMultiply, #operatorDivide, #plusMinus, #modulo"
);
var labelString = document.getElementById("labelString");
var labelResult = document.getElementById("labelResult");

//console.log(labelString);
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
  console.log(str, char);
  let finalStr = str.substring(0, str.length - 1);
  //console.log(finalStr);
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
function evaluateExpression(operator, isOperator) {
  // console.log(operator, isOperator);
  if (!isOperator) {
    if (isLastCharAnOperator(labelString.innerHTML)) {
      //console.log(labelString.innerHTML);
      labelString.innerHTML = labelString.innerHTML.slice(0, -1);
    }
  }
  if (!labelString.innerHTML) {
    labelResult.innerHTML = "";
  } else {
    // console.log(eval(labelString.innerHTML));
    labelResult.value = eval(labelString.innerHTML);
  }
  if (!isOperator) {
    labelString.innerHTML = "";
    lastNumString = "";
  }
}
function removeLastChar() {
  labelString.innerHTML = labelString.innerHTML.substring(
    0,
    labelString.innerHTML.length - 1
  );
  evaluateExpression(labelString.innerHTML, true);
}
function reset() {
  labelResult.value = 0;
  labelString.innerHTML = "";
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
          labelString.innerHTML += ev.target.value;
        }
        lastNumString = lastNumberString(labelString.innerHTML);
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
        if (lastNumString == "0") {
          labelString.innerHTML = replaceLastCharString(
            labelString.innerHTML,
            ev.target.value
          );
        } else {
          //console.log(labelString);
          labelString.innerHTML += ev.target.value;
        }
        lastNumString = lastNumberString(labelString.innerHTML);
        break;
      case ".":
        keyType = "decimal";
        if (lastNumString == "") {
          //console.log(lastNumString);
          labelString.innerHTML += "0.";
        } else {
          if (lastNumString.includes(".") && ev.target.value == ".") {
            //console.log(ev.target.value);
          } else {
            labelString.innerHTML += ev.target.value;
          }
        }
        lastNumString = lastNumberString(labelString.innerHTML);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        keyType = "operator";
        lastOperator = ev.target.value;
        // console.log(lastNumString);
        if (lastNumString == "") {
          labelString.innerHTML += "0" + ev.target.value;
        } else {
          //console.log(lastNumString);
          if (isLastCharAnOperator(labelString.innerHTML)) {
            //console.log(labelString.innerHTML);
            labelString.innerHTML = replaceLastCharString(
              labelString.innerHTML,
              ev.target.value
            );
          } else {
            labelString.innerHTML += ev.target.value;
          }
        }
        break;
      case "+/-":
        keyType = "plusMinus";
        if (
          labelString.innerHTML !== "" &&
          !isLastCharAnOperator(labelString.innerHTML)
        ) {
          //console.log(isLastCharAnOperator(labelString.innerHTML));
          if (lastOperator == "") {
            if (labelString.innerHTML == Math.abs(labelString.innerHTML)) {
              labelString.innerHTML = -labelString.innerHTML;
            } else {
              labelString.innerHTML = Math.abs(eval(labelString.innerHTML));
            }
          } else {
            // console.log(labelString.innerHTML);
            var array = labelString.innerHTML.split(lastOperator),
              lastIndex = array.length - 1,
              newValue = "",
              oldValue = "";
            //console.log(lastIndex, array, array[lastIndex], lastOperator);
            if (array[lastIndex] == Math.abs(array[lastIndex])) {
              newValue = "(" + -array[lastIndex] + ")";
            } else {
              newValue = Math.abs(eval(array[lastIndex]));
            }

            for (var i = 0; i < lastIndex; i++) {
              // console.log(array[i]);
              oldValue += array[i] + lastOperator;
            }
            // console.log(oldValue, newValue);
            labelString.innerHTML = oldValue + newValue;
          }
        }
        break;
      default:
        break;
    }
    evaluateExpression(labelString.innerHTML, true);
  });
});
