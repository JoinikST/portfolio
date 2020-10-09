import { MinimalDTO } from './minimalDTO';
import { PokemonAbility } from './pokemonAbilityDTO';
import { PokemonGameIndex } from './pokemonGameIndexDTO';
import { PokemonMove } from './pokemonMoveDTO';
import { PokemonSprites } from './pokemonSpritesDTO';
import { PokemonStat } from './pokemonStatDTO';
import { PokemonType } from './pokemonTypeDTO';

export interface PokemonDTO {
    abilities: Array<PokemonAbility>;
    base_experience: number;
    forms: Array<MinimalDTO>;
    game_indices: Array<PokemonGameIndex>;
    height: number;
    held_items: Array<any>;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<PokemonMove>;
    name: string;
    order: number;
    species: MinimalDTO;
    sprites: PokemonSprites;
    stats: Array<PokemonStat>;
    types: Array<PokemonType>;
    weight: number;
}
