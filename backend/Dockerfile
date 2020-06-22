FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get -y update && apt-get install -y yarn
RUN yarn install

COPY . .

EXPOSE 1234

CMD ["yarn", "start:dev"]