import type { State } from './state.js';

export async function commandCatch(state: State): Promise<void> {
	try {
        if (state.args && state.args.length > 0) {
            const pokemonToCatch = state.args[0]
            console.log(`Throwing a Pokeball at ${pokemonToCatch}...`)
            
            const pokemonData = await state.pokeAPI.catchPokemon(pokemonToCatch)
            
            const chance = Math.random()
            if (chance > 0.7) {
                console.log(`${pokemonData.name} was caught!`)
                state.caughtPokemon[pokemonData.name] = pokemonData
            }
            else {
                console.log(`${pokemonData.name} escaped!`)
            }
        }
    }
    catch (e) {
        throw new Error(`Error fetching pokemon "${state.args}": ${(e as Error).message}`)
    }
}
    
