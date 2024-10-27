# Step 1: Build the React application
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the application using nginx
FROM nginx:alpine

# Copy the build output to the nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8000
EXPOSE 8000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]