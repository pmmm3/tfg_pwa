# Use an official Ubuntu as a parent image
FROM ubuntu:latest AS builder

# Install curl, git, and other required packages
RUN apt-get update && \
    apt-get install -y curl git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install NVM (Node Version Manager) to manage multiple Node.js versions
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 18

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN . "$NVM_DIR/nvm.sh" && \
    npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN . "$NVM_DIR/nvm.sh" && \
    npm run build --prod

# Use a lightweight Nginx image as a parent image
FROM nginx:stable-alpine

# Copy the built Angular PWA from the builder stage to the Nginx web server
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
