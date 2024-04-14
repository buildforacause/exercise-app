# use node v 18
FROM node:18 AS frontend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --silent

RUN npm install -g serve

COPY . /app/

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]