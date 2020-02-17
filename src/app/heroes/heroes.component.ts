import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Hero } from './heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']

})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  sortedHeroes: Hero[];
  idSortedArray: boolean = false;
  nameSortedArray : boolean = false;
  
  



  constructor(
    private routeur: Router, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getSortedHeroes();
    //this.genHeroesNameArray();
  }


  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  getSortedHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(sortedHeroes => this.sortedHeroes = sortedHeroes);

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

  redirectToStats(): void {
    let link = ['heroes/', 'stats'];
    this.routeur.navigate(link);
  }

  sortById(): void {
    this.nameSortedArray = false;
    this.idSortedArray = !this.idSortedArray;
    
    //console.log("sortedArray is : " + this.sortedArray)
    if (this.idSortedArray) {
      this.heroes.sort((a, b) => a.id - b.id);
    }
    else if (!this.idSortedArray) {
      this.getHeroes();
    }
  }

  sortByName(): void {
    this.idSortedArray = false;
    this.nameSortedArray = !this.nameSortedArray;
    
    if (this.nameSortedArray) {
      this.heroes.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (!this.nameSortedArray) {
      this.getHeroes();
    }
  }

}
