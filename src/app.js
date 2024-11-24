const express = require("express");
const dotenv = require("dotenv");
const { generateMermaidCode } = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const address = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log(`[${timestamp}] ${req.method} request to: ${address}`);
  next();
});

// Routes
app.post("/v1/ai/text-to-diagram/generate", generateMermaidCode);

// Start server
app.listen(PORT, () => {
  console.log(`Excalidraw AI Backend running at http://localhost:${PORT}`);
});
