FROM node:14-alpine AS node

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY ./package*.json ./   

# Install all dependencies
RUN npm i               

# Copy the rest of the code
COPY . .      
COPY ./src/public ./public       

# Open desired port
EXPOSE 8080

# Use js files to run the application
ENTRYPOINT ["node", "./src/app.js"]