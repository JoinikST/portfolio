import { MinimalDTO } from './minimalDTO';

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: MinimalDTO;
}