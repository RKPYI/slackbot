const axios = require("axios");

const catApiClient = axios.create({ baseURL: "https://catfact.ninja" });
const jokeApiClient = axios.create({ baseURL: "https://official-joke-api.appspot.com" });

const apiService = {
    async fetchCatFact() {
        const response = await catApiClient.get("/fact");
        return response.data.fact;
    },

    async fetchRandomJoke() {
        const response = await jokeApiClient.get("/random_joke");
        return {
            setup: response.data.setup,
            punchline: response.data.punchline
        };
    }
};

module.exports = apiService;