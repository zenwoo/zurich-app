FROM node:20.18.0-alpine3.20 AS build

WORKDIR /usr/src/api

COPY src \
  nest-cli.json \
  package*.json \
  tsconfig*.json \
  docker-entrypoint.sh /usr/src/api/

RUN npm install \
    && npm run build

FROM node:20.18.0-alpine3.20

ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY --from=build /usr/src/api/dist /usr/src/api/dist
COPY --from=build /usr/src/api/node_modules /usr/src/api/node_modules
COPY --from=build /usr/src/api/package*.json /usr/src/api/
COPY --from=build /usr/src/api/docker-entrypoint.sh /usr/src/api/docker-entrypoint.sh

RUN chmod +x /usr/src/api/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/src/api/docker-entrypoint.sh"]
CMD ["npm", "run", "start:prod"]
