
# Use an official node runtime as a parent image
FROM node:12.18.2

# Set work directory, we can name it whatever we want
WORKDIR /frontend/code

# Copy the package.json file into work directory & install dependencies
COPY package.json yarn.lock /frontend/code/
RUN yarn install

# Add rest of the client code
COPY . /frontend/code/

EXPOSE 3000

CMD npm start