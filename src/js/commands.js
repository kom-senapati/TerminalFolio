export const generalCommands = {
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
export function getManualDescription(command) {
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
