import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

import { HeroService } from '../hero.service';
import { Hero } from '../heroes/heroes';
 


@Component({
	selector: 'hero-search',
	templateUrl: './hero-search.component.html'
})
export class HeroSearchComponent implements OnInit {
 
	private searchTerms = new Subject<string>();
	heroes$: Observable<Hero[]>;
 
	constructor(
		private heroService: HeroService,
		private router: Router) { }
 
	// Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
	search(term: string): void {
		this.searchTerms.next(term);
	}
 
	ngOnInit(): void {
		this.heroes$ = this.searchTerms.pipe(
			// attendre 300ms de pause entre chaque requête
			debounceTime(300),
			// ignorer la recherche en cours si c'est la même que la précédente
			distinctUntilChanged(),
			// on retourne la liste des résultats correpsondant aux termes de la recherche
			switchMap((term: string) => this.heroService.searchHeroes(term)),
		);
	}
 
	gotoDetail(hero: Hero): void {
		let link = ['/heroes', hero.id];
		this.router.navigate(link);
	}
}