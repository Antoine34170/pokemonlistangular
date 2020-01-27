import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from '../heroes/heroes';
import { HeroService } from '../hero.service';
import { HEROES } from '../heroes/mock-heroes.component';
import { Server } from 'http';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: [HeroService]
})
export class HeroDetailComponent implements OnInit {

  //heroes: Hero[];
  hero: Hero = null;

  constructor(
    private route: ActivatedRoute,
    private routeur: Router,
    private HeroService: HeroService
  ) { }

  ngOnInit(): void {

    let id = +this.route.snapshot.paramMap.get('id');
    this.HeroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  delete(hero: Hero): void {
    this.HeroService.deleteHeroes(hero)
      .subscribe(_ => this.goBack());
  }
  
  goBack(): void {
    this.routeur.navigate(['/heroes']);
  }

  goEdit(hero: Hero): void {
		let link = ['heroes/edit', hero.id];
		this.routeur.navigate(link);
	}
  

}

