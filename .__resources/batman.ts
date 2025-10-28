const batman: string[] = [
"                   *********************** ",
"               ********************************* ",
"           *******   *     *       *    *    ******* ",
"        *******   ***      **     **     ***   ******* ",
"      ******   *****       *********      *****    ***** ",
"    ******  ********       *********       ******    ***** ",
"   ****   **********       *********       *********   ***** ",
"  ****  **************    ***********     ************   **** ",
" ****  *************************************************  **** ",
"****  ***************************************************  **** ",
"****  ****************************************************  ****",
"****  ****************************************************  **** ",
" ****  ***************************************************  **** ",
"  ****  *******     ****  ***********  ****     *********  ****",
"   ****   *****      *      *******      *      ********  **** ",
"    *****   ****             *****             ******   ***** ",
"      *****   **              ***              **    ****** ",
"       ******   *              *              *   ******* ",
"         *******                                ******* ",
"            ********                         ******* ",
"               ********************************* ",
"                   *********************** ",
];

// Get terminal size
const terminalWidth: number = process.stdout.columns || 80;
const terminalHeight: number = process.stdout.rows || 24;

// Clear screen and hide cursor
function clearScreen(): void {
  process.stdout.write('\x1b[2J\x1b[H');
  process.stdout.write('\x1b[?25l'); // Hide cursor
}

// Show cursor
function showCursor(): void {
  process.stdout.write('\x1b[?25h');
}

// Position cursor
function moveCursor(x: number, y: number): void {
  if (x > 0 && y > 0 && y < terminalHeight) {
    process.stdout.write(`\x1b[${Math.floor(y)};${Math.floor(x)}H`);
  }
}

// Draw Batman at position
function drawBatman(x: number, y: number): void {
  batman.forEach((line: string, index: number) => {
    const drawY: number = Math.floor(y) + index;
    if (drawY > 0 && drawY < terminalHeight - 1) {
      moveCursor(Math.floor(x), drawY);
      process.stdout.write(line);
    }
  });
}

// Main animation loop
export async function callBatman(): Promise<void> {
  clearScreen();

  let frame: number = 0;

  const batmanWidth: number = 45; // Approximate width of the Batman ASCII art
  const centerX: number = Math.floor((terminalWidth - batmanWidth) / 2); // Center position
  const centerY: number = Math.floor(terminalHeight / 2) - 10; // Center Y position

  const interval = setInterval(() => {
    clearScreen();

    // Calculate Batman position with floating motion
    // Up and down movement with sine wave
    const y: number = centerY + Math.sin(frame * 0.08) * 3;

    // Minimal diagonal shift left/right with slower cosine wave
    const x: number = centerX + Math.cos(frame * 0.05) * 2;

    // Draw Batman
    drawBatman(x, y);

    frame++;
  }, 100);

  // Handle cleanup on exit
  process.on('SIGINT', () => {
    clearInterval(interval);
    clearScreen();
    showCursor();
    moveCursor(1, 1);
    process.exit(0);
  });
}
