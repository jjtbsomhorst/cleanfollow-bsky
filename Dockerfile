# Use Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite default port
EXPOSE 13213

# Start the Vite dev server
CMD ["npm", "run", "dev"]
