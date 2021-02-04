# base image
FROM node:15.5

# set workdir
WORKDIR /code/frontend

# add '/code/node_modules/.bin' to PATH
ENV PATH /code/frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . /code/frontend
EXPOSE 3000
