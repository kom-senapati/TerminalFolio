# ⚡ TerminalFolio 

> **Interactive Terminal Portfolio Template**  
> Simulates a command-line interface to showcase your projects and skills uniquely.

## ✨ Features  
✅ **Interactive Terminal Interface** – Realistic command-line experience  
✅ **Custom Commands** – Easily configurable JSON-based commands  
✅ **Themes** – Multiple built-in themes with a switch option  
✅ **Responsive Design** – Works on desktop & mobile  
✅ **Social Integration** – Connect GitHub, LinkedIn, Twitter  

<details>
  <summary><h2>💻 Commands</h2></summary>

### 🛠 General Commands
- `help` – Show available commands  
- `clear` – Clear the terminal  
- `echo [text]` – Display text  
- `ls` – List files  
- `cat [file]` – Show file contents  
- `man [command]` – Show manual  
- `banner` – Display welcome message  

### 🚀 Special Commands
- `whois` – About you  
- `projects` – Show your projects  
- `contact` – Your contact info  
- `social` – Social links  
- `theme [name]` – Change theme  

</details>

## ⚙️ Customization  

Customizable commands that showcase your personal information, projects, and skills:

- `whois` - Display information about you
- `whoami` - Information for the visitor
- `projects` - Showcase your projects
- `contact` - Display contact information
- `social` - Show social media links
- `joke` - Display a random programming joke
- `theme [name]` - Change the terminal theme
- `matrix` - Apply a matrix effect. Press Esc to exit
- `rps [rock|paper|scissor]` - Start a round of rock-paper-scissor with the terminal

## Customization

TermFolio is designed to be easily customizable without editing the core code:

### Configuration Files

Edit the following JSON files under the `src/config` directory to modify commands, social links, and descriptions:

- `user.json` - Contains user-specific information like name, bio, and contact details.
- `config.json` - General configuration settings for the terminal interface.
- `commands.json` - Defines the commands and their respective outputs.

Example `user.json`:

```json
{
  "name": "Your Name",
  "bio": "A short bio about yourself",
  "contact": {
    "email": "your.email@example.com",
    "phone": "123-456-7890"
  }
}
```

Example `config.json`:

```json
{
  "title": "TermFolio",
  "description": "Interactive CLI Portfolio",
  "theme": "default"
}
```

Example `commands.json`:

```json
{
  "specialCommands": {
    "whois": { "output": "Your bio here", "description": "About you" },
    "projects": { "output": "Your projects list", "description": "Show projects" }
  },
  "socials": {
    "github": "<a href='https://github.com/yourusername'>GitHub</a>",
    "linkedin": "<a href='https://linkedin.com/in/yourusername'>LinkedIn</a>"
  }
}
```

---

## 📂 Setup & Deployment  

1. **Fork the Repository** – Click the **"Fork"** button at the top-right of the repo on GitHub.  

2. **Clone Your Forked Repo:**  
   ```sh
   git clone https://github.com/your-username/TermFolio.git
   ```
   *(Replace `your-username` with your GitHub username.)*  

3. **Customize JSON & Styles:**  
   Modify `commands.json` & `styles.css` as needed.  

4. **Deploy:**  
   Host it on **GitHub Pages**.


## 🛠 Technologies  

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js" />
  </a>
</p>

---

## 🤝 Contributing  
🚀 Feel free to create issues or submit pull requests to improve TermFolio!  

<div>
   <h2><img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4aa/512.webp" width="35" height="35" >Open Source Programs</h2>
</div>
<table border="1" cellpadding="10">
    <tr>
        <td rowspan="2">
            <img src="https://s2apertre.resourcio.in/Logo_primary.svg" alt="Apertre Logo" width="400" height="85">
        </td>
        <td>
            <strong>Apertre 2.0</strong>
        </td>
    </tr>
    <tr>
        <td>
            This project is part of Apertre 2.0. We welcome contributions from the community.
        </td>
    </tr>
</table>


<div align="center">
  <h1>Tip from us 😇</h1>
  <p>It always takes time to understand and learn. So, don't worry at all. We know <b>you have got this</b>! 💪</p>
</div>

<div>
  <h2><img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp" width="35" height="35"> Show Your Support</h2>
</div>

If you find this project interesting and inspiring, please consider showing your support by starring it on GitHub! Your star goes a long way in helping us to reach more developers and encourages to keep enhancing the project.
