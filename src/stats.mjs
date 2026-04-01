const STAT_NAMES = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SNARK'];

export function deriveStats(bones) {
  const stats = {};
  for (let i = 0; i < STAT_NAMES.length; i++) {
    stats[STAT_NAMES[i]] = 1 + (bones.statSeeds[i] % 20);
  }
  return stats;
}

export function formatStats(stats) {
  const lines = [];
  for (const [name, value] of Object.entries(stats)) {
    const bar = '█'.repeat(value) + '░'.repeat(20 - value);
    lines.push(`  ${name.padEnd(10)} ${bar} ${value}/20`);
  }
  return lines.join('\n');
}
