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
 