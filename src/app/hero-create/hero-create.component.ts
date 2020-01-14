import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/heroes';


@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit {

  private numHero = this.heroService.getRandomInt();
  private correctHeroId = this.heroService.getValidHeroId()
  hero = new Hero("", "", "", "", []);
  public heroes: Hero[];
  types: Array<String>;
  
  
  
  
  idForm = new FormControl();
  nameForm = new FormControl('');
  skillForm = new FormControl('');
  pictureForm = new FormControl('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+numHero"+.png');
  typesForm = new FormControl('');

  constructor(
    private routeur: Router,
    private heroService: HeroService,

  ) { }

  ngOnInit() {
    this.types = this.heroService.getHeroTypes();
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
      this.heroService.getValidHeroId();
      
          
    
  }
  // Générer un nombre aléa alors de la création avec 3 caractères
  generateRandomNumber() {
    console.log("Random Number Fetched " +  this.numHero);
    this.numHero = this.heroService.getRandomInt();
    }

   

  onSubmit(): void {
    this.hero.picture = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.numHero + ".png";
    this.hero.id = this.correctHeroId;
    this.heroService.addHero(this.hero)
      .subscribe(hero => this.heroes.push(hero));
    this.goBack();
   ;

  }

  goBack(): void {
    let link = ['/heroes'];
    this.routeur.navigate(link);
  }

  selectType($event: any, type: string): void {
    let checked = $event.target.checked;
    if (checked) {
      this.hero.types.push(type);
    } else {
      let index = this.hero.types.indexOf(type);
      if (index > -1) {
        this.hero.types.splice(index, 1);
      }
    }
  }

  hasType(type: string): boolean {
    let index = this.hero.types.indexOf(type);
    if (index > -1) return true;
    return false;
  }

  isTypesValid(type: string): boolean {
    if (this.hero.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.hero.types.length >= 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

}
