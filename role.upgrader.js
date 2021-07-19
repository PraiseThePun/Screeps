require('prototype.creep')();

module.exports = {
    run: function(creep) {
		creep.say('upgrade');
		creep.SwitchState();
		
		if(creep.memory.mustHarvest == true){			
			creep.GoHarvest();
		}
        else {
			if(creep.room.controller) {
				if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller);
				}
			}
        }
    }
};