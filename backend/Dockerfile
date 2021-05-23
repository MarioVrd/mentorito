FROM node:14.16.1-alpine

# default environment set to production
# compose overrides this to development
# ARG NODE_ENV=production
# ENV NODE_ENV $NODE_ENV

WORKDIR /api

COPY package.json /api/package.json
COPY package-lock.json /api/package-lock.json

RUN npm ci

COPY . /api

EXPOSE 5000

RUN npx prisma generate

CMD ["node", "server.js"]