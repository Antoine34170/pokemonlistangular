//Install express server
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
//const db = require('./queries')

app.use(cors());

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-reroll-test'));

// Serve angular app
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/angular-reroll-test/index.html'));
});

app.get('/heroes', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/angular-reroll-test/index.html'));
});

class Hero {
  id;
  name;
  skill;
  picture;
  types;

  constructor(id, name, skill, picture, types) {
    this.id = id;
    this.name = name;
    this.skill = skill;
    this.picture = picture;
    this.types = types;
  }
}

let heroes = [
  new Hero(1, "Minou", 98, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/133.png", ['Fée']),
  new Hero(18, "Ger", 99, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/149.png", ['Dragon', 'Vol']),
  new Hero(25, "K", 85, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png", ['Feu', 'Eau',]),
  new Hero(4, "Momo", 65, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/188.png", ['Plante', 'Poison']),
  new Hero(5, "Aurel", 58, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png", ['Insecte', 'Vol']),
  new Hero(6, "Manu", 82, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/068.png", ['Combat']),
  new Hero(7, "Niko", 82, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/172.png", ['Electrique']),
  new Hero(8, "Max", 75, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png", ['Eau']),
  new Hero(23, "Adrix", 75, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/143.png", ['Normal']),
  new Hero(10, "Arturito", 92, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/075.png", ['Roche']),
  new Hero(11, "Triopikeur", 92, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/051.png", ['Terre']),
  new Hero(12, "Xis", 60, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/048.png", ['Poison']),
  new Hero(13, "Lamantine", 92, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/086.png", ['Eau', 'Glace']),
  new Hero(16, "Tenefix", 85, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/302.png", ['Ténèbres', 'Spectre']),
  new Hero(17, "Issou", 85, "../../assets/perplexe.png", ['Ténèbres'])
];

// Connextion à la BDD





// GET HEROES


//AUTO COMPLETiON SEARCH
app.get('/api/heroes', function (request, response) {

  let searchedName = request.query.name;


  if (searchedName) {
    //name est défini, donc on filtre
    //d'abord convertir toute ta liste de hero en lower case
    


    let filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(searchedName.toLowerCase()));
    response.send(filteredHeroes);    // echo the result back

    console.log("GET HEROES WITH NAME " + searchedName);      // your JSON
  } else {
    //name non defini, on retourne tous les heroes
    response.send(heroes);    // echo the result back
    console.log("GET HEROES");      // your JSON
  }

});


// GET HERO
app.get('/api/heroes/:id([0-9]+)', function (request, response) {
  for (let hero of heroes) {
    if (hero.id == request.params.id) {
      response.send(hero);
      return;
    }
  }
  response.status(404).send("Help not found help plz");
});

// AJOUT HERO
app.post('/api/heroes', function (request, response) {
 
  const nvHero = request.body;
  heroes.push(nvHero);
  response.send(heroes);
});

// SUPPRESSION HEROS
app.delete('/api/heroes/:id([0-9]+)', function (request, response) {
  
  var IndexOfHeroToBeRemoved;
  // On choppe l'index dans le tableau de heroes du héros a supprimer
  for (let i=0; i < heroes.length; i++) {
    if (request.params.id == heroes[i].id) {
      IndexOfHeroToBeRemoved = i;
    }   
  }

  // On supprime l'Hero avec un splice grâce à l'indice qu'on a récupéré
  console.log("On va supprimer le heros d'indice " + IndexOfHeroToBeRemoved + " dans le tableau");
  heroes.splice(IndexOfHeroToBeRemoved, 1);
  response.send(heroes);
  });

  
  //MISE A JOUR
  app.put('/api/heroes/:id([0-9]+)', function (request, response) {
    let indexToBeModified;
    const heroToModify = request.body;
    console.log("request params id : "+ request.params.id);

    //TODO save modifications in database
    for (let i=0; i < heroes.length; i++) {
      if (request.params.id == heroes[i].id) {
        indexToBeModified = i;
      }   
    }
    heroes[indexToBeModified] = request.body;

    response.send(heroToModify);
  
  });

