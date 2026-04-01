const STAT_NAMES = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SNARK'];

// Rarity determines the minimum stat floor and ceiling
const RARITY_RANGES = {
  Common:    { min: 1,  max: 12 },
  Uncommon:  { min: 4,  max: 15 },
  Rare:      { min: 7,  max: 18 },
  Epic:      { min: 10, max: 20 },
  Legendary: { min: 14, max: 20 },
};

export function deriveStats(bones) {
  const range = RARITY_RANGES[bones.rarity] || RARITY_RANGES.Common;
  const span = range.max - range.min + 1;
  const stats = {};
  for (let i = 0; i < STAT_NAMES.length; i++) {
    stats[STAT_NAMES[i]] = range.min + (bones.statSeeds[i] % span);
  }
  return stats;
}

export function formatStats(stats, rarity) {
  const lines = [];
  for (const [name, value] of Object.entries(stats)) {
    const bar = '█'.repeat(value) + '░'.repeat(20 - value);
    lines.push(`  ${name.padEnd(10)} ${bar} ${value}/20`);
  }
  return lines.join('\n');
}
