export interface PokemonSprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: OtherPokemonSprites;
    versions: any; // To be typed if used in the future
}

export interface OtherPokemonSprites {
    dream_world: OtherPokemonSpriteDetails;
    'official-artwork': OtherPokemonSpriteDetails;
}

export interface OtherPokemonSpriteDetails {
    front_default?: string;
    front_female?: string;
}