FROM node:14

ARG UID=1000
ARG GID=1000

RUN mkdir /app && chown ${UID}:${GID} /app
USER ${UID}
WORKDIR /app
ENV NODE_ENV development

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "dev"]
