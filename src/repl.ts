import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './commands.js';

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export function startREPL() {
    const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex >"
    });
    
    rl.prompt()

    rl.on("line", (line) => {
        if (line.length >  0) {
            const cleanedInput = cleanInput(line);
            const command = cleanedInput[0];
            const commands = getCommands();
            try {
                if (command in commands) {
                    commands[command].callback(commands);
                } else {
                    console.log("Unknown command");
                }
            } catch (error) {
                console.log("Unknown command");
            }

            rl.prompt()
        }
        rl.prompt()
    })




}