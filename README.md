# petbox-terminal

Terminal pet system inspired by Claude Code Buddy article.

## Quick Start

```bash
node src/index.mjs
# or
npm start
```

Requires Node.js >= 18. No dependencies to install.

## Commands

| Command | Description |
|---------|-------------|
| `/buddy` | Show pet status |
| `/buddy pet` | Pet your buddy (hearts animation) |
| `/buddy speak` | Random quip |
| `/buddy stats` | RPG stat bars |
| `/buddy rename <name>` | Rename your pet |
| `/buddy help` | List commands |
| `/quit` | Exit |

## How It Works

- **Bones**: Your pet's species, rarity, stats, and appearance are deterministically derived from `hash(username + salt)`. Never stored — recomputed each run.
- **Soul**: Your pet's name and personality are persisted in `~/.petbox/soul.json`.
- **Animation**: 15-frame idle loop at 500ms/frame with blink and twitch.
- **Speech**: Auto-hiding bubbles (10s timeout) with box-drawing borders.
