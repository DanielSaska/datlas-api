FROM node:alpine
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm config set unsafe-perm true
RUN npm install
RUN npm install pm2 -g
COPY . /app
EXPOSE 80/tcp
CMD ["pm2-docker", "start", "process.json"]
