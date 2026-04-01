import { SPECIES, EYE_STYLES, HATS } from './species.mjs';

const PET_WIDTH = 12;

export function renderPet(bones, frame, speechText) {
  const species = SPECIES[bones.speciesIndex];
  const eyeStyle = EYE_STYLES[bones.eyeStyleIndex];
  const lines = [];

  // Hat line (if applicable)
  if (bones.hatIndex >= 0) {
    lines.push(HATS[bones.hatIndex].art);
  }

  // Build sprite with eyes
  const isBlink = frame === 14;
  const isTwitch = frame === 12 || frame === 13;
  const currentEye = isBlink ? '-' : eyeStyle;

  for (let row = 0; row < species.template.length; row++) {
    let line = species.template[row];

    // Replace eye markers
    for (const [eRow, eCol] of species.eyePositions) {
      if (row === eRow && line[eCol] === 'E') {
        line = line.slice(0, eCol) + currentEye + line.slice(eCol + 1);
      }
    }

    // Twitch: slight offset on frames 12-13
    if (isTwitch && row >= 1 && row <= 3) {
      line = ' ' + line.slice(0, -1);
    }

    // Shiny sparkle markers
    if (bones.isShiny && (row === 0 || row === 4)) {
      line = '✦' + line.slice(1, -1) + '✦';
    }

    lines.push(line);
  }

  // Speech bubble (to the right of the pet)
  const result = [];
  const speechLines = speechText ? formatSpeechBubble(speechText) : [];

  const maxRows = Math.max(lines.length, speechLines.length);
  for (let i = 0; i < maxRows; i++) {
    const petPart = i < lines.length ? lines[i] : ' '.repeat(PET_WIDTH);
    const speechPart = i < speechLines.length ? '  ' + speechLines[i] : '';
    result.push(petPart + speechPart);
  }

  return result;
}

function formatSpeechBubble(text) {
  const maxWidth = 28;
  const words = text.split(' ');
  const wrapped = [];
  let current = '';

  for (const word of words) {
    if (current.length + word.length + 1 > maxWidth) {
      wrapped.push(current);
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) wrapped.push(current);

  const innerWidth = Math.max(...wrapped.map(l => l.length));
  const top = '┌' + '─'.repeat(innerWidth + 2) + '┐';
  const bot = '└' + '─'.repeat(innerWidth + 2) + '┘';
  const lines = [top];
  for (const line of wrapped) {
    lines.push('│ ' + line.padEnd(innerWidth) + ' │');
  }
  lines.push(bot);
  return lines;
}

export function renderHeartFrame(frameIdx) {
  const patterns = [
    '    ♥       ',
    '  ♥   ♥     ',
    '   ♥ ♥ ♥    ',
    '  ♥ ♥ ♥ ♥   ',
    ' ♥  ♥  ♥  ♥ ',
  ];
  return patterns[frameIdx % patterns.length];
}
