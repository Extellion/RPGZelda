var RPG = RPG || {};

RPG.SecondMap = function(){};

RPG.SecondMap.prototype = {
    preload: function() {
        this.game.load.tilemap('map', 'maps/SecondMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles_12.png');
        this.game.load.image('rubyBlue', 'assets/rubyBlue.png');
        this.game.load.image('rubySilver', 'assets/rubySilver.png');
        this.game.load.image('rubyGold', 'assets/rubyGold.png');
        this.game.load.image('rubyBlueInventory', 'assets/rubyBlue.png');
        this.game.load.image('rubySilverInventory', 'assets/rubySilver.png');
        this.game.load.image('rubyGoldInventory', 'assets/rubyGold.png');
        this.game.load.image('icone', 'assets/inventaireIcone.png');
        this.game.load.image('inventaire', 'assets/inventaire.png');
        this.game.load.image('potion', 'assets/potion.png');
        this.game.load.image('potionInventory', 'assets/potion.png');
        this.game.load.image('croix', 'assets/croix.png');
        this.game.load.spritesheet('pnj', 'assets/oldWomanSprite.png', 20,20, 2);
    },
    create: function() {
        this.game.world.setBounds(0, 0, 400, 400);
        this.idTree = [88,89,90,91,111,112,113,114];
        this.idHouses = 
            [0,1,2,3,4,5,23,24,25,26,27,28,
            29,30,31,32,33,34,35,36,37,38,
            39,40,46,47,48,49,50,51,52,53,
            54,55,56,57,58,59,60,61,62,63,
            69,70,71,72,73,74,75,76,77,78,
            79,80,81,82,83,84,85,86,92,93,
            94,95,96,97,98,99,100,101,102,
            103,104,105,106,107,108,109];
        this.idBarrer = [150,151,152,173,175,196,197,198];
        this.idBosquet = [138, 139,140,141,142,143,144,145,146,161,184,169,192,207,208,209,210,212,213,214,215];
        this.idPanel = [240,241,241];
        this.rupee = this.game.add.audio('rupee');
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles_12', 'tiles');
        this.bg = this.map.createLayer('BG');
        this.mud = this.map.createLayer('mud');
        this.flowers = this.map.createLayer('flowers');
        this.collision = this.map.createLayer('collision');
        this.undefined = this.map.createLayer('mudGround');
        if(localStorage.getItem('rubyBlue') === null) {
            this.rubyBlue = this.game.add.sprite(2*16, 12*16, 'rubyBlue');
            this.game.physics.arcade.enable(this.rubyBlue);
        }
        if(localStorage.getItem('potion') === null) {
            this.potion = this.game.add.sprite(21*16, 21*16, 'potion');
            this.game.physics.arcade.enable(this.potion);
        }
        this.player = this.game.add.sprite(24.5*15, 14*16, 'link');
        this.player.frame = 1;
        this.nonCollision = this.map.createLayer('non-collision');
        this.topKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.player.animations.add("walkTop", [3, 12,13,14,15,16,17,18,19],true);
        this.player.animations.add("walkLeft", [1,20,21,22,23,24,25,26,27,28], true); //
        this.player.animations.add("walkRight",[2,30,31,32,33,34,35,36,37,38], true);//
        this.player.animations.add("walkDown", [0,4,5,6,7,8,9,10,11], true);
        this.game.physics.arcade.enable(this.player);
        this.player.body.setSize(15,16,5,11); 
        this.map.setCollisionBetween(0, 999, true, 'collision');
        this.map.setCollisionBetween(175, 176, true, 'non-collision');
        this.player.body.collideWorldBounds = true;
        this.icone = this.game.add.sprite(10,10, 'icone');
        this.icone.fixedToCamera = true;
        this.icone.inputEnabled = true;
        this.icone.events.onInputDown.add(this.inventory, this);
        // this.cross.scale.setTo(-5,-5);
        this.changeMap = this.game.add.sprite(390, 15.5*15, null);
        this.game.physics.enable(this.changeMap);
        this.changeMap.body.setSize(10,18,0,0);
        this.count = 1;
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
        this.inventory;
        this.game.physics.arcade.collide(this.player, this.collision);
        this.game.physics.arcade.overlap(this.player, this.changeMap, this.back.bind(this));
        this.game.physics.arcade.overlap(this.player, this.rubyBlue, this.blueRuby.bind(this));
        this.game.physics.arcade.overlap(this.player, this.potion, this.getPotion.bind(this));
        if(localStorage.getItem('talked') == 'yes' && this.count === 1) {
            this.pnjAppear(this);
            this.count = 0;
        }
        if(this.pnj) {
            this.game.physics.arcade.collide(this.pnj, this.collision);
            if(Math.floor(this.pnj.position.y) > 200) {
                this.pnj.animations.play('marcheUp', 1, true);
                this.pnj.body.velocity.y = -100;
            } else if ((Math.round(this.pnj.position.y) === 96)) {
                this.pnj.animations.play('marcheDown', 0, true);
                this.pnj.body.velocity.y = 100;
            } else {
                this.pnj.animations.stop(null);
            }
            this.game.physics.arcade.collide(this.player, this.pnj, this.talk.bind(this));
        }
    },
    blueRuby: function() {
        this.rupee.play();
        localStorage.setItem("rubyBlue", "1");
        this.rubyBlue.destroy();
    },
    getPotion: function() {
        this.rupee.play();
        localStorage.setItem('potion', "1");
        this.potion.destroy();
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
        this.inventaire.destroy();
    },
    back: function() {
        localStorage.setItem('map', 'secondMap');
        this.state.start('FirstMap');
    },
    pnjAppear: function(that) {
        that.pnj = that.game.add.sprite(12.5*16, 6*16, 'pnj');
        that.game.physics.enable(that.pnj);
        that.pnj.animations.add('marcheUp', [0], true);
        that.pnj.animations.add('marcheDown', [1], true);
    },
    talk: function() {
        this.pnj.body.velocity.y = 0;
        this.pnj.body.moves = false;
        let style = { font: "15px Arial", fill: "#ffffff", align: "left"};
        let text = this.game.add.text(9*16, 6*16, "Behind the tree lay the answer", style);
        localStorage.setItem('appearRub', 'silver');
        setTimeout(() => {
            text.destroy();
            this.pnj.animations.play('marcheUp', 1, true);
            this.pnj.body.velocity.y = -100;
            this.pnj.body.moves = true;
        },1000)
        localStorage.setItem('talked', 'yes');
    },
    render: function() {
        // this.game.debug.body(this.changeMap)
    }
}