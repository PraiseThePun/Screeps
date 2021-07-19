require('prototype.creep')();

module.exports = {
	run: function(creep){
		creep.say('rampart');
		creep.SwitchState();
		
		if(creep.memory.mustHarvest){
			creep.GoHarvest();
		}
		else{
			var structure = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_RAMPART})[creep.memory.targetRampart];

            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
		}
	}
};