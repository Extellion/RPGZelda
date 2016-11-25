var RPG = RPG || {};

RPG.FirstMap = function(){};

RPG.FirstMap.prototype = {
    preload: function() {
        this.game.load.tilemap('map', 'maps/firstMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles_12.png');
        this.game.load.image('inventaire', 'assets/inventaire.png');
        this.game.load.image('rubyBlue', 'assets/rubyBlue.png');
        this.game.load.image('rubySilver', 'assets/rubySilver.png');
        this.game.load.image('rubyGold', 'assets/rubyGold.png');
        this.game.load.image('potion', 'assets/potion.png');
        this.game.load.image('icone', 'assets/inventaireIcone.png');
        this.game.load.image('croix', 'assets/croix.png');
        this.game.load.image('rubyBlueInventory', 'assets/rubyBlue.png');
        this.game.load.image('rubySilverInventory', 'assets/rubySilver.png');
        this.game.load.image('rubyGoldInventory', 'assets/rubyGold.png');
        this.game.load.image('potionInventory', 'assets/potion.png');
        this.game.load.image('pierre', 'assets/caillou.png');
        this.game.load.image('tick', 'assets/Tick.png');
        this.game.load.spritesheet('vieux', 'assets/oldmanSprite.png', 20,19,2);
        this.game.load.spritesheet('zora', 'assets/roiZora.png', 38,40,3);
    },
    create: function() {
        this.game.world.setBounds(0, 0, 400, 400);
        this.idTree = [88,89,90,91,111,112,113,114];
        this.idHouses = [0,1,2,3,4,5,23,24,25,26,27,28,29,30,
        31,32,33,34,35,36,37,38,39,40,
        46,47,48,49,50,51,52,53,54,55,
        56,57,58,59,60,61,62,63,69,70,
        71,72,73,74,75,76,77,78,79,80,
        81,82,83,84,85,86,92,93,94,95,
        96,97,98,99,100,101,102,103,104,
        105,106,107,108,109];
        this.idBarrer = [150,151,152,173,175,196,197,198];
        this.idBosquet = [138, 139,140,141,142,143,144,145,146,161,184,169,192,207,208,209,210,212,213,214,215];
        this.idPanel = [240,241,241];
        this.rupee = this.game.add.audio('rupee');
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('firstmap', 'tiles');
        this.bg = this.map.createLayer('BG');
        this.collision = this.map.createLayer('Collision');
        this.rockPath = this.map.createLayer('rock');
        this.flowersPath = this.map.createLayer('flowers');
        this.mudPath = this.map.createLayer('mud');
        this.treeBase = this.map.createLayer('treeNonWalkable');
        this.houses = this.map.createLayer('houses');
        this.pierrePath = this.map.createLayer('pierreSocle');
        this.panel = this.map.createLayer('panel');
        this.panel1 = this.map.createLayer('panel2');
        if(localStorage.getItem('rubyGold') === null) {
            this.rubyGold = this.game.add.sprite(19*16,5*16, 'rubyGold');
            this.game.physics.arcade.enable(this.rubyGold);
        }
        if(localStorage.getItem('rubySilver') === null && localStorage.getItem('appearRub') === 'silver') {
            this.rubySilver = this.game.add.sprite(3*16,20*16, 'rubySilver');
            this.game.physics.arcade.enable(this.rubySilver);
        }
        if(localStorage.getItem('rock') === 'promesse tenue'){
            this.pierre = this.game.add.sprite(22*16,22*16, 'pierre');
        } else {
            this.pierre = this.game.add.sprite(4*16,16*16, 'pierre');
        }
        if (localStorage.getItem('map') === "secondMap"){
            this.player = this.game.add.sprite(10,7.8*16, 'link');
            localStorage.setItem('map', 'firstMap');
            this.player.frame = 2;            
        } else {
            this.player = this.game.add.sprite(8.2*16, 6.5*16, 'link');
        }
        
        this.player.animations.add("walkTop", [3, 12,13,14,15,16,17,18,19],true);
        this.player.animations.add("walkLeft", [1,20,21,22,23,24,25,26,27,28], true); //
        this.player.animations.add("walkRight",[2,30,31,32,33,34,35,36,37,38], true);//
        this.player.animations.add("walkDown", [0,4,5,6,7,8,9,10,11], true);
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.enable(this.pierre);
        this.player.body.setSize(15,16,5,11);
        this.game.physics.arcade.enable(this.houses);
        this.treeWalkable = this.map.createLayer('treeWalkable');
        this.topKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.keyI = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
        this.map.setCollisionBetween(0, 999  , true, 'houses');
        this.map.setCollisionBetween(0, 999, true, 'treeNonWalkable');
        this.map.setCollisionBetween(0, 999, true, 'Collision');
        this.map.setCollisionBetween(0, 999, true, 'panel');
        this.map.setCollisionBetween(0, 999, true, 'panel2');
        this.map.setCollisionBetween(0, 999, true, 'panel3');
        this.changeMap = this.game.add.sprite(0, 9*15, null);
        this.game.physics.enable(this.changeMap);
        this.changeMap.body.setSize(10,18,0,0);
        this.player.body.collideWorldBounds = true;
        this.icone = this.game.add.sprite(10,10, 'icone');
        this.icone.fixedToCamera = true;
        this.icone.inputEnabled = true;
        this.icone.events.onInputDown.add(this.inventory, this);
        this.count = 1;
        this.countIventory = 1;
        this.countZora = 1;
        this.countEchange = 1;
    },
    update: function() {
        if(this.topKey.isDown) {
            this.player.animations.play('walkTop', 9 ,true);
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = -200;
        } else if (this.downKey.isDown) {
            this.player.animations.play('walkDown', 9, true);
            this.player.body.velocity.y = 200;
            this.player.body.velocity.x = 0;
        } else if (this.leftKey.isDown) {
            this.player.animations.play('walkLeft', 10 ,true);
            this.player.body.velocity.x = -200;
            this.player.body.velocity.y = 0;
        } else if (this.rightKey.isDown) {
            this.player.animations.play('walkRight', 10 ,true);
            this.player.body.velocity.x = 200;
            this.player.body.velocity.y = 0;
        } else {
            this.player.animations.stop(null);
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = 0;
        }
        // game.physics.arcade.collide(player, houses);
        if(this.vieux !== undefined || null) {
            this.game.physics.arcade.collide(this.vieux, this.collision);

            if(Math.round(this.vieux.position.x) < 15*16 - 64) {
                this.vieux.animations.play('marcheRight', 1, true);
                this.vieux.body.velocity.x = 100;
            } else if ((Math.round(this.vieux.position.x) === 236)) {
                this.vieux.animations.play('marcheLeft', 0, true);
                this.vieux.body.velocity.x = -100;
            } else {
                this.vieux.animations.stop(null);
            }
            this.game.physics.arcade.collide(this.player, this.vieux, this.talk.bind(this));
            this.game.physics.arcade.collide(this.vieux, this.collision);
        }
        this.game.physics.arcade.collide(this.player, this.houses);
        this.game.physics.arcade.collide(this.player, this.treeBase);
        this.game.physics.arcade.collide(this.player, this.collision);  
        this.game.physics.arcade.collide(this.player, this.panel, this.indication.bind(this));
        this.game.physics.arcade.collide(this.player, this.panel1, this.indication1.bind(this));
        this.game.physics.arcade.collide(this.player, this.panel2, this.indication2.bind(this));
        this.game.physics.arcade.overlap(this.player, this.changeMap, this.change.bind(this));
        this.game.physics.arcade.overlap(this.player, this.rubyGold, this.goldRuby.bind(this));
        this.game.physics.arcade.overlap(this.player, this.rubySilver, this.silverRuby.bind(this));
        this.game.physics.arcade.collide(this.player, this.pierre, this.move.bind(this));
        this.inventory;
        if((Math.round(this.pierre.position.x) >= 21.8*16)
        && (Math.round(this.pierre.position.x) <= 22.2*16)
        && (Math.round(this.pierre.position.y) >=  21.8*16) 
        && (Math.round(this.pierre.position.y) <= 22.2*16) && this.count === 1) {
            this.oldManAppear(this);
            this.count = 0;
        }
        if (localStorage.getItem('potion') == 1 &&
        localStorage.getItem('rubyBlue') == 1 && 
        localStorage.getItem('rubySilver') == 1 && 
        localStorage.getItem('rubyGold') == 1 && this.countZora === 1) {
            this.zoraAppear(this);
            this.countZora = 0;
        }

        if(this.zora) {
            if(this.game.physics.arcade.collide(this.player, this.zora) && this.countEchange == 1) {
                this.echange(this);
                this.countEchange = 0;
            }
        }
    },
    change: function() {
        this.state.start('SecondMap');
    },
    goldRuby: function() {
        this.rupee.play();
        localStorage.setItem('rubyGold', "1");
        this.rubyGold.destroy();
    },
    silverRuby: function() {
        this.rupee.play();
        localStorage.setItem('rubySilver', "1");
        this.rubySilver.destroy();
    },
    inventory: function() {
        this.inventaire = this.game.add.sprite(10,10, 'inventaire');
        this.cross = this.game.add.sprite(95,10, 'croix');
        if (localStorage.getItem("rubyGold")) {
            this.gRi = this.game.add.sprite(2*16,4.3*16, "rubyGoldInventory");
        }

        if (localStorage.getItem("rubySilver")) {
            this.sRi = this.game.add.sprite(4.3*16,2*16, "rubySilverInventory");
        }

        if (localStorage.getItem("rubyBlue")) {
            this.bRi = this.game.add.sprite(2*16,2*16, "rubyBlueInventory");
        }

        if (localStorage.getItem("potion")) {
            this.pI = this.game.add.sprite(4.3*16,4.3*16, "potionInventory");
        }
        if(localStorage.getItem('golden')){
            this.golden = this.game.add.sprite(2*16,2*16, "rubyGoldInventory");
        }
        this.cross.fixedToCamera = true;
        this.cross.inputEnabled = true;
        this.cross.events.onInputDown.add(this.closeInventory, this);
    },
    closeInventory: function() {
        this.cross.destroy();
        if(this.gRi){
            this.gRi.destroy();
        }
        if(this.sRi){
            this.sRi.destroy();
        }
        if(this.bRi){
            this.bRi.destroy();
        }
        if(this.pI){
            this.pI.destroy();
        }
        if(this.golden){
            this.golden.destroy();
        }
        this.inventaire.destroy();
    },
    move: function() {
        this.player.body.velocity.x = this.player.body.velocity.x /3;
        this.pierre.body.velocity = this.player.body.velocity.x;

    },
    oldManAppear: function(self) {
        self.vieux = self.game.add.sprite(236,8*16,'vieux');
        self.game.physics.arcade.enable(self.vieux);
        self.vieux.animations.add('marcheLeft', [0], true);
        self.vieux.animations.add('marcheRight', [1], true);
        localStorage.setItem('rock', 'promesse tenue');
    },
    talk: function() {
        this.vieux.body.velocity.x = 0;
        this.vieux.body.moves = false;
        let style = { font: "15px Arial", fill: "#ffffff", align: "left"};
        let text = this.game.add.text(9*16, 6*16, "Talk to the old lady, on the other map", style);
        setTimeout(() => {
            text.destroy();
            this.vieux.animations.play('marcheRight', 1, true);
            this.vieux.body.moves = true;
            this.vieux.body.velocity.x = 100;
        },1000)
        localStorage.setItem('talked', 'yes');
    },
    indication: function() {
        let style = { font: "15px Arial", fill: "#ffffff", align: "left"};
        let text = this.game.add.text(10*16, 5*16, "Look at the rock", style);
        setTimeout(function(){
            text.destroy();
        },500)
    },
    indication1: function() {
        let style = { font: "15px Arial", fill: "#ffffff", align: "left"};
        let text = this.game.add.text(15*16, 16*16, "Look at the mud circle", style);
        setTimeout(function(){
            text.destroy();
        },500)
    },
    zoraAppear: function(that) {
        that.zora = that.game.add.sprite(5*16, 16*16, 'zora');
        that.zora.animations.add("stay", [0,1,2], true);
        that.zora.animations.play("stay", 1, true);
        that.game.physics.arcade.enable(that.zora);
        this.panel2 = this.map.createLayer('panel3');
    },
    echange: function(that) {
        that.zora.body.moves = false;
        that.inventory();
        that.game.world.bringToTop(that.player);
        that.exchange = that.game.add.sprite(9*16,16*16, 'inventaire');
        that.endExchange = that.game.add.sprite(9*16,16*16, 'croix');
        that.validate = that.game.add.sprite(14.2*16,21.2*16, 'tick');
        that.endExchange.inputEnabled = true;
        that.validate.inputEnabled = true;
        that.gRi.inputEnabled = true;
        that.bRi.inputEnabled = true;
        that.pI.inputEnabled = true;
        that.sRi.inputEnabled = true;
        that.endExchange.events.onInputDown.add(that.endEchange, that);
        that.sRi.events.onInputDown.add(that.echangesRi, that);
        that.bRi.events.onInputDown.add(that.echangebRi, that);
        that.validate.events.onInputDown.add(that.validEchange, that);
    },
    endEchange: function() {
        this.exchange.destroy();
        this.endExchange.destroy();
        this.closeInventory();
        this.countEchange = 1;
        this.validate.destroy();
    },
    echangesRi: function() {
        this.sRi.position.x = 10.3*16; 
        this.sRi.position.y = 17.3*16;
        this.game.world.bringToTop(this.sRi)
    },
    echangebRi: function() {
        this.bRi.position.x = 12.7*16; 
        this.bRi.position.y = 17.3*16;
        this.game.world.bringToTop(this.bRi)
    },
    validEchange: function() {
        if(this.bRi.position.x === 12.7*16 && this.bRi.position.y === 17.3*16 && this.sRi.position.y === 17.3*16 && this.sRi.position.x === 10.3*16) {
            localStorage.removeItem('rubySilver');
            localStorage.removeItem('rubyBlue');
            this.bRi.destroy();
            this.sRi.destroy();
            localStorage.setItem('golden', '1');

        }
    },
    indication2: function() {
        let style = { font: "15px Arial", fill: "#ffffff", align: "left"};
        let text = this.game.add.text(9*16, 16*16, "Blue + Silver = Gold", style);
        setTimeout(function(){
            text.destroy();
        },500);
    },
    render: function() {
        // if(this.invisible) {
            // this.game.debug.body(this.rubySilver);
        // }
    }   
}