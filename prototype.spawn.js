module.exports = function(){
	StructureSpawn.prototype.createCustomCreep = function(energy, role) {
		var numberOfParts = Math.floor(energy / 200);
		var body = [];
		
		for(let i = 0; i < numberOfParts; i++){
			body.push(WORK);
		}			
		for(let i = 0; i < numberOfParts; i++){
			body.push(CARRY);
		}			
		for(let i = 0; i < numberOfParts; i++){
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, { role: role, mustHarvest: true});
	};
	
	StructureSpawn.prototype.createCarrier = function(energy) {
		var numberOfParts = Math.floor(energy / 150);
		var body = [];
		
		for(let i = 0; i < numberOfParts * 2; i++){
			body.push(CARRY);
		}			
		for(let i = 0; i < numberOfParts; i++){
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, { role: 'carrier', mustHarvest: true});
	};
	
	StructureSpawn.prototype.createRampartRepairer = function(energy, targetRampart) {
		var numberOfParts = Math.floor(energy / 200);
		var body = [];
		
		for(let i = 0; i < numberOfParts; i++){
			body.push(WORK);
		}			
		for(let i = 0; i < numberOfParts; i++){
			body.push(CARRY);
		}			
		for(let i = 0; i < numberOfParts; i++){
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, { role: 'rampartRepairer', mustHarvest: true, targetRampart: targetRampart});
	};
	
	StructureSpawn.prototype.createSoldier = function(energy) {
		var numberOfParts = Math.floor(energy / 140);
		var body = [];
		
		for(let i = 0; i < numberOfParts; i++){
			body.push(ATTACK);
		}			
		for(let i = 0; i < numberOfParts; i++){
			body.push(TOUGH);
		}			
		for(let i = 0; i < numberOfParts; i++){
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, { role: 'soldier', mustHarvest: true });
	};
	
	StructureSpawn.prototype.createlongdistanceharvester = function(energy, numberOfWorkParts, home, target, sourceId){
		var body = [];
		for (let i = 0; i < numberOfWorkParts; i++) {
			body.push(WORK);
		}

		// this is a very shitty workarround. 150 = 100 (cost of WORK) + 50 (cost of MOVE)
		energy -= 150 * numberOfWorkParts;

		var numberOfParts = Math.floor(energy / 100);
		for (let i = 0; i < numberOfParts; i++) {
			body.push(CARRY);
		}
		for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
			body.push(MOVE);
		}

		return this.createCreep(body, undefined, {
			role: 'longDistanceHarvester',
			mustHarvest: true,
			home: home,
			target: target,
			sourceId: sourceId
		});
	};
	
	StructureSpawn.prototype.createMiner = function(sourceId){
		return this.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner', sourceId: sourceId});
		//return this.createCreep([WORK,WORK,MOVE], undefined, {role: 'miner', sourceId: sourceId});
	}
};