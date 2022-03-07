"use strict";

const toggleSwitch = document.querySelector('input[type="checkbox"]');
//console.log(toggleSwitch);
const label = document.querySelector("#label");
function switchTheme(e) {
  if (e.target.checked) {
    //console.log(e);
    document.documentElement.setAttribute("data-theme", "dark");
    // console.log("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    //console.log("light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
