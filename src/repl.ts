import { State } from './state.js';

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}

export function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", async (line) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            state.args = [];
        }
        if (line.length >  0) {
            const command = words[0];
            state.args = words.slice(1);
            const commands = state.commands;
            try {
                if (command in commands) {
                    await commands[command].callback(state);
                } else {
                    console.log("Unknown command");
                }
            } catch (error) {
                console.error(error);
            }

        }
        state.rl.prompt();
    });

}