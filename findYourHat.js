const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.currentIndex = [0, 0];
    }

    print() {
        let stringRep = '';
        for (let i = 0; i < this.field.length; i++) {
            stringRep += this.field[i].join("");
            if (i < this.field.length-1) {
                stringRep += "\n";
            }
            
        }
        return stringRep;
    }

    currentLocation() {
        let width = this.field[0].length;
        let height = this.field.length;
        if (this.currentIndex[0] < 0 || this.currentIndex[1] < 0 || this.currentIndex[1] > width-1 || this.currentIndex[0] > height-1) {
            console.log("Out of bounds");
            return this.currentIndex = false;
        }   
        else if (this.field[this.currentIndex[0]][this.currentIndex[1]] === 'O') {
            console.log("Sorry, you fell down a hole");
            return this.currentIndex = false;
        }
        else if (this.field[this.currentIndex[0]][this.currentIndex[1]] === '^') {
            console.log("Congrats, you found your hat!");
            return this.currentIndex = false;
        } else {
            this.field[this.currentIndex[0]][this.currentIndex[1]] = pathCharacter;
            return this.currentIndex;
        }
    }


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

    static genereateField(height, width, percentage) {
        let arr = [];
        for (let i = 0; i < height; i++) {
            arr[i] = Array.from({length: width}, (x, j) => fieldCharacter);
        }
        arr[0][0] = pathCharacter;
        let count = height * width;
        let percentHoles = percentage / 100 * count;
        for (let i = 0; i < percentHoles; i++) {
            let placeHeightIndex = Math.floor(Math.random()*height);
            let placeWidthIndex = Math.floor(Math.random()*width);
            while (arr[placeHeightIndex][placeWidthIndex] === pathCharacter) {
                placeHeightIndex = Math.floor(Math.random()*height);
                placeWidthIndex = Math.floor(Math.random()*width);
            }
            arr[placeHeightIndex][placeWidthIndex] = hole;
        }
        let placeHeightIndex = Math.floor(Math.random()*height);
        let placeWidthIndex = Math.floor(Math.random()*width);
        while (arr[placeHeightIndex][placeWidthIndex] === pathCharacter || arr[placeHeightIndex][placeWidthIndex] === hole) {
            placeHeightIndex = Math.floor(Math.random()*height);
            placeWidthIndex = Math.floor(Math.random()*width);
        }
        arr[placeHeightIndex][placeWidthIndex] = hat;
        return arr;
    }


}


const myField = new Field(Field.genereateField(18, 18, 40));


console.log("d = down, u = up, r = right, l = left")
while (myField.currentIndex) {
    console.log(myField.print());
    let move = prompt('Which way?');
    myField.movement(move);
    myField.currentLocation();
}
