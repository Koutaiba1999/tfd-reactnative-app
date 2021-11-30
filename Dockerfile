FROM ubuntu:latest

WORKDIR /home
RUN apt-get update && \
  apt-get install -y  curl && \
  curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install -y nodejs


COPY . .
RUN npm install && npm install -g expo-cli
RUN  npm install chokidar
 

CMD [ "npm", "start" ]
