require('prototype.creep')();
var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {
		creep.say('build');
		creep.SwitchState();
		
		if(creep.memory.mustHarvest){
			creep.GoHarvest();
		}
		else{
			var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (constructionSite != undefined) {
				if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
					creep.moveTo(constructionSite);
				}
			}
			else{
				roleUpgrader.run(creep);
			}
		}
    }
};