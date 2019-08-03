
import { Entity } from '../entities/Entities';
import { Fruta, Damasco, Durazno } from '../entities/Frutas';

export class MainScene extends Phaser.Scene {
  
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
  	this.load.image("sky", "assets/sky.png");
  	this.load.svg("cuadro_info", "assets/cuadro_info.svg");
  	this.load.image("damasco", "assets/frutas/SVG/Damasco.svg");
  	this.load.image("durazno", "assets/frutas/SVG/Durazno.svg");
  }

  create() {

  	console.log("Escena principal");

  	let { width, height } = this.sys.game.canvas;

  	this.frutas = this.add.group();

  	this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });

  	this.add.image(400, 300, 'sky');
		this.add.image(width*0.75, height*0.25, 'cuadro_info').setScale(1);

		console.log(width*0.75);


    this.fruta1 = new Damasco(
	  this,
	  width * 0.5,
	  height * 0.5,
	  0.8,
	  0.8
		); 
		this.frutas.add(this.player1);

		this.fruta2 = new Durazno(
	  this,
	  width * 0.1,
	  height * 0.1,
	  0.8,
	  0.8
		); 
		this.frutas.add(this.fruta2);

		console.log(this.fruta1.getData("precio"));
		console.log(this.fruta1.getData("unidad"));
		console.log(this.fruta1);

		//this.player1.setInteractive();
		//this.input.on('pointerdown', function(pointer){
     	//console.log("Dejó de tocar");
 		//});
    

		console.log(this.frutas.getChildren());

		this.fruta3 = new Damasco(
	  this,
	  width * 1,
	  height * 1,
	  0.8,
	  0.8
		);

		console.log(this.fruta3);

		this.fruta4 = new Durazno(
	  this,
	  width * 0.4,
	  height * 0.4,
	  0.8,
	  0.8
		);

		console.log(this.fruta3.name);
		
  }

  miFuncion(precio) {
  	console.log("Llamando mi función: " + precio);
  }
}