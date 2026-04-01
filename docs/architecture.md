# Petbox Terminal — Architecture (v2)

## Stack
- **Runtime**: Node.js (>=18)
- **Dependencies**: None (stdlib only)
- **Entry point**: `src/index.mjs` (or `bin/petbox.mjs` for CLI)

## Directory Structure
```
petbox-terminal/
├── bin/
│   └── petbox.mjs          # CLI entry (#!/usr/bin/env node)
├── docs/
│   ├── requirements.md
│   └── architecture.md
├── src/
│   ├── index.mjs            # REPL loop, rendering, signal handling
│   ├── bones.mjs            # Deterministic identity from hash
│   ├── soul.mjs             # Persistent name/personality (load/save)
│   ├── species.mjs          # 18 species ASCII templates + eyes + hats
│   ├── render.mjs           # Pet renderer (sprite + hat + eyes + speech)
│   ├── animation.mjs        # Idle loop, hearts animation
│   ├── stats.mjs            # RPG stat derivation with rarity scaling
│   └── commands.mjs         # /buddy command handlers
├── .gitignore
├── README.md
└── package.json
```

## Module Responsibilities

### bones.mjs
- `generateBones(userId)` → deterministic seed object
- SHA-256 of `userId + salt` → species, rarity, shiny, eyes, hat, stat seeds
- Pure function, no state

### soul.mjs
- Load/save `~/.petbox/soul.json`
- Soul shape: `{ name, personality, createdAt }`
- Deterministic initial generation from hash, then persistent

### species.mjs
- 18 species from the Buddy article
- Each: `{ name, template: string[5], eyePositions: [row, col][] }`
- 6 eye styles, 10 hats

### render.mjs
- `renderPet(bones, frame, speechText)` → string[]
- Composes hat + template with eyes + speech bubble
- Speech bubble: box-drawing border, word-wrapped at 28 chars

### animation.mjs
- 15-frame idle cycle at 500ms (twitch on 12-13, blink on 14)
- Hearts overlay mode (5 frames) via `triggerHearts()`

### stats.mjs
- Rarity-scaled stat ranges (Common 1-12 through Legendary 14-20)
- `deriveStats(bones)` → 5 stats, `formatStats(stats)` → bar chart

### commands.mjs
- Routes `/buddy [subcommand]` to handlers
- Returns response strings for speech bubble display

### index.mjs
- Readline REPL with animation redraw at 100ms
- ANSI escape cursor movement for in-place pet rendering
- Graceful cleanup on SIGINT, /quit, and stream close

## Data Flow
```
userId → bones.mjs → deterministic identity
                   ↓
              soul.mjs → persistent name/personality
                   ↓
         render.mjs + animation.mjs → terminal output
                   ↓
         commands.mjs ← user input via /buddy
```

## Persistence
- `~/.petbox/soul.json` — only persistent file
- Bones are always recomputed, never stored
