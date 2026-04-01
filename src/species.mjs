// 18 species from the Buddy article, each with 5-line ASCII template (~12 chars wide)
// 'E' marks eye positions that get replaced with the chosen eye style

export const SPECIES = [
  {
    name: 'Duck',
    template: [
      '    __      ',
      ' >(E E)     ',
      '   (  )     ',
      '   /  \\     ',
      '  ~    ~    ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Goose',
    template: [
      '     __     ',
      '  >(E E)    ',
      '  /    )    ',
      ' |    /     ',
      '  ~~~/      ',
    ],
    eyePositions: [[1, 5], [1, 7]],
  },
  {
    name: 'Cat',
    template: [
      '   /\\_/\\    ',
      '  ( E E )   ',
      '  ( =^= )   ',
      '   |   |    ',
      '   ~~ ~~    ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Dragon',
    template: [
      '  /\\_/~\\    ',
      '  (E  E)>   ',
      '  /{  }\\    ',
      ' / |  | \\   ',
      '   ~  ~     ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Octopus',
    template: [
      '   .--.     ',
      '  (E  E)    ',
      '  (    )    ',
      '  /|/\\|\\    ',
      ' / |  | \\   ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Owl',
    template: [
      '   {o o}    ',
      '  ( E E )   ',
      '   ( ^ )    ',
      '   /| |\\    ',
      '  /_| |_\\   ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Penguin',
    template: [
      '    (^)     ',
      '   (E E)    ',
      '  /(   )\\   ',
      '  \\ | | /   ',
      '   _\\_/_    ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Turtle',
    template: [
      '    ___     ',
      '  (E  E)    ',
      ' /(_--_)\\   ',
      ' \\_/  \\_/   ',
      '            ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Snail',
    template: [
      '    @  @    ',
      '   (E E)    ',
      '  ___(  )   ',
      ' (___)/     ',
      '   ~~~~     ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Ghost',
    template: [
      '   .---.    ',
      '  ( E E )   ',
      '  (  o  )   ',
      '  |     |   ',
      '  ~~^~^~~   ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Axolotl',
    template: [
      '  \\(  )/    ',
      '  (E  E)    ',
      '  ( ~~ )    ',
      '   |  |     ',
      '   ~~~~     ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Capybara',
    template: [
      '   ____     ',
      '  (E  E)    ',
      '  ( -- )    ',
      '  /|  |\\    ',
      ' /_|__|_\\   ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Cactus',
    template: [
      '    ||      ',
      '  (E  E)    ',
      ' --|  |--   ',
      '   |  |     ',
      '  ~~^^~~    ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Robot',
    template: [
      '  [====]    ',
      '  [E  E]    ',
      '  [_--_]    ',
      '  /|  |\\    ',
      '  d|  |b    ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Rabbit',
    template: [
      '   () ()    ',
      '  ( E E )   ',
      '  (  Y  )   ',
      '   | _ |    ',
      '   \\_V_/    ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Mushroom',
    template: [
      '  .-.-.-.   ',
      ' ( E  E )   ',
      '  \\_--_/    ',
      '   |  |     ',
      '   ~~~~     ',
    ],
    eyePositions: [[1, 4], [1, 7]],
  },
  {
    name: 'Blob',
    template: [
      '  .----.    ',
      ' ( E  E )   ',
      ' (      )   ',
      '  (    )    ',
      '   ~~~~     ',
    ],
    eyePositions: [[1, 4], [1, 7]],
  },
  {
    name: 'Chonk',
    template: [
      '  /~~~~\\    ',
      ' ( E  E )   ',
      ' (  ww  )   ',
      ' (      )   ',
      '  \\____/    ',
    ],
    eyePositions: [[1, 4], [1, 7]],
  },
];

export const EYE_STYLES = ['·', 'o', '*', '-', '^', 'x'];

export const HATS = [
  { name: 'Crown',    art: '   ♛       ' },
  { name: 'Top Hat',  art: '   ▄█▄     ' },
  { name: 'Party',    art: '    /\\     ' },
  { name: 'Bow',      art: '    ♥      ' },
  { name: 'Halo',     art: '   °o°     ' },
  { name: 'Wizard',   art: '    ▲      ' },
  { name: 'Chef',     art: '   ▄▀▄     ' },
  { name: 'Pirate',   art: '    ☠      ' },
  { name: 'Flower',   art: '    ✿      ' },
  { name: 'Horn',     art: '    ᐱ      ' },
];
