

//Install express server
const express = require('express');
const path = require('path');

const app = express();

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
  new Hero(1, "Ger", 99, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/149.png", ['Dragon','Vol']),
  new Hero(2, "K", 85, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png", ['Feu', 'Eau',]),
  new Hero(3, "Minou", 98, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/053.png", ['Normal']),
  new Hero(4, "Momo", 65, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/188.png", ['Plante', 'Poison']),
  new Hero(5, "Aurel", 58, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png", ['Insecte','Vol']),
  new Hero(6, "Manu", 82, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/068.png", ['Combat']),
  new Hero(7, "Niko", 82, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/172.png", ['Electrique']),
  new Hero(8, "Max", 75, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png", ['Eau']),
  new Hero(9, "Adrix", 75, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/143.png", ['Normal']),
  new Hero(10, "Arturito", 92, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/075.png", ['Roche']),
  new Hero(11, "Triopikeur", 92, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/051.png", ['Terre']),
  new Hero(12, "Xis", 60, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/048.png", ['Poison']),
  new Hero(13, "Lamantine", 92, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/086.png", ['Eau','Glace']),
  new Hero(16, "Tenefix", 85, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/302.png", ['Ténèbres','Spectre']),
  new Hero(17, "Issou", 85, "../../assets/perplexe.png", ['Ténèbres'])  
];

/**
  searchPokemons(term: string): Observable<Pokemon[]> {
  return this.http.get<Pokemon[]>(`${this.apiUrl}/?name=${term}`).pipe(

  
  
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
  

    return this.http.get<Pokemon[]>(this.apiUrl)

  // Ajout Héros ----------
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.apiUrl}/${pokemon.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Pokemon>(this.apiUrl, pokemon, httpOptions).pipe(
      tap(_ => this.log(`added pokemon id=${pokemon.id} ${url}`)),
      catchError(this.handleError<any>(`addPokemon`))
    )
  }

  //delete
    const url = `${this.apiUrl}/${pokemon.id}`;
**/

        // Pokemon end points

// GET HEROES
app.get('/api/heroes', function (request, response) {
  console.log("GET " + request.body);      // your JSON
  response.send(heroes);    // echo the result back
});

// GET HERO


app.get('/api/heroes/:id([0-9]+)', function (request, response) {
  for (let hero of heroes) {
    if (hero.id == request.params.id) {
      console.log(hero.id +" "+hero.name+" --  request.params.id "+ request.params.id);
      response.send(hero);
      return;
    }
  }
  response.status(404).send("Help not found help plz");
});

app.post('/api/heroes', function (request, response) {
  
  //maybe miss something to say that the request body is json
  const heroCreated = JSON.stringify(request.body);
  heroes.push(heroCreated);
  console.log("Tentative d'ajout du héros");
  console.log(heroCreated);      // your JSON
  response.send(heroCreated);    // echo the result back
  
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);