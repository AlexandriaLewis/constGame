var page = {
  charArr: [],
  newChar: [],
  init: function(){
    page.styling();
    page.events();
  },
  styling: function(){
    meghan = new page.Character({name: "Meghan"});
    nicole = new page.Character({name: "Nicole"});
    page.charArr.push(meghan, nicole);
    page.loadCharToDom(page.charArr);
  },
  events: function(){
    $('form.character').on('submit', function(event){
      event.preventDefault();
      if($('input[name="charName"]').val() === "" || $('input[name="charName"]').val() === null){
        alert("how bout you type in a name");
      }else{
        page.submitChar();
      }
    });
    $('div.cards').on('click', 'button[name="shade"]', function(event){
      //how do I grab the right character objects?
      newCharacter.throwShade(nicole);
      page.loadCharToDom();
    });
  },
  submitChar: function(event){
    page.getCharFromDom();
    page.addCharToDom(page.newChar);
  },
  getCharFromDom: function(){
    var newChar = $('input[name="charName"]').val();
    $('input[name="charName"]').val('');
    newCharacter = new page.Character({name: newChar});
    page.newChar.splice(0, 1, newCharacter);
    page.charArr.push(newCharacter);
  },
  addCharToDom: function(newChar){
    _.each(newChar, function (el) {
      var signature = _.template(templates.newChar);
      $('div.cards').append(signature(el));
    });
  },
  loadCharToDom: function(charStats){
    $('div.cards').html('');
    _.each(charStats, function (el) {
      var signature = _.template(templates.charStats);
      $('div.cards').append(signature(el));
    });
  },
  Character: function(options){
    var options = options || {};
    this.name = options.name || "nobody";
    this.followers = page.getRandoFollowers();
    this.reputation = page.getRandoRep();
    this.clout = page.getRandoClout();
  },
  getRando: function(){
    return Math.floor(Math.random() * (11 - 1)) + 1;
  },
  getRandoFollowers: function(){
    return Math.floor(Math.random() * (10000 - 1)) + 1;
  },
  getRandoRep: function(){
    return Math.floor(Math.random() * (1000 - 1)) + 1;
  },
  getRandoClout: function(){
    return Math.floor(Math.random() * (80 - 1)) + 1;
  },
  prTeam: function(options){
    var options = options || {};
    this.defense = getRando();
  },
  medium: function(options){
    var options = options || {};
    this.name = options.name || "twitter";
    this.power = getRando();
  },
  squadGoals: function(options){
    this.name = options.name || "tswift";
    this.power = getRando();
  },
  throwShade: function(target){
    //how do I grab the right character objects?
    target.page.damage(this);
    console.log(target);
    console.log(this);
  },
  damage: function(attacker){
    var rando = Math.floor(Math.random() * (100 - 1)) + 1;
    if(rando % 2 === 0){
      if(this.reputation <= 0 || attacker.reputation <= 0){
        console.log("Final reputations: "+this.name+" "+this.reputation+" "+attacker.name+" "+attacker.reputation);
      } else if(attacker.medium && attacker.squadGoals){
        var shade = attacker.clout * (attacker.medium.power + attacker.squadGoals.power);
        if(this.prTeam){
          this.reputation = this.reputation - (shade/this.prTeam.defense);
          console.log(attacker.name+"'s shade: "+shade);
          console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+attacker.name+"'s shade divided by the PR Team Defense: "+shade/this.prTeam.defense);
          console.log(this.name+"'s rep is now: "+this.reputation);
        } else {
          this.reputation = this.reputation - shade;
          console.log(attacker.name+"'s shade: "+shade);
          console.log(this.name+"'s rep is now: "+this.reputation);
        }
      } else if(attacker.medium){
        var shade = attacker.clout * attacker.medium.power;
        if(this.prTeam){
          this.reputation = this.reputation - (shade/this.prTeam.defense);
          console.log(attacker.name+"'s shade: "+shade);
          console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+attacker.name+"'s shade divided by the PR Team Defense: "+shade/this.prTeam.defense);
          console.log(this.name+"'s rep is now: "+this.reputation);
        } else {
          this.reputation = this.reputation - shade;
          console.log(attacker.name+"'s shade: "+shade);
          console.log(this.name+"'s rep is now: "+this.reputation);
        }
      } else if(attacker.squadGoals){
        var shade = attacker.clout * attacker.squadGoals.power;
        if(this.prTeam){
          this.reputation = this.reputation - (shade/this.prTeam.defense);
          console.log(attacker.name+"'s shade: "+shade);
          console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+attacker.name+"'s shade divided by the PR Team Defense: "+shade/this.prTeam.defense);
          console.log(this.name+"'s rep is now: "+this.reputation);
        } else {
          this.reputation = this.reputation - shade;
          console.log(attacker.name+"'s shade: "+shade);
          console.log(this.name+"'s rep is now: "+this.reputation);
        }
      }else{
        if(this.prTeam){
          this.reputation = this.reputation - (attacker.clout/this.prTeam.defense);
          console.log(attacker.name+"'s only got clout: "+attacker.clout);
          console.log("But "+this.name+" has a PR Team! Shade blockade: "+this.prTeam.defense+" "+attacker.name+"'s clout divided by the PR Team Defense: "+attacker.clout/this.prTeam.defense);
          console.log(this.name+"'s rep is now: "+this.reputation);
        } else {
          this.reputation = this.reputation - attacker.clout;
          console.log(attacker.name+"'s only got clout: "+attacker.clout);
          console.log(this.name+"'s rep is now: "+this.reputation);
        }
      }
    } else {
      attacker.reputation = attacker.reputation - attacker.clout;
      console.log(attacker.name+"'s verbal assault backfired! Rep is now: "+attacker.reputation+" clout "+attacker.clout);
    }
  }

}

$(document).ready(function(){
  page.init();
  console.log(meghan);
  console.log(nicole);
  console.log("Make a <character> with a name.");
  console.log("Multiply your clout by <working on a medium> and <networking for squadGoals>");
  console.log("Put people in their place by <throwing shade>");
  console.log("Get a shade <blockade with a PR Team>");
});
