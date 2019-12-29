import { Injectable } from '@angular/core';
import { Hero } from './heroes/heroes';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  constructor(private http: HttpClient) { }

  private heroesUrl = 'api/heroes';

    private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error:any):Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T)
    }
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

  getHeroTypes(): string[] {
    return['Plante','Feu','Eau','Insecte','Normal','Electrique',
      'Poison','Fée','Vol','Ténèbres','Spectre','Combat'];
  }
  
  updateHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updatedHero`))
    );
  }



}
