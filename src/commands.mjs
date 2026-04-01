import { SPECIES, HATS } from './species.mjs';
import { deriveStats, formatStats } from './stats.mjs';
import { renameSoul, getRandomQuip } from './soul.mjs';

export function handleCommand(input, bones, soul, animation) {
  const parts = input.trim().split(/\s+/);
  const sub = parts[1] || '';

  switch (sub) {
    case '':
      return formatStatus(bones, soul);
    case 'pet':
      animation.triggerHearts();
      return `${soul.name} loves the pets! ♥`;
    case 'speak':
      return `${soul.name}: "${getRandomQuip()}"`;
    case 'stats':
      return formatStatsDisplay(bones, soul);
    case 'rename': {
      const newName = parts.slice(2).join(' ');
      if (!newName) return 'Usage: /buddy rename <name>';
      renameSoul(soul, newName);
      return `Pet renamed to ${newName}!`;
    }
    case 'help':
      return [
        'Commands:',
        '  /buddy          — Show pet status',
        '  /buddy pet      — Pet your buddy (hearts!)',
        '  /buddy speak    — Random quip',
        '  /buddy stats    — RPG stats',
        '  /buddy rename   — Rename your pet',
        '  /buddy help     — This help',
        '  /quit           — Exit',
      ].join('\n');
    default:
      return `Unknown command: /buddy ${sub}. Try /buddy help`;
  }
}

function formatStatus(bones, soul) {
  const species = SPECIES[bones.speciesIndex];
  const hat = bones.hatIndex >= 0 ? HATS[bones.hatIndex].name : 'None';
  const shiny = bones.isShiny ? ' ✦ SHINY ✦' : '';

  return [
    `┌─── ${soul.name} ───┐`,
    `│ Species: ${species.name}`,
    `│ Rarity:  ${bones.rarity}${shiny}`,
    `│ Hat:     ${hat}`,
    `│ Personality: ${soul.personality}`,
    `│ Born:    ${soul.createdAt.slice(0, 10)}`,
    `│ Bones:   ${bones.hashHex}`,
    `└${'─'.repeat(20)}┘`,
  ].join('\n');
}

function formatStatsDisplay(bones, soul) {
  const stats = deriveStats(bones);
  return `${soul.name}'s Stats:\n${formatStats(stats)}`;
}
