import { State } from "./state";

export function commandInspect(state: State): Promise<void>{
    if (state.args && state.args.length > 0) {
        try {
            const pokemonToInspect = state.args[0]
            if (!pokemonToInspect) {
                console.log("usage: inspect <pokemon>")
                return Promise.reject()
            }

            const caughtPoke = state.caughtPokemon[pokemonToInspect]
            if (!caughtPoke) {
                console.log("you have not caught that pokemon")
                return Promise.reject()
            }
            
            console.log(`Name: ${caughtPoke.name}`)
            console.log(`Height: ${caughtPoke.height}`)
            console.log(`Weight: ${caughtPoke.weight}`)
            console.log(`Stats:`)
            console.log(`Name: ${caughtPoke.name}`)
            console.log(`Stats`)
            for (const stat of caughtPoke.stats) {
                console.log(`  -${stat.stat.name}: ${stat.base_stat}`)
            }
            console.log("Types:")
            for (const type of caughtPoke.types) {
                console.log(`  - ${type.type.name}`)
            }
        } catch (error) {
        }
    }
    return Promise.resolve();
}