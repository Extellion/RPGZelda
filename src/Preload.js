var RPG = RPG || {};

RPG.Preload = function(){};

RPG.Preload.prototype = {
    preload: function() {
        this.game.load.spritesheet('link', 'assets/testLink.png', 30, 30, 38);
        this.game.load.audio('rupee', 'assets/sound/LOZ_Get_Rupee.wav');
        this.game.load.audio('ost', 'assets/sound/ost.mp3');

    },
    create: function() {
        this.ost = this.game.add.audio('ost');
        this.ost.play();
        this.state.start('Menu');
    }
}