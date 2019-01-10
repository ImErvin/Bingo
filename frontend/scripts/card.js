function Card(id) {
    this.id = id;
    this.cardNumbers = new Array();
}

Card.prototype = () => {
    var generateCardNumbers = () => {
        var tempCardNumbers;
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

            randomNumber = Math.floor(Math.random() * (99 - 1 + 1) + 1);
            console.log("Card Generation - Generated number: " + randomNumber + ".");

            console.log("Card Generation - Executing duplicate check..");
            while (tempCardNumbers.includes(rndTemp)) {
                console.log("Card Generation - Found duplicate, generating new number.");
                randomNumber = Math.floor(Math.random() * (99 - 1 + 1) + 1);
            }
            console.log("Card Generation - Finished executing duplicate check. Final number: " + randomNumber + ".");

            console.log("Card Generation - Executing validation that no more than 3 exist in any category.")
            while (whileControlVariable) {
                if (generatedValidation[(parseInt(rndTemp / 10, 10))] > 2) {
                    rndTemp = Math.floor(Math.random() * (99 - 1 + 1) + 1);

                    // Duplication check
                    while (tempCardNumbers.includes(rndTemp)) {
                        rndTemp = Math.floor(Math.random() * (99 - 1 + 1) + 1);
                    }
                } else {
                    generatedValidation[(parseInt(rndTemp / 10, 10))]++;
                    whileControlVariable = false;
                }
            }

            tempCardNumbers[i] = rndTemp;
            whileControlVariable = true;
        }

        this.cardNumbers = tempCardNumbers;
    }
};

module.exports = cardModule;