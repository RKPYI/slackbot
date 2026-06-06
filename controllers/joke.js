const apiService = require("../services/api");

const jokeHandler = async ({ ack, respond }) => {
    await ack();
  
    try {
      const { setup, punchline } = await apiService.fetchRandomJoke();
      await respond({
        text:
`${setup}

${punchline}`
      });
    } catch (err) {
      await respond({ text: "Failed to fetch a joke." });
    }
}

module.exports = jokeHandler;