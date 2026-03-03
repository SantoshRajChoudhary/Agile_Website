# ── Stage: Production ──────────────────────────────────────────
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose port (matches PORT in .env)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
