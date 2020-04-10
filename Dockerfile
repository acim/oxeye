FROM node:lts

WORKDIR /app
ENV NODE_ENV development

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "dev"]
