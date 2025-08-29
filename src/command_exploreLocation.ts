import { State } from "./state.js";

export async function exploreLocation(state: State): Promise<void> {
    try {
        if (state.args != null) {
            const locationName = state.args.join("-")
            console.log(`Exploring ${locationName}...`)

            const locationData = await state.pokeAPI.fetchLocation(locationName)

            const pokemonList = locationData.pokemon_encounters
            if (pokemonList) {
                console.log("Found Pokemon:")
            }

            for (const pokemon of pokemonList) {
                console.log(pokemon.pokemon.name)
            }
        }
    }
    catch (e) {
        throw new Error(`Error fetching location "${state.args}": ${(e as Error).message}`);  
    }
}