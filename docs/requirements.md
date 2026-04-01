# Petbox Terminal — Requirements (v2)

## Overview
A terminal-based virtual pet system inspired by the Claude Code Buddy article.
The pet lives as an ASCII character near the terminal input, with idle animations,
speech bubbles, and RPG stat mechanics.

## Core Capabilities

### 1. ASCII Pet Display
- **Dimensions**: ~5 lines high, 12 characters wide
- **18 species** (from Buddy article): Duck, Goose, Cat, Dragon, Octopus, Owl,
  Penguin, Turtle, Snail, Ghost, Axolotl, Capybara, Cactus, Robot, Rabbit,
  Mushroom, Blob, Chonk
- **6 eye styles**: dot `·`, round `o`, star `*`, dash `-`, caret `^`, x-eye `x`
- **Rendering**: Each species has a base ASCII template with swappable eye slots

### 2. Rarity System
- **5 tiers** with weighted probabilities:
  - Common: 60%
  - Uncommon: 25%
  - Rare: 10%
  - Epic: 4%
  - Legendary: 1%
- **Hats**: Uncommon and above get a random hat drawn above head
- **Shiny**: Hidden 1% chance (independent of rarity), adds sparkle markers

### 3. Hat System
- Hats render as 1-line ASCII art placed above the pet sprite
- 10 hats: crown, top hat, party, bow, halo, wizard, chef, pirate, flower, horn
- Only Uncommon+ rarity pets receive a hat

### 4. Idle Animation
- **15-frame loop**: idle (frames 0-11), twitch (frames 12-13), blink (frame 14)
- **500ms per frame** → full loop = 7.5 seconds

### 5. Speech Bubble
- Box-drawing bordered text bubble beside the pet
- Auto-hides after **10 seconds**
- Word-wrapped at 28 chars

### 6. /buddy Command System
- `/buddy` — Show pet status (name, species, rarity, hat, personality)
- `/buddy pet` — Trigger hearts animation (5 frames)
- `/buddy speak` — Random quip
- `/buddy stats` — RPG stats with bar chart
- `/buddy rename <name>` — Set pet name
- `/buddy help` — Help text

### 7. RPG Stats
- **5 stats**: DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK
- Stats scale with rarity tier (higher rarity → higher floor):
  - Common: 1–12, Uncommon: 4–15, Rare: 7–18, Epic: 10–20, Legendary: 14–20
- Derived deterministically from bones hash bytes

### 8. Bones & Soul System
- **Bones** (deterministic identity):
  - Derived from `SHA-256(userId + fixedSalt)`
  - Determines: species, rarity, shiny, eye style, hat, RPG stats
  - NOT stored — recomputed every time
- **Soul** (persistent personality):
  - Name and personality traits
  - Persisted to `~/.petbox/soul.json`

## Technical Constraints
- Node.js >= 18, zero external dependencies
- Installable globally via `npm link` (bin: `petbox`)
- Persistent state in `~/.petbox/` directory only
