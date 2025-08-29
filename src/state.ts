import { createInterface, type Interface } from "readline";
import { stdin, stdout } from 'node:process';
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL?: string | null | undefined
  prevLocationsURL?: string | null | undefined
  args?: string[] | null
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};



export function initState(): State {
    const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex >"
    });

    const commands = getCommands();

    const state: State = {
      rl,
      commands,
      pokeAPI: new PokeAPI(50000),
    };

    return state;
}