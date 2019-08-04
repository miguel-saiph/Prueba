import { Entity } from './Entities';
import 'phaser';

export class Cajon extends Entity {
  
  constructor(scene, x, y, key, scale) {

  	super(scene, x, y, key);

  	this.setScale(scale);

  	// Variables de clase
  	this.setData("vacio", true);
  	this.setData("precio", null);
  	this.setData("unidad", null);
    this.setData("fruta", null);
  	
    //this.scene.add.zone((this.bounds)).setRectangleDropZone(this.width*scale, this.height*scale);
    
  }
}