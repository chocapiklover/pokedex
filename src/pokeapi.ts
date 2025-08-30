import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache

  constructor(interval: number) {
    this.cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    const url = pageURL || `${PokeAPI.baseURL}/location-area`
      try {
        const cached = this.cache.get<ShallowLocations>(url)
        if (cached) {
          console.log("***using cache***")
          return cached
        }

        const resp = await fetch( url)
        if (!resp.ok) {
          throw new Error (`${resp.status}: ${resp.statusText}`)
        }
        const data: ShallowLocations = await resp.json();
        this.cache.add(url, data)
        return data;
    }
    catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    
    try{
      const cached = this.cache.get<Location>(locationName)
      if (cached) {
        console.log("*** Using Cache ***")
        return cached
      }

      const resp = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`)
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`)
      }
      
      const data: Location = await resp.json();
      this.cache.add(locationName, data)
      return data;
    }
    catch (e) {
      throw new Error(`Error fetching location "${locationName}": ${(e as Error).message}`);
    }
  }

  async catchPokemon(pokemonName: string): Promise<PokemonBasic> {
    try {
      const cached = this.cache.get<PokemonBasic>(pokemonName)
      if (cached) {
        return cached
      }

      const resp = await fetch(`${PokeAPI.baseURL}/pokemon/${pokemonName}`)
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`)
      }

      const data: PokemonBasic = await resp.json();
      this.cache.add(pokemonName, data)
      return data

    } catch (e) {
      throw new Error(`Error fetching pokemon ${pokemonName}: ${(e as Error).message}`)
    }
  }
}


export type ShallowLocations = {
  results: Array<{
    name: string;
    url: string;
  }>;
  next: string | null;
  previous: string | null;
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type PokemonBasic = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: Ability[]
  forms: Form[]
  game_indices: Index[]
  held_items: HeldItem[]
  location_area_encounters: string
  moves: Mfe[]
  species: Species
  sprites: Sprites
  cries: Cries
  stats: Stat[]
  types: Type[]
  past_types: PastType[]
  past_abilities: PastAbility[]
}

export type Ability = {
  is_hidden: boolean
  slot: number
  ability: Ability2
}

export type Ability2 = {
  name: string
  url: string
}

export type Form = {
  name: string
  url: string
}

export type Index = {
  game_index: number
  version: Version
}

export type Version = {
  name: string
  url: string
}

export type HeldItem = {
  item: Item
  version_details: VersionDetail[]
}

export type Item = {
  name: string
  url: string
}

export type VersionDetail = {
  rarity: number
  version: Version2
}

export type Version2 = {
  name: string
  url: string
}

export type Mfe = {
  move: Move
  version_group_details: VersionGroupDetail[]
}

export type Move = {
  name: string
  url: string
}

export type VersionGroupDetail = {
  level_learned_at: number
  version_group: VersionGroup
  move_learn_method: MoveLearnMethod
  order: number
}

export type VersionGroup = {
  name: string
  url: string
}

export type MoveLearnMethod = {
  name: string
  url: string
}

export type Species = {
  name: string
  url: string
}

export type Sprites = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
  other: Other
  versions: Versions
}

export type Other = {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
  showdown: Showdown
}

export type DreamWorld = {
  front_default: string
  front_female: any
}

export type Home = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type OfficialArtwork = {
  front_default: string
  front_shiny: string
}

export type Showdown = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type Versions = {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-v": GenerationV
  "generation-vi": GenerationVi
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export type GenerationI = {
  "red-blue": RedBlue
  yellow: Yellow
}

export type RedBlue = {
  back_default: string
  back_gray: string
  front_default: string
  front_gray: string
}

export type Yellow = {
  back_default: string
  back_gray: string
  front_default: string
  front_gray: string
}

export type GenerationIi = {
  crystal: Crystal
  gold: Gold
  silver: Silver
}

export type Crystal = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export type Gold = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export type Silver = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export type GenerationIii = {
  emerald: Emerald
  "firered-leafgreen": FireredLeafgreen
  "ruby-sapphire": RubySapphire
}

export type Emerald = {
  front_default: string
  front_shiny: string
}

export type FireredLeafgreen = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export type RubySapphire = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export type GenerationIv = {
  "diamond-pearl": DiamondPearl
  "heartgold-soulsilver": HeartgoldSoulsilver
  platinum: Platinum
}

export type DiamondPearl = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type HeartgoldSoulsilver = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type Platinum = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type GenerationV = {
  "black-white": BlackWhite
}

export type BlackWhite = {
  animated: Animated
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type Animated = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type GenerationVi = {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire
  "x-y": XY
}

export type OmegarubyAlphasapphire = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type XY = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type GenerationVii = {
  icons: Icons
  "ultra-sun-ultra-moon": UltraSunUltraMoon
}

export type Icons = {
  front_default: string
  front_female: any
}

export type UltraSunUltraMoon = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export type GenerationViii = {
  icons: Icons2
}

export type Icons2 = {
  front_default: string
  front_female: any
}

export type Cries = {
  latest: string
  legacy: string
}

export type Stat = {
  base_stat: number
  effort: number
  stat: Stat2
}

export type Stat2 = {
  name: string
  url: string
}

export type Type = {
  slot: number
  type: Type2
}

export type Type2 = {
  name: string
  url: string
}

export type PastType = {
  generation: Generation
  types: Type3[]
}

export type Generation = {
  name: string
  url: string
}

export type Type3 = {
  slot: number
  type: Type4
}

export type Type4 = {
  name: string
  url: string
}

export type PastAbility = {
  generation: Generation2
  abilities: Ability3[]
}

export type Generation2 = {
  name: string
  url: string
}

export type Ability3 = {
  ability: any
  is_hidden: boolean
  slot: number
}
