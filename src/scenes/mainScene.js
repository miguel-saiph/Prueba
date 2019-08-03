
import { Entity } from '../entities/Entities';
import * as Frutas from '../entities/Frutas';

export class MainScene extends Phaser.Scene {
  
  constructor() {
    super({ key: "MainScene" });

    this.cuadro_info;
    this.incognita;
    this.fruta_static;
    this.nombre_fruta;
    this.datos_fruta;
    this.frutas; // Para almacenar las frutas creadas
    this.max_frutas = 3;
    this.max_cajones = 3;
    this.rows = 2; // Filas de frutas
    this.columns = 2; // Columnas de frutas
    this.disponibles = Object.keys(Frutas); //Array con los nombres de las frutas disponibles
  }

  preload() {
  	this.load.image("sky", "assets/sky.png");
  	this.load.svg("cuadro_info", "assets/cuadro_info.svg", {scale: 1 });
  	this.load.svg("incognita", "assets/incognita.svg", {scale: 1 });
  	this.load.image("damasco", "assets/frutas/SVG/Damasco.svg");
  	this.load.image("durazno", "assets/frutas/SVG/Durazno.svg");
  	this.load.image("frambuesa", "assets/frutas/SVG/Frambuesa.svg");
  	this.load.image("frutilla", "assets/frutas/SVG/Frutilla.svg");

  }

  create() {

  	console.log("Escena principal");

  	let { width, height } = this.sys.game.canvas;

  	this.sky = this.add.image(400, 300, 'sky').setInteractive();

  	// Render cuadro de info
  	this.cuadro_info = this.add.image(width*0.75, height*0.35, 'cuadro_info');
  	this.incognita = this.add.image(this.cuadro_info.x, this.cuadro_info.y, 'incognita');

  	this.frutas = this.add.group();

  	// Creación de frutas
  	const separacion = 150;
  	let posX = width*0.2;
  	let posY = height*0.25;

  	for (var col = this.columns - 1; col >= 0; col--) {

  		posX = width*0.2;
  		
  		if( col != this.columns-1)
  			posY = posY + separacion/1.3;

  		for (var row = this.rows - 1; row >= 0; row--) {

  			// Si el número de frutas creadas alcanza el máximo, aborta misión
  			if (this.frutas.getChildren().length >= this.max_frutas) {
  				break;
  			}

  			if (row != this.rows - 1)
  				posX = posX + separacion;

  			// Regula la posición del último elemento si es impar
  			if (this.frutas.getChildren().length === this.max_frutas-1 && row % 2 !== 0)
  				posX += separacion / 2;

  			// Elige una fruta random entre las frutas disponibles
  			const random = this.getRandomInt(1, this.disponibles.length);
				const elegida = this.disponibles[random];
				// Borra esa fruta del array para que no se repita
				this.disponibles.splice(random, 1);

				// Instancia la fruta elegida
  			let fruta;
  			switch(elegida) {
  				case 'Damasco':
  					fruta = new Frutas.Damasco(this, posX, posY, 0.8, 0.8);	
  					break;
					case 'Durazno':
  					fruta = new Frutas.Durazno(this, posX, posY, 0.8, 0.8);	
  					break;
					case 'Frambuesa':
						fruta = new Frutas.Frambuesa(this, posX, posY, 0.8, 0.8);	
  					break;
					case 'Frutilla':
						fruta = new Frutas.Frutilla(this, posX, posY, 0.8, 0.8);	
  					break;
  			}
  			this.frutas.add(fruta);
  				
  		}
  		 
  	}

  	console.log("Children");
  	console.log(this.frutas.getChildren());

  
  	console.log(Frutas);
  	console.log(typeof Object.keys(Frutas)[1]);

  	this.frutas.getChildren().forEach(function(element) {
  		console.log(element.constructor.name);
  	});

		//this.player1.setInteractive();
		//this.input.on('pointerdown', function(pointer){
     	//console.log("Dejó de tocar");
 		//});
    

	 	//this.sky.on('pointerdown', function (pointer) {
	 		//this.incognita.visible = true;
    //});
		
  }

  mostrarInfo(precio, unidad, tipo) {

  	this.incognita.visible = false;

  	// Actualiza el nombre de la fruta si ya existe o lo crea si no
  	if (this.nombre_fruta) {
  		this.nombre_fruta.setText(tipo.charAt(0).toUpperCase() + tipo.slice(1));
  	}
  	else {
  		this.nombre_fruta = this.add.text(
  			this.cuadro_info.x, this.cuadro_info.y-80, 
  			tipo.charAt(0).toUpperCase() + tipo.slice(1),
  			{ font: 'Open Sans', fill: '#333333' }).setOrigin(0.5);
  		this.nombre_fruta.setFontSize(24);
  	}

  	const datos = '$' + precio + ' el ' + unidad;

  	// Actualiza los datos de la fruta si existen o lo crea si no
  	if (this.datos_fruta) {
  		this.datos_fruta.setText(datos);
  	}
  	else {
  		this.datos_fruta = this.add.text(
  			this.cuadro_info.x, this.cuadro_info.y-40, 
  			datos,
  			{ font: 'Open Sans', fill: '#333333' }).setOrigin(0.5);
  		this.datos_fruta.setFontSize(24);
  	}

  	// Destruye la imagen de la fruta anterior
  	if (this.fruta_static)
  		this.fruta_static.destroy();

  	// Crea imagen de la fruta seleccionada
  	this.fruta_static = this.add.image(this.cuadro_info.x, this.cuadro_info.y + 50, tipo).setScale(0.7);
  }

  sinSeleccion() {

  	let { width, height } = this.sys.game.canvas;

  	
  	console.log(this.cuadro_info.y);
  }

  getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
}