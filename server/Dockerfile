FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm install -g rimraf typescript
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start:in:docker"]