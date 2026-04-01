// 18 species, each with 5-line template (~12 chars wide)
// 'E' marks eye positions that get replaced with the chosen eye style
// Templates use simple ASCII art

export const SPECIES = [
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
    name: 'Dog',
    template: [
      '   /^ ^\\   ',
      '  ( E E )   ',
      '  (  w  )   ',
      '   |   |    ',
      '   \\___/    ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Fox',
    template: [
      '   /V V\\    ',
      '  ( E E )   ',
      '  ( >.< )   ',
      '   \\ ~ /    ',
      '    \\_/     ',
    ],
    eyePositions: [[1, 4], [1, 6]],
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
    name: 'Frog',
    template: [
      '   @..@     ',
      '  ( E E )   ',
      '  (  __  )  ',
      '  /|    |\\  ',
      ' /_|    |_\\ ',
    ],
    eyePositions: [[1, 4], [1, 6]],
  },
  {
    name: 'Bunny',
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
    name: 'Hamster',
    template: [
      '   (\\(/)    ',
      '  ( E E )   ',
      '  ( =w= )   ',
      '  (|   |)   ',
      '   \\___/    ',
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
    name: 'Bat',
    template: [
      '  /\\   /\\   ',
      ' { (E E) }  ',
      '  \\ =v= /   ',
      '   \\   /    ',
      '    \\_/     ',
    ],
    eyePositions: [[1, 5], [1, 7]],
  },
  {
    name: 'Snake',
    template: [
      '     __     ',
      '    (EE)    ',
      '   /    \\   ',
      '  ~      ~  ',
      '   ~~~~~~   ',
    ],
    eyePositions: [[1, 5], [1, 6]],
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
    name: 'Hedgehog',
    template: [
      '  ///\\\\\\    ',
      '  (E  E)    ',
      '  ( .. )    ',
      '  (~~~~)    ',
      '   ~~~~     ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Raccoon',
    template: [
      '   /\\\\/\\    ',
      '  {E  E}    ',
      '  ( <> )    ',
      '   |  |     ',
      '   \\__/     ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
  {
    name: 'Red Panda',
    template: [
      '  =(  )=    ',
      '  (E  E)    ',
      '  ( oo )    ',
      '  /|  |\\    ',
      ' ~ \\__/ ~   ',
    ],
    eyePositions: [[1, 3], [1, 6]],
  },
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
