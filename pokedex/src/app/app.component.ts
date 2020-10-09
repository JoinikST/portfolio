import { Component, OnInit } from '@angular/core';
import { MinimalDTO } from './model/minimalDTO';
import { PokemonDTO } from './model/pokemonDTO';
import { PokemonApiService } from './services/pokemon-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pokemons: Array<PokemonDTO>;
  searchText: string;

  constructor(private pokemonApi: PokemonApiService) {}

  ngOnInit() {
    this.pokemons = [];
    const retrievedPokemons = [];
    this.pokemonApi.setLoading(true);
    this.pokemonApi.getPokemons().subscribe(async (apiPokemons: any) => {
      const minimalPokemons: Array<MinimalDTO> = apiPokemons.results;
      for (const minimalPokemon of minimalPokemons) {
        const pokemon = await this.pokemonApi.callApiByUrl(minimalPokemon.url).toPromise();
        retrievedPokemons.push(pokemon);
      }
      this.pokemons = retrievedPokemons.filter((pkm: PokemonDTO) => pkm.order > -1);
      this.pokemonApi.setLoading(false);
    });
  }

  isLoading() {
    return this.pokemonApi.getLoading();
  }
}
