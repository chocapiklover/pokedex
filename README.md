# Pokedex CLI

A command-line Pokedex written in **TypeScript** and run with **Node.js**.  
This project is built step-by-step to practice core skills in TypeScript, async programming, API integration, and project organization.

---

## Features

- Interactive **REPL** (Read–Eval–Print Loop) with a prompt (`Pokedex >`).
- Command registry system with handlers for:
  - `help` → list all available commands
  - `exit` → quit the CLI
  - `map` → show 20 location areas at a time from the [PokeAPI](https://pokeapi.co)
  - `mapb` → go back one “page” of locations
  - `catch <pokemon>` → fetch a Pokémon and add it to your collection
  - `inspect <pokemon>` → view stats/details for a caught Pokémon
  - `pokedex` → list all caught Pokémon
- Pagination support for exploring locations (forward & backward).
- In-memory **cache** with TTL + automatic reaper loop for fast repeated requests.
- Strong typing for commands, state, and API responses.

---

## Getting Started

### Prerequisites

- Node.js (>= 18.x recommended)
- npm

### Install

```bash
npm install
npm run dev
```

---

## Usage

```bash
Pokedex > map
canalave-city-area
eterna-city-area
...

Pokedex > mapb
you're on the first page

Pokedex > catch pikachu
Caught pikachu!

Pokedex > pokedex
Your Pokedex:
- pikachu

Pokedex > inspect pikachu
hp: 35
attack: 55
defense: 40
...

Pokedex > exit
```

---

## Project Structure

```plaintext
src/
├── command_help.ts      # help command
├── command_exit.ts      # exit command
├── command_map.ts       # map & mapb commands
├── command_catch.ts     # catch command
├── command_inspect.ts   # inspect command
├── command_pokedex.ts   # pokedex listing
├── commands.ts          # registry of all commands
├── state.ts             # global state (rl, commands, API, cache, etc.)
├── repl.ts              # REPL loop logic
├── pokeapi.ts           # PokeAPI client (fetchLocations, fetchLocation)
├── pokecache.ts         # Cache class with TTL + reaper
└── main.ts              # entrypoint
```

---

## What I Learned

- How to design a REPL with Node.js readline.
- How to structure a TypeScript CLI into commands, state, and services.
- Working with async/await for API requests.
- Designing a reusable in-memory cache with TTL and cleanup.
- Iterating over objects vs arrays in JavaScript.
- Handling API pagination cleanly.
- Using strong TypeScript types to model external APIs.
