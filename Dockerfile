# Use an official Node.js runtime as the base image
FROM node:18.13-alpine AS builder

# Set the working directory inside the container
RUN mkdir -p /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the application
RUN npm run build --prod

# Expose the desired port (replace 3000 with your application's actual port)
EXPOSE 4200

# Copy the built Angular PWA from the builder stage to the Nginx web server
COPY --from=builder /app/dist/tfg-front /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
