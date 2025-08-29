import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { getMapCommand, getMapCommandPrevious } from "./command_map.js";
import { exploreLocation } from "./command_exploreLocation.js";

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
    }
    
  };
}
