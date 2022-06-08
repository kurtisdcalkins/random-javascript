// Mystery Organism DNA sequences


// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
const newStrand = []
for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
}
return newStrand;
}

// Factory function to create a specimen with 15 base DNA
const pAequorFactory = (number, array) => {
    return {
        specimenNum: number,
        dna: array,
        // Method that mutates a single base of the DNA
        mutate() {
            current_base_index = Math.floor(Math.random()*this.dna.length);
            potential_new = this.dna[current_base_index];
            current_base = this.dna[current_base_index];
            while (potential_new === current_base) {
                potential_new = returnRandBase();
            }
            this.dna[current_base_index] = potential_new;
            return this.dna;
        },
        // Compares two strands of DNA and returns what percentage they have in common
        compareDNA(pAequor) {
            total_in_common = 0;
            for (i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === pAequor.dna[i]) {
                    total_in_common += 1;
                }
            }
            ratio = (total_in_common / this.dna.length) * 100;
            percentage = ratio.toFixed(1);
            console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common.`)
        },
        // Determines if the specimen is likely to survive: at least 60% of its bases are either "C" or "G"
        willLikelySurvive() {
            has_c_or_g = 0;
            for (i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === "C" || this.dna[i] === "G") {
                    has_c_or_g += 1;
                }
            }
            percent = has_c_or_g / this.dna.length;
            return percent > 0.6;
        },
        complementStrand() {
            compliment_strand = []
            for (i = 0; i < this.dna.length; i++) {
                switch(this.dna[i]) {
                    case 'A':
                        compliment_strand.push('T');
                }
                switch(this.dna[i]) {
                    case 'T':
                        compliment_strand.push('A');
                }
                switch(this.dna[i]) {
                    case 'C':
                        compliment_strand.push('G');
                }
                switch(this.dna[i]) {
                    case 'G':
                        compliment_strand.push('C');
                }
            }
            return compliment_strand;
        }
    }
}


// Populate a list of 30 specimens that will likely survive
let specimens = [];

while (specimens.length < 30) {
    for (let i = 1; i < 31; i++) {
        let ea = pAequorFactory(i, mockUpStrand());
        while (!ea.willLikelySurvive()) {
            ea = pAequorFactory(i, mockUpStrand());
        }
        specimens.push(ea);
    }
}
// Prints the list of 30 specimens
console.log(specimens);



// Tests the complement DNA strand
test1 = pAequorFactory(31, mockUpStrand());
console.log(test1.dna);
console.log(test1.complementStrand());

