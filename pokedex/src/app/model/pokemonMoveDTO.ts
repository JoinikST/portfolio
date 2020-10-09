import { MinimalDTO } from './minimalDTO';

export interface PokemonMove {
    move: MinimalDTO;
    version_group_details: Array<PokemonVersionGroupDetails>;
}

export interface PokemonVersionGroupDetails {
    level_learned_at: number;
    move_learn_method: MinimalDTO;
    version_group: MinimalDTO;
}