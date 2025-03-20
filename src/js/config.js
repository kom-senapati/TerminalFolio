export const themes = {
  default: {
    "--background-color": "#1F2430",
    "--foreground-color": "#FFA759",
    "--red-color": "#FF3333",
    "--green-color": "#BAE67E",
    "--yellow-color": "#FFA759",
    "--blue-color": "#73D0FF",
    "--purple-color": "#D4BFFF",
    "--cyan-color": "#95E6CB",
    "--white-color": "#CBCCC6",
    "--bright-black-color": "#707A8C",
    "--font-family": "JetBrains Mono, monospace"
  },
  dracula: {
    "--background-color": "#282a36",
    "--foreground-color": "#f8f8f2",
    "--red-color": "#ff5555",
    "--green-color": "#50fa7b",
    "--yellow-color": "#f1fa8c",
    "--blue-color": "#6272a4",
    "--purple-color": "#bd93f9",
    "--cyan-color": "#8be9fd",
    "--white-color": "#f8f8f2",
    "--bright-black-color": "#44475a",
    "--font-family": "JetBrains Mono, monospace"
  },
  ayu: {
    "--background-color": "#0f1419",
    "--foreground-color": "#e6e1cf",
    "--red-color": "#ff3333",
    "--green-color": "#b8cc52",
    "--yellow-color": "#e7c547",
    "--blue-color": "#6CA0E6",
    "--purple-color": "#C578DD",
    "--cyan-color": "#80CBC4",
    "--white-color": "#C1C2D3",
    "--bright-black-color": "#7A8298",
    "--font-family": "JetBrains Mono, monospace"
  },
  light: {
    "--background-color": "#ffffff",
    "--foreground-color": "#000000",
    "--red-color": "#ff0000",
    "--green-color": "#00ff00",
    "--yellow-color": "#ffff00",
    "--blue-color": "#0000ff",
    "--purple-color": "#ff00ff",
    "--cyan-color": "#00ffff",
    "--white-color": "#ffffff",
    "--bright-black-color": "#808080",
    "--font-family": "JetBrains Mono, monospace"
  },
  dark: {
    "--background-color": "#000000",
    "--foreground-color": "#ffffff",
    "--red-color": "#ff0000",
    "--green-color": "#00ff00",
    "--yellow-color": "#ffff00",
    "--blue-color": "#0000ff",
    "--purple-color": "#ff00ff",
    "--cyan-color": "#00ffff",
    "--white-color": "#ffffff",
    "--bright-black-color": "#808080",
    "--font-family": "JetBrains Mono, monospace"
  },
  ubuntu: {
    "--background-color": "#300A24", // Ubuntu terminal default
    "--foreground-color": "#EEEEEE", // Light text
    "--red-color": "#E95420", // Ubuntu orange
    "--green-color": "#7CBF42", // Ubuntu green
    "--yellow-color": "#F4BF75", // Ubuntu yellow
    "--blue-color": "#2C78BF", // Ubuntu blue
    "--purple-color": "#76428A", // Ubuntu purple
    "--cyan-color": "#33BAB4", // Ubuntu cyan
    "--white-color": "#D3D7CF", // Soft white
    "--bright-black-color": "#555753", // Ubuntu gray
    "--font-family": "Ubuntu Mono, monospace" // Ubuntu's default terminal font
  },
  powershell: {
    "--background-color": "#012456",
    "--foreground-color": "#ffffff",
    "--red-color": "#0ACF83", // Changed from red to green
    "--green-color": "#0ACF83",
    "--yellow-color": "#F9D448",
    "--blue-color": "#1F9CF0",
    "--purple-color": "#B381F5",
    "--cyan-color": "#00D4FF",
    "--white-color": "#FFFFFF",
    "--bright-black-color": "#5C5C5C",
    "--font-family": "Consolas, monospace" // Added font family
  }
};

export function setTheme(theme) {
  const selectedTheme = themes[theme];
  if (selectedTheme) {
    for (const [property, value] of Object.entries(selectedTheme)) {
      document.documentElement.style.setProperty(property, value);
    }
    if (theme !== "default") localStorage.setItem("terminal_theme", theme);
    else localStorage.removeItem("terminal_theme");
    return `Theme set to ${theme}.`;
  } else {
    return `Theme ${theme} not found.`;
  }
}

function createMatrixEffect() {
  // Create canvas
  matrixCanvas = document.createElement('canvas');
  const ctx = matrixCanvas.getContext('2d');
  const container = document.getElementById('terminal');
  
  // Create control panel
  const controls = document.createElement('div');
  // Style elements
  matrixCanvas.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 1;
      border-radius: 10px;
      border: 2px solid var(--foreground-color);
  `;

  controls.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 1000;
      display: flex;
      gap: 8px;
  `;
  controls.innerHTML = `
    <span style="color: var(--green-color); cursor: default; user-select: none;">MATRIX</span>
    <span style="color: var(--red-color); cursor: pointer; padding: 0 5px; user-select: none;" 
          id="matrix-close">×</span>
  `;

  // Set canvas size
  let fontSize = 14;
  let columns;
  
  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    matrixCanvas.width = rect.width;
    matrixCanvas.height = rect.height;
    columns = Math.floor(matrixCanvas.width / fontSize);
    matrixColumns = Array(columns).fill(0);
  }

  // Matrix characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

  // Rain effect
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green-color');
    ctx.font = `${fontSize}px ${getComputedStyle(document.documentElement).getPropertyValue('--font-family')}`;

    matrixColumns.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      ctx.fillText(char, x, y);
      
      if (y > matrixCanvas.height && Math.random() > 0.975) {
        matrixColumns[i] = 0;
      }
      matrixColumns[i] += fontSize;
    });

    matrixAnimationFrame = requestAnimationFrame(draw);
  }

  // Event handlers
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') stopMatrixEffect();
  };

  const stopMatrixEffect = () => {
    cancelAnimationFrame(matrixAnimationFrame);
    container.removeChild(controls);
    container.removeChild(matrixCanvas);
    window.removeEventListener('resize', resizeCanvas);
    document.removeEventListener('keydown', handleKeyPress);
    matrixCanvas = null;
    displayOutput('Matrix effect deactivated');
  };

  // Initial setup
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  document.addEventListener('keydown', handleKeyPress);
  
  // Add elements to DOM first
  container.appendChild(controls);
  container.appendChild(matrixCanvas);
  
  // Then add click listener
  controls.querySelector('#matrix-close').addEventListener('click', stopMatrixEffect);

  // Start animation
  draw();
}

function handleRPS(args) {
if (args.length === 0) {
  return 'Usage: rps [rock|paper|scissors]';
}

const userChoice = args[0].toLowerCase();
const validChoices = ['rock', 'paper', 'scissors'];

if (!validChoices.includes(userChoice)) {
  return `Invalid choice: ${userChoice}. Please choose rock, paper, or scissors.`;
}

const terminalChoice = validChoices[Math.floor(Math.random() * 3)];
const result = determineWinner(userChoice, terminalChoice);

const emojis = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

return `You chose ${emojis[userChoice]} ${userChoice}\nTerminal chose ${emojis[terminalChoice]} ${terminalChoice}\nResult: ${result}`;
}
