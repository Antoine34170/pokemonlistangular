import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { HEROES } from './mock-heroes.component';
import { Hero } from './heroes';
import { HeroService } from '../hero.service';




@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']

})
export class HeroesComponent implements OnInit {

  heroes : Hero[];
  
 

  constructor(
    private routeur: Router, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }


  selectHero(hero: Hero): void {

    let link = ['heroes/', hero.id];
    console.log(hero.id);
    console.log(link);
    this.routeur.navigate(link);
  }

  createHero(): void {
    let link = ['heroes/', 'create'];
    this.routeur.navigate(link);
    
  }
}
