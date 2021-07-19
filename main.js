require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var longDistanceHarvester = require('role.longDistanceHarvester');
var roleWallRepairer = require('role.wallRepairer');
var roleRampartRepairer = require('role.rampartRepairer');
var roleMiner = require('role.miner');
var roleCarrier = require('role.carrier');
var roleSoldier = require('role.soldier');

const HOME = 'W5N8';
const WEST = 'W6N8';
const NORTH = 'W5N9';
const EAST = 'W4N8';
const SOUTH = 'W5N7';

module.exports.loop = function () {
	ClearMemory();
	ShootTurrets();
	
	SpawnShit();
		
	RunRoles();
};

ClearMemory = function (){
	for (let name in Memory.creeps) {
		if (Game.creeps[name] == undefined) {
			delete Memory.creeps[name];
		}
    }
};

SpawnShit = function () {
	const max_harvesters = 2;
	const max_upgraders = 4;
	const max_builders = 2;
	const max_repairers = 1;
	const max_longDistanceHarvestersWest = 1;
	const max_longDistanceHarvestersNorth = 1;
	const max_longDistanceHarvestersEast = 1;
	const max_longDistanceHarvestersSouth = 1;
	const max_WallRepairer = 1;
	const max_rampartRepairer = 1;
	const max_carriers = 2;
	const max_soldiers = 2;
	
	var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
	var rampartFlag = true;
	var currentHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
	var currentUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
	var currentbuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
	var currentbRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
	var currentLongDistanceHarvestersWest = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester' && c.memory.target == WEST);
	var currentLongDistanceHarvestersNorth = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester' && c.memory.target == NORTH);
	var currentLongDistanceHarvestersEast = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester' && c.memory.target == EAST);
	var currentLongDistanceHarvestersSouth = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester' && c.memory.target == SOUTH);
	var currentWallRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
	var currentRampartRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'rampartRepairer');
	var currentCarriers = _.sum(Game.creeps, (c) => c.memory.role == 'carrier');
	var currentMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
	var currentSoldiers = _.sum(Game.creeps, (c) => c.memory.role == 'soldier');
	
	let sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
	let creepsInRoom = Game.spawns.Spawn1.room.find(FIND_MY_CREEPS);
	var name = undefined;
	
	if(currentHarvesters == 0 && (currentCarriers == 0 && currentMiners == 0)){
		if(currentMiners > 0) {
			name = Game.spawns.Spawn1.createCarrier(Game.spawns.Spawn1.room.energyAvailable);
		}
		else{
			name = Game.spawns['Spawn1'].createCustomCreep(Game.spawns.Spawn1.room.energyAvailable, 'harvester');
		}
	}
	else{
		for(let source of sources){
			if(!_.some(creepsInRoom, x => x.memory.role == 'miner' && x.memory.sourceId == source.id)){
				let containers = source.pos.findInRange(FIND_STRUCTURES, 1, { filter: x => x.structureType == STRUCTURE_CONTAINER});
				if(containers.length > 0){
					name = Game.spawns.Spawn1.createMiner(source.id);
					break;
				}
			}
		}
	}
	
	if(name == undefined || name == ERR_NOT_ENOUGH_ENERGY){
		var target = Game.spawns.Spawn1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined && currentSoldiers < max_soldiers) {
            Game.spawns.Spawn1.createSoldier(Game.spawns.Spawn1.room.energyAvailable);
        }
		if(currentCarriers < max_carriers && currentMiners > currentCarriers){
			Game.spawns.Spawn1.createCarrier(150);
		}
		else if(currentLongDistanceHarvestersWest < max_longDistanceHarvestersWest){
			Game.spawns['Spawn1'].createlongdistanceharvester(energy, 3, HOME, WEST, 1);
		}	
		else if(currentLongDistanceHarvestersNorth < max_longDistanceHarvestersNorth){
			Game.spawns['Spawn1'].createlongdistanceharvester(energy, 3, HOME, NORTH, 1);
		}	
		else if(currentLongDistanceHarvestersEast < max_longDistanceHarvestersEast){
			Game.spawns['Spawn1'].createlongdistanceharvester(energy, 3, HOME, EAST, 0);
		}	
		else if(currentLongDistanceHarvestersSouth < max_longDistanceHarvestersSouth){
			Game.spawns['Spawn1'].createlongdistanceharvester(energy, 3, HOME, SOUTH, 0);
		}
		else if(currentUpgraders < max_upgraders){
			Game.spawns['Spawn1'].createCustomCreep(energy, 'upgrader');
		}
		else if(currentbuilders < max_builders){
			Game.spawns['Spawn1'].createCustomCreep(energy, 'builder');
		}
		else if(currentbRepairers < max_repairers){
			Game.spawns['Spawn1'].createCustomCreep(energy, 'repairer');
		}	
		else if(currentWallRepairer < max_WallRepairer){
			Game.spawns['Spawn1'].createCustomCreep(energy, 'wallRepairer');
		}	
		else if(currentRampartRepairer < max_rampartRepairer){
			if(rampartFlag){
				Game.spawns['Spawn1'].createRampartRepairer(energy, 0);
				rampartFlag = false;
			}
			else{
				Game.spawns['Spawn1'].createRampartRepairer(energy, 1);
				rampartFlag = true;
			}
		}
	}	
};

RunRoles = function(){
	for (let name in Game.creeps) {
        var creep = Game.creeps[name];
		
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
		else if (creep.memory.role == 'builder'){
			roleBuilder.run(creep);
		}
		else if (creep.memory.role == 'repairer'){
			roleRepairer.run(creep);
		}
		else if (creep.memory.role == 'longDistanceHarvester'){
			longDistanceHarvester.run(creep);
		}
		else if (creep.memory.role == 'wallRepairer'){
			roleWallRepairer.run(creep);
		}
		else if (creep.memory.role == 'rampartRepairer'){
			roleRampartRepairer.run(creep);
		}
		else if (creep.memory.role == 'miner'){
			roleMiner.run(creep);
		}
		else if (creep.memory.role == 'carrier'){
			roleCarrier.run(creep);
		}
		else if (creep.memory.role == 'soldier'){
			roleSoldier.run(creep);
		}
    }
};

ShootTurrets = function(){
	var towers = Game.rooms[HOME].find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER });
	
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }
};