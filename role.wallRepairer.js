require('prototype.creep')();

module.exports = {
	run: function(creep){
		creep.say('wall');
		creep.SwitchState();

        if(creep.memory.mustHarvest) {
			creep.GoHarvest();
        }
        else {
			var walls = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_WALL });
			var target = undefined;
			
			for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
				for (let wall of walls) {
					if (wall.hits / wall.hitsMax < percentage) {
						target = wall;
						break;
					}
				}

				if (target != undefined) {
					break;
				}
			}

			if (target != undefined) {
				if (creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
        }		
	}
};