require("dotenv").config();
const { App } = require("@slack/bolt");

if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
    console.error("Error: Missing environment variables.");
    process.exit(1);
}

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

module.exports = app;