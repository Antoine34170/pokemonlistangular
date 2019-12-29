import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/heroes';


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  @Input() hero: Hero; // propriété d'entrée du composant
  types: Array<string>; // types disponibles pour un pokémon : 'Eau', 'Feu', etc ...
  
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
		private routeur: Router) { }

  ngOnInit() {
    this.types = this.heroService.getHeroTypes();
    let id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  hasType(type: string): boolean {
		let index = this.hero.types.indexOf(type);
		if (index > -1) return true;
		return false;
  }
  
  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
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
  
  // Valide le nombre de types pour chaque pokémon
	isTypesValid(type: string): boolean {
		if (this.hero.types.length === 1 && this.hasType(type)) {
			return false;
		}
		if (this.hero.types.length >= 3 && !this.hasType(type)) {
			return false;
		}

		return true;
	}

  // La méthode appelée lorsque le formulaire est soumis.
	onSubmit(): void {
		console.log("Submit form !");
		this.heroService.updateHero(this.hero)
		.subscribe(() => this.goBack());
	}

	goBack(): void {
		let link =['/heroes', this.hero.id];
		this.routeur.navigate(link);
	}
  
}
