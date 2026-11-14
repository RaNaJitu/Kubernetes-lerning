# Stage 1: Build the React + Vite application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first to improve Docker layer caching.
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copy source and create the optimized production build.
COPY . .
RUN npm run build


# Stage 2: Serve the production build with Nginx
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
