import { Component, Input, OnInit } from '@angular/core';
import { PokemonType } from 'src/app/model/pokemonTypeDTO';
import {MatDialog} from '@angular/material/dialog';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { PokemonDTO } from 'src/app/model/pokemonDTO';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: PokemonDTO;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  getTypesToPrint(): Array<any> {
    const types = [];
    if (this.pokemon.types && this.pokemon.types instanceof Array) {
      this.pokemon.types.forEach(type => {
        types.push({
          label: type.type.name,
          link: type.type.url,
        });
      });
    }
    return types;
  }

  openPokemonDialog(): void {
    const dialogRef = this.dialog.open(PokemonDialogComponent, {
      data: {
        pokemon: this.pokemon
      }
    });
    dialogRef.afterClosed().subscribe(_ => {});
  }

  getPokemonMainImage() {
    if (this.pokemon.sprites.other['official-artwork'] && this.pokemon.sprites.other['official-artwork'].front_default) {
      return this.pokemon.sprites.other['official-artwork'].front_default;
    } else {
      return this.pokemon.sprites.front_default;
    }
  }
}
