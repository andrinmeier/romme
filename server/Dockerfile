FROM node:16
WORKDIR /usr/src/server
RUN git clone https://github.com/andrinmeier/romme /usr/src/romme
RUN cp -R /usr/src/romme/game-events /usr/src/game-events
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm install -g rimraf typescript
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start:in:docker"]