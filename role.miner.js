var roleHarvester = {
    run: function(creep) {
		let source = Game.getObjectById(creep.memory.sourceId);
		let containter = source.pos.findInRange(FIND_STRUCTURES, 1, { filter: x => x.structureType == STRUCTURE_CONTAINER})[0];
		
		if(creep.pos.isEqualTo(containter.pos)){
			creep.harvest(source);
		}
		else{
			creep.moveTo(containter);
		}
		
		creep.say('miner');
    }
};

module.exports = roleHarvester;