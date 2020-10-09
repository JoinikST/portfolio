import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'https://pokeapi.co/api/v2/';
const searchLimit = 50; // For the moment with 500 is enough...

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private loading: boolean;

  constructor(private http: HttpClient) { }

  getLoading(): boolean {
    return this.loading;
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getPokemons(): Observable<any> {
    const url = baseURL + 'pokemon/?limit=' + searchLimit;
    return this.http.get(url);
  }

  getPokemonDetails(pokemonId: number): Observable<any> {
    const url = baseURL + 'pokemon/' + pokemonId;
    return this.http.get(url);
  }

  callApiByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
}
