var RPG = RPG || {};

RPG.Boot = function(){};

RPG.Boot.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Preload');
    } 
}