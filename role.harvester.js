require('prototype.creep')();

var roleHarvester = {
    run: function(creep) {
		creep.say('harvest');
		creep.SwitchState();
		
        if(creep.memory.mustHarvest) {
			creep.GoHarvest();
        }
        else {
			var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
																								s.structureType == STRUCTURE_EXTENSION ||
																								s.structureType == STRUCTURE_CONTAINER ||
																								s.structureType == STRUCTURE_TOWER) &&
																								s.energy < s.energyCapacity});

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
			else{
				creep.moveTo(Game.spawns.Spawn1);
			}
        }
    }
};

module.exports = roleHarvester;