# Petbox Terminal — Requirements (v1)

## Overview
A terminal-based virtual pet system inspired by the Claude Code Buddy article.
The pet lives as an ASCII character near the terminal input, with idle animations,
speech bubbles, and RPG stat mechanics.

## Core Capabilities

### 1. ASCII Pet Display
- **Dimensions**: ~5 lines high, 12 characters wide
- **18 species**: Cat, Dog, Fox, Owl, Frog, Bunny, Hamster, Penguin, Bat, Snake,
  Axolotl, Capybara, Hedgehog, Raccoon, Red Panda, Duck, Octopus, Dragon
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
- Examples: crown `♛`, top hat `▄█▄`, party hat `/\`, bow `♥`, halo `°o°`,
  wizard `▲`, chef `▄▀▄`, pirate `☠`, flower `✿`, horn `ᐱ`
- Only Uncommon+ rarity pets receive a hat

### 4. Idle Animation
- **15-frame loop**: Mostly idle (frames 0-11 identical), with occasional
  twitch (frames 12-13) and blink (frame 14)
- **500ms per frame** → full loop = 7.5 seconds
- Animation runs continuously while the pet is displayed

### 5. Speech Bubble
- Bordered text bubble appearing above or beside the pet
- Auto-hides after **10 seconds**
- Triggered by pet actions (greeting, reactions, random quips)
- Border style: simple box-drawing characters

### 6. /buddy Command System
- `/buddy` — Show pet status (name, species, rarity, stats)
- `/buddy pet` — Trigger hearts animation for **2.5 seconds** (5 frames at 500ms)
- `/buddy speak` — Pet says a random quip
- `/buddy rename <name>` — Set pet name
- `/buddy reroll` — Generate a new pet (new bones)
- `/buddy stats` — Show RPG stats

### 7. RPG Stats
- **5 stats**: DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK
- Each stat range: 1–20
- Stats derived deterministically from pet bones (seed)
- Displayed as bar charts in status view

### 8. Bones & Soul System
- **Bones** (deterministic identity):
  - Derived from `hash(userId + fixedSalt)`
  - Determines: species, rarity, shiny, eye style, hat, RPG stats
  - NOT stored — recomputed every time
- **Soul** (persistent personality):
  - Name and personality traits
  - Persisted to `~/.petbox/soul.json`
  - In full system would be LLM-generated; v1 uses random generation

### 9. Separate Entity Behavior
- The pet is a distinct entity from the main terminal application
- Pet has its own voice/personality reflected in speech bubbles
- When user addresses pet directly (via /buddy), the pet responds in character

## Non-Goals for v1
- LLM integration for soul generation (use random instead)
- Network features or multiplayer
- Complex interaction beyond /buddy commands
- Sound or color (pure ASCII)
- April Fools timing gate mechanism

## Technical Constraints
- Terminal-only, no GUI
- Single-file or small module count for prototype simplicity
- Node.js runtime (widely available, good terminal control)
- No external dependencies beyond Node.js stdlib where possible
- Persistent state in `~/.petbox/` directory
