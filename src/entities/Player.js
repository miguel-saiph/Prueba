import { Entity } from './Entities';


export class Player extends Entity {
  
  constructor(scene, x, y, key) {

  	super(scene, x, y, key, "damasco", "Player");

  	this.setData("speed", 200);
    
  }
}