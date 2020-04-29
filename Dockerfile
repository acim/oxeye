FROM mhart/alpine-node:12 AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN SAPPER_TIMESTAMP=$(date +%s%3N) npm run build

FROM node:12-alpine AS prod

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --production

FROM mhart/alpine-node:slim-12

LABEL org.label-schema.name="oxeye" \
    org.label-schema.vendor="ablab.io"

RUN adduser -D ablab

WORKDIR /app

COPY --from=build /app/__sapper__/build __sapper__/build
COPY --from=build /app/static static
COPY --from=prod /app .

USER ablab

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["__sapper__/build"]
