const terminalOutput = document.getElementById("terminal-output");
const commandLine = document.getElementById("command-line");
const terminal = document.getElementById("terminal");

// Configuration variables
let specialCommands = {};
let aboutCommands = {};
let socials = {};
let header = "Welcome to Portfolio shell,\nType help to see all the commands";
let title = "Kom | PorfolioShell";
let userData = {}
let matrixCanvas = null;
let matrixAnimationFrame = null;
let matrixColumns = [];
let commandHistory = [];
let currentHistoryIndex = 0;

// General commands implementation
const generalCommands = {
  clear: {
    execute: () => {
      clearTerminal();
      return null;
    },
    description: "Clear terminal. 🧹 Keep it tidy! 😊"
  },
  echo: {
    execute: (args) => {
      return args.join(" ");
    },
    description: "Echo back your text. 🔊 Like shouting in a canyon! 🏔️"
  },
  date: {
    execute: () => {
      return new Date().toString();
    },
    description: "Display current date and time. ⏰ Time flies! ⏱️"
  },
  ls: {
    execute: () => {
      return "commands.json\nindex.html\nREADME.md\nscript.js\nstyles.css\nterminal.png";
    },
    description: "List files in the directory. 📁 What's in here? 🔍"
  },
  pwd: {
    execute: () => {
      return "/home/visitor/kom";
    },
    description: "Print working directory. 📍 Where am I? 🗺️"
  },
  cat: {
    execute: (args) => {
      if (args.length === 0) {
        return "Usage: cat [filename]";
      }
      
      const filename = args[0];
      const files = {
        "readme.md": "# KomPortfolioShell\n\nA terminal-like portfolio page for Kom Senapati.",
        "commands.json": "This file contains all the special commands for this terminal."
      };
      
      if (files[filename.toLowerCase()]) {
        return files[filename.toLowerCase()];
      } else {
        return `cat: ${filename}: No such file or directory`;
      }
    },
    description: "Display file contents. 📄 What's inside? 👀"
  },
  man: {
    execute: (args) => {
      if (args.length === 0) {
        return "What manual page do you want? Try 'man [command]'";
      }
      
      const command = args[0];
      
      if (generalCommands[command]) {
        return `NAME\n    ${command} - ${generalCommands[command].description}\n\nDESCRIPTION\n    ${getManualDescription(command)}`;
      } else if (specialCommands[command]) {
        return `NAME\n    ${command} - ${specialCommands[command].description}\n\nDESCRIPTION\n    A special command that provides information about Kom's portfolio.`;
      } else {
        return `No manual entry for ${command}`;
      }
    },
    description: "Display manual for a command. 📚 Need help? 🆘"
  },
  uname: {
    execute: () => {
      return "KomShell";
    },
    description: "Print system information. 💻 What am I running on? 🖥️"
  },
  history: {
    execute: () => {
      return commandHistory.join("\n") || "No commands in history yet";
    },
    description: "Show command history. 📜 What did I type before? 🔍"
  },
  help: {
    execute: () => {
      let output = "<table>";
      // Add general commands
      for (let cmd in generalCommands) {
        output += `<tr><td class="available-command">${cmd}</td><td class="command-description">${generalCommands[cmd].description}</td></tr>`;
      }
      // Add special commands
      for (let cmd in specialCommands) {
        output += `<tr><td class="available-command">${cmd}</td><td class="command-description">${specialCommands[cmd].description}</td></tr>`;
      }
      output += "</table>";
      return output;
    },
    description: "You know what this does. 🙄 Want some hints? 😏"
  },
  banner: {
    execute: () => {
      return header;
    },
    description: "Display the welcome banner. 👋 Hello again! 🎉"
  },
  whois : {
    execute: () => {
      if (!isUserDataAvailable()) {
        return "🚨 ALERT! 🚨\nIt seems like I have amnesia... My user data has mysteriously vanished into the void! 🌌👀\nTry reloading or summoning the data wizard. 🧙‍♂️✨";
      }
      return `    Name: ${userData.name}\n    Email: ${userData.email}\n    Bio: ${userData.bio}`;
    },
    description: "Display user information. 🙋 Who am I? 🤔"
  },
  social : {
    execute: () => {
      if (!isUserDataAvailable("socials")) {
        return "😱 OH NO! \nIt looks like my social links got lost in the multiverse! 🌀🔮\nMaybe they're chilling in another dimension. 🚀";
      }
      let output = "<table>";
      let socials = userData.socials;
      for (let social in socials) {
        output += `<tr><td class="name">${social}</td><td class="link">${socials[social]}</td></tr>`;
      }  
      output += "</table>";
      return output;
    },
    "description": "Connect with me. 🌐 Let's network! 🤝",
  },
  projects : {
    execute: () => {
       if (!isUserDataAvailable("projects")) {
        return "🛠️ Under Construction! 🏗️\nOops! It seems my projects took a coffee break ☕ and never came back! 🚶💨\nMaybe they're off building the next big thing. Try again later!";
      }
      let output = "Here are some of my projects:\n<table>";
      userData.projects.forEach(project => {
        output += `<tr><td class="name">${project.name}</td><td class="description">${project.description}</td><td class="link">${project.link}</td></tr>`;
      });
      output += "</table>";
      return output;
    },
    "description": "Check out projects. 💻 Prepare to be amazed! ✨"
  }
};

// Helper function for man command
function getManualDescription(command) {
  const manuals = {
    clear: "Clear the terminal screen.",
    echo: "Display a line of text. Usage: echo [text]",
    date: "Display the current date and time.",
    ls: "List directory contents.",
    pwd: "Print the name of the current working directory.",
    cat: "Concatenate and display file contents. Usage: cat [filename]",
    man: "Display manual page for a command. Usage: man [command]",
    uname: "Print system information.",
    history: "Display the command history list.",
    help: "Display help information about available commands.",
    banner: "Display the welcome banner."
  };
  
  return manuals[command] || "No detailed description available.";
}

// Load user.json file
async function loadUserData() {
  try {
    const response = await fetch('src/config/user.json');
    if (!response.ok) {
      throw new Error('Failed to load user data');
    }
    
    userData = await response.json();
    console.log("User data loaded successfully.");
  } catch (error) {
    console.error("Error loading user data:", error);
    userData = null;
  }
}

loadUserData();

// Check if user data is available
const isUserDataAvailable = (key) => {
  return userData && (key ? userData[key] && Object.keys(userData[key]).length > 0 : Object.keys(userData).length > 0);
};

// Load special commands from JSON file
fetch('commands.json')
  .then(response => response.json())
  .then(data => {
    // Set title if provided
    if (data.title) {
      title = data.title;
      document.title = title;
    }
    
    // Set description/header if provided
    if (data.description) {
      header = data.description;
    }
    
    // Set special commands
    if (data.specialCommands) {
      specialCommands = data.specialCommands;
      
      // Add special commands to aboutCommands for help display
      for (let cmd in specialCommands) {
        aboutCommands[cmd] = specialCommands[cmd].description;
      }
    }
    
    // Set socials if provided
    if (data.socials) {
      socials = data.socials;
    }
    
    // Display header after loading
    displayOutput(header);
  })
  .catch(error => {
    console.error('Error loading commands.json:', error);
    displayOutput(header);
  });

const themes = {
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

window.addEventListener("load", (event) => {
  setTheme(localStorage.getItem("terminal_theme") ?? "default");
});

// Header is now displayed after loading commands.json
commandLine.focus();

terminal.addEventListener("click", function () {
  commandLine.focus();
});

commandLine.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const command = commandLine.value;
    const output = processCommand(command.toLowerCase().trim());
    if (output) {
      displayCommand(command);
      displayOutput(output);
    }
    // Add command to history
    const trimmedCommand = command.trim();
    if (trimmedCommand) {
      commandHistory.push(trimmedCommand);
      currentHistoryIndex = commandHistory.length;
    }
    commandLine.value = "";
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (commandHistory.length === 0) return;

    if (currentHistoryIndex > 0) {
      currentHistoryIndex--;
      commandLine.value = commandHistory[currentHistoryIndex];
    }
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (commandHistory.length === 0) return;

    if (currentHistoryIndex < commandHistory.length) {
      currentHistoryIndex++;
    }

    commandLine.value = currentHistoryIndex < commandHistory.length 
      ? commandHistory[currentHistoryIndex] 
      : '';
  }
});

function displayCommand(command) {
  const commandElement = document.createElement("p");
  commandElement.innerHTML = `<span id="prompt">visitor@shell:~/kom $</span> <span class="command">${command}</span>`;
  terminalOutput.appendChild(commandElement);
}

function displayOutput(output) {
  if (output instanceof Promise) {
    output
      .then((data) => {
        const outputElement = document.createElement("pre");
        outputElement.classList.add("output");
        outputElement.textContent = data;
        terminalOutput.appendChild(outputElement);
        scrollToBottom();
      })
      .catch((error) => {
        console.error("Error displaying output:", error);
      });
  } else {
    const outputElement = document.createElement("p");
    outputElement.classList.add("output");
    outputElement.innerHTML = output;
    terminalOutput.appendChild(outputElement);
    scrollToBottom();
  }
}

function processCommand(commandInput) {
  if (commandInput === "") return "<hr hidden />";
  
  // Parse command and arguments
  const parts = commandInput.split(" ");
  const command = parts[0];
  const args = parts.slice(1);
  
  // Check if it's a general command
  if (generalCommands.hasOwnProperty(command)) {
    return generalCommands[command].execute(args);
  } 
  // Check if it's a special command
  else if (specialCommands.hasOwnProperty(command)) {
    const specialCmd = specialCommands[command];
    
    // Handle function-based special commands
    if (specialCmd.isFunction) {
      switch (specialCmd.output) {
        case "social":
          let output = "<table>";
          for (let social in socials) {
            output += `<tr><td class="name">${social}</td><td class="link">${socials[social]}</td></tr>`;
          }
          output += "</table>";
          return output;
        case "joke":
          return fetchJoke();
        case "fact":
          return fetchFact();
        case "quote":
          return fetchQuote();
        case "advice":
          return fetchAdvice();
        case "trivia":
          return fetchTrivia();
        case "osinfo":
          return getOSInfo();
        case "theme":
          if (args.length === 0) {
            let availableThemesMsg = "Available themes: ";
            availableThemesMsg += Object.keys(themes).join(", ");
            availableThemesMsg += '. Type "theme THEME" to change theme to THEME.';
            return availableThemesMsg;
          } else {
            return setTheme(args[0]);
          }
        case "matrix":
          if (!matrixCanvas) {
            createMatrixEffect();
            return 'Matrix effect activated. Click × or press ESC to exit. 🌐';
          }
          return 'Effect already running! Click × or press ESC to exit';
        case "rps":
          return handleRPS(args);
        default:
          return `Error: Function ${specialCmd.output} not implemented`;
      }
    } 
    // Return static output for non-function special commands
    else {
      return specialCmd.output;
    }
  } 
  // Handle unknown commands
  else {
    return `${command}: command not found`;
  }
}

function clearTerminal() {
  terminalOutput.innerHTML = "";
  displayOutput(header);
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

async function fetchJoke() {
  try {
    displayLoader(true);
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error("Error fetching joke:", error);
    return "Failed to fetch joke. 😕";
  } finally {
    displayLoader(false);
  }
}

async function fetchFact() {
  try {
    displayLoader(true);
    const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error fetching fact:", error);
    return "Failed to fetch fact. 😕";
  } finally {
    displayLoader(false);
  }
}

async function fetchQuote() {
  const fallbackQuotes = [
    `"The only way to do great work is to love what you do." - Steve Jobs`,
    `"Success is not final, failure is not fatal: It is the courage to continue that counts." - Winston Churchill`,
    `"Your time is limited, so don't waste it living someone else's life." - Steve Jobs`,
    `"Do what you can, with what you have, where you are." - Theodore Roosevelt`,
    `"Don't watch the clock; do what it does. Keep going." - Sam Levenson`,
    `"Opportunities don't happen, you create them." - Chris Grosser`,
    `"Hardships often prepare ordinary people for an extraordinary destiny." - C.S. Lewis`,
    `"It does not matter how slowly you go as long as you do not stop." - Confucius`,
    `"Believe you can and you're halfway there." - Theodore Roosevelt`,
    `"Act as if what you do makes a difference. It does." - William James`,
    `"The best way to predict the future is to create it." - Peter Drucker`,
    `"Strive not to be a success, but rather to be of value." - Albert Einstein`,
    `"Courage is resistance to fear, mastery of fear—not absence of fear." - Mark Twain`,
    `"Dream big and dare to fail." - Norman Vaughan`,
    `"Your limitation—it's only your imagination." - Unknown`
  ];
  
  try {
    displayLoader(true);
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return `"${data.content}" - ${data.author}`;
  } catch (error) {
    console.error("Error fetching quote:", error);

    // Fallback: Return a random predefined quote
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  } finally {
    displayLoader(false);
  }
}



async function fetchAdvice() {
  try {
    displayLoader(true);
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Failed to fetch advice. 😕";
  } finally {
    displayLoader(false);
  }
}

async function fetchTrivia() {
  try {
    displayLoader(true);
    const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await response.json();
    return `Trivia: ${data.results[0].question}`;
  } catch (error) {
    console.error("Error fetching trivia:", error);
    return "Failed to fetch trivia. 😕";
  } finally {
    displayLoader(false);
  }
}

//loader function
function displayLoader(show) {
  const loaderElement = document.getElementById("loader");
  if (show) {
    let dotCount = 0;
    function updateLoader() {
        loaderElement.textContent = `Loading${'.'.repeat(dotCount)}`;
        dotCount = (dotCount + 1) % 5; 
    }
  
    setInterval(updateLoader, 1500);

    loaderElement.style.display = "block";
  } else {
    loaderElement.style.display = "none";
  }
}

function getOSInfo() {
  let os = "Unknown OS";
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("win")) os = "Windows";
  else if (userAgent.includes("mac")) os = "MacOS";
  else if (userAgent.includes("linux")) os = "Linux";
  else if (userAgent.includes("android")) os = "Android";
  else if (userAgent.includes("iphone") || userAgent.includes("ipad")) os = "iOS";

  return `Operating System: ${os}`;
}



function setTheme(theme) {
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

function determineWinner(user, terminal) {
  if (user === terminal) return 'It\'s a tie! 🤝';
  if ((user === 'rock' && terminal === 'scissors') ||
      (user === 'paper' && terminal === 'rock') ||
      (user === 'scissors' && terminal === 'paper')) {
    return 'You win! 🎉';
  }
  return 'Terminal wins! 💻';
}