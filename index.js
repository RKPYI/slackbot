const app = require("./config/slack");
const { pingHandler, helpHandler } = require("./controllers/system");
const catFactHandler = require("./controllers/catfact");
const jokeHandler = require("./controllers/joke");

// Command Listeners
app.command("/rdk-ping", pingHandler);
app.command("/rdk-catfact", catFactHandler);
app.command("/rdk-joke", jokeHandler);
app.command("/rdk-help", helpHandler);

// Start app
(async () => {
    try {
        await app.start();
        console.log("bot is running!");
    } catch (error) {
        console.error("Failed to start the Slack bot:", error);
        process.exit(1);
    }
})();