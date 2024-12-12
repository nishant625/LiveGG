# Use official Node.js LTS as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Use a smaller image for serving the app
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the build files from the previous stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm install --production

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
