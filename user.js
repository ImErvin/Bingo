// the user object
function User(username){
    this.username = username;
    this.card = new Array();
    this.winTimes = 0;
    // can be more ...
}

User.prototype.addCard = function(card){
    this.card = card;
};

User.prototype.getWinTimes =function(){
    return this.winTimes;
};

User.prototype.getCard = function()  {
    return this.card;
};

User.prototype.win = function()  {
    return this.winTimes ++;
};

User.prototype.getWinTimes = function()  {
    return this.winTimes;
};

User.prototype.removeCard = function()  {
    this.card = null;
};

module.exports = {
    User: User
};