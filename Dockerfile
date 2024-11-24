# Build stage
FROM node:20-alpine3.18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine3.18
RUN apk --no-cache add dumb-init
ENV NODE_ENV=production
ENV PORT=3025
ENV OPENAI_MODEL=chatgpt-4o-latest
ENV OPENAI_BASE_URL=https://api.openai.com/v1

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

USER node
EXPOSE 3025
CMD ["dumb-init", "node", "src/app.js"]
