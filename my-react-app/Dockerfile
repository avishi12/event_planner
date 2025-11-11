FROM node:18-alpine
WORKDIR /app

# Install dependencies first (package.json should be copied separately to use cache)
COPY package.json package-lock.json* ./
# Install build tools required by some native npm modules on Alpine
RUN apk add --no-cache g++ make python3 && \
	npm install --silent && \
	apk del make g++

# Copy source
COPY . .

EXPOSE 3000

# Start dev server and bind to 0.0.0.0 so container is reachable from host/network
CMD ["npm", "start"]
