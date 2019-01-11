function Card(id) {
    this.id = id;
    this.cardNumbers = new Array(15);
}

Card.prototype.generateCardNumbers = function(){
    var tempCardNumbers = new Array(15);
    var generatedValidation = (() => {
        var temp = new Array(9);
        for (var i = 0; i <= 9; i++) {
            temp.push(0);
        }
        return temp;
    })();
    var randomNumber;
    var whileControlVariable = true;

    console.log("Card Generation - Starting random number generation.")
    for (var i = 0; i <= 14; i++) {

        randomNumber = Math.floor(Math.random() * (90 - 1 + 1) + 1);
        console.log("Card Generation - Generated number: " + randomNumber + ".");

        console.log("Card Generation - Executing duplicate check..");
        while (tempCardNumbers.includes(randomNumber)) {
            console.log("Card Generation - Found duplicate, generating new number.");
            randomNumber = Math.floor(Math.random() * (90 - 1 + 1) + 1);
        }
        console.log("Card Generation - Finished executing duplicate check. Final number: " + randomNumber + ".");

        console.log("Card Generation - Executing validation that no more than 3 exist in any category.")
        while (whileControlVariable) {
            if (generatedValidation[(parseInt(randomNumber / 10, 10))] > 2) {
                console.log("Card Generation - Found excess amount of numbers in one category.")
                randomNumber = Math.floor(Math.random() * (90 - 1 + 1) + 1);

                console.log("Card Generation - Executing duplicate check..");
                while (tempCardNumbers.includes(randomNumber)) {
                    console.log("Card Generation - Found duplicate, generating new number.");
                    randomNumber = Math.floor(Math.random() * (90 - 1 + 1) + 1);
                }
                console.log("Card Generation - Finished executing duplicate check. Final number: " + randomNumber + ".");
            } else {
                generatedValidation[(parseInt(randomNumber / 10, 10))]++;
                whileControlVariable = false;
            }
        }
        console.log("Card Generation - Finished executing validation for categories.");
        tempCardNumbers[i] = randomNumber;
        whileControlVariable = true;
        console.log("Card Generation - Finished generating number, array so far: " + tempCardNumbers);
    }

    this.cardNumbers = tempCardNumbers;
};

module.exports = {
    Card: Card
};

