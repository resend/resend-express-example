# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install express @types/express


# Copy the entire application code
COPY . .

# Expose the port your application listens on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]