import { Pipe, PipeTransform } from '@angular/core';
import { PokemonDTO } from '../model/pokemonDTO';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: PokemonDTO[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
   }
}
