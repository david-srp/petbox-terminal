import { createHash } from 'node:crypto';

const FIXED_SALT = 'petbox-terminal-v1-salt-2024';

const RARITY_THRESHOLDS = [
  { name: 'Common', weight: 60 },
  { name: 'Uncommon', weight: 25 },
  { name: 'Rare', weight: 10 },
  { name: 'Epic', weight: 4 },
  { name: 'Legendary', weight: 1 },
];

export function generateBones(userId) {
  const hash = createHash('sha256')
    .update(userId + FIXED_SALT)
    .digest();

  const speciesIndex = hash[0] % 18;
  const rarityRoll = hash[1] % 100;
  const shinyRoll = hash[2] % 100;
  const eyeStyleIndex = hash[3] % 6;
  const hatIndex = hash[4] % 10;

  let rarity = 'Common';
  let cumulative = 0;
  for (const tier of RARITY_THRESHOLDS) {
    cumulative += tier.weight;
    if (rarityRoll < cumulative) {
      rarity = tier.name;
      break;
    }
  }

  const isShiny = shinyRoll < 1; // 1% chance
  const hasHat = rarity !== 'Common';

  const statSeeds = [hash[5], hash[6], hash[7], hash[8], hash[9]];

  return {
    speciesIndex,
    rarity,
    isShiny,
    eyeStyleIndex,
    hatIndex: hasHat ? hatIndex : -1,
    statSeeds,
    hashHex: hash.toString('hex').slice(0, 12),
  };
}
