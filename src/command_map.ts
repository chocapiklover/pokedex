import { State } from "./state.js";

export async function getMapCommand(state: State): Promise<void> {
    console.log("mapping")
    
    const locations_data = await state.pokeAPI.fetchLocations(state.nextLocationsURL ?? undefined);
    state.nextLocationsURL = locations_data.next;
    state.prevLocationsURL = locations_data.previous;

    for (const location of locations_data.results) {
        console.log(location.name); 
    }  
}


export async function getMapCommandPrevious(state: State): Promise<void> {
    if (state.prevLocationsURL != null || state.prevLocationsURL != undefined) {
        let locations_data = await state.pokeAPI.fetchLocations(state.prevLocationsURL ?? undefined)
        state.nextLocationsURL = locations_data.next;
        state.prevLocationsURL = locations_data.previous;
        for (const location of locations_data.results) {
            console.log(location.name)
        }
    }
    
}