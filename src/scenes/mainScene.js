
import { Entity } from '../entities/Entities';
import * as Frutas from '../entities/Frutas';
import { Cajon } from '../entities/Cajon';
import * as Help from '../helper.js';

export class MainScene extends Phaser.Scene {
  
  constructor() {
    super({ key: "MainScene" });

    this.cuadro_info;
    this.incognita;
    this.orden;
    this.fruta_static;
    this.nombre_fruta;
    this.datos_fruta;
    this.frutas; // Para almacenar las frutas creadas
    this.cajones;
    this.max_frutas = 3;
    this.max_cajones = 3;
    this.rows = 2; // Filas de frutas
    this.columns = 2; // Columnas de frutas
    this.disponibles = Object.keys(Frutas); //Array con los nombres de las frutas disponibles
    this.escala_cajones = 0.25;
    this.escala_frutas = 0.8;
    this.btnRevisar;
    this.etapa;
  }

  preload() {
  	this.load.image("sky", "assets/sky.png");
  	this.load.svg("cuadro_info", "assets/cuadro_info.svg", {scale: 1 });
  	this.load.svg("incognita", "assets/incognita.svg", {scale: 1 });
  	this.load.image("cajon", "assets/cajon.png");
  	this.load.image("mayor", "assets/mayor_que.png");

  	// Botones
  	this.load.svg("btnRevisarActivo", "assets/botones/SVG/revisar_activo.svg", {scale: 1 });
  	this.load.svg("btnRevisarInactivo", "assets/botones/SVG/revisar_inactivo.svg", {scale: 1 });
  	this.load.svg("btnContinuar", "assets/botones/SVG/continuar_rojo.svg", {scale: 1 });
  	this.load.svg("btnEnviarRojo", "assets/botones/SVG/enviar_rojo.svg", {scale: 1 });
  	this.load.svg("btnEnviarVerde", "assets/botones/SVG/enviar_verde.svg", {scale: 1 });
  	
  	// Frutas
  	this.load.image("frutilla", "assets/frutas/SVG/Frutilla.svg");
  	this.load.image("damasco", "assets/frutas/SVG/Damasco.svg");
  	this.load.image("durazno", "assets/frutas/SVG/Durazno.svg");
  	this.load.image("frambuesa", "assets/frutas/SVG/Frambuesa.svg");
  	this.load.image("manzana", "assets/frutas/SVG/Manzana.svg");
  	this.load.image("naranja", "assets/frutas/SVG/naranja.svg");
  	this.load.image("pera", "assets/frutas/SVG/Pera.svg");
  	this.load.image("plátano", "assets/frutas/SVG/Platano.svg");
  	this.load.image("sandía", "assets/frutas/SVG/Sandia.svg");
  	this.load.image("uva", "assets/frutas/SVG/Uva.svg");

  }

  create() {

  	console.log("Escena principal");

  	let { width, height } = this.sys.game.canvas;

  	// Decide el orden que se va a pedir
  	this.orden = Help.getRandomInt(0, 2) === 1 ? 'asc' : 'desc';

  	//this.sky = this.add.image(400, 300, 'sky').setInteractive();
  	//this.sky.setDepth(-10);

  	// Render cuadro de info
  	this.cuadro_info = this.add.image(width*0.75, height*0.35, 'cuadro_info');
  	this.incognita = this.add.image(this.cuadro_info.x, this.cuadro_info.y, 'incognita');

  	this.frutas = this.add.group();
  	this.cajones = this.add.group();

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
  			const random = Help.getRandomInt(1, this.disponibles.length);
				const elegida = this.disponibles[random];
				// Borra esa fruta del array para que no se repita
				this.disponibles.splice(random, 1);

				// Instancia la fruta elegida
  			let fruta;
  			console.log(elegida);
  			switch(elegida) {
  				case 'Damasco':
  					fruta = new Frutas.Damasco(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Durazno':
  					fruta = new Frutas.Durazno(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Frambuesa':
						fruta = new Frutas.Frambuesa(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Frutilla':
						fruta = new Frutas.Frutilla(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Manzana':
						fruta = new Frutas.Manzana(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Naranja':
						fruta = new Frutas.Naranja(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Pera':
						fruta = new Frutas.Pera(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Platano':
						fruta = new Frutas.Platano(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Sandia':
						fruta = new Frutas.Sandia(this, posX, posY, this.escala_frutas);	
  					break;
					case 'Uva':
						fruta = new Frutas.Uva(this, posX, posY, this.escala_frutas);	
  					break;
  			}
  			this.frutas.add(fruta);
  				
  		}
  		 
  	}

  	// Creación de los cajones
  	var defaultX = width*0.5;
  	posX = defaultX;
  	posY = height*0.8;
  	var contadorPar = 1;
  	var contadorImpar = 1;
  	for (var i = this.max_cajones - 1; i >= 0; i--) {
  		
  		// Coloca el primer cajón en el centro y los siguientes en los costados
  		// tomando como referencia el primero
  		var cajon = new Cajon(this, posX, posY, "cajon", this.escala_cajones);
  		
  		this.cajones.add(cajon);

  		if (i % 2 === 0) {
  			
  			var simbolo = this.add.image(cajon.x+120, posY, 'mayor');
  			if (this.orden === 'desc')
  				simbolo.flipX = true;
  			
  			posX = (defaultX + width*0.3*contadorPar);
  			contadorPar++;
  		}
  		
  		else {
  			posX = (defaultX - width*0.3*contadorImpar);
  			contadorImpar++;
  		}
  	}

  	this.btnRevisar = this.add.image(width*0.87, height*0.94, 'btnRevisarInactivo');
  	this.btnRevisar.setInteractive();

  	this.btnRevisar.on("pointerdown", function() {
			if(this.btnRevisar.texture.key === 'btnRevisarActivo')
				this.checkResultados();
		}, this);


		//this.player1.setInteractive();
		//this.input.on('pointerdown', function(pointer){
     	//console.log("Dejó de tocar");
 		//});
    

	 	//this.sky.on('pointerdown', function (pointer) {
	 		//this.incognita.visible = true;
    //});
		
  }

  update() {
  	//console.log(this.cajones.getChildren()[0].getData("fruta"));
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

  	const datos = '$' + Help.formatNumber(precio) + ' el ' + unidad;

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

  checkResultados() {

  	this.etapa = 'Resultados';
  	
  	// Guarda los cajones en un array para poder ordenarlos de izquierda a derecha
  	var cajones = [];
  	this.cajones.getChildren().forEach(function(element) {
  		cajones.push(element);
  	});
  	cajones.sort(function(a, b){return a.x - b.x});

  	// Guarda los valores para luego preguntar si están en orden
  	var valores = [];
  	cajones.forEach(function(element) {
  		valores.push(element.getData("fruta").getData("precio"));
  	});

  	console.log(valores);

  	var resultado = Help.isSorted(valores, this.orden);
  	console.log("Sorted: " + resultado);

  	// Crea la barra de feedback
  	var graphics = this.add.graphics();
  	var colorFondo = resultado ? '0xbff199' : '0xffd0cf';
  	var color = resultado ? '#4d8b4b' : '#a0130f';
  	graphics.fillStyle(colorFondo, 1);
    graphics.fillRect(0, this.sys.game.canvas.height-68, this.sys.game.canvas.width, 68);
    graphics.setDepth(-1);

    var msg1 = resultado ? '¡MUY BIEN!': '¡Oops!';
    var msg2 = resultado ? 'Así se hace' : 'Algo anda mal.';

    this.mensaje1 = this.add.text(this.sys.game.canvas.width*0.1, this.sys.game.canvas.height*0.9, msg1, {
		  fontFamily: 'Open Sans',
		  fontSize: 16,
		  fontStyle: 'bold',
		  color: color,
		  align: 'center'
		});
		this.mensaje2 = this.add.text(this.sys.game.canvas.width*0.1, this.sys.game.canvas.height*0.93, msg2, {
		  fontFamily: 'Open Sans',
		  fontSize: 16,
		  color: color,
		  align: 'center'
		});

		resultado ? this.btnRevisar.setTexture('btnEnviarVerde') : this.btnRevisar.setTexture('btnContinuar');

		var frutas = [];
		this.frutas.getChildren().forEach(function(element) {
			frutas.push(element);
		});
		this.input.setDraggable(frutas, false);

		this.btnRevisar.on("pointerdown", function() {

			if(this.btnRevisar.texture.key === 'btnContinuar') {
				
				// Cambia el feedback
				this.mensaje1.setText('¡Pon atención!');
				this.mensaje2.setText('Esta es la respuesta correcta.');
				this.btnRevisar.setTexture('btnEnviarRojo');

				// Ordena las frutas en el orden correcto
				if (this.orden === 'asc')
					frutas.sort(function(a, b){return a.getData("precio") - b.getData("precio")});
				else
					frutas.sort(function(a, b){return b.getData("precio") - a.getData("precio")});

				// Coloca las frutas en el cajón correcto
				for (var i = 0; i <= cajones.length - 1; i++) {
					frutas[i].setPosition(cajones[i].x, cajones[i].y);
				}

			} 
			// Reinicia la escena
			else if(this.btnRevisar.texture.key === 'btnEnviarVerde' ||
								this.btnRevisar.texture.key === 'btnEnviarRojo') {
				location.reload();
				//this.scene.restart();
			}
		}, this);

  }

  checkOverlap(fruta) {

  	let intersecta = false;
  	let totalLlenos = 0;

  	// Recorre los cajones para ver si la fruta lo intersecta
  	this.cajones.getChildren().forEach(function(element) {

  		if(Phaser.Geom.Rectangle.Overlaps(fruta.getBounds(), element.getBounds())) {

  			intersecta = true;

  			// Si el cajón ya tenía una fruta, la devuelve a su posición original
  			var frutaAnterior = element.getData("fruta");
  			if (frutaAnterior)
  				frutaAnterior.resetPosition();
  				
  			// Guarda la fruta en el cajón
  			element.setData("fruta", fruta);
  			fruta.x = element.x;
  			fruta.y = element.y;
  		}

  		if (element.getData("fruta"))
  			totalLlenos++;

  	});

  	if (!intersecta) {
  		fruta.resetPosition();
  		this.btnRevisar.setTexture("btnRevisarInactivo");
  		totalLlenos = 0;
  	}

  	// Si todos los cajones están llenos, activa el botón de revisar
  	if(totalLlenos >= this.max_cajones) {
  		this.btnRevisar.setTexture("btnRevisarActivo");
  	}
  	
  }

  vaciarCajon(fruta) {
  	if(this.etapa !== 'Resultados') {
  		this.cajones.getChildren().forEach(function(element) {
	  		if (element.getData("fruta") === fruta) {
	  			element.setData("fruta", null);
	  		}
  		});	
  	}
  }

}