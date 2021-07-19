var roleHarvester = {
    run: function(creep) {
		creep.say('carry');
		creep.SwitchState();
		
        if(creep.memory.mustHarvest) {
			var source = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: x => x.structureType == STRUCTURE_CONTAINER && 
																		(x.store[RESOURCE_ENERGY] == x.storeCapacity ||
																		x.store[RESOURCE_ENERGY] > 0 )});
			
			if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
				creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
			}
        }
        else {
			var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
																								s.structureType == STRUCTURE_EXTENSION ||
																								s.structureType == STRUCTURE_TOWER) &&
																								s.energy < s.energyCapacity});

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
			else{
				creep.moveTo(Game.spawns.Spawn1);
			}
        }
    }
};

module.exports = roleHarvester;