# Petbox Terminal — Architecture (v1)

## Stack
- **Runtime**: Node.js (>=18)
- **Dependencies**: None (stdlib only)
- **Entry point**: `src/index.mjs`

## Directory Structure
```
petbox-terminal/
├── docs/
│   ├── requirements.md
│   └── architecture.md
├── src/
│   ├── index.mjs          # Entry point, REPL loop, command router
│   ├── bones.mjs          # Deterministic identity from hash
│   ├── soul.mjs           # Persistent name/personality (load/save)
│   ├── species.mjs        # 18 species ASCII templates
│   ├── render.mjs         # Pet renderer (sprite + hat + eyes + speech)
│   ├── animation.mjs      # Idle loop, hearts animation
│   ├── stats.mjs          # RPG stat derivation and display
│   └── commands.mjs       # /buddy command handlers
├── README.md
└── package.json
```

## Module Responsibilities

### bones.mjs
- `generateBones(userId, salt)` → returns a deterministic seed object
- Uses Node.js `crypto.createHash('sha256')` on `userId + salt`
- From hash bytes, derives: speciesIndex, rarityRoll, shinyRoll,
  eyeStyleIndex, hatIndex, stat seeds (5 values)
- Pure function, no state

### soul.mjs
- `loadSoul()` → reads `~/.petbox/soul.json` or returns null
- `saveSoul(soul)` → writes to `~/.petbox/soul.json`
- Soul shape: `{ name: string, personality: string, createdAt: string }`
- On first run, generates random name + personality from preset lists

### species.mjs
- Exports `SPECIES` array of 18 entries
- Each entry: `{ name, template: string[], eyePositions: [row, col][] }`
- Templates are 5-line arrays, 12 chars wide
- Eye positions mark where to inject eye characters

### render.mjs
- `renderPet(bones, soul, frame, speechText)` → string[]
- Composes: hat line (if applicable) + species template with eyes + speech bubble
- Speech bubble: box-drawing border, max width ~20 chars, word-wrapped
- Returns array of lines ready for stdout

### animation.mjs
- `AnimationLoop` class
- Manages 15-frame idle cycle at 500ms intervals
- Frames 0-11: normal, 12-13: twitch (slight offset), 14: blink (eyes closed)
- `triggerHearts()` → switches to 5-frame hearts overlay, then back to idle
- Uses `setInterval` for timing

### stats.mjs
- `deriveStats(bones)` → `{ DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK }`
- Each stat: `1 + (seedByte % 20)` → range 1-20
- `formatStats(stats)` → ASCII bar chart string

### commands.mjs
- Parses `/buddy [subcommand] [args]`
- Routes to appropriate handler
- Returns response string to display

### index.mjs
- Creates readline interface for user input
- Initializes bones from userId (uses `os.userInfo().username`)
- Loads or creates soul
- Starts animation loop
- Routes `/buddy` commands
- Renders pet state to terminal on each frame

## Rendering Strategy
- Clear screen region and redraw pet + UI each animation frame
- Use ANSI escape codes for cursor positioning
- Pet renders in a fixed region above the input prompt
- Speech bubble renders adjacent to or above the pet

## Data Flow
```
userId → bones.mjs → deterministic identity (species, rarity, eyes, hat, stats)
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
- No database, no network calls
