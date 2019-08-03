import { Entity } from './Entities';

export class Fruta extends Entity {
  
  constructor(scene, x, y, key, scaleX, scaleY) {

  	super(scene, x, y, key, "Fruta");

  	if (this.constructor === Fruta) {
      throw new TypeError('Clase abstracta "Fruta" no se puede instanciar directamente'); 
    }

  	this.scaleX = scaleX;
  	this.scaleY = scaleY;

  	// Variables de clase
  	this.setData("type", null);
  	this.setData("precio", null);
  	this.setData("unidad", null);
  	
  	// Para que reaccione a los eventos
  	this.setInteractive();

  	this.scene.input.setDraggable(this);

  	this.on('pointerdown', function (pointer) {
      console.log("Precio: " + this.getData("precio"));
      console.log("Unidad: " + this.getData("unidad"));
      this.scene.mostrarInfo(this.getData("precio"), this.getData("unidad"), this.getData("type"));
    });

    this.on('drag', function(pointer, dragX, dragY){
     	this.x = dragX;
     	this.y = dragY;
   	});

   	this.on('dragend', function (pointer, gameObject) {
        console.log(gameObject);
    });

    //    this.huesoCopy.originalPosition = this.huesoCopy.position.clone();
    
  }
}

export class Damasco extends Fruta {
  
  constructor(scene, x, y, scaleX, scaleY) {

  	super(scene, x, y, "damasco", scaleX, scaleY);

		this.setData("type", "damasco");
  	this.setData("precio", 800);
  	this.setData("unidad", "kilo");
  }
}

export class Durazno extends Fruta {
  
  constructor(scene, x, y, scaleX, scaleY) {

  	super(scene, x, y, "durazno", scaleX, scaleY);

  	this.setData("type", "durazno");
  	this.setData("precio", 650);
  	this.setData("unidad", "kilo");
    
  }
}

export class Frambuesa extends Fruta {
  
  constructor(scene, x, y, scaleX, scaleY) {

  	super(scene, x, y, "frambuesa", scaleX, scaleY);

  	this.setData("type", "frambuesa");
  	this.setData("precio", 650);
  	this.setData("unidad", "kilo");
    
  }
}

export class Frutilla extends Fruta {
  
  constructor(scene, x, y, scaleX, scaleY) {

  	super(scene, x, y, "frutilla", scaleX, scaleY);

  	this.setData("type", "frutilla");
  	this.setData("precio", 650);
  	this.setData("unidad", "kilo");
    
  }
}


