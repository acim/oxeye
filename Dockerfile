FROM mhart/alpine-node:15.2.1 AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN SAPPER_TIMESTAMP=$(date +%s%3N) npm run build


FROM mhart/alpine-node:15.2.1 AS deps

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --production


FROM mhart/alpine-node:15.2.1

WORKDIR /app
COPY --from=build /app/__sapper__/build __sapper__/build
COPY --from=build /app/static static
COPY --from=deps /app .

USER 65534

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["__sapper__/build"]
