import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from '../heroes/heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditComponent implements OnInit {

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

}
