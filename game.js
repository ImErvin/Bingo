// game object
function Game() {
    this.players = [];
    this.startTime = 0;
    this.endTime = 0;
    this.winner = null;
    this.isplaying = false;
}

Game.prototype.addPlayer = (user) => {
    this.players.push(user);
}

Game.prototype.clearPlayer = () => {
    this.players = null;
}

Game.prototype.start = () => {
    this.isplaying = true;
    this.startTime = Date.now();
}

Game.prototype.stop = () => {
    this.isplaying = false;
    this.endTime = Date.now();
}

Game.prototype.gameTime = () => {
    // return seconds
    return Math.floor((this.endTime - this.startTime)/1000);
}

module.exports = {
    Game: Game
};

// var g = new Game();
// g.start();
// setTimeout(() => {
//     g.stop();
//     console.log(g.gameTime());
// }, 2000);
