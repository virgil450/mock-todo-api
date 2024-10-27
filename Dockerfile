# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally (optional, if you need tsc globally)
RUN npm install -g typescript

# Build the TypeScript files
RUN npm run build


# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]