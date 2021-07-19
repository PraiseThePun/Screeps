require('prototype.creep')();

module.exports = {
    run: function(creep) {
		creep.say('distance');
		creep.SwitchState();
		
        if (creep.memory.mustHarvest) {
			if (creep.room.name == creep.memory.target) {
				var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceId];

				if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
            }
            else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        else {
            if (creep.room.name == creep.memory.home) {
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION
                                 || s.structureType == STRUCTURE_CONTAINER
                                 || s.structureType == STRUCTURE_TOWER)
                                 && s.energy < s.energyCapacity
                });

                if (structure != undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
				else{
					creep.moveTo(Game.spawns.Spawn1);
				}
            }
            else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};