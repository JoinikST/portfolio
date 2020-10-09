import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.scss']
})
export class PokemonDialogComponent implements OnInit {

  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  bufferValue = 100;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  getPokemonMainImage() {
    if (this.data.pokemon.sprites.other['official-artwork'] && this.data.pokemon.sprites.other['official-artwork'].front_default) {
      return this.data.pokemon.sprites.other['official-artwork'].front_default;
    } else {
      return this.data.pokemon.sprites.front_default;
    }
  }

  getPokemonAbilities() {
    return this.data.pokemon.abilities.map(ability => ability.ability.name);
  }

  getPokemonStats() {
    return this.data.pokemon.stats.map(stat => {
      const statLabel = stat.stat.name;
      const statValue = stat.base_stat;
      return {
        label: statLabel,
        value: statValue
      };
    });
  }

}
