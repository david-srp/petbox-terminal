import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const PETBOX_DIR = join(homedir(), '.petbox');
const SOUL_PATH = join(PETBOX_DIR, 'soul.json');

const NAMES = [
  'Pixel', 'Nibble', 'Byte', 'Glitch', 'Spark', 'Echo', 'Mochi', 'Tofu',
  'Waffle', 'Noodle', 'Biscuit', 'Pickle', 'Sprout', 'Pepper', 'Clover',
  'Dusty', 'Maple', 'Pebble', 'Cosmo', 'Ziggy', 'Truffle', 'Basil',
  'Juniper', 'Olive', 'Widget', 'Gizmo', 'Patches', 'Tinker', 'Marble',
];

const PERSONALITIES = [
  'cheerful and easily excited',
  'grumpy but secretly caring',
  'mysterious and cryptic',
  'sarcastic with a heart of gold',
  'endlessly curious',
  'dramatic about everything',
  'sleepy and philosophical',
  'chaotic and unpredictable',
  'calm and wise beyond their years',
  'enthusiastic about debugging',
];

const QUIPS = [
  "Have you tried turning it off and on again?",
  "I sense a missing semicolon nearby...",
  "*yawns* Are we still coding?",
  "That's a bold commit message.",
  "I believe in you! Mostly.",
  "Bugs fear me. Allegedly.",
  "Is it coffee time yet?",
  "I dreamed in binary last night.",
  "Your code sparks joy.",
  "Error 418: I'm a teapot. Wait, I'm a pet.",
  "Did you just push to main?!",
  "Refactoring is self-care.",
  "I'm not judging your variable names. Much.",
  "Stack overflow? I barely know her.",
  "Ship it! ...after tests pass.",
];

export function loadSoul() {
  try {
    const data = readFileSync(SOUL_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveSoul(soul) {
  if (!existsSync(PETBOX_DIR)) {
    mkdirSync(PETBOX_DIR, { recursive: true });
  }
  writeFileSync(SOUL_PATH, JSON.stringify(soul, null, 2));
}

export function createSoul(hashHex) {
  // Use hash to seed name/personality selection deterministically for first creation
  const nameIdx = parseInt(hashHex.slice(0, 4), 16) % NAMES.length;
  const persIdx = parseInt(hashHex.slice(4, 8), 16) % PERSONALITIES.length;

  return {
    name: NAMES[nameIdx],
    personality: PERSONALITIES[persIdx],
    createdAt: new Date().toISOString(),
  };
}

export function renameSoul(soul, newName) {
  soul.name = newName;
  saveSoul(soul);
  return soul;
}

export function getRandomQuip() {
  return QUIPS[Math.floor(Math.random() * QUIPS.length)];
}
