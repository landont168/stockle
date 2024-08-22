# use official node image as the base
FROM node:20-alpine

# set up working directory inside container for subsequent commands
WORKDIR /app

# copy package json files to grab dependencies
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code into container
COPY . .

# start frontend server
CMD ["npm", "run", "dev", "--", "--host"]
