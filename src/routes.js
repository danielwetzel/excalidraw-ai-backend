const fs = require("fs");
const path = require("path");
const createOpenAIClient = require("./openai-client");

const generateMermaidCode = async (req, res) => {
  const { prompt } = req.body;
  const timestamp = new Date().toISOString();
  const model = process.env.OPENAI_MODEL;

  if (!prompt) {
    console.log(`[${timestamp}] Error: Missing prompt in request`);
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log(`[${timestamp}] Processing diagram generation request using model: ${model}`);
    
    // Load system prompt from file
    const systemPromptPath = path.join(__dirname, "../prompts/system-prompt.md");
    const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");

    // Create OpenAI client
    const openai = createOpenAIClient();

    // Send request to OpenAI
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const generatedResponse = response.choices[0].message.content.trim();
    console.log(`[${timestamp}] Successfully generated diagram using model: ${model}`);

    // Respond with generated Mermaid code in the correct format
    return res.status(200).json({ generatedResponse });
  } catch (error) {
    console.log(`[${timestamp}] Error generating diagram with model ${model}: ${error.message}`);
    return res.status(500).json({ error: "Failed to generate Mermaid code" });
  }
};

module.exports = { generateMermaidCode };
