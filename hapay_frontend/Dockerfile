FROM node:10-alpine as buildContainer
WORKDIR /app
COPY ./package.json ./package-lock.json /app/

FROM node:8-alpine

WORKDIR /app
COPY . /app
RUN npm install && npm run build:ssr:production

# Copy dependency definitions
COPY --from=buildContainer /app/package.json /app
COPY --from=buildContainer /app/package-lock.json /app

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist
COPY --from=buildContainer /app/dist/server /app/dist/server
COPY --from=buildContainer /app/node_modules /app/node_modules
COPY --from=buildContainer /app/dist/browser /app/dist/browser
# Expose the port the app runs in
EXPOSE 4441

# Serve the app
CMD ["npm", "run", "server"]
