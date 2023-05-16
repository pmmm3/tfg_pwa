# Use an official Node.js runtime as the base image
FROM node:18.13-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the frontend project
RUN npm run build

# Expose the desired port (replace 3000 with your application's actual port)
EXPOSE 4200

# Set the command to start the application
CMD ["npm", "start"]
