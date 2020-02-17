import { Injectable } from '@angular/core';
import { Hero } from './heroes/heroes';
import { HEROES } from './heroes/mock-heroes.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  constructor(private http: HttpClient) { }

  private heroesUrl = 'http://localhost:8080/api/heroes';
  hero: Hero;
  heroes: Hero[];

  private log(log: string) {
    console.info(log);
  }

  //handle Error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T)
    }
  }

  // Recherche héros auto complétion
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }

  // Retourne un Héros BACKEND OK
  getHero(id: number): Observable<Hero> {

    //arriver a lire le query param
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // Retourne tout les Héros BACKEND OK
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError(`getHeroes`, []))
    );
  }

  // Ajout Héros BACKEND OK
  addHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`added hero id=${hero.id} ${url}`)),
      catchError(this.handleError<any>(`addedHero`))
    )
  }

  // BACKEND OK
  deleteHeroes(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<any>(`deletedHero`))
    )
  }

  // Mise à jour Héros
  updateHero(hero: Hero): Observable<Hero> {
    console.log("update hero " + JSON.stringify(hero));
    const url = `${this.heroesUrl}/${hero.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Hero>(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id} ${url}`)),
      catchError(this.handleError<any>(`updatedHero`))
    )
  }

  // Retourne tout les types possibles
  getHeroTypes(): string[] {
    return ['Dragon', 'Plante', 'Feu', 'Eau', 'Glace', 'Insecte', 'Normal', 'Electrique',
      'Poison', 'Fée', 'Vol', 'Ténèbres', 'Spectre', 'Combat'];
  }

  // Génération d'un nombre Alea (hero-create)
  getRandomInt() {
    var myNumberInt = Math.floor(Math.random() * 809);
    var myNumber = myNumberInt.toString();
    if (myNumber.length == 2) {
      return "0" + myNumber.toString();
    }
    if (myNumber.length == 1) {
      return "00" + myNumber.toString();
    }
    else {
      return myNumber;
    }
  }

  // Auto Detect ID hero-form
  getValidHeroId(): number {
    const myHeroes = HEROES;
    var validHeroId = 1;
    for (var i = 1; i <= myHeroes.length; i++) {
      while (i != myHeroes[i - 1].id) {
        validHeroId = i;
        console.log("bon Id trouvé " + validHeroId);
        return validHeroId;
      }
    }

  }

}
