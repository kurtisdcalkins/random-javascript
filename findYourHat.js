const prompt = require('prompt-sync')({ sigint: true });


// Define the Field's characters
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


// Define the Field class with two properties
class Field {
    constructor(field) {
        this.field = field;
        this.currentIndex = [0, 0];
    }
    
    // Turns the Field array (2D array) into a string representation for the user to see
    print() {
        let stringRep = '';
        // Loops through the outer array
        for (let i = 0; i < this.field.length; i++) {
            // joins the characters of the inner array
            stringRep += this.field[i].join("");
            // Adds a new line unless it's on the last array
            if (i < this.field.length-1) {
                stringRep += "\n";
            }
        }
        return stringRep;
    }

    // Determines the outcome from the user's current position (the user could be on a hole, out-of-bounds, on the hat, or in an open space of the Field) If it not open space of the Field, the currentIndex is set to false, which breaks the while loop of gameplay.
    currentLocation() {
        // The length and width are calculated for determining the out-of-bounds condition
        let width = this.field[0].length;
        let height = this.field.length;
        // The out-of-bound condition
        if (this.currentIndex[0] < 0 || this.currentIndex[1] < 0 || this.currentIndex[1] > width-1 || this.currentIndex[0] > height-1) {
            console.log("Out of bounds");
            return this.currentIndex = false;
        }
        // Condition: on a hole   
        else if (this.field[this.currentIndex[0]][this.currentIndex[1]] === hole) {
            console.log("Sorry, you fell down a hole");
            return this.currentIndex = false;
        }
        // Condition: on the hat
        else if (this.field[this.currentIndex[0]][this.currentIndex[1]] === hat) {
            console.log("Congrats, you found your hat!");
            return this.currentIndex = false;
        } else { // The 'else' condition means the user is on an open space. It then updates that space's character to the pathCharacter so you can visually trace the path of movement.
            this.field[this.currentIndex[0]][this.currentIndex[1]] = pathCharacter;
            return this.currentIndex;
        }
    }

    // Takes the input from the user and updates the currentIndex
    movement(input) {
        if (input === 'd') {
            this.currentIndex[0] += 1;
        }
        if (input === 'u') {
            this.currentIndex[0] -= 1;
        }
        if (input === 'r') {
            this.currentIndex[1] += 1;
        }
        if (input === 'l') {
            this.currentIndex[1] -= 1;
        }
    }

    // This method generates a Field (2D array) and assigns the pathCharacter, hat, holes, and fieldCharacters to the field. The holes and hat are placed randomly.
    static genereateField(height, width, percentage) {
        let arr = [];
        // This for-loop generates the Field as a 2D array based upon the input height and width and assigns each position to the fieldCharacter
        for (let i = 0; i < height; i++) {
            arr[i] = Array.from({length: width}, (x, j) => fieldCharacter);
        }
        // Assigns the top left corner to be the starting point of the pathCharacter
        arr[0][0] = pathCharacter;
        // This next section calculates how many spaces to populate with holes based upon the input percentage. 
        let count = height * width;  // Total number of spaces
        let percentHoles = percentage / 100 * count; // Total number of holes (often not an integer)
        // Loop from zero to the number of holes (Ex: if percentHoles=4.8, the loop will go from 0 to 4)
        for (let i = 0; i < percentHoles; i++) {
            // Calculates a random index (height ≈ y-axis, width ≈ x-axis)
            let placeHeightIndex = Math.floor(Math.random()*height);
            let placeWidthIndex = Math.floor(Math.random()*width);
            // Check to make sure using the randomly calculated coordinates does not equal where the pathCharacter or another hole is. If it is, the while-loop runs until it lands on an available spot
            while (arr[placeHeightIndex][placeWidthIndex] === pathCharacter || arr[placeHeightIndex][placeWidthIndex] === hole) {
                placeHeightIndex = Math.floor(Math.random()*height);
                placeWidthIndex = Math.floor(Math.random()*width);
            }
            // Once the x and y index is safe, assign that space to a hole
            arr[placeHeightIndex][placeWidthIndex] = hole;
        }
        // Randomly assigns the location of the hat as long as it is not already populated by a hole or the pathCharacter. Code is almost identical to placing the holes, except we only need to do it once (no for-loop)
        let placeHeightIndex = Math.floor(Math.random()*height);
        let placeWidthIndex = Math.floor(Math.random()*width);
        while (arr[placeHeightIndex][placeWidthIndex] === pathCharacter || arr[placeHeightIndex][placeWidthIndex] === hole) {
            placeHeightIndex = Math.floor(Math.random()*height);
            placeWidthIndex = Math.floor(Math.random()*width);
        }
        arr[placeHeightIndex][placeWidthIndex] = hat;
        // Returns the populated array
        return arr;
    }


}

// Let's the user determine how big they want the Field to be and what percentage of the spaces to be populated with holes
let chooseHeight = prompt('How many squares tall do you want your maze to be?');
let chooseWidth = prompt('How many squares wide would you like the maze to be?');
let numHoles = prompt('What percentage of the squares do you want covered in holes?')
// Generates the Field array and initializes the Field class
const myField = new Field(Field.genereateField(chooseHeight, chooseWidth, numHoles));

// Displays how the user controls movement
console.log("d = down, u = up, r = right, l = left")
// This while-loop controls the main gameplay. While the currentIndex exists (not false), the string representation of the Field is printed to the console, prompts for user movement, calls the movement method (determines where the user is on the Field and provides feedback), calls the currentLocation method (updates the currentIndex property).
while (myField.currentIndex) {
    console.log(myField.print());
    let move = prompt('Which way?');
    myField.movement(move);
    myField.currentLocation();
}
