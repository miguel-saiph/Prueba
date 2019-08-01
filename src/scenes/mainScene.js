
import { Entity } from '../entities/Entities';
import { Player } from '../entities/Player';

export class MainScene extends Phaser.Scene {
  
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
  	this.load.image("sky", "assets/sky.png");
  	this.load.image("damasco", "assets/frutas/damasco.png");

  }

  create() {

  	console.log("Escena principal");

  	let { width, height } = this.sys.game.canvas;

  	this.frutas = this.add.group();

  	this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });

  	this.add.image(400, 300, 'sky');

    this.player1 = new Player(
	  this,
	  width * 0.5,
	  height * 0.5,
	  "damasco"
		); 
		this.frutas.add(this.player1);

		this.player2 = new Player(
	  this,
	  width * 0.1,
	  height * 0.1,
	  "damasco"
		); 
		this.frutas.add(this.player2);

		console.log(this.player1.getData("speed"));
		console.log(this.player1);
		this.player1.scaleX = 0.1;
		this.player1.scaleY = 0.1;
		this.player2.scaleX = 0.1;
		this.player2.scaleY = 0.1;

		console.log(this.frutas.getChildren());
		
  }
}