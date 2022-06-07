// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Add your functions below:
// Converts a number given as a string to an array of numbers
const convert_number_to_array = string => {
  card_array = [];
  for (let i = 0; i < (string.length); i ++) {
    card_array.push(parseInt(string[i], 10));
  }
  return card_array;
}

number1 = '4465446544654465';
console.log(convert_number_to_array(number1));


// Uses the Luhn algorithm to check if the credit card number is valid
const validateCred = array => {
  var result = 0;
  let i = array.length - 1;
  let h = array.length - 2;
  while (i >= 0) {
    result += array[i];
    i -= 2;
  }
  while (h >= 0) {
    let double = array[h] * 2;
    if (double > 9) {
      result += double - 9;
    }
    else {
      result += double;
    }
    h -= 2;
  }
  if (result % 10 === 0) {
    return "Valid"
  }
  else {
    return "Invalid"
  }
}

// Creates a list of invalid card numbers
const findInvalidCards = (array) => {
  invalid_cards = []
  for (let j = 0; j < array.length; j++) {
    if (validateCred(array[j]) === "Invalid") {
      invalid_cards.push(array[j]);
    }
  }
  return invalid_cards
}

// Creates a list of credit card companies with invalid credit card numbers
const idInvalidCardCompanies = array => {
  let bad = []
  for (let k = 0; k < array.length; k ++) {
    if (array[k][0] < 3 || array[k][0] > 6) {
      return "Company not found";
    }
    else if (array[k][0] === 3 && bad.includes("Amex") === false) {
      bad.push("Amex");
    }
    else if (array[k][0] === 4 && bad.includes("Visa") === false) {
      bad.push("Visa");
    }
    else if (array[k][0] === 5 && bad.includes("Mastercard") === false) {
      bad.push("Mastercard");
    }
    else if (array[k][0] === 6 && bad.includes("Discover") === false) {
      bad.push("Discover");
    }
  }
  return bad;
}



