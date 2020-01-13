import { Injectable } from '@angular/core';
import { Hero } from './heroes/heroes';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  constructor(private http: HttpClient) { }

  private heroesUrl = 'api/heroes';
  hero: Hero;

  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T)
    }
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }

  // Retourne tout les Héros
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError(`getHeroes`, []))
    );
  }

  // Retourne un Héros
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // Retourne tout les types possibles
  getHeroTypes(): string[] {
    return ['Dragon', 'Plante', 'Feu', 'Eau', 'Glace', 'Insecte', 'Normal', 'Electrique',
      'Poison', 'Fée', 'Vol', 'Ténèbres', 'Spectre', 'Combat'];
  }

  // Mise à jour --------------
  updateHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updatedHero`))
    );
  }

  // Ajout Héros ----------
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

  // Suppression Héros
  deleteHeroes(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<any>(`deleteHero`))
    )
  }
  // Génération d'un nombre Alea

  getRandomInt() {
    var myNumberInt = Math.floor(Math.random() * 850);
    var myNumber = myNumberInt.toString();
    if (myNumber.length == 2) {
      return "0" + myNumber.toString();
    }
    if (myNumber.length == 1) {
      return "00"+ myNumber.toString();
    } 
    else {
      return myNumber;
  }
}
}
