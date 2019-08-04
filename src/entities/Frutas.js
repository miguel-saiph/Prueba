import { Entity } from './Entities';
import 'phaser';

export class Fruta extends Entity {
  
  constructor(scene, x, y, key, scale) {

  	super(scene, x, y, key, "Fruta");

  	if (this.constructor === Fruta) {
      throw new TypeError('Clase abstracta "Fruta" no se puede instanciar directamente'); 
    }

  	this.setScale(scale);

    this.defaultX = x;
  	this.defaultY = y;

  	// Variables de clase
  	this.setData("type", null);
  	this.setData("precio", null);
  	this.setData("unidad", null);
  	
  	// Para que reaccione a los eventos
  	this.setInteractive();

  	this.scene.input.setDraggable(this);

  	// Evento click
  	this.on('pointerdown', function (pointer) {
      this.scene.mostrarInfo(this.getData("precio"), this.getData("unidad"), this.getData("type"));
    });

  	// Cambio de estilo cursor
    this.on('pointerover', function (pointer) {
      this.scene.game.canvas.style.cursor = "hand";
    });
    this.on('pointerout', function (pointer) {
      this.scene.game.canvas.style.cursor = "default";
    });

  	// Eventos drag
    this.on('drag', function(pointer, dragX, dragY){
     	this.x = dragX;
     	this.y = dragY;
   	});

   	this.on('dragend', function (pointer, gameObject, target) {
        
        this.scene.checkOverlap(this);
    });

    this.on('drop', function (pointer, gameObject, target) {

    	//var intersecta = Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), gameObject.getBounds());
    	//this.scene.checkOverlap(this);
    		
    });

    //displayWidth
  }

  resetPosition() {
  	// Vuelve a la posición original
  	this.setPosition(this.defaultX, this.defaultY);

  	// Borra la referencia a este objeto en el cajón en el que estaba
  	this.scene.vaciarCajon(this);
  }

  disableDrag() {
  	this.scene.input.setDraggable(this, false);
  }
}

export class Damasco extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "damasco", scale);

		this.setData("type", "damasco");
  	this.setData("precio", 800);
  	this.setData("unidad", "kilo");
  }
}

export class Durazno extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "durazno", scale);

  	this.setData("type", "durazno");
  	this.setData("precio", 650);
  	this.setData("unidad", "kilo");
  }
}

export class Frambuesa extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "frambuesa", scale);

  	this.setData("type", "frambuesa");
  	this.setData("precio", 2500);
  	this.setData("unidad", "kilo");
  }
}

export class Frutilla extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "frutilla", scale);

  	this.setData("type", "frutilla");
  	this.setData("precio", 1500);
  	this.setData("unidad", "kilo");
  }
}

export class Manzana extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "manzana", scale);

  	this.setData("type", "manzana");
  	this.setData("precio", 450);
  	this.setData("unidad", "kilo");
  }
}

export class Naranja extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "naranja", scale);

  	this.setData("type", "naranja");
  	this.setData("precio", 530);
  	this.setData("unidad", "kilo");
  }
}

export class Pera extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "pera", scale);

  	this.setData("type", "pera");
  	this.setData("precio", 430);
  	this.setData("unidad", "kilo");
  }
}

export class Platano extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "plátano", scale);

  	this.setData("type", "plátano");
  	this.setData("precio", 650);
  	this.setData("unidad", "kilo");
  }
}

export class Sandia extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "sandía", scale);

  	this.setData("type", "sandía");
  	this.setData("precio", 1000);
  	this.setData("unidad", "unidad");
  }
}

export class Uva extends Fruta {
  
  constructor(scene, x, y, scale) {

  	super(scene, x, y, "uva", scale);

  	this.setData("type", "uva");
  	this.setData("precio", 1800);
  	this.setData("unidad", "kilo");
  }
}


