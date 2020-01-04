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

  hero = new Hero("16", "Pektoubi", '99', "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/600.png", ['Dragon','Spectre']);
  heroes:Hero[];
  types:Array<String>;

   
  idForm = new FormControl();
  nameForm = new FormControl('');
  skillForm = new FormControl('');
  pictureForm = new FormControl('');
  typesForm = new FormControl('');

  constructor(
    private routeur: Router,
    private heroService: HeroService,
    
  ) { }

  ngOnInit() {
    this.types = this.heroService.getHeroTypes();
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
    }

      
    
    onSubmit(): void {
      console.log("envoi du formulaire");
      console.log(this.hero.id +"name "+this.hero.name+"Skill "+this.hero.skill);
      this.heroService.addHero(this.hero)
      .subscribe(hero => this.heroes.push(hero));
      this.goBack();
            
    }
        
    goBack(): void {
      let link =['/heroes'];
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
