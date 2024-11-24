# Excalidraw AI Backend

A dedicated backend service for local Excalidraw installations that converts text descriptions into Mermaid diagrams using AI. This service enables the AI diagram generation feature in Excalidraw when running locally.

## 🎯 Purpose

This backend service is specifically designed to work with locally hosted Excalidraw instances. It provides the AI diagram generation capability that's normally available in the cloud version of Excalidraw.

## 🚀 Quick Start

### Using Docker (Recommended)

You can run the container in two ways:

#### Option 1: Using environment file

1. Create a `.env` file:
```env
OPENAI_API_KEY=your-api-key-here
OPENAI_MODEL=chatgpt-4o-latest
PORT=3025
```

2. Run with Docker:
```bash
docker run -p 3025:3025 --env-file .env danielwetzel/excalidraw-ai-backend
```

#### Option 2: Using environment variables directly

⚠️ Important: When using this method, ensure there is no `.env` file in your current directory to avoid conflicts.

Run with Docker using -e flags:
```bash
docker run -p 3025:3025 \
  -e OPENAI_API_KEY="your-api-key-here" \
  -e OPENAI_MODEL="chatgpt-4o-latest" \
  -e PORT=3025 \
  danielwetzel/excalidraw-ai-backend
```

Make sure to:
- Wrap your API key in quotes
- Remove any .env file from the current directory
- Use the exact environment variable names as shown above

## 🔗 Integration with Excalidraw

In your Excalidraw project, set the environment variable:
```env
VITE_APP_AI_BACKEND=http://localhost:3025
```

This connects your local Excalidraw instance to this AI backend service.

## 📡 API Reference

### Generate Diagram
`POST /v1/ai/text-to-diagram/generate`

Request:
```json
{
  "prompt": "Create a flowchart for user login"
}
```

Response:
```json
{
  "generatedResponse": "flowchart TD\nA[Start] --> B[Enter Credentials]\nB --> C{Valid?}\nC -->|Yes| D[Access Granted]\nC -->|No| E[Access Denied]"
}
```

## ✅ Test the API

Using curl:
```bash
curl -X POST http://localhost:3025/v1/ai/text-to-diagram/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a flowchart for user login"}'
```

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_MODEL`: AI model to use (default: chatgpt-4o-latest)
- `PORT`: Server port (default: 3025)

To get your OpenAI API key:
1. Sign up at https://platform.openai.com/signup
2. Generate an API key at https://platform.openai.com/api-keys

## 🐳 Docker Build Options

If you want to build the image yourself instead of using the pre-built one:

### For ARM64 (M1/M2 Macs):
```bash
docker buildx build --platform linux/arm64 -t excalidraw-ai-backend .
```

### For AMD64 (Intel/AMD):
```bash
docker buildx build --platform linux/amd64 -t excalidraw-ai-backend .
```

### Multi-platform Build:
```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t excalidraw-ai-backend \
  --push .
```

## 📝 License

[MIT License](LICENSE) - feel free to use this project however you'd like!
