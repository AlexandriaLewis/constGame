function character(options){
  var options = options || {};
  this.name = options.name || "nobody";
  this.followers = getRandomFollowers();
  this.reputation = getRandomRep();
  this.clout = getRandomClout();
};

character.prototype.throwShade = function(enemy){
  enemy.damage(this);
};

character.prototype.damage = function(enemy){
  var rando = Math.floor(Math.random() * (100 - 1)) + 1;
  if(rando % 2 === 0){
    if(this.reputation <= 0 || enemy.reputation <= 0){
      console.log("Final reputations: "+this.name+" "+this.reputation+" "+enemy.name+" "+enemy.reputation);
    } else if(enemy.medium && enemy.squadGoals){
      var shade = enemy.clout * (enemy.medium.power + enemy.squadGoals.power);
      if(this.prTeam){
        this.reputation = this.reputation - (shade/this.prTeam.defense);
        console.log(enemy.name+"'s shade: "+shade);
        console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+enemy.name+"'s shade divided by the PR Team Defense: "+shade/this.prTeam.defense);
        console.log(this.name+"'s rep is now: "+this.reputation);
      } else {
        this.reputation = this.reputation - shade;
        console.log(enemy.name+"'s shade: "+shade);
        console.log(this.name+"'s rep is now: "+this.reputation);
      }
    } else if(enemy.medium){
      var shade = enemy.clout * enemy.medium.power;
      if(this.prTeam){
        this.reputation = this.reputation - (shade/this.prTeam.defense);
        console.log(enemy.name+"'s shade: "+shade);
        console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+enemy.name+"'s shade divided by the PR Team Defense: "+shade/this.prTeam.defense);
        console.log(this.name+"'s rep is now: "+this.reputation);
      } else {
        this.reputation = this.reputation - shade;
        console.log(enemy.name+"'s shade: "+shade);
        console.log(this.name+"'s rep is now: "+this.reputation);
      }
    } else if(enemy.squadGoals){
      var shade = enemy.clout * enemy.squadGoals.power;
      if(this.prTeam){
        this.reputation = this.reputation - (shade/this.prTeam.defense);
        console.log(enemy.name+"'s shade: "+shade);
        console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+enemy.name+"'s shade divided by the PR Team Defense: "+shade/this.prTeam.defense);
        console.log(this.name+"'s rep is now: "+this.reputation);
      } else {
        this.reputation = this.reputation - shade;
        console.log(enemy.name+"'s shade: "+shade);
        console.log(this.name+"'s rep is now: "+this.reputation);
      }
    }else{
      if(this.prTeam){
        this.reputation = this.reputation - (enemy.clout/this.prTeam.defense);
        console.log(enemy.name+"'s only got clout: "+enemy.clout);
        console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+enemy.name+"'s clout divided by the PR Team Defense: "+enemy.clout/this.prTeam.defense);
        console.log(this.name+"'s rep is now: "+this.reputation);
      } else {
        this.reputation = this.reputation - enemy.clout;
        console.log(enemy.name+"'s only got clout: "+enemy.clout);
        console.log(this.name+"'s rep is now: "+this.reputation);
      }
    }
  } else {
    enemy.reputation = enemy.reputation - enemy.clout;
    console.log(enemy.name+"'s verbal assault backfired! Rep is now: "+enemy.reputation+" clout "+enemy.clout);
  }
};

character.prototype.blockade = function(){
  this.prTeam = new prTeam();
  console.log(this.name+" paid a PR Team for Defamation Defense: "+this.prTeam.defense);
};

character.prototype.work = function(name){
  this.medium = new medium({name:name});
  console.log(this.name+" worked on "+this.medium.name+" for power: "+this.medium.power);
};

character.prototype.network = function(name){
  this.squadGoals = new squadGoals({name:name});
  console.log(this.name+" connected with "+this.squadGoals.name+" for power: "+this.squadGoals.power);
};

function prTeam(options){
  var options = options || {};
  this.defense = getRando();
}

function medium(options){
  var options = options || {};
  this.name = options.name || "twitter";
  this.power = getRando();
}

function squadGoals(options){
  this.name = options.name || "tswift";
  this.power = getRando();
}

function getRando(){
  return Math.floor(Math.random() * (11 - 1)) + 1;
}

function getRandomFollowers() {
  return Math.floor(Math.random() * (10000 - 1)) + 1;
}

function getRandomRep() {
  return Math.floor(Math.random() * (1000 - 1)) + 1;
}

function getRandomClout() {
  return Math.floor(Math.random() * (80 - 1)) + 1;
}

var meghan = new character({name: "Meghan"});
var nicole = new character({name: "Nicole"});



$(document).ready(function(){
  // console.log("Create your character:");
  console.log(meghan);
  console.log(nicole);
  console.log("Make a <character> with a name.");
  console.log("Multiply your clout by <working on a medium> and <networking for squadGoals>");
  console.log("Put people in their place by <throwing shade>");
  console.log("Get a shade <blockade with a PR Team>");
});
