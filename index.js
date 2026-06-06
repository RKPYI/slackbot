require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/rdk-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/rdk-catfact", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://catfact.ninja/fact");
        await respond({ text: `Cat Fact:\n${response.data.fact}`});
    } catch (error) {
        await respond({ text: `Failed to fetch a cat fact.`});
    }
})

app.command("/rdk-joke", async ({ ack, respond }) => {
    await ack();
  
    try {
      const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
      await respond({
        text:
`${response.data.setup}

${response.data.punchline}`
      });
    } catch (err) {
      await respond({ text: "Failed to fetch a joke." });
    }
  });

app.command("/rdk-help", async ({ ack, respond}) => {
    await ack();
    await respond({
        text:
`Available Commands:
/rdk-ping - Check bot latency
/rdk-catfact - Get a random cat fact
/rdk-joke - Get a random joke
/rdk-help - Show this help message`
    });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();