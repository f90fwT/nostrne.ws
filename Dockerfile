FROM node:18.7.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "preview" ]