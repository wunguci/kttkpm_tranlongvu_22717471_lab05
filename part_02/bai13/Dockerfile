# stage 1: build react
FROM node:18 AS build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

# stage 2: chạy bằng nginx
FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]