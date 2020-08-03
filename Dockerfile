FROM node:14 AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN SAPPER_TIMESTAMP=$(date +%s%3N) npm run build

FROM node:14 AS prod

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --production

FROM mhart/alpine-node:slim-14

LABEL org.label-schema.name="oxeye" \
    org.label-schema.vendor="ablab.io"

WORKDIR /app

COPY --from=build /app/__sapper__/build __sapper__/build
COPY --from=build /app/static static
COPY --from=prod /app .

USER 65534

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["__sapper__/build"]
