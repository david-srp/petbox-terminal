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

function setSpeech(text) {
  speechText = text;
  needsRedraw = true;
  if (speechTimer) clearTimeout(speechTimer);
  speechTimer = setTimeout(() => {
    speechText = null;
    needsRedraw = true;
  }, 10_000); // auto-hide after 10s
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
const PET_HEIGHT = 8; // max lines for pet area (hat + 5 lines + speech overflow)

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
  const moveUp = `\x1b[${PET_HEIGHT + 1}A`;
  const clearLine = '\x1b[2K';

  let output = moveUp;
  for (let i = 0; i < PET_HEIGHT; i++) {
    output += clearLine + (lines[i] || '') + '\n';
  }
  output += clearLine; // clear the prompt line too

  process.stdout.write(output);
  rl.prompt(true);
}

// --- REPL ---
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

// Print initial greeting
console.log('\n🐾 Petbox Terminal v1\n');
console.log(`  Your buddy: ${soul.name} the ${species.name} [${bones.rarity}]`);
console.log(`  Personality: ${soul.personality}`);
if (bones.isShiny) console.log('  ✦ SHINY! ✦');
console.log('  Type /buddy help for commands, /quit to exit.\n');

// Reserve space for pet area
for (let i = 0; i < PET_HEIGHT; i++) {
  console.log('');
}

// Initial draw
needsRedraw = true;
draw();

// Start animation
anim.start();

// Redraw timer
const drawTimer = setInterval(draw, 100);

// Greeting speech
setSpeech(`Hi! I'm ${soul.name}!`);

rl.on('line', (input) => {
  const trimmed = input.trim();

  if (trimmed === '/quit' || trimmed === '/exit') {
    anim.stop();
    clearInterval(drawTimer);
    console.log(`\n${soul.name} waves goodbye! 👋\n`);
    process.exit(0);
  }

  if (trimmed.startsWith('/buddy')) {
    const response = handleCommand(trimmed, bones, soul, anim);
    setSpeech(response);
  } else if (trimmed) {
    // Non-command input: pet might react
    const reactions = [
      null, null, null, // 60% no reaction
      `${soul.name} tilts head curiously.`,
      `${soul.name}: "Interesting..."`,
    ];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    if (reaction) setSpeech(reaction);
  }

  needsRedraw = true;
});

rl.on('close', () => {
  anim.stop();
  clearInterval(drawTimer);
  console.log(`\n${soul.name} waves goodbye! 👋\n`);
  process.exit(0);
});
