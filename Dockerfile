# Use an official Node.js LTS (Long-Term Support) image for Node.js 18.x as the parent image
FROM node:18 AS builder

# Set the working directory to /app
RUN mkdir -p /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build --prod

# Use a lightweight Nginx image as a parent image
FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built Angular PWA from the builder stage to the Nginx web server
COPY --from=builder /app/dist/tfg-front /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
