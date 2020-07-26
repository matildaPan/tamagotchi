import blessed from 'blessed';

const screen = blessed.screen();

screen.key(['escape', 'q'], (ch, key) => {
  return process.exit(0);
});

export { screen };
