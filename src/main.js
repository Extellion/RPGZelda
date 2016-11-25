var RPG = RPG || {};

RPG.game = new Phaser.Game(400, 400, Phaser.CANVAS, 'phase');

RPG.game.state.add('Boot', RPG.Boot);
RPG.game.state.add('Preload', RPG.Preload);
RPG.game.state.add('Menu', RPG.Menu);
RPG.game.state.add('FirstMap', RPG.FirstMap);
RPG.game.state.add('SecondMap', RPG.SecondMap);
RPG.game.state.add('Inventory', RPG.Inventory);

RPG.game.state.start('Boot');