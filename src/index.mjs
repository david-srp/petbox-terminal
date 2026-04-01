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

// Pet area height: hat (0 or 1) + 5 template lines + 1 padding
const PET_HEIGHT = (bones.hatIndex >= 0 ? 1 : 0) + 5 + 1;

// --- State ---
let speechText = null;
let speechTimer = null;
let currentFrame = 0;
let heartMode = false;
let heartFrame = 0;
let needsRedraw = true;

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
function draw() {
  if (!needsRedraw) return;
  needsRedraw = false;

  const frame = heartMode ? -1 : currentFrame;
  const lines = renderPet(bones, frame, speechText);

  // If hearts mode, replace first line with heart pattern
  if (heartMode) {
    lines[0] = renderHeartFrame(heartFrame);
  }

  // Move cursor up to overwrite pet area, then redraw
  const totalLines = Math.max(lines.length, PET_HEIGHT);
  const moveUp = `\x1b[${totalLines + 1}A`;
  const clearLine = '\x1b[2K';

  let output = moveUp;
  for (let i = 0; i < totalLines; i++) {
    output += clearLine + (lines[i] || '') + '\n';
  }
  output += clearLine;

  process.stdout.write(output);
  rl.prompt(true);
}

// --- Cleanup ---
function cleanup() {
  anim.stop();
  clearInterval(drawTimer);
  if (speechTimer) clearTimeout(speechTimer);
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
for (let i = 0; i < PET_HEIGHT; i++) {
  console.log('');
}

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
