const apiService = require("../services/api");

const catFactHandler = async ({ ack, respond }) => {
    await ack();

    try {
        const fact = await apiService.fetchCatFact();
        await respond({ text: `Cat Fact:\n${fact}`});
    } catch (error) {
        await respond({ text: `Failed to fetch a cat fact.`});
    }
}

module.exports = catFactHandler;