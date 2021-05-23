FROM node:14.16.1 AS development

WORKDIR /ui

COPY package.json /ui/package.json
COPY package-lock.json /ui/package-lock.json

RUN npm ci

COPY . /ui

EXPOSE 3000

CMD ["npm", "start"]