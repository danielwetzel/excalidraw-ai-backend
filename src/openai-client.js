const OpenAI = require("openai");

const createOpenAIClient = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
  });

  return openai;
};

module.exports = createOpenAIClient;
