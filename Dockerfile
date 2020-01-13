FROM node:12-alpine

WORKDIR /app
ENV NODE_ENV development

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "dev"]