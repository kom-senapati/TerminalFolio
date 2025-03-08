# TermFolio

TermFolio is an interactive terminal-style portfolio template that simulates a command-line interface in the browser. It's designed to showcase your projects, skills, and information in a unique and engaging way.

![TermFolio Screenshot](terminal.png)

## Features

- **Interactive Terminal Interface:** Provides a realistic command-line experience for visitors
- **Customizable Commands:** Easily configure both general and special commands
- **External Configuration:** All special commands, social links, and descriptions can be edited via a JSON file
- **Command History:** Navigate through previously entered commands using arrow keys
- **Themes:** Multiple built-in color themes with the ability to switch between them
- **Responsive Design:** Works well on both desktop and mobile devices
- **Social Links Integration:** Easily connect your GitHub, LinkedIn, Twitter, and other social profiles

## Command Types

TermFolio supports two types of commands:

### General Commands

Built-in system commands that provide standard terminal functionality:

- `help` - Display all available commands
- `clear` - Clear the terminal screen
- `echo [text]` - Display the provided text
- `date` - Show current date and time
- `ls` - List files in the directory
- `pwd` - Print working directory
- `cat [filename]` - Display file contents
- `man [command]` - Show manual for a command
- `uname` - Print system information
- `history` - Show command history
- `banner` - Display the welcome banner

### Special Commands

Customizable commands that showcase your personal information, projects, and skills:

- `whois` - Display information about you
- `whoami` - Information for the visitor
- `projects` - Showcase your projects
- `contact` - Display contact information
- `social` - Show social media links
- `joke` - Display a random programming joke
- `theme [name]` - Change the terminal theme

## Customization

TermFolio is designed to be easily customizable without editing the core code:

### commands.json

All special commands, social links, title, and description are configured in the `commands.json` file:

```json
{
  "title": "TermFolio | Interactive Terminal Portfolio",
  "description": "Welcome message and instructions",
  "specialCommands": {
    "commandName": {
      "output": "Command output text or HTML",
      "description": "Command description for help menu"
    },
    "functionCommand": {
      "output": "functionName",
      "description": "Description for function-based command",
      "isFunction": true
    }
  },
  "socials": {
    "github": "<a href=\"https://github.com/yourusername\">github.com/yourusername</a>",
    "linkedin": "<a href=\"https://linkedin.com/in/yourusername\">linkedin.com/in/yourusername</a>"
  }
}
```

## Updating Your Portfolio Data

To update your portfolio details, edit the `src/config/user.json` file. Modify the fields as needed:

- `"name"`: Your full name.
- `"email"`: Your contact email.
- `"bio"`: A short description about yourself.
- `"resume"`: A link to your resume (Google Drive, website, etc.).
- `"socials"`: Links to your social profiles.
- `"projects"`: A list of your projects with a name, description, and link.

### Example:

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "bio": "Full-stack developer interested in cloud and AI.",
  "resume": "https://example.com/jane-resume.pdf",
  "socials": {
    "github": "https://github.com/janedoe",
    "linkedin": "https://linkedin.com/in/janedoe",
    "twitter": "https://twitter.com/janedoe"
  },
  "projects": [
    {
      "name": "Task Manager App",
      "description": "A web-based task management system using React and Firebase.",
      "link": "https://github.com/janedoe/task-manager"
    }
  ]
}
```

### Adding New Commands:

To add a new special command, simply add it to the `specialCommands` object in `commands.json`.

For function-based commands that require JavaScript execution, set `isFunction` to `true` and implement the function in the `script.js` file.

## Setup and Deployment

1. Clone this repository
2. Edit the `commands.json` file with your information
3. Customize the appearance by modifying `styles.css` if desired
4. Deploy to any static web hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla, no frameworks)

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests for bug fixes, features, or improvements.

