## RanDK Slack Bot
A lightweight, modular Slack bot that brings instant entertainment and utility directly to your workspace chat channels.

**Quick Start:** [Join Hack Club Slack](https://hackclub.to/join-slack) and test the bot commands inside the `#bot-spam` channel! You can interact directly with the bot using any of the registered slash commands listed in this document.

---

## Screenshot

![RanDK Slack Bot preview](public/preview.png)

---

## 🛠️ Slash Commands List

The bot implements a few simple slash commands:

### 🌟 Information & Utility Commands
| Slash Command | Description | Example Usage | Public REST API |
| :--- | :--- | :--- |:---|
| `/rdk-help` | Open the interactive help and navigation guide | `/rdk-help` | *Internal Router* |
| `/rdk-ping` | Ping test latency benchmarks in milliseconds | `/rdk-ping` | *Latency Monitor* |

### 😂 Entertainment & Leisure Commands
| Slash Command | Description | Example Usage | Public REST API |
| :--- | :--- | :--- | :--- |
| `/rdk-catfact` | Get a random fun fact about cats | `/rdk-catfact` | `https://catfact.ninja` |
| `/rdk-joke` | Receive a random joke with their setup and punchline | `/rdk-joke` | `https://official-joke-api.appspot.com` |

---

## 🚀 Setup & Local Installation

### Prerequisites
*   Node.js (v18.x or newer) and npm installed.
*   A Slack Workspace where you have permission to install apps.

### 1. Register App on Slack
1. Go to the [Slack Apps Dashboard](https://api.slack.com/apps) and select **Create New App → From Scratch**.
2. Go to **Socket Mode** in the left sidebar and toggle **Enable Socket Mode**.
3. Under **Basic Information**, scroll to **App-Level Tokens** and click **Generate Token**. Add the `connections:write` scope and copy the generated token (starts with `xapp-`).
4. Go to **OAuth & Permissions** and under **Bot Token Scopes** add:
   * `chat:write`
   * `commands`
   * `app_mentions:read`
   * `channels:history`
5. Click **Install to Workspace** at the top of the page, then copy the **Bot User OAuth Token** (starts with `xoxb-`).
6. Go to **Slash Commands** and register each command listed in the catalog above.

### 2. Scaffold Code Locally
Clone your repository and install dependencies:
```bash
git clone https://github.com/rkpyi/slackbot.git
cd slackbot
npm install
```

Copy the provided template into a local **`.env`** file in your root folder:
```bash
cp .env.example .env
```

Then fill in your real Slack tokens:
```env
SLACK_BOT_TOKEN=xoxb-your-bot-user-token
SLACK_APP_TOKEN=xapp-your-app-level-token
```

> [!WARNING]
> Keep your `.env` tokens secure! Never push them to public repositories. Double-check that `.env` is listed inside your `.gitignore` file.
> If these tokens were exposed anywhere public, rotate them in Slack before shipping.

Start the bot locally:
```bash
node index.js
```

## 🔒 24/7 Deployment on Hack Club Nest

To host your Slackbot 24/7 for free on the Hack Club Nest Debian server, follow these production setup steps:

### 1. SSH & Prerequisite Setup
Log into your Nest container:
```bash
ssh root@your-nest-domain-or-ip
```
*(If Node/Git is not yet installed inside your container, run)*:
```bash
apt update && apt install -y curl git
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt install -y nodejs
```

### 2. Pull Code and Recreate Secrets
Clone your repository and build dependencies:
```bash
git clone https://github.com/rkpyi/slackbot.git
cd slackbot
npm install
```
Configure your credentials on the server:
```bash
nano .env
```
*(Paste your tokens, press `Ctrl+O` → `Enter` → `Ctrl+X` to save and exit)*.

### 3. Register Systemd Service
The repository already includes a pre-configured **`slackbot.service`** file. Copy it to your systemd system folder:
```bash
cp slackbot.service /etc/systemd/system/slackbot.service
```

### 4. Enable and Control Bot Service
Reload the system daemon and enable your bot to run on server boot automatically:
```bash
systemctl daemon-reload
systemctl enable --now slackbot.service
```

Use these standard commands to control your bot's lifecycle:
*   **Check status**: `systemctl status slackbot.service`
*   **Restart bot**: `systemctl restart slackbot.service`
*   **Stop bot**: `systemctl stop slackbot.service`
*   **View live log output**: `journalctl -u slackbot.service -f`

---

## 🛠️ Troubleshooting Guide

| Issue | Potential Reason | Exact Resolution |
| :--- | :--- | :--- |
| **`SocketModeServerError`** or Auth Crashes | Mismatched or incorrectly copied tokens | Confirm `xoxb-` is in `SLACK_BOT_TOKEN` and `xapp-` is in `SLACK_APP_TOKEN` in your `.env`. |
| Slash Command displays **"Dispatch Error"** | The bot script is not running or socket is offline | Verify your local command is running, or run `systemctl status slackbot` on Nest to verify active uptime. |
| Commands fail with **"Timeout Error"** | Code did not invoke `ack()` within 3 seconds | Slack requires Bolt to call `await ack()` immediately at the start of command execution. |
| Slash Command **doesn't appear in Slack** | The command was not registered in Slack dashboard | Go to *Slack Apps console → Slash Commands* and verify command name matches exactly. |

## 🤖 AI Declaration

I declare that I used AI assistance (specifically Google's Gemini-powered) to help generate, format, and refine the documentation in this README.md file.