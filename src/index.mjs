import { createInterface } from 'node:readline';
import { userInfo } from 'node:os';
import { generateBones } from './bones.mjs';
import { loadSoul, saveSoul, createSoul, getRandomQuip } from './soul.mjs';
import { renderPet, renderHeartFrame } from './render.mjs';
import { AnimationLoop } from './animation.mjs';
import { handleCommand } from './commands.mjs';
import { SPECIES } from './species.mjs';

// --- Init ---
const userId = userInfo().username;
const bones = generateBones(userId);
let soul = loadSoul();
if (!soul) {
  soul = createSoul(bones.hashHex);
  saveSoul(soul);
}

const species = SPECIES[bones.speciesIndex];

// --- State ---
let speechText = null;
let speechTimer = null;
let currentFrame = 0;
let heartMode = false;
let heartFrame = 0;
let needsRedraw = true;
let lastDrawnHeight = 0; // tracks how many lines the pet area currently occupies

function setSpeech(text) {
  speechText = text;
  needsRedraw = true;
  if (speechTimer) clearTimeout(speechTimer);
  speechTimer = setTimeout(() => {
    speechText = null;
    needsRedraw = true;
  }, 10_000);
}

// --- Animation ---
const anim = new AnimationLoop(({ mode, frame }) => {
  if (mode === 'hearts') {
    heartMode = true;
    heartFrame = frame;
  } else {
    heartMode = false;
    currentFrame = frame;
  }
  needsRedraw = true;
});

// --- Rendering ---
const HIDE_CURSOR = '\x1b[?25l';
const SHOW_CURSOR = '\x1b[?25h';
const CLEAR_LINE = '\x1b[2K';

function draw() {
  if (!needsRedraw) return;
  needsRedraw = false;

  const frame = heartMode ? -1 : currentFrame;
  const lines = renderPet(bones, frame, speechText);

  // If hearts mode, replace first line with heart pattern
  if (heartMode) {
    lines[0] = renderHeartFrame(heartFrame);
  }

  const contentHeight = lines.length;

  let output = HIDE_CURSOR;

  // Move cursor up to the top of the pet area (+ 1 for prompt line)
  if (lastDrawnHeight > 0) {
    output += `\x1b[${lastDrawnHeight + 1}A`;
  }

  // Redraw content lines
  for (let i = 0; i < contentHeight; i++) {
    output += '\r' + CLEAR_LINE + (lines[i] || '') + '\n';
  }
  // Erase any stale lines below from previous taller content, then show cursor
  output += '\x1b[J' + SHOW_CURSOR;

  lastDrawnHeight = contentHeight;
  process.stdout.write(output);
  rl.prompt(true);
}

// --- Cleanup ---
function cleanup() {
  anim.stop();
  clearInterval(drawTimer);
  if (speechTimer) clearTimeout(speechTimer);
  process.stdout.write(SHOW_CURSOR);
  console.log(`\n${soul.name} waves goodbye!\n`);
}

// --- REPL ---
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

// Header
const shinyTag = bones.isShiny ? '  ✦ SHINY! ✦' : '';
console.log('');
console.log('  ╔══════════════════════════════╗');
console.log('  ║     Petbox Terminal v2        ║');
console.log('  ╚══════════════════════════════╝');
console.log('');
console.log(`  Your buddy: ${soul.name} the ${species.name} [${bones.rarity}]${shinyTag}`);
console.log(`  Personality: ${soul.personality}`);
console.log('  Type /buddy help for commands, /quit to exit.');
console.log('');

// Reserve space for pet area
const initialHeight = (bones.hatIndex >= 0 ? 1 : 0) + 5 + 1;
for (let i = 0; i < initialHeight; i++) {
  console.log('');
}
lastDrawnHeight = initialHeight;

// Initial draw + start
needsRedraw = true;
draw();
anim.start();
const drawTimer = setInterval(draw, 100);

// Greeting
setSpeech(`Hi! I'm ${soul.name}!`);

rl.on('line', (input) => {
  const trimmed = input.trim();

  if (trimmed === '/quit' || trimmed === '/exit') {
    cleanup();
    process.exit(0);
  }

  if (trimmed.startsWith('/buddy')) {
    const response = handleCommand(trimmed, bones, soul, anim);
    setSpeech(response);
  } else if (trimmed) {
    const reactions = [
      null, null, null,
      `${soul.name} tilts head curiously.`,
      `${soul.name}: "Interesting..."`,
    ];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    if (reaction) setSpeech(reaction);
  }

  needsRedraw = true;
});

rl.on('close', () => {
  cleanup();
  process.exit(0);
});

// Graceful signal handling
process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});
