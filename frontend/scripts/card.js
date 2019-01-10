var cardModule = () => {
    var Card = (id) => {
        this.id = id;
        this.cardNumbers = [];
        this.availableNumbers = [];
    }

    Card.prototype = () => {
        var initAvailableNumbers = () => {
            for (var i = 0; i <= 99; i++) {
                this.availableNumbers[i] = (i + 1);
            }
        }

        var eliminateNumber = (number) => {
            this.availableNumbers[number - 1] = null;
        }

        var generateCardNumbers = (numOfRows) => {
            for (var i = 0; i <= numOfRows; i++) {

            }
        }

        var checkNumberAvailability = (number) => {
            return new Boolean(this.availableNumbers[number - 1]);
        }

        var generateTest = () => {
            var generatedNumbers = [];

            var generatedValidation = (() => {
                var temp = [];
                for (var i = 0; i <= 9; i++) {
                    temp.push(0);
                }
                return temp;
            })();

            var rndTemp;

            var control = true;

            for (var i = 0; i <= 14; i++) {
                rndTemp = Math.floor(Math.random() * (99 - 1 + 1) + 1);

                // Duplication check
                while (generatedNumbers.includes(rndTemp)) {
                    rndTemp = Math.floor(Math.random() * (99 - 1 + 1) + 1);
                }

                // Check if the number is in ranges 1 - 9, 10 - 19 etc. and if more than 3 don't exist.
                while (control) {
                    console.log("if generatedValidation["+(parseInt(rndTemp / 10, 10))+"]");
                    if (generatedValidation[(parseInt(rndTemp / 10, 10))] > 2) {
                        rndTemp = Math.floor(Math.random() * (99 - 1 + 1) + 1);

                        // Duplication check
                        while (generatedNumbers.includes(rndTemp)) {
                            rndTemp = Math.floor(Math.random() * (99 - 1 + 1) + 1);
                        }
                    } else {
                        generatedValidation[(parseInt(rndTemp / 10, 10))]++;
                        control = false;
                    }
                }

                generatedNumbers[i] = rndTemp;
                control = true;
            }

            return generatedNumbers;
        }
    }

};

module.exports = cardModule;