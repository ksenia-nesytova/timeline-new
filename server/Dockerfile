FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

RUN npm install
RUN npm install pg --save

RUN npm install express --save
RUN npm install axios --save
RUN npm install body-parser --save

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
