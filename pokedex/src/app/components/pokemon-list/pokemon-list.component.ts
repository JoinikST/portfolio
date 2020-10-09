import { Component, Input, OnInit } from '@angular/core';
import { PokemonDTO } from 'src/app/model/pokemonDTO';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: Array<PokemonDTO>;
  @Input() filterValue: string;

  constructor() { }

  ngOnInit(): void {
  }
}
