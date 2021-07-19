module.exports = function(){	
	Creep.prototype.SwitchState = function() {
		if(this.memory.mustHarvest && this.carry.energy == this.carryCapacity){
			this.memory.mustHarvest = false;
		}
		else if (!this.memory.mustHarvest && this.carry.energy == 0){
			this.memory.mustHarvest = true;
		}		
	}
	
	Creep.prototype.GoHarvest = function() {
		let target = this.pos.findClosestByRange(FIND_STRUCTURES, { filter: x => x.structureType == STRUCTURE_CONTAINER && x.store[RESOURCE_ENERGY] > 0});
		if(target) {
		//target = this.pos.findClosestByRange(FIND_STRUCTURES, { filter: x => x.structureType == STRUCTURE_EXTENSION && x.energy > 0});
			
			if(target){
				if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.moveTo(target);
				}
			}
		}	
		else{
			target = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
			if(target){
				if(this.harvest(target) == ERR_NOT_IN_RANGE)
					this.moveTo(target);
			}
		}
	}
};