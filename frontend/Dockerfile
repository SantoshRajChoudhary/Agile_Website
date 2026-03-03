# ── Stage 1: Build ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package.json package-lock.json* ./

# Install all deps (including devDeps needed for vite build)
RUN npm install

# Copy source and build args
COPY . .

# Build arg so VITE_API_URL can be passed at build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the production bundle
RUN npm run build

# ── Stage 2: Serve ─────────────────────────────────────────────
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
