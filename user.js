// the user object
function User(username){
    this.username = username;
    this.card = null;
    this.winTimes = 0;
    // can be more ...
}

User.prototype.addCard = (card) => {
    this.card = card;
};

User.prototype.getWinTimes = () => {
    return this.winTimes;
};

User.prototype.getCard = () => {
    return this.card;
};

User.prototype.win = () => {
    return this.winTimes ++;
};

User.prototype.getWinTimes = () => {
    return this.winTimes;
};

User.prototype.removeCard = () => {
    this.card = null;
};

module.exports = {
    User: User
};