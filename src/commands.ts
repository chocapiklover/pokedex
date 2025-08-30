import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { getMapCommand, getMapCommandPrevious } from "./command_map.js";
import { exploreLocation } from "./command_exploreLocation.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays help information",
      callback: commandHelp
    },
    map: {
      name: "map",
      description: "lists 20 location areas in the Pokemon world",
      callback: getMapCommand
    },
    mapb: {
      name: "mapb",
      description: "lists the previous 20 location areas in the Pokemon world",
      callback: getMapCommandPrevious
    },
    explore: {
      name: "explore",
      description: "explore <Location-area> and list the Pokemons in that location",
      callback: exploreLocation
    },
    catch: {
      name: "catch",
      description: "Attempt to catch pokemon with Pokeball",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "Pokemon and prints the name, height, weight, stats and type(s) of the Pokemon",
      callback: commandInspect
    },
    pokedex: {
      name: "pokedex",
      description: "a list of all the names of the Pokemon the user has caught",
      callback: commandPokedex
    }
    
  };
}
