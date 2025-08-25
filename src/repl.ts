import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

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
            console.log(`Your command was: ${cleanedInput[0]}`)
            rl.prompt()
        }
        rl.prompt()
    })




}