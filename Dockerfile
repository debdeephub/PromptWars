FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Install a simple static server
RUN npm install -g serve

# Run the server on port 8080 (Cloud Run default)
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
