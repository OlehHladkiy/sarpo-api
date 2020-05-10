FROM node:12.10-alpine

ENV PROJECT_WORKDIR=/project
ENV NODE_ENV production
ENV PORT 4001

EXPOSE $PORT $GRAPHQL_PORT

RUN apk update && apk add --no-cache imagemagick ghostscript

RUN mkdir -p $PROJECT_WORKDIR
WORKDIR $PROJECT_WORKDIR

COPY package.json yarn.lock $PROJECT_WORKDIR/
RUN yarn --production=false --frozen-lockfile

COPY ./docker-entrypoint.sh /

VOLUME [$PROJECT_WORKDIR]
COPY . $PROJECT_WORKDIR

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["yarn", "start"]
