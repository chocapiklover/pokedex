import { State } from "./state";

export function commandPokedex(state: State): Promise<void> {
    const pokedex = state.caughtPokemon
    console.log("Your Pokedex:")
    for (const pokemon of Object.values(pokedex)) {
        console.log(`- ${pokemon.name}`)
    }
    return Promise.resolve()

}