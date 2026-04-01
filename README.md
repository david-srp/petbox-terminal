# petbox-terminal

A terminal ASCII pet system inspired by the [Claude Code Buddy](https://www.anthropic.com/engineering/claude-code-buddy) article. Your pet is deterministically generated from your username — same machine, same buddy.

## Install

**Clone & run locally:**

```bash
git clone https://github.com/<you>/petbox-terminal.git
cd petbox-terminal
npm start
```

**Global install via npm link (run `petbox` from anywhere):**

```bash
cd petbox-terminal
npm link
petbox
```

**Unlink when done:**

```bash
npm unlink -g petbox-terminal
```

Requires **Node.js >= 18**. Zero dependencies.

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

### Bones (deterministic identity)

Your pet's species, rarity, stats, eyes, hat, and shiny status are all derived from `SHA-256(username + salt)`. Nothing is stored — the same identity reappears every session.

- **18 species**: Duck, Goose, Cat, Dragon, Octopus, Owl, Penguin, Turtle, Snail, Ghost, Axolotl, Capybara, Cactus, Robot, Rabbit, Mushroom, Blob, Chonk
- **5 rarity tiers**: Common (60%), Uncommon (25%), Rare (10%), Epic (4%), Legendary (1%)
- **6 eye styles**, **10 hats** (Uncommon+ only), **1% shiny** chance
- **RPG stats** scale with rarity — higher rarity means higher stat floors

### Soul (persistent personality)

Name and personality are saved to `~/.petbox/soul.json` on first run. Rename with `/buddy rename`.

### Animation

15-frame idle loop at 500ms/frame: idle (0-11), twitch (12-13), blink (14). `/buddy pet` triggers a 5-frame hearts overlay.

### Stats by Rarity

| Rarity | Stat Range |
|--------|-----------|
| Common | 1–12 |
| Uncommon | 4–15 |
| Rare | 7–18 |
| Epic | 10–20 |
| Legendary | 14–20 |

## License

MIT
