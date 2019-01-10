// the user object
var User = function(username, card){
    this.username = username;
    this.card = card;
    this.winTimes = 0;
    // can be more ...
}

User.prototype = {
    
    win: function(){
       return this.winTimes ++;
    },

    getWinTimes: function(){
        return this.winTimes;
    }
}