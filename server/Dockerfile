FROM node:16-bullseye-slim as base
RUN apt-get update && apt-get install -y git

# Build shared libraries
FROM base as shareddeps
# We clone the entire repository. An alternative would be to use the "sparse" features
# of git, but not all git versions support this.
RUN git clone https://github.com/andrinmeier/romme /usr/src/romme
RUN cp -R /usr/src/romme/game-events /usr/src/game-events
WORKDIR /usr/src/game-events
RUN npm install
RUN npm run build

FROM base
WORKDIR /usr/src/server
COPY --from=shareddeps /usr/src/game-events /usr/src/game-events
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm install -g rimraf@latest typescript@latest && npm run build
EXPOSE 8080
CMD ["npm", "run", "start:in:docker"]