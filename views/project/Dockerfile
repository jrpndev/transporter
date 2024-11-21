# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json e yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app
COPY . .

# Expose port 3000
EXPOSE 3000

# Build the React application
RUN yarn build

# Start the React application in production mode
CMD ["yarn", "start"]
