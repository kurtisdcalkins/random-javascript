class ShiftCipher {
    constructor(number) {
        this.number = number;
    }

    encrypt(string) {
        let newString = '';
        let capString = string.toUpperCase();
        for (let i=0; i < capString.length; i++) {
            let charNum = capString.charCodeAt(i);
            if (charNum > 90 || charNum < 65) {
                newString += String.fromCharCode(charNum);
            } else {
                let shiftNum = charNum + this.number;
                let newNum = shiftNum;
                if (shiftNum > 90) {
                    newNum = ((shiftNum - 90) + 64);
                }
                if (shiftNum < 65) {
                    newNum = 91 - (65 - shiftNum);
                }
                newString += String.fromCharCode(newNum);
            }          
        }
        return console.log(newString);
    }

    decrypt(string) {
        let newString = '';
        let capString = string.toUpperCase();
        for (let i=0; i < capString.length; i++) {
            let charNum = capString.charCodeAt(i);
            if (charNum > 90 || charNum < 65) {
                newString += String.fromCharCode(charNum);
            } else {
                let shiftNum = charNum - this.number;
                let newNum = shiftNum;
                if (shiftNum > 90) {
                    newNum = ((shiftNum - 90) + 64);
                }
                if (shiftNum < 65) {
                    newNum = 91 - (65 - shiftNum);
                }
                newString += String.fromCharCode(newNum);
            }          
        }
        return console.log(newString.toLowerCase());
    }

    
}


const cipher = new ShiftCipher(2);
cipher.encrypt('I love to code!'); // returns 'K NQXG VQ EQFG!'
cipher.decrypt('K <3 OA RWRRA'); // returns 'i <3 my puppy'