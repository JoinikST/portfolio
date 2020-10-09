import { MinimalDTO } from './minimalDTO';

export interface PokemonAbility {
    ability: MinimalDTO;
    is_hidden: boolean;
    slot: number;
}