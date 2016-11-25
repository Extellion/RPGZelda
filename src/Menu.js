var RPG = RPG || {};

RPG.Menu = function(){};

RPG.Menu.prototype = {
    preload: function() {
        this.game.load.tilemap('map', 'maps/SplashScreen.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles_12.png');
        this.game.load.image('title', 'assets/Title.png');
        this.game.load.image('PlayButton', 'assets/Play.png');
    },
    create: function() {
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('menu', 'tiles');
        this.bg = this.map.createLayer('BG');
        this.draw = this.map.createLayer('draw');
        this.title = this.game.add.sprite(-100,27, 'title');
        this.play = this.game.add.sprite(100,250,'PlayButton');
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(this.playing, this);
    },
    playing: function () {
        this.state.start('FirstMap');
    }
}