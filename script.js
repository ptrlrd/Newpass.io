/*
Eventually add:
Strength checking of password
Run comparison against (https://haveibeenpwned.com/API/v2) to see if password is in breach
Affiliate with password/security
      https://www.yubico.com/about/affiliate-program/
      https://www.lastpass.com/affiliate
*/

/****************************************************************/
/*             Variables and Query Selectors                    */
/****************************************************************/

// Declaring password string, not autopopulating for lower byte size
const rpf = 4; // Set amount of times to repeat strings
const numbers = "1234567890".repeat(rpf);
const letters = "abcdefghijklmnopqrstuvwxyz".repeat(rpf);
const upperLetters = letters.toUpperCase();
const symbols = "~!@#$%^&*()_+=-".repeat(rpf);

// Grabbing all assets on the page and assigning to variables
let passwordField = document.querySelector("#passwordField");
let slider = document.querySelector(".slider");
var lengthnumber = document.querySelector(".lengthnumber");
var generator = document.querySelector(".generate");
var reset = document.querySelector(".reset");
var copy = document.querySelector(".copy");

// Grabbing all checkboxes and assigning a variable
let numberCheckbox = document.querySelector("#numbers");
let lowercaseCheckbox = document.querySelector("#lowercase");
let upperCaseCheckbox = document.querySelector("#uppercase");
let symbolCheckbox = document.querySelector("#symbols");
let allCheckboxes = document.querySelectorAll("input[type='checkbox']");

// Assigning all checkboxes to an object
const filters = [
  { type: "numbers", value: numbers, checkbox: numberCheckbox },
  { type: "letters", value: letters, checkbox: lowercaseCheckbox },
  { type: "upperLetters", value: upperLetters, checkbox: upperCaseCheckbox },
  { type: "symbols", value: symbols, checkbox: symbolCheckbox },
];

// Update the current slider value (each time you drag the slider handle)

slider.addEventListener("input", val);
generator.addEventListener("click", generatePassword);
reset.addEventListener("click", resetPassword);
copy.addEventListener("click", copyPassword);
slider.addEventListener("input", generatePassforSliderAndCBs);
numberCheckbox.addEventListener("change", generatePassforSliderAndCBs);
lowercaseCheckbox.addEventListener("change", generatePassforSliderAndCBs);
upperCaseCheckbox.addEventListener("change", generatePassforSliderAndCBs);
symbolCheckbox.addEventListener("change", generatePassforSliderAndCBs);
lengthnumber.addEventListener("input", textPasswordGeneration);

/****************************************************************/
/*                        Functions                             */
/****************************************************************/

// Assigns value into input next to slider
function val(e) {
  lengthnumber.value = e.target.value;
}

//Function for looping through checkboxes
function isChecked() {
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].checkbox.checked) return true;
  }
  return false;
}

// Generates password on button click
function generatePassword() {
  let trueFilter = "";
  if (!isChecked()) {
    console.error("No work");
  } else
    filters.forEach((e) => {
      if (e.checkbox.checked) {
        trueFilter += e.value;
      }

      trueFilter = trueFilter
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");

      passwordField.value = trueFilter.slice(0, slider.value);
    });
  trueFilter = ""; // resets variables so random charactesr aren't inserted
}

// Resets Password Input Field
function resetPassword() {
  passwordField.value = "Click Generate Password";
}

function generatePassforSliderAndCBs() {
  let trueFilter = "";
  if (!isChecked()) {
    console.error("No work");
  } else
    filters.forEach((e) => {
      if (e.checkbox.checked) {
        trueFilter += e.value;
      }

      trueFilter = trueFilter
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");

      passwordField.value = trueFilter.slice(0, slider.value);
    });
  trueFilter = ""; // resets variables so random charactesr aren't inserted
}

// Copies password to clipboard
function copyPassword() {
  passwordField.select();
  passwordField.setSelectionRange(0, 128);
  document.execCommand("copy");
}

// Verifies input characters is inbetween 8-128
function textPasswordGeneration(e) {
  if (lengthnumber.value >= 129 || lengthnumber.value <= 7) {
    // Change me to a span next to the input field
    alert("Please enter a number between 8 and 128");
  }
  slider.value = this.value;
  generatePassword();
}
