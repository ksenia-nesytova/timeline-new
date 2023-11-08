FROM node:14

RUN echo "I'm NODE"

WORKDIR /app/server

RUN npm install

RUN npm install express --save

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
