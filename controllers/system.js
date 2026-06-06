const pingHandler = async ({ ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
}

const helpHandler = async ({ ack, respond}) => {
    await ack();
    await respond({
        text:
`Available Commands:
/rdk-ping - Check bot latency
/rdk-catfact - Get a random cat fact
/rdk-joke - Get a random joke
/rdk-help - Show this help message`
    });
}

module.exports = { pingHandler, helpHandler };