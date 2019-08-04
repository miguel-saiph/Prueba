import { Entity } from './Entities';

export class Cajon extends Entity {
  
  constructor(scene, x, y, key, scale) {

  	super(scene, x, y, key);

  	this.setScale(scale);

    this.setData("fruta", null);
  	
    //this.scene.add.zone((this.bounds)).setRectangleDropZone(this.width*scale, this.height*scale);
    
  }
}