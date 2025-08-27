# Use Node 22 Alpine for small size
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port for Next.js dev server
EXPOSE 3000

# Run Next.js in development mode
CMD ["npm", "run", "dev"]